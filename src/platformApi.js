import { assessSubmission, getDashboardAnalytics } from "../server/assessment.js";
import { getChatbotReply } from "../server/chatbot.js";
import { getChapter, getCourse, getQuizForChapter } from "../server/courseData.js";
import { buildCsvText, buildExcelHtml } from "../server/exportUtils.js";

const configuredApiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
const storageKey = "chemistry-course-platform-results";
let platformMode = "server";
const allowStaticFallback =
  import.meta.env.DEV ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const productionFunctionBase = allowStaticFallback ? "" : "/.netlify/functions/api";
const apiBase = configuredApiBase || productionFunctionBase;

function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (apiBase === productionFunctionBase && normalizedPath.startsWith("/api/")) {
    return `${apiBase}${normalizedPath.slice(4)}`;
  }
  return `${apiBase}${normalizedPath}`;
}

function setStaticMode() {
  platformMode = "static";
}

function setServerMode() {
  platformMode = "server";
}

function readStoredResults() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function writeStoredResults(results) {
  window.localStorage.setItem(storageKey, JSON.stringify(results));
}

function downloadTextFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function fetchJson(path, init) {
  const response = await fetch(apiUrl(path), init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function submitStatic(body) {
  const { studentName, studentId, sectionGroup, chapterNumber, answers } = body;
  const chapter = getChapter(chapterNumber);
  if (!chapter) {
    throw new Error("Chapter not found.");
  }

  const assessment = assessSubmission({ chapter, answers });
  const results = readStoredResults();
  const nextId = results.length ? Math.max(...results.map((item) => Number(item.id) || 0)) + 1 : 1;
  const saved = {
    id: nextId,
    studentName: studentName.trim(),
    studentId: studentId.trim(),
    sectionGroup: sectionGroup.trim(),
    chapter: chapter.number,
    chapterTitle: chapter.title,
    ...assessment,
    submittedAt: new Date().toISOString(),
  };

  results.unshift(saved);
  writeStoredResults(results);
  return saved;
}

export function getPlatformMode() {
  return platformMode;
}

export async function loadCourse() {
  try {
    const course = await fetchJson("/api/course");
    setServerMode();
    return course;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Course API is unavailable.");
    }
    setStaticMode();
    return getCourse();
  }
}

export async function loadQuiz(chapterNumber) {
  try {
    const quiz = await fetchJson(`/api/chapters/${chapterNumber}/quiz`);
    setServerMode();
    return quiz;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Quiz API is unavailable.");
    }
    setStaticMode();
    return getQuizForChapter(chapterNumber);
  }
}

export async function submitQuiz(payload) {
  try {
    const result = await fetchJson("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setServerMode();
    return result;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Submission API is unavailable.");
    }
    setStaticMode();
    return submitStatic(payload);
  }
}

export async function loadDashboard() {
  try {
    const dashboard = await fetchJson("/api/dashboard");
    setServerMode();
    return dashboard;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Dashboard API is unavailable.");
    }
    setStaticMode();
    const results = readStoredResults();
    return { results, analytics: getDashboardAnalytics(results) };
  }
}

export async function sendChatMessage(message) {
  try {
    const reply = await fetchJson("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setServerMode();
    return reply;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Chatbot API is unavailable.");
    }
    setStaticMode();
    return { reply: getChatbotReply(message) };
  }
}

export async function exportResults(type) {
  try {
    const response = await fetch(apiUrl(`/api/export/${type}`), { method: "GET" });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = type === "csv" ? "chemistry-course-results.csv" : "chemistry-course-results.xls";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setServerMode();
    return;
  } catch {
    if (!allowStaticFallback) {
      throw new Error("Export API is unavailable.");
    }
    setStaticMode();
  }

  const results = readStoredResults();
  if (type === "csv") {
    downloadTextFile(buildCsvText(results), "chemistry-course-results.csv", "text/csv");
    return;
  }

  downloadTextFile(buildExcelHtml(results), "chemistry-course-results.xls", "application/vnd.ms-excel");
}
