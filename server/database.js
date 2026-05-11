import fs from "node:fs";
import path from "node:path";
import sqlite3 from "sqlite3";

const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve("data");
const dbPath = path.join(dataDir, "quiz-results.sqlite");
const csvPath = path.join(dataDir, "results.csv");
const excelPath = path.join(dataDir, "results.xls");

fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS course_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      student_id TEXT NOT NULL,
      section_group TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      chapter_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      clo_scores TEXT NOT NULL,
      topic_scores TEXT NOT NULL,
      difficulty_scores TEXT NOT NULL,
      skill_scores TEXT NOT NULL,
      correct_answers TEXT NOT NULL,
      wrong_answers TEXT NOT NULL,
      strengths TEXT NOT NULL,
      weaknesses TEXT NOT NULL,
      learning_gaps TEXT NOT NULL,
      recommendations TEXT NOT NULL,
      feedback_summary TEXT NOT NULL,
      submitted_at TEXT NOT NULL
    )
  `);
});

function csvEscape(value) {
  const normalized = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return `"${normalized.replaceAll('"', '""')}"`;
}

const csvColumns = [
  "id",
  "student_name",
  "student_id",
  "section_group",
  "chapter",
  "chapter_title",
  "quiz_score",
  "total",
  "clo_scores",
  "correct_answers",
  "wrong_answers",
  "weakness_areas",
  "feedback_summary",
  "submitted_at",
];

function ensureCsvHeader() {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, `${csvColumns.join(",")}\n`, "utf8");
  }
}

function serializeResult(result) {
  return {
    ...result,
    cloScores: JSON.stringify(result.cloScores),
    topicScores: JSON.stringify(result.topicScores),
    difficultyScores: JSON.stringify(result.difficultyScores),
    skillScores: JSON.stringify(result.skillScores),
    correctAnswers: JSON.stringify(result.correctAnswers),
    wrongAnswers: JSON.stringify(result.wrongAnswers),
    strengths: JSON.stringify(result.strengths),
    weaknesses: JSON.stringify(result.weaknesses),
    learningGaps: JSON.stringify(result.learningGaps),
    recommendations: JSON.stringify(result.recommendations),
  };
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function deserializeRow(row) {
  return {
    ...row,
    cloScores: parseJson(row.cloScores, {}),
    topicScores: parseJson(row.topicScores, {}),
    difficultyScores: parseJson(row.difficultyScores, {}),
    skillScores: parseJson(row.skillScores, {}),
    correctAnswers: parseJson(row.correctAnswers, []),
    wrongAnswers: parseJson(row.wrongAnswers, []),
    strengths: parseJson(row.strengths, []),
    weaknesses: parseJson(row.weaknesses, []),
    learningGaps: parseJson(row.learningGaps, []),
    recommendations: parseJson(row.recommendations, []),
  };
}

export function insertResult(result) {
  ensureCsvHeader();
  const serialized = serializeResult(result);

  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO course_results (
          student_name,
          student_id,
          section_group,
          chapter,
          chapter_title,
          score,
          total,
          clo_scores,
          topic_scores,
          difficulty_scores,
          skill_scores,
          correct_answers,
          wrong_answers,
          strengths,
          weaknesses,
          learning_gaps,
          recommendations,
          feedback_summary,
          submitted_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        serialized.studentName,
        serialized.studentId,
        serialized.sectionGroup,
        serialized.chapter,
        serialized.chapterTitle,
        serialized.score,
        serialized.total,
        serialized.cloScores,
        serialized.topicScores,
        serialized.difficultyScores,
        serialized.skillScores,
        serialized.correctAnswers,
        serialized.wrongAnswers,
        serialized.strengths,
        serialized.weaknesses,
        serialized.learningGaps,
        serialized.recommendations,
        serialized.feedbackSummary,
        serialized.submittedAt,
      ],
      function onInsert(error) {
        if (error) {
          reject(error);
          return;
        }

        const saved = { id: this.lastID, ...result };
        fs.appendFileSync(
          csvPath,
          [
            saved.id,
            saved.studentName,
            saved.studentId,
            saved.sectionGroup,
            saved.chapter,
            saved.chapterTitle,
            `${saved.score}/${saved.total}`,
            saved.total,
            saved.cloScores,
            saved.correctAnswers,
            saved.wrongAnswers,
            saved.weaknesses,
            saved.feedbackSummary,
            saved.submittedAt,
          ]
            .map(csvEscape)
            .join(",") + "\n",
          "utf8",
        );
        resolve(saved);
      },
    );
  });
}

export function listResults() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT
          id,
          student_name AS studentName,
          student_id AS studentId,
          section_group AS sectionGroup,
          chapter,
          chapter_title AS chapterTitle,
          score,
          total,
          clo_scores AS cloScores,
          topic_scores AS topicScores,
          difficulty_scores AS difficultyScores,
          skill_scores AS skillScores,
          correct_answers AS correctAnswers,
          wrong_answers AS wrongAnswers,
          strengths,
          weaknesses,
          learning_gaps AS learningGaps,
          recommendations,
          feedback_summary AS feedbackSummary,
          submitted_at AS submittedAt
        FROM course_results
        ORDER BY submitted_at DESC, id DESC
      `,
      (error, rows) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(rows.map(deserializeRow));
      },
    );
  });
}

export async function writeExcelExport(results) {
  const rows = results.map((result) => [
    result.studentName,
    result.studentId,
    result.sectionGroup,
    `Chapter ${result.chapter}`,
    result.chapterTitle,
    `${result.score}/${result.total}`,
    JSON.stringify(result.cloScores),
    JSON.stringify(result.correctAnswers),
    JSON.stringify(result.wrongAnswers),
    JSON.stringify(result.weaknesses),
    result.feedbackSummary,
    result.submittedAt,
  ]);

  const htmlRows = [
    [
      "Student name",
      "Student ID",
      "Section/group",
      "Chapter",
      "Chapter title",
      "Quiz score",
      "CLO scores",
      "Correct answers",
      "Wrong answers",
      "Weakness areas",
      "Feedback summary",
      "Submission date and time",
    ],
    ...rows,
  ]
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${String(cell).replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  const workbook = `<!doctype html><html><head><meta charset="utf-8" /></head><body><table>${htmlRows}</table></body></html>`;
  fs.writeFileSync(excelPath, workbook, "utf8");
  return excelPath;
}

export { csvPath, dbPath, excelPath };
