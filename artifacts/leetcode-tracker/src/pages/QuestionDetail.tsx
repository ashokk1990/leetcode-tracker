import { useRoute, Link } from "wouter";
import { allQuestions, categories } from "@/data/questions";
import { questionDetails } from "@/data/questionDetails";
import { useProgress } from "@/hooks/useProgress";
import { AlgorithmViz } from "@/components/AlgorithmViz";
import { getVizType } from "@/data/vizMap";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Database,
  Lightbulb,
  GitBranch,
  Zap,
  BookOpen,
  Layers,
} from "lucide-react";

function getLeetCodeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Section({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] p-5">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color }}>{icon}</span>
        <h3 className="text-white font-semibold text-sm tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Tag({ text, color, bg }: { text: string; color: string; bg: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color, backgroundColor: bg }}
    >
      {text}
    </span>
  );
}

export default function QuestionDetail() {
  const [, params] = useRoute("/question/:id");
  const id = Number(params?.id ?? 0);
  const question = allQuestions.find((q) => q.id === id);
  const detail = questionDetails[id];
  const { toggle, isCompleted } = useProgress();

  if (!question || !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold mb-2">Question not found</p>
          <Link href="/">
            <span className="text-[hsl(224,71%,60%)] hover:underline cursor-pointer text-sm">← Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const cat = categories.find((c) => c.id === question.category)!;
  const completed = isCompleted(question.id);

  // Prev / next within category
  const catQuestions = cat.questions;
  const idx = catQuestions.findIndex((q) => q.id === id);
  const prev = catQuestions[idx - 1];
  const next = catQuestions[idx + 1];

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,14%)] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href={`/category/${cat.id}`}>
            <span className="flex items-center gap-1.5 text-[hsl(215,20%,50%)] hover:text-white transition-colors cursor-pointer text-sm">
              <ArrowLeft size={15} />
              {cat.label}
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {prev && (
              <Link href={`/question/${prev.id}`}>
                <span className="text-[hsl(215,20%,45%)] hover:text-white text-xs cursor-pointer transition-colors">← Prev</span>
              </Link>
            )}
            {next && (
              <Link href={`/question/${next.id}`}>
                <span className="text-[hsl(215,20%,45%)] hover:text-white text-xs cursor-pointer transition-colors">Next →</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-5">
        {/* Question header card */}
        <div
          className="rounded-xl border bg-[hsl(222,47%,9%)] p-6"
          style={{ borderColor: `${cat.color}35` }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ color: cat.color, backgroundColor: cat.accent }}
                >
                  {cat.label}
                </span>
                <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                  Medium
                </span>
                <span className="text-xs font-mono text-[hsl(215,20%,45%)]">
                  #{question.leetcodeId}
                </span>
              </div>
              <h1 className="text-white text-xl font-bold leading-tight">
                {question.title}
              </h1>
            </div>
            <button
              onClick={() => toggle(question.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1 transition-all active:scale-95"
              aria-label={completed ? "Mark incomplete" : "Mark complete"}
            >
              {completed ? (
                <CheckCircle2 size={28} style={{ color: cat.color }} />
              ) : (
                <Circle size={28} className="text-[hsl(217,33%,30%)] hover:text-[hsl(217,33%,50%)] transition-colors" />
              )}
              <span className="text-[10px] text-[hsl(215,20%,45%)]">
                {completed ? "Done" : "Mark done"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Zap size={12} style={{ color: cat.color }} />
              <span className="text-xs text-[hsl(215,20%,55%)] font-mono">{question.pattern}</span>
            </div>
            <a
              href={`https://leetcode.com/problems/${getLeetCodeSlug(question.title)}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[hsl(215,20%,50%)] hover:text-[hsl(224,71%,65%)] transition-colors ml-auto"
            >
              <ExternalLink size={12} />
              Open on LeetCode
            </a>
          </div>
        </div>

        {/* Concepts */}
        <Section icon={<Layers size={16} />} title="Concepts Involved" color={cat.color}>
          <div className="flex flex-wrap gap-2 mb-4">
            {detail.concepts.map((c) => (
              <Tag key={c} text={c} color={cat.color} bg={cat.accent} />
            ))}
          </div>
        </Section>

        {/* Layman explanation */}
        <Section icon={<Lightbulb size={16} />} title="What's Actually Happening (Plain English)" color="#f59e0b">
          <p className="text-[hsl(213,31%,80%)] text-sm leading-relaxed">
            {detail.conceptExplanation}
          </p>
        </Section>

        {/* Approach */}
        <Section icon={<BookOpen size={16} />} title="Approach — Step by Step" color="#22c55e">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            <div className="text-[hsl(213,31%,80%)] text-sm leading-relaxed whitespace-pre-line font-mono bg-[hsl(222,47%,7%)] rounded-lg p-4 border border-[hsl(217,33%,16%)] flex-1 min-w-0">
              {detail.approach}
            </div>
            <div className="sm:w-[280px] w-full flex-shrink-0">
              <AlgorithmViz type={getVizType(question)} />
            </div>
          </div>
        </Section>

        {/* Complexity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Section icon={<Clock size={16} />} title="Time Complexity" color="#06b6d4">
            <p className="text-[hsl(213,31%,80%)] text-sm font-mono bg-[hsl(222,47%,7%)] rounded-lg p-3 border border-[hsl(217,33%,16%)]">
              {detail.timeComplexity}
            </p>
          </Section>
          <Section icon={<Database size={16} />} title="Space Complexity" color="#a78bfa">
            <p className="text-[hsl(213,31%,80%)] text-sm font-mono bg-[hsl(222,47%,7%)] rounded-lg p-3 border border-[hsl(217,33%,16%)]">
              {detail.spaceComplexity}
            </p>
          </Section>
        </div>

        {/* Related patterns */}
        <Section icon={<GitBranch size={16} />} title="Related Patterns & Variations" color="#ec4899">
          <ul className="space-y-2">
            {detail.relatedPatterns.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[hsl(215,20%,40%)] mt-0.5 flex-shrink-0">▸</span>
                <span className="text-[hsl(213,31%,75%)] text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Bottom nav */}
        <div className="flex justify-between items-center pt-2 pb-6">
          {prev ? (
            <Link href={`/question/${prev.id}`}>
              <div className="cursor-pointer group flex items-center gap-2 rounded-lg border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] px-4 py-3 hover:border-[hsl(217,33%,24%)] transition-colors">
                <ArrowLeft size={14} className="text-[hsl(215,20%,45%)]" />
                <div>
                  <div className="text-[10px] text-[hsl(215,20%,40%)] uppercase tracking-wider">Previous</div>
                  <div className="text-white text-xs font-medium group-hover:text-white/90 truncate max-w-[140px]">{prev.title}</div>
                </div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/question/${next.id}`}>
              <div className="cursor-pointer group flex items-center gap-2 rounded-lg border border-[hsl(217,33%,16%)] bg-[hsl(222,47%,9%)] px-4 py-3 hover:border-[hsl(217,33%,24%)] transition-colors">
                <div className="text-right">
                  <div className="text-[10px] text-[hsl(215,20%,40%)] uppercase tracking-wider">Next</div>
                  <div className="text-white text-xs font-medium group-hover:text-white/90 truncate max-w-[140px]">{next.title}</div>
                </div>
                <ArrowLeft size={14} className="text-[hsl(215,20%,45%)] rotate-180" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
