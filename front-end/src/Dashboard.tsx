import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Hard-coded sample result. Replace with the Python classifier's     */
/*  response later (same shape, so the UI won't need to change).       */
/* ------------------------------------------------------------------ */
type RiskLevel = "Low" | "Medium" | "High";

interface Segment {
  text: string;
  flagged?: boolean;
}

interface Finding {
  snippet: string;
  reason: string;
}

interface AnalysisResult {
  score: number; // 0-100
  classification: "Scam" | "Legitimate";
  riskLevel: RiskLevel;
  summary: string;
  segments: Segment[];
  findings: Finding[];
  actions: string[];
}

const SAMPLE_RESULT: AnalysisResult = {
  score: 92,
  classification: "Scam",
  riskLevel: "High",
  summary:
    "This message is very likely a scam. It claims to be from USPS and says a package could not be delivered, then pushes you to pay a small fee within 24 hours through a link. The link does not go to the official usps.com site, and the urgent tone, deadline and payment request are all common tactics used to steal card details. Do not click the link or reply. Check your delivery status directly on the carrier's official website or app, and report and delete the message.",
  segments: [
    { text: "URGENT:", flagged: true },
    { text: " Your USPS package could not be delivered. Confirm your address and pay a " },
    { text: "$1.99 fee", flagged: true },
    { text: " " },
    { text: "within 24 hours", flagged: true },
    { text: " at " },
    { text: "http://usps-redelivery.top/pay", flagged: true },
    { text: " or it will be returned." },
  ],
  findings: [
    {
      snippet: "URGENT:",
      reason: "Scammers create panic so you act before you think.",
    },
    {
      snippet: "$1.99 fee",
      reason:
        "A small payment request is a common trick to capture your card details.",
    },
    {
      snippet: "within 24 hours",
      reason: "A tight deadline pressures you into clicking right away.",
    },
    {
      snippet: "http://usps-redelivery.top/pay",
      reason:
        "The link is not an official usps.com address and uses an unusual .top domain.",
    },
  ],
  actions: [
    "Do not click the link or reply to the message.",
    "Check your delivery status directly on the official carrier website or app.",
    "Report the message by forwarding it to 7726 (SPAM) and delete it.",
    "If you already entered card details, contact your bank and freeze the card.",
  ],
};

/* ------------------------------------------------------------------ */
/*  Theme. Change these to match the welcome page.                     */
/* ------------------------------------------------------------------ */
const css = `
.dash {
  --bg: #0b1220;
  --panel: #131c2f;
  --panel-border: #22304d;
  --text: #e8edf7;
  --muted: #94a3bd;
  --accent: #4f8cff;
  --low: #34d399;
  --medium: #fbbf24;
  --high: #f87171;
  --flag-bg: rgba(248, 113, 113, 0.18);
  --flag-border: #f87171;

  min-height: 100vh;
  background: radial-gradient(1200px 600px at 50% -10%, #17264a 0%, var(--bg) 60%);
  color: var(--text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  display: flex;
  justify-content: center;
  padding: 48px 20px 64px;
  box-sizing: border-box;
}
.dash *, .dash *::before, .dash *::after { box-sizing: border-box; }

.dash-inner { width: 100%; max-width: 760px; display: flex; flex-direction: column; gap: 20px; }

.dash h1 { font-size: 1.75rem; margin: 0; letter-spacing: -0.01em; }
.dash h2 { font-size: 1.05rem; margin: 0 0 12px; }
.dash p { margin: 0; }
.dash-sub { color: var(--muted); margin-top: 6px; }

.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 16px;
  padding: 24px;
}

/* Score */
.score-panel { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
.ring-wrap { position: relative; width: 168px; height: 168px; flex: none; }
.ring-wrap svg { transform: rotate(-90deg); display: block; }
.ring-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.ring-number { font-size: 3rem; font-weight: 700; line-height: 1; }
.ring-label { color: var(--muted); font-size: 0.8rem; margin-top: 4px; }

.score-meta { display: flex; flex-direction: column; gap: 14px; flex: 1; min-width: 220px; }
.meta-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.meta-key { color: var(--muted); font-size: 0.9rem; }
.badge {
  padding: 6px 14px; border-radius: 999px; font-weight: 600; font-size: 0.9rem;
  border: 1px solid currentColor;
}

/* Summary */
.summary-text { line-height: 1.7; color: var(--text); }

/* Message */
.sms-box {
  background: #0d1526;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  padding: 16px;
  line-height: 1.7;
  word-break: break-word;
}
mark.flag {
  background: var(--flag-bg);
  color: #ffd5d5;
  border-bottom: 2px solid var(--flag-border);
  border-radius: 4px;
  padding: 1px 4px;
}

/* Findings */
.findings { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.finding { display: flex; flex-direction: column; gap: 4px; padding-left: 14px; border-left: 3px solid var(--flag-border); }
.finding-snippet { font-weight: 600; word-break: break-word; }
.finding-reason { color: var(--muted); font-size: 0.95rem; }

/* Actions */
.actions { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.actions li { display: flex; gap: 10px; align-items: flex-start; line-height: 1.5; }
.actions svg { flex: none; margin-top: 3px; }

/* Feedback */
.feedback-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.thumb {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--text);
  border: 1px solid var(--panel-border); border-radius: 10px;
  padding: 10px 16px; font: inherit; cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.thumb:hover { background: #1a2640; }
.thumb:focus-visible, .primary-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.thumb.selected-up { border-color: var(--low); background: rgba(52, 211, 153, 0.12); }
.thumb.selected-down { border-color: var(--high); background: rgba(248, 113, 113, 0.12); }
.thanks { color: var(--muted); margin-top: 12px; }

/* Button */
.primary-btn {
  width: 100%;
  background: var(--accent); color: #fff;
  border: none; border-radius: 12px;
  padding: 16px 24px; font: inherit; font-weight: 600; font-size: 1rem;
  cursor: pointer; transition: filter 0.15s;
}
.primary-btn:hover { filter: brightness(1.1); }

@media (max-width: 520px) {
  .score-panel { justify-content: center; }
  .dash h1 { font-size: 1.4rem; }
}
`;

