import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  exportResults,
  getPlatformMode,
  loadCourse,
  loadDashboard as loadDashboardData,
  loadQuiz,
  sendChatMessage,
  submitQuiz as submitQuizResult,
} from "./platformApi.js";

const teacherPassword = "2030";

function ReactionVisual({ visual }) {
  if (!visual) return null;
  if (visual.type === "structure") {
    return (
      <div className="chem-visual structure-visual">
        <strong>{visual.formula}</strong>
        <span>{visual.caption}</span>
      </div>
    );
  }

  return (
    <div className="chem-visual reaction-visual">
      {visual.steps.map((step, index) => (
        <React.Fragment key={`${step}-${index}`}>
          <span>{step}</span>
          {index < visual.steps.length - 1 && <b>-&gt;</b>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ConceptMap({ pairs }) {
  return (
    <div className="concept-map">
      {pairs.map(([from, relation], index) => (
        <div className="concept-link" key={`${from}-${relation}`}>
          <span>{from}</span>
          <b>-&gt;</b>
          <span>{relation}</span>
          {index < pairs.length - 1 && <i />}
        </div>
      ))}
    </div>
  );
}

function ReactionFlow({ reactions }) {
  return (
    <div className="reaction-grid">
      {reactions.map(([reactants, conditions, product]) => (
        <div className="reaction-card" key={`${reactants}-${product}`}>
          <span>{reactants}</span>
          <b>{conditions}</b>
          <span>{product}</span>
        </div>
      ))}
    </div>
  );
}

function ChapterContent({ chapter, onStartQuiz }) {
  return (
    <section className="chapter-view">
      <div className="chapter-hero">
        <p className="eyebrow">Chapter {chapter.number}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.theme}</p>
      </div>

      <section className="content-section">
        <h3>Learning Objectives Mapped to CLOs</h3>
        <div className="objective-list">
          {chapter.objectives.map((objective) => (
            <article key={`${objective.clo}-${objective.text}`}>
              <strong>{objective.clo}</strong>
              <span>{objective.text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h3>Clear Explanation</h3>
        <p>{chapter.explanation}</p>
      </section>

      <section className="content-grid">
        <div className="content-section">
          <h3>Concept Map</h3>
          <ConceptMap pairs={chapter.conceptMap} />
        </div>
        <div className="content-section">
          <h3>Visual Reaction Summary</h3>
          <ReactionFlow reactions={chapter.reactions} />
        </div>
      </section>

      <section className="content-grid">
        <div className="content-section">
          <h3>Key Terms</h3>
          <dl className="terms-list">
            {chapter.keyTerms.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="content-section">
          <h3>Chapter Summary</h3>
          <p>{chapter.summary}</p>
          <h3>Suggested Resources</h3>
          <ul className="resource-list">
            {chapter.resources.map((resource) => (
              <li key={resource}>{resource}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section chapter-quiz-launch">
        <p className="eyebrow">End Of Chapter</p>
        <h3>Ready for the chapter quiz?</h3>
        <p>
          Review the explanation, concept map, reaction summary, and suggested resources first.
          Then move to the quiz to measure your understanding and receive personalized feedback.
        </p>
        <button onClick={onStartQuiz}>Start Chapter Quiz</button>
      </section>
    </section>
  );
}

function QuizPanel({ chapter, quiz, onSubmitted, onModeChange }) {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [sectionGroup, setSectionGroup] = useState("");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("");
  const answered = Object.keys(answers).length;
  const canSubmit = studentName.trim() && studentId.trim() && sectionGroup.trim() && answered === quiz.questions.length;

  function setAnswer(questionId, optionId) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      setStatus("Complete student information and answer every question.");
      return;
    }

    try {
      const result = await submitQuizResult({
        studentName,
        studentId,
        sectionGroup,
        chapterNumber: chapter.number,
        answers,
      });
      setStatus("");
      onModeChange?.(getPlatformMode());
      onSubmitted(result);
    } catch (error) {
      setStatus(error.message || "Submission failed. Please try again.");
    }
  }

  return (
    <form className="quiz-panel" onSubmit={handleSubmit}>
      <div className="quiz-heading">
        <div>
          <p className="eyebrow">Interactive Quiz</p>
          <h3>{quiz.title}</h3>
        </div>
        <strong>{answered}/{quiz.questions.length}</strong>
      </div>

      <div className="student-form">
        <label>
          Student name
          <input value={studentName} onChange={(event) => setStudentName(event.target.value)} placeholder="Full name" />
        </label>
        <label>
          Student ID
          <input value={studentId} onChange={(event) => setStudentId(event.target.value)} placeholder="University ID" />
        </label>
        <label>
          Section/group
          <input value={sectionGroup} onChange={(event) => setSectionGroup(event.target.value)} placeholder="Example: B2" />
        </label>
      </div>

      {status && <p className="status">{status}</p>}

      {quiz.questions.map((question, index) => (
        <fieldset className="question-card" key={question.id}>
          <legend>
            <span>Question {index + 1} | {question.clo} | {question.difficulty} | {question.skill}</span>
            {question.prompt}
          </legend>
          <ReactionVisual visual={question.visual} />
          <div className="metadata-row">
            <span>Chapter {question.chapter}</span>
            <span>{question.topic}</span>
          </div>
          <div className="options-grid">
            {question.options.map((option) => (
              <label className="option" key={option.id}>
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => setAnswer(question.id, option.id)}
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <button type="submit" disabled={!canSubmit}>Submit Quiz</button>
    </form>
  );
}

function FeedbackPanel({ result, clos }) {
  const cloName = (id) => clos.find((clo) => clo.id === id)?.title || id;

  return (
    <section className="feedback-panel">
      <div className="score-circle">
        <span>{result.score}</span>
        <small>/{result.total}</small>
      </div>
      <div>
        <p className="eyebrow">Personalized Feedback</p>
        <h3>{result.feedbackSummary}</h3>
      </div>
      <div className="feedback-grid">
        <article>
          <h4>Strong CLOs</h4>
          <p>{result.strengths.map(cloName).join(", ") || "Keep building consistency across all CLOs."}</p>
        </article>
        <article>
          <h4>Weak CLOs</h4>
          <p>{result.weaknesses.map(cloName).join(", ") || "No weak CLOs detected in this attempt."}</p>
        </article>
        <article>
          <h4>Learning Gaps</h4>
          <p>{result.learningGaps.join(", ") || "No major topic gap detected."}</p>
        </article>
        <article>
          <h4>Recommended Study Actions</h4>
          <ul>
            {result.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h4>Suggested Chapter Resources</h4>
          <ul>
            {result.recommendedResources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h4>Motivational Message</h4>
          <p>{result.motivationalMessage}</p>
        </article>
      </div>

      <div className="content-section feedback-review">
        <h3>Answer-Based Feedback</h3>
        <div className="review-list">
          {result.answerFeedback.map((item) => (
            <article className={`review-card ${item.isCorrect ? "is-correct" : "is-wrong"}`} key={item.questionId}>
              <p className="eyebrow">{item.clo} | {item.topic} | {item.skill}</p>
              <h4>{item.prompt}</h4>
              <p><strong>Your answer:</strong> {item.selected}</p>
              <p><strong>Correct answer:</strong> {item.correct}</p>
              <p>{item.feedback}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bar({ label, value }) {
  return (
    <div className="bar-row">
      <span>{label}</span>
      <div>
        <i style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      <b>{value}%</b>
    </div>
  );
}

function TeacherDashboard({ clos, platformMode, onModeChange }) {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [status, setStatus] = useState("");

  async function loadDashboard() {
    setDashboard(await loadDashboardData());
    onModeChange?.(getPlatformMode());
  }

  useEffect(() => {
    if (loggedIn) loadDashboard();
  }, [loggedIn]);

  function login(event) {
    event.preventDefault();
    if (password === teacherPassword) {
      setLoggedIn(true);
      setStatus("");
    } else {
      setStatus("Incorrect teacher password.");
    }
  }

  if (!loggedIn) {
    return (
      <section className="admin-login">
        <form onSubmit={login}>
          <p className="eyebrow">Teacher Access</p>
          <h2>Instructor Dashboard</h2>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
          </label>
          {status && <p className="status">{status}</p>}
          <button>Login</button>
        </form>
      </section>
    );
  }

  const analytics = dashboard?.analytics;
  const results = dashboard?.results || [];
  const cloLabel = (id) => clos.find((clo) => clo.id === id)?.title || id;

  return (
    <section className="dashboard">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Instructor Analytics</p>
          <h2>Teacher Dashboard</h2>
        </div>
        <div className="button-row">
          <button onClick={loadDashboard}>Refresh</button>
          <button type="button" onClick={() => exportResults("csv")}>Export CSV</button>
          <button type="button" onClick={() => exportResults("excel")}>Export Excel</button>
        </div>
      </div>

      {platformMode === "static" && (
        <p className="status">
          Static mode is active. Results and dashboard data are saved only on this device and browser.
        </p>
      )}

      {analytics && (
        <>
          <div className="metric-grid">
            <article><span>Completed students</span><strong>{analytics.completedStudents}</strong></article>
            <article><span>Total submissions</span><strong>{analytics.submissions}</strong></article>
            <article><span>Average score</span><strong>{analytics.averageScore}%</strong></article>
          </div>

          <div className="dashboard-grid">
            <section className="content-section">
              <h3>Average Score per Chapter</h3>
              {Object.values(analytics.chapterScores).map((item) => (
                <Bar key={item.title} label={`${item.title} (${item.attempts})`} value={item.average} />
              ))}
            </section>
            <section className="content-section">
              <h3>Average Score per CLO</h3>
              {Object.entries(analytics.cloScores).map(([id, value]) => (
                <Bar key={id} label={`${id}: ${cloLabel(id)}`} value={value.percent} />
              ))}
            </section>
          </div>

          <div className="dashboard-grid">
            <section className="content-section">
              <h3>Most Difficult Questions</h3>
              <ul className="analysis-list">
                {analytics.difficultQuestions.map((item) => (
                  <li key={item.questionId}>Chapter {item.chapter}: {item.question} ({item.wrong} wrong)</li>
                ))}
                {!analytics.difficultQuestions.length && <li>No wrong answers recorded yet.</li>}
              </ul>
            </section>
            <section className="content-section">
              <h3>Common Wrong Answers</h3>
              <ul className="analysis-list">
                {analytics.commonWrongAnswers.map((item) => (
                  <li key={`${item.question}-${item.selected}`}>{item.selected} ({item.count} times)</li>
                ))}
                {!analytics.commonWrongAnswers.length && <li>No common wrong answer yet.</li>}
              </ul>
            </section>
          </div>

          <section className="content-section">
            <h3>Class-Level Learning Gaps</h3>
            <p>{analytics.classLearningGaps.join(", ") || "No class-level gaps detected yet."}</p>
            <p><strong>Weakest CLOs:</strong> {analytics.weakestClos.map((item) => `${item.id} ${item.percent}%`).join(", ") || "None"}</p>
            <p><strong>Strongest CLOs:</strong> {analytics.strongestClos.map((item) => `${item.id} ${item.percent}%`).join(", ") || "None"}</p>
          </section>
        </>
      )}

      <section className="content-section">
        <h3>Student-by-Student Performance</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Section</th>
                <th>Chapter</th>
                <th>Score</th>
                <th>Weakness Areas</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.studentName}</td>
                  <td>{result.studentId}</td>
                  <td>{result.sectionGroup}</td>
                  <td>Chapter {result.chapter}</td>
                  <td>{result.score}/{result.total}</td>
                  <td>{result.weaknesses.join(", ") || "None"}</td>
                  <td>{new Date(result.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
              {!results.length && (
                <tr><td colSpan="7" className="empty-cell">No submissions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function Chatbot({ chapter }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello. I am your virtual chemistry teacher for this course. I can explain concepts from the current chapter, summarize reactions, and guide you during study. During quizzes I give hints, not direct answers." },
  ]);
  const [message, setMessage] = useState("");

  async function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    const studentText = message.trim();
    setMessages((current) => [...current, { role: "student", text: studentText }]);
    setMessage("");

    const data = await sendChatMessage(`${studentText} chapter ${chapter?.number || ""}`);
    setMessages((current) => [...current, { role: "bot", text: data.reply }]);
  }

  return (
    <aside className="chatbot">
      <div>
        <p className="eyebrow">Chapter Chatbot</p>
        <h3>Virtual Chemistry Teacher</h3>
      </div>
      <div className="chat-log">
        {messages.map((item, index) => (
          <p className={item.role} key={`${item.role}-${index}`}>{item.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask me to explain a concept, reaction, or chapter idea" />
        <button>Send</button>
      </form>
    </aside>
  );
}

function App() {
  const [course, setCourse] = useState({ chapters: [], clos: [] });
  const [view, setView] = useState("course");
  const [chapterNumber, setChapterNumber] = useState(1);
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");
  const [platformMode, setPlatformMode] = useState("server");

  useEffect(() => {
    loadCourse()
      .then((data) => {
        setCourse(data);
        setPlatformMode(getPlatformMode());
      })
      .catch((error) => setStatus(error.message || "Could not load course content."));
  }, []);

  useEffect(() => {
    if (platformMode === "static") {
      setStatus("Static mode is active. Results and dashboard data are saved only on this device and browser.");
      return;
    }
    setStatus("");
  }, [platformMode]);

  const chapter = useMemo(
    () => course.chapters.find((item) => item.number === chapterNumber) || course.chapters[0],
    [course.chapters, chapterNumber],
  );

  async function startQuiz() {
    setResult(null);
    setQuiz(await loadQuiz(chapter.number));
    setPlatformMode(getPlatformMode());
    setView("quiz");
  }

  function selectChapter(number) {
    setChapterNumber(number);
    setQuiz(null);
    setResult(null);
    setView("course");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <h1>Interactive Chemistry Course Platform</h1>
        </div>
        <nav className="view-toggle" aria-label="Main navigation">
          <button className={view === "course" ? "active" : ""} onClick={() => setView("course")}>Chapters</button>
          <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}>Teacher Dashboard</button>
        </nav>
      </header>

      {status && <p className="status">{status}</p>}

      <div className="platform-grid">
        <aside className="chapter-nav">
          <h3>Curriculum Chapters</h3>
          {course.chapters.map((item) => (
            <button
              className={item.number === chapter?.number ? "selected" : ""}
              key={item.id}
              onClick={() => selectChapter(item.number)}
            >
              <span>Chapter {item.number}</span>
              {item.shortTitle}
            </button>
          ))}
        </aside>

        <div className="main-panel">
          {view === "course" && chapter && <ChapterContent chapter={chapter} onStartQuiz={startQuiz} />}
          {view === "quiz" && chapter && quiz && (
            <>
              <QuizPanel
                chapter={chapter}
                quiz={quiz}
                onSubmitted={setResult}
                onModeChange={setPlatformMode}
              />
              {result && <FeedbackPanel result={result} clos={course.clos} />}
            </>
          )}
          {view === "dashboard" && (
            <TeacherDashboard
              clos={course.clos}
              platformMode={platformMode}
              onModeChange={setPlatformMode}
            />
          )}
        </div>

        <Chatbot chapter={chapter} />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
