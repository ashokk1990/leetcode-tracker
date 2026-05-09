import { useRoute, Link } from "wouter";
import { milestones, confidenceConfig } from "@/data/roadmap";
import { categories } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowLeft,
  CheckCircle2,
  Building2,
  Sparkles,
  ChevronRight,
  Lock,
  BookOpen,
  ArrowRight,
} from "lucide-react";

function ConfidenceBadge({ level }: { level: keyof typeof confidenceConfig }) {
  const cfg = confidenceConfig[level];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: cfg.color }}
      />
      {cfg.label}
    </span>
  );
}

export default function MilestonePage() {
  const [, params] = useRoute("/milestone/:id");
  const id = params?.id ?? "";
  const milestone = milestones.find((m) => m.id === id);
  const { isCompleted, toggle } = useProgress();

  if (!milestone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/">
          <span className="text-[hsl(224,71%,60%)] cursor-pointer hover:underline text-sm">
            ← Roadmap
          </span>
        </Link>
      </div>
    );
  }

  const idx = milestones.findIndex((m) => m.id === id);
  const nextMilestone = milestones[idx + 1];
  const prevMilestone = milestones[idx - 1];

  const milestoneCategories = categories.filter((c) =>
    milestone.categoryIds.includes(c.id)
  );
  const allQs = milestoneCategories.flatMap((c) => c.questions);
  const done = allQs.filter((q) => isCompleted(q.id)).length;
  const pct = Math.round((done / allQs.length) * 100);
  const isComplete = pct === 100;

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,14%)] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/">
            <span className="flex items-center gap-1.5 text-[hsl(215,20%,50%)] hover:text-white transition-colors cursor-pointer text-sm">
              <ArrowLeft size={15} />
              Roadmap
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {prevMilestone && (
              <Link href={`/milestone/${prevMilestone.id}`}>
                <span className="text-[hsl(215,20%,40%)] hover:text-white text-xs cursor-pointer transition-colors">
                  ← Prev
                </span>
              </Link>
            )}
            {nextMilestone && (
              <Link href={`/milestone/${nextMilestone.id}`}>
                <span className="text-[hsl(215,20%,40%)] hover:text-white text-xs cursor-pointer transition-colors">
                  Next →
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Hero */}
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: milestone.color + "40",
            background: `linear-gradient(135deg, ${milestone.color}10 0%, transparent 60%)`,
          }}
        >
          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 border"
              style={{
                backgroundColor: milestone.color + "20",
                borderColor: milestone.color + "50",
              }}
            >
              <span className="text-[10px] font-mono" style={{ color: milestone.color }}>
                LVL
              </span>
              <span className="text-white font-bold text-xl leading-none">
                {milestone.level}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-xl font-bold mb-1">{milestone.title}</h1>
              <p className="text-[hsl(215,20%,55%)] text-sm">{milestone.subtitle}</p>
              <p
                className="text-xs mt-2 italic"
                style={{ color: milestone.color }}
              >
                "{milestone.tagline}"
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[hsl(215,20%,45%)]">
              <span>{done} of {allQs.length} questions done</span>
              <span className="font-mono" style={{ color: milestone.color }}>
                {pct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-[hsl(217,33%,14%)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: milestone.color }}
              />
            </div>
            {isComplete && (
              <div
                className="flex items-center gap-2 mt-2 text-xs font-semibold"
                style={{ color: milestone.color }}
              >
                <CheckCircle2 size={13} />
                Milestone complete — you've unlocked this level!
              </div>
            )}
          </div>
        </div>

        {/* Categories + questions */}
        {milestoneCategories.map((cat) => {
          const catDone = cat.questions.filter((q) => isCompleted(q.id)).length;
          const catPct = Math.round((catDone / cat.questions.length) * 100);
          return (
            <div
              key={cat.id}
              className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] overflow-hidden"
            >
              {/* Category header */}
              <div className="px-4 py-3 border-b border-[hsl(217,33%,14%)] flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-white font-semibold text-sm flex-1">
                  {cat.label}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: cat.color }}
                >
                  {catDone}/{cat.questions.length}
                </span>
                <div className="w-20 h-1 rounded-full bg-[hsl(217,33%,16%)] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${catPct}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
                <Link href={`/category/${cat.id}`}>
                  <ChevronRight
                    size={14}
                    className="text-[hsl(215,20%,35%)] hover:text-white transition-colors cursor-pointer"
                  />
                </Link>
              </div>

              {/* Questions */}
              {cat.questions.map((q) => {
                const completed = isCompleted(q.id);
                return (
                  <div
                    key={q.id}
                    className={`flex items-center gap-3 px-4 py-2.5 border-b border-[hsl(217,33%,12%)] last:border-0 transition-colors ${
                      completed ? "bg-[hsl(222,47%,8%)]" : "hover:bg-[hsl(222,47%,10%)]"
                    }`}
                  >
                    <button
                      onClick={() => toggle(q.id)}
                      className="flex-shrink-0 transition-transform active:scale-90"
                    >
                      {completed ? (
                        <CheckCircle2 size={16} style={{ color: cat.color }} />
                      ) : (
                        <div
                          className="w-4 h-4 rounded-full border-2 border-[hsl(217,33%,28%)] hover:border-[hsl(217,33%,45%)] transition-colors"
                        />
                      )}
                    </button>

                    <Link href={`/question/${q.id}`} className="flex-1 min-w-0">
                      <div className="cursor-pointer flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-medium truncate ${
                            completed
                              ? "text-[hsl(215,20%,40%)] line-through"
                              : "text-[hsl(213,31%,85%)]"
                          }`}
                        >
                          {q.title}
                        </span>
                        <span className="text-[10px] text-[hsl(215,20%,35%)] font-mono flex-shrink-0">
                          #{q.leetcodeId}
                        </span>
                      </div>
                      <p className="text-[10px] text-[hsl(215,20%,40%)] font-mono mt-0.5 truncate">
                        {q.pattern}
                      </p>
                    </Link>

                    <Link href={`/question/${q.id}`}>
                      <ChevronRight
                        size={12}
                        className="text-[hsl(215,20%,28%)] hover:text-[hsl(215,20%,55%)] transition-colors cursor-pointer flex-shrink-0"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Concepts mastered */}
        <div className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={15} style={{ color: milestone.color }} />
            <h3 className="text-white font-semibold text-sm">
              Concepts You'll Master
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {milestone.conceptsMastered.map((c) => (
              <span
                key={c}
                className="text-xs px-2.5 py-1 rounded-lg border"
                style={{
                  color: milestone.color,
                  borderColor: milestone.color + "35",
                  backgroundColor: milestone.color + "10",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Company signals */}
        <div className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={15} style={{ color: milestone.color }} />
            <h3 className="text-white font-semibold text-sm">
              Companies You Can Target
            </h3>
            <span className="text-[10px] text-[hsl(215,20%,40%)] ml-auto">
              after completing this milestone
            </span>
          </div>
          <div className="space-y-4">
            {milestone.companySignals.map((sig) => (
              <div key={sig.tier}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[hsl(215,20%,65%)] text-xs font-semibold">
                    {sig.tier}
                  </span>
                  <ConfidenceBadge level={sig.confidence} />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {sig.companies.map((co) => (
                    <span
                      key={co}
                      className="text-xs bg-[hsl(217,33%,14%)] text-[hsl(215,20%,70%)] px-2 py-0.5 rounded border border-[hsl(217,33%,18%)]"
                    >
                      {co}
                    </span>
                  ))}
                </div>
                <p className="text-[hsl(215,20%,45%)] text-xs leading-relaxed">
                  {sig.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocks next */}
        <div
          className="rounded-xl border p-5"
          style={{
            borderColor: milestone.color + "35",
            backgroundColor: milestone.color + "08",
          }}
        >
          <div className="flex items-start gap-2">
            <Sparkles size={15} style={{ color: milestone.color }} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold mb-1.5">
                What completing this unlocks
              </p>
              <p className="text-[hsl(215,20%,55%)] text-xs leading-relaxed">
                {milestone.unlocksNext}
              </p>
              {nextMilestone && (
                <Link href={`/milestone/${nextMilestone.id}`}>
                  <div
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: milestone.color }}
                  >
                    Next: {nextMilestone.title}
                    <ArrowRight size={12} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* If locked placeholder */}
        {pct === 0 && idx > 0 && (
          <div className="flex items-center gap-2 text-[hsl(215,20%,40%)] text-xs py-2">
            <Lock size={12} />
            Complete milestone {idx} first to unlock the recommended path to this level.
          </div>
        )}
      </main>
    </div>
  );
}