const levelColor: Record<RiskLevel, string> = {
  Low: "var(--low)",
  Medium: "var(--medium)",
  High: "var(--high)",
};

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
function ScoreRing({ score, color }: { score: number; color: string }) {
  const size = 168;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div
      className="ring-wrap"
      role="img"
      aria-label={`Risk score ${score} out of 100`}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#22304d"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-center">
        <span className="ring-number" style={{ color }}>
          {score}
        </span>
        <span className="ring-label">out of 100</span>
      </div>
    </div>
  );
}

const ThumbUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 10v11" />
    <path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2 7A2 2 0 0 1 17.8 21H7V10l4.3-6.2a1.2 1.2 0 0 1 1.5-.4c.9.4 1.4 1.5 1.2 2.5Z" />
  </svg>
);

const ThumbDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 14V3" />
    <path d="M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2-7A2 2 0 0 1 6.2 3H17v11l-4.3 6.2a1.2 1.2 0 0 1-1.5.4c-.9-.4-1.4-1.5-1.2-2.5Z" />
  </svg>
);

const Check = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */
interface DashboardProps {
  /** Called when the user clicks "Analyze another sms message".
   *  Wire this to your router, e.g. () => navigate("/") */
  onAnalyzeAnother?: () => void;
  /** Optional: pass real results later. Falls back to the hard-coded sample. */
  result?: AnalysisResult;
}

export default function Dashboard({
  onAnalyzeAnother,
  result = SAMPLE_RESULT,
}: DashboardProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const color = levelColor[result.riskLevel];

  const handleReset = () => {
    if (onAnalyzeAnother) onAnalyzeAnother();
    else window.location.href = "/"; // fallback: go to the welcome page
  };

  return (
    <div className="dash">
      <style>{css}</style>

      <div className="dash-inner">
        <header>
          <h1>Analysis results</h1>
          <p className="dash-sub">Here is what we found in your message.</p>
        </header>

        {/* Score, classification, risk level */}
        <section className="panel score-panel" aria-label="Risk summary">
          <ScoreRing score={result.score} color={color} />
          <div className="score-meta">
            <div className="meta-row">
              <span className="meta-key">Classification</span>
              <span className="badge" style={{ color }}>
                {result.classification}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Risk level</span>
              <span className="badge" style={{ color }}>
                {result.riskLevel}
              </span>
            </div>
          </div>
        </section>

        {/* Full analysis summary */}
        <section className="panel" aria-label="Summary">
          <h2>Summary</h2>
          <p className="summary-text">{result.summary}</p>
        </section>

        {/* Message with highlights */}
        <section className="panel" aria-label="Message">
          <h2>Your message</h2>
          <div className="sms-box">
            {result.segments.map((seg, i) =>
              seg.flagged ? (
                <mark key={i} className="flag">
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </div>
        </section>

        {/* Explanation */}
        <section className="panel" aria-label="Suspicious parts">
          <h2>Why this looks suspicious</h2>
          <ul className="findings">
            {result.findings.map((f, i) => (
              <li key={i} className="finding">
                <span className="finding-snippet">{f.snippet}</span>
                <span className="finding-reason">{f.reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommended actions */}
        <section className="panel" aria-label="Recommended actions">
          <h2>Recommended actions</h2>
          <ul className="actions">
            {result.actions.map((a, i) => (
              <li key={i}>
                <Check color={color} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Feedback */}
        <section className="panel" aria-label="Feedback">
          <h2>Was this result helpful?</h2>
          <div className="feedback-row">
            <button
              type="button"
              className={`thumb ${feedback === "up" ? "selected-up" : ""}`}
              onClick={() => setFeedback("up")}
              aria-pressed={feedback === "up"}
            >
              <ThumbUp /> Satisfied
            </button>
            <button
              type="button"
              className={`thumb ${feedback === "down" ? "selected-down" : ""}`}
              onClick={() => setFeedback("down")}
              aria-pressed={feedback === "down"}
            >
              <ThumbDown /> Not satisfied
            </button>
          </div>
          {feedback && (
            <p className="thanks" role="status">
              {feedback === "up"
                ? "Thanks, glad this helped."
                : "Thanks for letting us know. We will use this to improve."}
            </p>
          )}
        </section>

        <button type="button" className="primary-btn" onClick={handleReset}>
          Analyze another sms message
        </button>
      </div>
    </div>
  );
}