import {
  chapters,
  clos,
  getCorrectOption,
  getQuestionById,
} from "./courseData.js";

function emptyBucket() {
  return { correct: 0, total: 0, percent: 0 };
}

function addBucketScore(target, key, isCorrect) {
  target[key] ??= emptyBucket();
  target[key].total += 1;
  if (isCorrect) target[key].correct += 1;
}

function finalizeBuckets(target) {
  return Object.fromEntries(
    Object.entries(target).map(([key, value]) => [
      key,
      {
        ...value,
        percent: value.total ? Math.round((value.correct / value.total) * 100) : 0,
      },
    ]),
  );
}

function namesForClo(ids) {
  return ids.map((id) => clos.find((clo) => clo.id === id)?.title || id);
}

export function assessSubmission({ chapter, answers }) {
  const chapterQuestions = Object.entries(answers)
    .map(([questionId, selectedOptionId]) => ({ question: getQuestionById(questionId), selectedOptionId }))
    .filter(({ question }) => question && question.chapter === chapter.number);

  const cloScores = {};
  const topicScores = {};
  const difficultyScores = {};
  const skillScores = {};
  const correctAnswers = [];
  const wrongAnswers = [];
  const answerFeedback = [];

  for (const { question, selectedOptionId } of chapterQuestions) {
    const correctOption = getCorrectOption(question);
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    const isCorrect = selectedOptionId === correctOption.id;

    addBucketScore(cloScores, question.clo, isCorrect);
    addBucketScore(topicScores, question.topic, isCorrect);
    addBucketScore(difficultyScores, question.difficulty, isCorrect);
    addBucketScore(skillScores, question.skill, isCorrect);

    const answerRecord = {
      questionId: question.id,
      question: question.prompt,
      clo: question.clo,
      topic: question.topic,
      difficulty: question.difficulty,
      skill: question.skill,
      selected: selectedOption?.text || "No answer",
      correct: correctOption.text,
    };

    if (isCorrect) correctAnswers.push(answerRecord);
    else wrongAnswers.push(answerRecord);

    answerFeedback.push({
      questionId: question.id,
      prompt: question.prompt,
      clo: question.clo,
      topic: question.topic,
      difficulty: question.difficulty,
      skill: question.skill,
      selected: selectedOption?.text || "No answer",
      correct: correctOption.text,
      isCorrect,
      feedback: isCorrect
        ? `Good work. Your answer matches the core idea in ${question.topic} and supports ${question.clo}.`
        : `Review ${question.topic}. The correct answer is "${correctOption.text}". Revisit the chapter explanation, concept map, and reaction summary before retrying similar questions.`,
    });
  }

  const finalCloScores = finalizeBuckets(cloScores);
  const finalTopicScores = finalizeBuckets(topicScores);
  const finalDifficultyScores = finalizeBuckets(difficultyScores);
  const finalSkillScores = finalizeBuckets(skillScores);
  const score = correctAnswers.length;
  const total = chapterQuestions.length;

  const strengths = Object.entries(finalCloScores)
    .filter(([, value]) => value.percent >= 75)
    .map(([key]) => key);
  const weaknesses = Object.entries(finalCloScores)
    .filter(([, value]) => value.percent < 75)
    .map(([key]) => key);
  const learningGaps = Object.entries(finalTopicScores)
    .filter(([, value]) => value.percent < 70)
    .map(([topic, value]) => `${topic} (${value.percent}%)`);
  const recommendations = learningGaps.length
    ? learningGaps.map((gap) => `Review ${chapter.title}: ${gap}, then retry the chapter quiz.`)
    : [`Continue with the next chapter and use ${chapter.title} as a quick revision reference.`];
  const recommendedResources = chapter.resources.slice(0, 3);
  const motivationalMessage = score >= Math.ceil(total * 0.7)
    ? "You are building a strong chemistry foundation. Keep refining the topics you missed and you will move up quickly."
    : "Progress in chemistry comes from steady review. Focus on one weak topic at a time, then return to the quiz with confidence.";

  const strongNames = namesForClo(strengths).join(", ") || "your developing foundation";
  const weakNames = namesForClo(weaknesses).join(", ") || "no major weak CLOs";
  const feedbackSummary = `You scored ${score}/${total} in Chapter ${chapter.number}. Strong area: ${strongNames}. Review focus: ${weakNames}. ${recommendations[0]} Keep going; every mechanism becomes easier when you name the electron-rich and electron-poor sites first.`;

  return {
    score,
    total,
    cloScores: finalCloScores,
    topicScores: finalTopicScores,
    difficultyScores: finalDifficultyScores,
    skillScores: finalSkillScores,
    correctAnswers,
    wrongAnswers,
    answerFeedback,
    strengths,
    weaknesses,
    learningGaps,
    recommendations,
    recommendedResources,
    motivationalMessage,
    feedbackSummary,
  };
}

function average(values) {
  if (!values.length) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function aggregateBuckets(results, field) {
  const buckets = {};
  for (const result of results) {
    for (const [key, value] of Object.entries(result[field] || {})) {
      buckets[key] ??= emptyBucket();
      buckets[key].correct += value.correct;
      buckets[key].total += value.total;
    }
  }
  return finalizeBuckets(buckets);
}

export function getDashboardAnalytics(results) {
  const uniqueStudents = new Set(results.map((result) => result.studentId)).size;
  const averageScore = average(results.map((result) => (result.score / result.total) * 100 || 0));
  const chapterScores = {};

  for (const chapter of chapters) {
    const chapterResults = results.filter((result) => result.chapter === chapter.number);
    chapterScores[chapter.number] = {
      title: chapter.title,
      attempts: chapterResults.length,
      average: average(chapterResults.map((result) => (result.score / result.total) * 100 || 0)),
    };
  }

  const cloScores = aggregateBuckets(results, "cloScores");
  const questionStats = {};
  const wrongAnswerStats = {};

  for (const result of results) {
    for (const wrong of result.wrongAnswers) {
      questionStats[wrong.questionId] ??= {
        questionId: wrong.questionId,
        question: wrong.question,
        chapter: result.chapter,
        wrong: 0,
      };
      questionStats[wrong.questionId].wrong += 1;

      const key = `${wrong.questionId}::${wrong.selected}`;
      wrongAnswerStats[key] ??= {
        question: wrong.question,
        selected: wrong.selected,
        count: 0,
      };
      wrongAnswerStats[key].count += 1;
    }
  }

  const rankedClos = Object.entries(cloScores).sort((a, b) => a[1].percent - b[1].percent);

  return {
    completedStudents: uniqueStudents,
    submissions: results.length,
    averageScore,
    chapterScores,
    cloScores,
    difficultQuestions: Object.values(questionStats).sort((a, b) => b.wrong - a.wrong).slice(0, 5),
    commonWrongAnswers: Object.values(wrongAnswerStats).sort((a, b) => b.count - a.count).slice(0, 5),
    weakestClos: rankedClos.slice(0, 3).map(([id, value]) => ({ id, title: namesForClo([id])[0], ...value })),
    strongestClos: rankedClos.slice(-3).reverse().map(([id, value]) => ({ id, title: namesForClo([id])[0], ...value })),
    classLearningGaps: rankedClos
      .filter(([, value]) => value.percent < 70)
      .map(([id, value]) => `${id}: ${namesForClo([id])[0]} (${value.percent}%)`),
  };
}
