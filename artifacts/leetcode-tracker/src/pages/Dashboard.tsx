import { Link } from "wouter";
import { categories, allQuestions } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Circle, ExternalLink, Code2, Flame, Trophy } from "lucide-react";

function RadialProgress({ pct, color }: { pct: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="72" height="72" className="rotate-[-90deg]">
      <circle cx="36" cy="36" r={r} stroke="hsl(217 33% 16%)" strokeWidth="5" fill="none" />
      <circle
        cx="36"
        cy="36"
        r={r}
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const { isCompleted, completedCount } = useProgress();
  const total = allQuestions.length;
  const pct = Math.round((completedCount / total) * 100);

  const streakCategories = categories.filter((c) =>
    c.questions.every((q) => isCompleted(q.id))
  );

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,14%)] px-6 py-4 flex items-center gap-3">
        <Code2 className="text-[hsl(224,71%,60%)]" size={22} />
        <h1 className="text-white font-semibold text-lg tracking-tight">LeetCode Mastery</h1>
        <span className="ml-auto text-xs text-[hsl(215,20%,45%)] font-mono">Python · Medium</span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Hero progress card */}
        <div className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            <RadialProgress pct={pct} color="hsl(224,71%,60%)" />
            <div className="absolute inset-0 flex items-center justify-center rotate-0">
              <span className="text-white font-bold text-sm">{pct}%</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[hsl(215,20%,55%)] text-sm mb-1">Overall Progress</p>
            <p className="text-white text-3xl font-bold">
              {completedCount}
              <span className="text-[hsl(215,20%,45%)] text-xl font-normal"> / {total}</span>
            </p>
            <p className="text-[hsl(215,20%,55%)] text-sm mt-1">questions completed</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-[hsl(217,33%,16%)] pl-6">
            <Flame size={20} className="text-orange-400" />
            <span className="text-white font-bold text-xl">{streakCategories.length}</span>
            <span className="text-[hsl(215,20%,55%)] text-xs">categories done</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-[hsl(217,33%,16%)] pl-6">
            <Trophy size={20} className="text-yellow-400" />
            <span className="text-white font-bold text-xl">{categories.length}</span>
            <span className="text-[hsl(215,20%,55%)] text-xs">total categories</span>
          </div>
        </div>

        {/* Category grid */}
        <div>
          <h2 className="text-[hsl(215,20%,55%)] text-xs uppercase tracking-widest font-semibold mb-4">
            Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const done = cat.questions.filter((q) => isCompleted(q.id)).length;
              const catPct = Math.round((done / cat.questions.length) * 100);
              const allDone = done === cat.questions.length;
              return (
                <Link key={cat.id} href={`/category/${cat.id}`}>
                  <div
                    className="group rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-4 cursor-pointer hover:border-[hsl(217,33%,24%)] transition-all duration-200 hover:translate-y-[-1px]"
                    style={{ borderLeftColor: cat.color, borderLeftWidth: 3 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-white font-semibold text-sm leading-tight group-hover:text-white/90">
                        {cat.label}
                      </span>
                      {allDone && (
                        <CheckCircle2 size={16} style={{ color: cat.color }} className="flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-[hsl(215,20%,50%)] text-xs mb-3 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono" style={{ color: cat.color }}>
                        {done}/{cat.questions.length}
                      </span>
                      <span className="text-[hsl(215,20%,45%)] text-xs">{catPct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[hsl(217,33%,16%)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${catPct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent / Quick access */}
        <div>
          <h2 className="text-[hsl(215,20%,55%)] text-xs uppercase tracking-widest font-semibold mb-4">
            Up Next
          </h2>
          <div className="space-y-1.5">
            {allQuestions
              .filter((q) => !isCompleted(q.id))
              .slice(0, 5)
              .map((q) => {
                const cat = categories.find((c) => c.id === q.category)!;
                return (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 rounded-lg border border-[hsl(217,33%,14%)] bg-[hsl(222,47%,9%)] px-4 py-3 hover:border-[hsl(217,33%,22%)] transition-colors"
                  >
                    <Circle size={16} className="text-[hsl(215,20%,35%)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-sm font-medium truncate block">{q.title}</span>
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: cat.color, backgroundColor: cat.accent }}
                    >
                      {cat.label}
                    </span>
                    <span className="text-[hsl(215,20%,40%)] text-xs font-mono flex-shrink-0">#{q.leetcodeId}</span>
                    <a
                      href={`https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[hsl(215,20%,40%)] hover:text-white transition-colors flex-shrink-0"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                );
              })}
            {allQuestions.filter((q) => !isCompleted(q.id)).length === 0 && (
              <div className="text-center py-8 text-[hsl(215,20%,45%)]">
                <Trophy className="mx-auto mb-2 text-yellow-400" size={28} />
                <p className="font-semibold text-white">All 75 questions completed!</p>
                <p className="text-sm mt-1">You&apos;ve mastered the list.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
