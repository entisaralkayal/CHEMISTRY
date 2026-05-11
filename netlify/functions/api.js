import fs from "node:fs";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import { assessSubmission, getDashboardAnalytics } from "../../server/assessment.js";
import { getChatbotReply } from "../../server/chatbot.js";
import {
  chapters,
  getChapter,
  getCourse,
  getQuizForChapter,
} from "../../server/courseData.js";
import { buildCsvText, buildExcelHtml } from "../../server/exportUtils.js";

const localDataDir = path.resolve(process.cwd(), "data");
const localResultsPath = path.join(localDataDir, "netlify-results.json");

function jsonResponse(payload, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(payload), { ...init, headers });
}

function textDownloadResponse(text, filename, contentType) {
  const headers = new Headers({
    "Content-Type": `${contentType}; charset=utf-8`,
    "Content-Disposition": `attachment; filename="${filename}"`,
  });
  return new Response(text, { status: 200, headers });
}

function badRequest(message) {
  return jsonResponse({ message }, { status: 400 });
}

function notFound(message) {
  return jsonResponse({ message }, { status: 404 });
}

function internalError(error) {
  console.error(error);
  return jsonResponse({ message: "Server error." }, { status: 500 });
}

function hasNetlifyBlobs() {
  return Boolean(process.env.NETLIFY || process.env.BLOBS_CONTEXT || process.env.NETLIFY_SITE_ID);
}

function getResultsStore() {
  return getStore({ name: "chemistry-course-results", consistency: "strong" });
}

async function readLocalResults() {
  fs.mkdirSync(localDataDir, { recursive: true });
  if (!fs.existsSync(localResultsPath)) return [];
  return JSON.parse(fs.readFileSync(localResultsPath, "utf8"));
}

async function writeLocalResults(results) {
  fs.mkdirSync(localDataDir, { recursive: true });
  fs.writeFileSync(localResultsPath, JSON.stringify(results, null, 2), "utf8");
}

async function listStoredResults() {
  if (hasNetlifyBlobs()) {
    const store = getResultsStore();
    return (await store.get("results", { type: "json" })) || [];
  }

  return readLocalResults();
}

async function saveStoredResults(results) {
  if (hasNetlifyBlobs()) {
    const store = getResultsStore();
    await store.setJSON("results", results);
    return;
  }

  await writeLocalResults(results);
}

async function insertStoredResult(result) {
  const results = await listStoredResults();
  const nextId = results.length ? Math.max(...results.map((item) => Number(item.id) || 0)) + 1 : 1;
  const saved = { id: nextId, ...result };
  results.unshift(saved);
  await saveStoredResults(results);
  return saved;
}

async function handleGetCourse() {
  return jsonResponse(getCourse());
}

async function handleGetChapterQuiz(chapterNumber) {
  const quiz = getQuizForChapter(chapterNumber);
  if (!quiz) return notFound("Chapter quiz not found.");
  return jsonResponse(quiz);
}

async function handleGetQuizzes() {
  return jsonResponse(
    chapters.map((chapter) => ({
      id: `chapter-${chapter.number}`,
      title: `Chapter ${chapter.number}: ${chapter.title}`,
      source: chapter.theme,
      questionCount: getQuizForChapter(chapter.number)?.questions.length || 0,
    })),
  );
}

async function handleGetQuizById(quizId) {
  const chapterNumber = String(quizId).replace("chapter-", "");
  return handleGetChapterQuiz(chapterNumber);
}

async function handleSubmit(request) {
  const body = await request.json();
  const { studentName, studentId, universityId, sectionGroup, chapterNumber, quizId, answers } = body;
  const resolvedChapterNumber = chapterNumber || String(quizId || "").replace("chapter-", "");
  const chapter = getChapter(resolvedChapterNumber);

  if (!studentName?.trim() || !(studentId || universityId)?.trim() || !sectionGroup?.trim()) {
    return badRequest("Student name, student ID, and section/group are required.");
  }

  if (!chapter || !answers || typeof answers !== "object") {
    return badRequest("A valid chapter and answer set are required.");
  }

  const assessment = assessSubmission({ chapter, answers });
  const saved = await insertStoredResult({
    studentName: studentName.trim(),
    studentId: (studentId || universityId).trim(),
    sectionGroup: sectionGroup.trim(),
    chapter: chapter.number,
    chapterTitle: chapter.title,
    ...assessment,
    submittedAt: new Date().toISOString(),
  });

  return jsonResponse(
    {
      id: saved.id,
      chapter: chapter.number,
      chapterTitle: chapter.title,
      ...assessment,
    },
    { status: 201 },
  );
}

async function handleChatbot(request) {
  const body = await request.json();
  return jsonResponse({ reply: getChatbotReply(body.message) });
}

async function handleResults() {
  return jsonResponse(await listStoredResults());
}

async function handleDashboard() {
  const results = await listStoredResults();
  return jsonResponse({ results, analytics: getDashboardAnalytics(results) });
}

async function handleExportCsv() {
  const results = await listStoredResults();
  return textDownloadResponse(buildCsvText(results), "chemistry-course-results.csv", "text/csv");
}

async function handleExportExcel() {
  const results = await listStoredResults();
  return textDownloadResponse(buildExcelHtml(results), "chemistry-course-results.xls", "application/vnd.ms-excel");
}

export default async function handler(request) {
  try {
    const url = new URL(request.url);
    const rawPathname = url.pathname.replace(/\/+$/, "") || "/";
    const pathname = rawPathname.startsWith("/.netlify/functions/api")
      ? `/api${rawPathname.slice("/.netlify/functions/api".length) || ""}`.replace(/\/+$/, "") || "/api"
      : rawPathname;

    if (request.method === "GET" && pathname === "/api/course") return handleGetCourse();
    if (request.method === "GET" && pathname === "/api/quizzes") return handleGetQuizzes();
    if (request.method === "GET" && pathname === "/api/results") return handleResults();
    if (request.method === "GET" && pathname === "/api/dashboard") return handleDashboard();
    if (request.method === "GET" && pathname === "/api/export/csv") return handleExportCsv();
    if (request.method === "GET" && pathname === "/api/export/excel") return handleExportExcel();

    const chapterQuizMatch = pathname.match(/^\/api\/chapters\/(\d+)\/quiz$/);
    if (request.method === "GET" && chapterQuizMatch) return handleGetChapterQuiz(chapterQuizMatch[1]);

    const quizMatch = pathname.match(/^\/api\/quizzes\/([^/]+)$/);
    if (request.method === "GET" && quizMatch) return handleGetQuizById(quizMatch[1]);

    if (request.method === "POST" && pathname === "/api/submit") return handleSubmit(request);
    if (request.method === "POST" && pathname === "/api/chatbot") return handleChatbot(request);

    return notFound("Route not found.");
  } catch (error) {
    return internalError(error);
  }
}

export const config = {
  path: "/api/*",
};
