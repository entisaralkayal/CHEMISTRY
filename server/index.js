import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { csvPath, dbPath, insertResult, listResults, writeExcelExport } from "./database.js";
import { assessSubmission, getDashboardAnalytics } from "./assessment.js";
import { getChatbotReply } from "./chatbot.js";
import {
  chapters,
  getChapter,
  getCourse,
  getQuizForChapter,
} from "./courseData.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

app.use(cors());
app.use(express.json());

app.get("/api/course", (_request, response) => {
  response.json(getCourse());
});

app.get("/api/chapters/:chapterNumber/quiz", (request, response) => {
  const quiz = getQuizForChapter(request.params.chapterNumber);
  if (!quiz) {
    response.status(404).json({ message: "Chapter quiz not found." });
    return;
  }
  response.json(quiz);
});

app.get("/api/quizzes", (_request, response) => {
  response.json(
    chapters.map((chapter) => ({
      id: `chapter-${chapter.number}`,
      title: `Chapter ${chapter.number}: ${chapter.title}`,
      source: chapter.theme,
      questionCount: getQuizForChapter(chapter.number)?.questions.length || 0,
    })),
  );
});

app.get("/api/quizzes/:quizId", (request, response) => {
  const chapterNumber = String(request.params.quizId).replace("chapter-", "");
  const quiz = getQuizForChapter(chapterNumber);
  if (!quiz) {
    response.status(404).json({ message: "Quiz not found." });
    return;
  }
  response.json(quiz);
});

app.post("/api/submit", async (request, response, next) => {
  try {
    const { studentName, studentId, universityId, sectionGroup, chapterNumber, quizId, answers } = request.body;
    const resolvedChapterNumber = chapterNumber || String(quizId || "").replace("chapter-", "");
    const chapter = getChapter(resolvedChapterNumber);

    if (!studentName?.trim() || !(studentId || universityId)?.trim() || !sectionGroup?.trim()) {
      response.status(400).json({ message: "Student name, student ID, and section/group are required." });
      return;
    }

    if (!chapter || !answers || typeof answers !== "object") {
      response.status(400).json({ message: "A valid chapter and answer set are required." });
      return;
    }

    const assessment = assessSubmission({ chapter, answers });
    const saved = await insertResult({
      studentName: studentName.trim(),
      studentId: (studentId || universityId).trim(),
      sectionGroup: sectionGroup.trim(),
      chapter: chapter.number,
      chapterTitle: chapter.title,
      ...assessment,
      submittedAt: new Date().toISOString(),
    });

    response.status(201).json({
      id: saved.id,
      chapter: chapter.number,
      chapterTitle: chapter.title,
      ...assessment,
      csvPath,
      dbPath,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/chatbot", (request, response) => {
  response.json({ reply: getChatbotReply(request.body.message) });
});

app.get("/api/results", async (_request, response, next) => {
  try {
    response.json(await listResults());
  } catch (error) {
    next(error);
  }
});

app.get("/api/dashboard", async (_request, response, next) => {
  try {
    const results = await listResults();
    response.json({ results, analytics: getDashboardAnalytics(results) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/export/csv", async (_request, response, next) => {
  try {
    await listResults();
    if (!fs.existsSync(csvPath)) fs.writeFileSync(csvPath, "", "utf8");
    response.download(csvPath, "chemistry-course-results.csv");
  } catch (error) {
    next(error);
  }
});

app.get("/api/export/excel", async (_request, response, next) => {
  try {
    const results = await listResults();
    const file = await writeExcelExport(results);
    response.download(file, "chemistry-course-results.xls");
  } catch (error) {
    next(error);
  }
});

app.use(express.static(distDir));

app.get("*", (_request, response) => {
  response.sendFile(path.join(distDir, "index.html"));
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Server error." });
});

app.listen(port, () => {
  console.log(`Chemistry course platform running at http://127.0.0.1:${port}`);
});
