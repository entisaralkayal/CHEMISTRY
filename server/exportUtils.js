function csvEscape(value) {
  const normalized = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return `"${normalized.replaceAll('"', '""')}"`;
}

function exportRow(result) {
  return [
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
  ];
}

export function buildCsvText(results) {
  const headers = [
    "student_name",
    "student_id",
    "section_group",
    "chapter",
    "chapter_title",
    "quiz_score",
    "clo_scores",
    "correct_answers",
    "wrong_answers",
    "weakness_areas",
    "feedback_summary",
    "submitted_at",
  ];

  const rows = [
    headers,
    ...results.map(exportRow),
  ];

  return `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`;
}

export function buildExcelHtml(results) {
  const rows = [
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
    ...results.map(exportRow),
  ];

  const htmlRows = rows
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${String(cell).replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8" /></head><body><table>${htmlRows}</table></body></html>`;
}
