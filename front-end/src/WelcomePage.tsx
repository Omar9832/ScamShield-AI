
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_LENGTH = 1000;

const EXAMPLE_SMS =
  "T-Mobile Alert: Your account has been suspended due to unpaid charges. Verify your identity within 24 hours to avoid permanent loss of service: http://tmobile-secure-verify.co/login";

function ShieldLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2.5 20 5.5v6c0 5.2-3.4 8.8-8 10-4.6-1.2-8-4.8-8-10v-6l8-3Z"
        fill="currentColor"
      />
      <path
        d="m8.5 12.2 2.5 2.5 4.5-5"
        stroke="#100E1D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M4 12h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WelcomePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const trimmed = message.trim();
  const canAnalyze = trimmed.length > 0;

  const handleAnalyze = () => {
    if (!canAnalyze) return;

    navigate("/dashboard", {
      state: { message: trimmed },
    });
  };

  return (
    <div
      className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#080914] text-white selection:bg-fuchsia-500/30"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-700/[0.12] blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/[0.12] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080914]/60" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.08] px-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-[#E20074] shadow-lg shadow-fuchsia-900/40">
            <ShieldLogo className="h-7 w-7 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight">
              SCAMSHIELD<span className="text-fuchsia-400">.AI</span>
            </h1>

            <p className="text-[9px] font-semibold tracking-[0.28em] text-slate-500">
              INTELLIGENCE SYSTEM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-7">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]" />

            <span className="text-[11px] font-semibold tracking-wider text-slate-400">
              SYSTEM ONLINE
            </span>
          </div>

          <div className="h-7 w-px bg-white/10" />

          <span className="rounded-md border border-fuchsia-400/20 bg-fuchsia-400/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-wider text-fuchsia-300">
            T-MOBILE
          </span>
        </div>
      </header>

      {/* Main screen */}
      <main className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-5 overflow-hidden px-5 py-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-14 lg:py-7">

        {/* Left section */}
        <section className="flex min-h-0 flex-col justify-center">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-fuchsia-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-fuchsia-300">
              Next-generation protection
            </span>
          </div>

          <h2
            className="max-w-xl text-4xl font-black leading-[1.04] tracking-[-0.045em] sm:text-5xl xl:text-[64px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            THE FUTURE OF
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SCAM DETECTION.
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            Suspicious message? Don't take the risk. Use AI-powered
            intelligence to expose malicious messages, identify threats,
            and protect your digital identity.
          </p>

          {/* Radar visual */}
          <div className="relative mt-7 flex min-h-[210px] items-center justify-center sm:mt-9 sm:min-h-[250px]">
            <div className="absolute h-[210px] w-[210px] rounded-full border border-fuchsia-400/20 sm:h-[245px] sm:w-[245px]" />

            <div className="absolute h-[165px] w-[165px] rounded-full border border-blue-400/20 sm:h-[195px] sm:w-[195px]" />

            <div className="absolute h-[115px] w-[115px] rounded-full border border-fuchsia-400/20 sm:h-[145px] sm:w-[145px]" />

            <div className="absolute h-px w-[210px] bg-fuchsia-400/20 sm:w-[245px]" />

            <div className="absolute h-[210px] w-px bg-fuchsia-400/20 sm:h-[245px]" />

            <div className="absolute h-[210px] w-[210px] animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_65%,rgba(226,0,116,0.20)_85%,rgba(226,0,116,0.02)_100%)] sm:h-[245px] sm:w-[245px]" />

            <div className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-2xl border border-fuchsia-400/40 bg-[#171326] shadow-[0_0_35px_rgba(226,0,116,0.25)]">
              <ShieldLogo className="h-12 w-12 text-fuchsia-400" />
            </div>

            <div className="absolute left-[18%] top-[25%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_#60A5FA]" />

            <div className="absolute right-[20%] top-[30%] h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_15px_#E20074]" />

            <div className="absolute bottom-[20%] left-[27%] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_#34D399]" />
          </div>

          {/* Statistics */}
          <div className="mt-3 flex items-center justify-center gap-6 sm:gap-10">
            {[
              ["AI", "INTELLIGENCE"],
              ["24/7", "PROTECTION"],
              ["SMS", "ANALYSIS"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-lg font-black text-white">{value}</p>

                <p className="mt-1 text-[9px] font-bold tracking-[0.17em] text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Right section */}
        <section className="flex min-h-0 items-center justify-center">
          <div className="relative w-full max-w-[620px]">
            <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-br from-fuchsia-500/30 via-blue-500/10 to-transparent opacity-70 blur-xl" />

            <div className="relative overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#111323]/95 shadow-[0_25px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

              {/* Terminal top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500">
                    THREAT_ANALYZER.EXE
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-bold tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  READY
                </div>
              </div>

              {/* Card heading */}
              <div className="px-5 pb-4 pt-6 sm:px-7 sm:pt-7">
                <div className="flex items-center gap-2">
                  <ScanIcon />

                  <span className="text-[10px] font-bold tracking-[0.22em] text-fuchsia-300">
                    INPUT TERMINAL / 001
                  </span>
                </div>

                <h3
                  className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Scan a message.
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
                  Insert an SMS message to begin threat detection.
                </p>
              </div>

              {/* Input */}
              <div className="px-5 sm:px-7">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="sms"
                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400"
                  >
                    Message payload
                  </label>

                  <button
                    type="button"
                    onClick={() => setMessage(EXAMPLE_SMS)}
                    className="text-[10px] font-bold text-fuchsia-400 transition hover:text-fuchsia-300"
                  >
                    [ LOAD SAMPLE ]
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    id="sms"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={MAX_LENGTH}
                    placeholder="// Paste suspicious SMS here..."
                    className="h-[22dvh] min-h-[125px] max-h-[235px] w-full resize-none rounded-xl border border-white/[0.12] bg-[#090B18] p-4 pb-9 font-mono text-xs leading-6 text-slate-200 outline-none transition-all placeholder:text-slate-600 hover:border-white/20 focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/10 sm:h-[26dvh] sm:p-5 sm:pb-10 sm:text-sm"
                  />

                  <div className="absolute bottom-3 right-4 text-[10px] font-medium text-slate-600">
                    {message.length} / {MAX_LENGTH}
                  </div>
                </div>
              </div>

              {/* Security notice */}
              <div className="mx-5 mt-4 flex items-center gap-3 rounded-lg border border-blue-400/10 bg-blue-400/[0.04] px-3 py-3 sm:mx-7">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path
                      d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M12 8v4m0 3h.01"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="text-[10px] leading-5 text-slate-400 sm:text-xs">
                  <span className="font-bold text-slate-300">
                    Security notice:
                  </span>{" "}
                  Remove personal information before submitting. Never open
                  suspicious links.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#E20074] to-[#A92AE5] px-4 py-3.5 text-xs font-extrabold tracking-wider text-white shadow-[0_5px_25px_rgba(226,0,116,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_35px_rgba(226,0,116,0.4)] focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:ring-offset-[#111323] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
                >
                  <ScanIcon />
                  INITIATE SCAN

                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMessage("")}
                  disabled={!message.length}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-xs font-bold tracking-wider text-slate-400 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  RESET
                </button>
              </div>

              {/* Terminal status */}
              <div className="flex items-center justify-between border-t border-white/[0.08] bg-black/20 px-5 py-3 sm:px-7">
                <span className="font-mono text-[9px] tracking-wider text-slate-600">
                  SCAMSHIELD // SECURE SESSION
                </span>

                <span className="font-mono text-[9px] tracking-wider text-fuchsia-400/70">
                  ENCRYPTED UI
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom status bar */}
      <footer className="relative z-10 flex h-9 shrink-0 items-center justify-between border-t border-white/[0.07] bg-[#080914] px-5 sm:px-10 lg:px-14">
        <span className="text-[9px] tracking-wider text-slate-600">
          © 2026 SCAMSHIELD AI
        </span>

        <span className="text-[9px] tracking-wider text-slate-600">
          THINK BEFORE YOU CLICK.
        </span>
      </footer>
    </div>
  );
}
