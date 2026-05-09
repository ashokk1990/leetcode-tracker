import { Link } from "wouter";
import { milestones, confidenceConfig } from "@/data/roadmap";
import { categories } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import {
  Code2,
  CheckCircle2,
  Lock,
  ChevronRight,
  Building2,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";

function RadialProgress({
  pct,
  color,
  size = 56,
}: {
  pct: number;
  color: string;
  size?: number;
}) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg] flex-shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="hsl(217 33% 16%)"
        strokeWidth="4"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.7s ease" }}
      />
    </svg>
  );
}

export default function RoadmapPage() {
  const { isCompleted, completedCount } = useProgress();

  const totalQuestions = milestones.reduce((s, m) => s + m.questionCount, 0);
  const overallPct = Math.round((completedCount / totalQuestions) * 100);

  function getMilestoneProgress(m: (typeof milestones)[0]) {
    const catIds = m.categoryIds;
    const qs = categories
      .filter((c) => catIds.includes(c.id))
      .flatMap((c) => c.questions);
    const done = qs.filter((q) => isCompleted(q.id)).length;
    return { done, total: qs.length, pct: Math.round((done / qs.length) * 100) };
  }

  function getMilestoneState(
    m: (typeof milestones)[0],
    idx: number
  ): "locked" | "active" | "completed" {
    const { pct } = getMilestoneProgress(m);
    if (pct === 100) return "completed";
    if (idx === 0) return "active";
    const prev = milestones[idx - 1];
    const prevProg = getMilestoneProgress(prev);
    return prevProg.done > 0 ? "active" : "locked";
  }

  // Find the current company tier the user has unlocked
  const highestCompletedMilestone = [...milestones]
    .reverse()
    .find((m) => getMilestoneProgress(m).pct === 100);

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,14%)] px-6 py-4 flex items-center gap-3">
        <Code2 className="text-[hsl(224,71%,60%)]" size={20} />
        <span className="text-white font-semibold text-base tracking-tight">
          LeetCode Mastery
        </span>
        <span className="ml-auto text-xs text-[hsl(215,20%,40%)] font-mono">
          Python · Medium · 75 questions
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Overall progress hero */}
        <div className="rounded-2xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] px-6 py-5 flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <RadialProgress pct={overallPct} color="hsl(224,71%,60%)" size={64} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{overallPct}%</span>
            </div>
          </div>
          <div>
            <p className="text-[hsl(215,20%,50%)] text-xs mb-0.5">Overall Progress</p>
            <p className="text-white text-2xl font-bold leading-none">
              {completedCount}
              <span className="text-[hsl(215,20%,45%)] text-base font-normal">
                {" "}
                / {totalQuestions}
              </span>
            </p>
            <p className="text-[hsl(215,20%,50%)] text-xs mt-1">questions completed across 5 milestones</p>
          </div>
          {highestCompletedMilestone && (
            <div className="ml-auto flex flex-col items-end gap-1">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-white text-xs font-semibold text-right">
                {highestCompletedMilestone.title}
              </span>
              <span className="text-[hsl(215,20%,45%)] text-[10px]">milestone cleared</span>
            </div>
          )}
        </div>

        {/* Roadmap */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={13} className="text-[hsl(215,20%,45%)]" />
            <span className="text-[hsl(215,20%,45%)] text-xs uppercase tracking-widest font-semibold">
              Learning Roadmap
            </span>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-[hsl(217,33%,16%)] z-0" />

            <div className="space-y-4">
              {milestones.map((m, idx) => {
                const prog = getMilestoneProgress(m);
                const state = getMilestoneState(m, idx);
                const isLocked = state === "locked";
                const isDone = state === "completed";

                return (
                  <Link key={m.id} href={`/milestone/${m.id}`}>
                    <div
                      className={`relative flex gap-4 cursor-pointer group transition-all duration-200 ${
                        isLocked ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {/* Level badge */}
                      <div
                        className="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center z-10 border transition-all duration-200 group-hover:scale-105"
                        style={{
                          backgroundColor: isDone
                            ? m.color + "25"
                            : isLocked
                            ? "hsl(217 33% 12%)"
                            : "hsl(222 47% 11%)",
                          borderColor: isDone
                            ? m.color + "60"
                            : isLocked
                            ? "hsl(217 33% 16%)"
                            : m.color + "35",
                        }}
                      >
                        {isDone ? (
                          <CheckCircle2 size={22} style={{ color: m.color }} />
                        ) : isLocked ? (
                          <Lock size={18} className="text-[hsl(215,20%,30%)]" />
                        ) : (
                          <>
                            <span
                              className="text-[10px] font-mono leading-none mb-0.5"
                              style={{ color: m.color }}
                            >
                              LVL
                            </span>
                            <span className="text-white font-bold text-lg leading-none">
                              {m.level}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Main card */}
                      <div
                        className={`flex-1 min-w-0 rounded-xl border p-4 transition-all duration-200 ${
                          isDone
                            ? "border-[hsl(217,33%,16%)] bg-[hsl(222,47%,8%)]"
                            : isLocked
                            ? "border-[hsl(217,33%,13%)] bg-[hsl(222,47%,8%)]"
                            : "border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] group-hover:border-[hsl(217,33%,24%)]"
                        }`}
                        style={
                          !isLocked && !isDone
                            ? { borderLeftColor: m.color, borderLeftWidth: 2 }
                            : {}
                        }
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-white font-bold text-sm">
                                {m.title}
                              </span>
                              {isDone && (
                                <span
                                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                                  style={{
                                    color: m.color,
                                    backgroundColor: m.color + "20",
                                  }}
                                >
                                  COMPLETE
                                </span>
                              )}
                            </div>
                            <p className="text-[hsl(215,20%,50%)] text-xs leading-relaxed">
                              {m.subtitle}
                            </p>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="text-right">
                              <span
                                className="text-xs font-mono font-bold"
                                style={{ color: m.color }}
                              >
                                {prog.done}/{prog.total}
                              </span>
                            </div>
                            <ChevronRight
                              size={14}
                              className="text-[hsl(215,20%,35%)] group-hover:text-[hsl(215,20%,60%)] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1 rounded-full bg-[hsl(217,33%,14%)] overflow-hidden mb-3">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${prog.pct}%`,
                              backgroundColor: m.color,
                            }}
                          />
                        </div>

                        {/* Company preview chips */}
                        {!isLocked && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Building2
                              size={11}
                              className="text-[hsl(215,20%,40%)] flex-shrink-0"
                            />
                            {m.companySignals
                              .slice(0, 2)
                              .flatMap((cs) => cs.companies.slice(0, 2))
                              .map((co) => (
                                <span
                                  key={co}
                                  className="text-[10px] text-[hsl(215,20%,50%)] bg-[hsl(217,33%,14%)] px-1.5 py-0.5 rounded"
                                >
                                  {co}
                                </span>
                              ))}
                            <span className="text-[10px] text-[hsl(215,20%,38%)]">
                              +more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* What's next hint */}
        <div className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-4 flex items-start gap-3">
          <Sparkles size={16} className="text-[hsl(224,71%,60%)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-white text-xs font-semibold mb-1">After completing all 5 milestones</p>
            <p className="text-[hsl(215,20%,50%)] text-xs leading-relaxed">
              Dynamic Programming is your natural next step — every DP problem
              is built on the recursive thinking you master in milestones 3–5.
              System Design becomes your focus for senior-level targeting.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
