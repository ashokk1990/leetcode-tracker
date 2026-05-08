import { useRoute, Link } from "wouter";
import { getCategoryById } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  ArrowLeft,
  Zap,
  ChevronRight,
} from "lucide-react";

function getLeetCodeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoryPage() {
  const [, params] = useRoute("/category/:id");
  const id = params?.id ?? "";
  const cat = getCategoryById(id);
  const { toggle, isCompleted } = useProgress();

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(215,20%,55%)]">
        <div className="text-center">
          <p className="text-lg font-semibold text-white mb-2">Category not found</p>
          <Link href="/">
            <span className="text-[hsl(224,71%,60%)] hover:underline cursor-pointer">← Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const done = cat.questions.filter((q) => isCompleted(q.id)).length;
  const pct = Math.round((done / cat.questions.length) * 100);

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      <header className="border-b border-[hsl(217,33%,14%)] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/">
            <span className="flex items-center gap-1.5 text-[hsl(215,20%,50%)] hover:text-white transition-colors cursor-pointer text-sm">
              <ArrowLeft size={15} />
              Dashboard
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Category hero */}
        <div
          className="rounded-xl border bg-[hsl(222,47%,9%)] p-6"
          style={{ borderColor: `${cat.color}40` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div
                className="text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: cat.color }}
              >
                Category
              </div>
              <h1 className="text-white text-2xl font-bold">{cat.label}</h1>
              <p className="text-[hsl(215,20%,50%)] text-sm mt-1">{cat.description}</p>
            </div>
            <div
              className="text-right flex-shrink-0 ml-4 px-4 py-3 rounded-lg"
              style={{ backgroundColor: cat.accent }}
            >
              <div className="text-2xl font-bold" style={{ color: cat.color }}>
                {done}/{cat.questions.length}
              </div>
              <div className="text-xs text-[hsl(215,20%,55%)]">completed</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[hsl(215,20%,45%)]">
              <span>{pct}% complete</span>
              <span>{cat.questions.length - done} remaining</span>
            </div>
            <div className="h-1.5 rounded-full bg-[hsl(217,33%,16%)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: cat.color }}
              />
            </div>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-2">
          <h2 className="text-[hsl(215,20%,55%)] text-xs uppercase tracking-widest font-semibold mb-3">
            Questions — {cat.questions.length} total
          </h2>
          {cat.questions.map((q, idx) => {
            const completed = isCompleted(q.id);
            return (
              <div
                key={q.id}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-150 ${
                  completed
                    ? "border-[hsl(217,33%,16%)] bg-[hsl(222,47%,8%)]"
                    : "border-[hsl(217,33%,14%)] bg-[hsl(222,47%,9%)] hover:border-[hsl(217,33%,22%)]"
                }`}
              >
                {/* Number */}
                <span className="text-[hsl(215,20%,35%)] text-xs font-mono w-5 flex-shrink-0 text-right">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Check button */}
                <button
                  className="flex-shrink-0 transition-transform duration-150 active:scale-90"
                  onClick={() => toggle(q.id)}
                  aria-label={completed ? "Mark incomplete" : "Mark complete"}
                >
                  {completed ? (
                    <CheckCircle2 size={20} style={{ color: cat.color }} />
                  ) : (
                    <Circle size={20} className="text-[hsl(217,33%,28%)] group-hover:text-[hsl(217,33%,40%)] transition-colors" />
                  )}
                </button>

                {/* Title — clicking navigates to detail */}
                <Link href={`/question/${q.id}`} className="flex-1 min-w-0">
                  <div className="cursor-pointer">
                    <span
                      className={`text-sm font-medium transition-colors block truncate ${
                        completed
                          ? "text-[hsl(215,20%,45%)] line-through decoration-[hsl(215,20%,35%)]"
                          : "text-white group-hover:text-white/90"
                      }`}
                    >
                      {q.title}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Zap size={10} style={{ color: cat.color }} />
                      <span className="text-xs text-[hsl(215,20%,45%)] font-mono truncate">{q.pattern}</span>
                    </div>
                  </div>
                </Link>

                {/* LeetCode # */}
                <span className="text-[hsl(215,20%,38%)] text-xs font-mono flex-shrink-0">
                  #{q.leetcodeId}
                </span>

                {/* External LeetCode link */}
                <a
                  href={`https://leetcode.com/problems/${getLeetCodeSlug(q.title)}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(215,20%,35%)] hover:text-[hsl(224,71%,65%)] transition-colors flex-shrink-0"
                  title="Open on LeetCode"
                >
                  <ExternalLink size={13} />
                </a>

                {/* Detail chevron */}
                <Link href={`/question/${q.id}`}>
                  <ChevronRight
                    size={15}
                    className="text-[hsl(215,20%,30%)] group-hover:text-[hsl(215,20%,55%)] transition-colors flex-shrink-0 cursor-pointer"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* All done message */}
        {done === cat.questions.length && (
          <div
            className="rounded-xl border p-5 text-center"
            style={{ borderColor: `${cat.color}40`, backgroundColor: cat.accent }}
          >
            <CheckCircle2 className="mx-auto mb-2" size={24} style={{ color: cat.color }} />
            <p className="text-white font-semibold">Category complete!</p>
            <p className="text-[hsl(215,20%,55%)] text-sm mt-1">
              You&apos;ve mastered all {cat.questions.length} {cat.label} patterns.
            </p>
            <Link href="/">
              <span
                className="inline-block mt-3 text-sm font-medium cursor-pointer hover:underline"
                style={{ color: cat.color }}
              >
                ← Back to Dashboard
              </span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
