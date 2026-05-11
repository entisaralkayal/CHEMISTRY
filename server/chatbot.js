import { chapters } from "./courseData.js";

export function getChatbotReply(messageInput) {
  const message = String(messageInput || "").toLowerCase();
  const chapter = chapters.find(
    (item) =>
      message.includes(`chapter ${item.number}`) ||
      message.includes(item.shortTitle.toLowerCase()) ||
      message.includes(item.title.toLowerCase().split(" ")[0]),
  );

  if (message.includes("answer") || message.includes("correct option")) {
    return "I am your virtual chemistry teacher, so during quizzes I give guidance rather than direct answers. Start by identifying the topic, then use the chapter concept map, key terms, and reaction summary to narrow the correct choice.";
  }

  if (message.includes("weak") || message.includes("gap") || message.includes("review")) {
    return "Use your feedback panel first: weak CLOs tell you which skill needs work, and learning gaps tell you which topic to revisit. Study the chapter explanation, then the concept map, then the suggested resources before retrying the quiz.";
  }

  if (message.includes("explain") || message.includes("teach") || message.includes("understand")) {
    if (chapter) {
      return `Let's study Chapter ${chapter.number} together. ${chapter.explanation} Focus especially on these ideas: ${chapter.objectives.map((item) => item.text).slice(0, 2).join(" ")} Then review: ${chapter.resources[0]}`;
    }
    return "I can explain any concept from the seven chemistry chapters in simple steps. Tell me the chapter number or the exact concept you want to understand.";
  }

  if (chapter) {
    return `As your virtual teacher for Chapter ${chapter.number}, I would focus first on ${chapter.theme} In simple terms: ${chapter.summary} A useful study step is: ${chapter.resources[0]}`;
  }

  return "I am a virtual chemistry teacher for this course only. I can explain concepts, summarize reactions, suggest what to review, and guide you through the seven curriculum chapters. Tell me the chapter number or concept you want to study.";
}
