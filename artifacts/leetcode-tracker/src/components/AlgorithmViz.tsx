import { useState, useEffect } from "react";

export type VizType =
  | "two-pointers" | "sliding-window" | "hash-map" | "prefix-sum"
  | "stack" | "monotonic-stack" | "binary-search" | "linked-list"
  | "fast-slow-pointers" | "bfs-tree" | "dfs-tree" | "bfs-graph"
  | "union-find" | "topological-sort" | "min-heap" | "greedy-intervals"
  | "backtracking" | "dp-1d" | "dp-2d" | "state-machine";

function useStep(n: number, ms = 700) {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((p) => (p + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return s;
}

const C = {
  bg: "#0a1628", cell: "#1a2744", border: "#2a3f66",
  dim: "#3a5070", lit: "#e2e8f0", blue: "#6366f1",
  cyan: "#0ea5e9", green: "#22c55e", amber: "#f59e0b",
  red: "#f43f5e", purple: "#a855f7", teal: "#14b8a6",
};
const W = 280, H = 148;

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%"
      style={{ display: "block", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
      {children}
    </svg>
  );
}

function T({ x, y, s, fill = C.lit, size = 10, anchor = "middle", bold = false }: {
  x: number; y: number; s: string | number; fill?: string; size?: number; anchor?: string; bold?: boolean;
}) {
  return <text x={x} y={y} textAnchor={anchor as "middle"} fill={fill} fontSize={size} fontWeight={bold ? "bold" : "normal"}>{s}</text>;
}

function Cell({ x, y, w = 26, h = 26, fill = C.cell, stroke = C.border, label, fs = 11 }: {
  x: number; y: number; w?: number; h?: number; fill?: string; stroke?: string; label?: string | number; fs?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={fill} stroke={stroke} strokeWidth={1} />
      {label != null && <T x={x + w / 2} y={y + h / 2 + 4} s={label} fill={fill === C.cell ? C.lit : C.bg} size={fs} bold={fill !== C.cell} />}
    </g>
  );
}

function Circ({ cx, cy, r = 14, fill = C.cell, stroke = C.border, label, fs = 11 }: {
  cx: number; cy: number; r?: number; fill?: string; stroke?: string; label?: string | number; fs?: number;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {label != null && <T x={cx} y={cy + 4} s={label} fill={fill === C.cell ? C.lit : C.bg} size={fs} bold={fill !== C.cell} />}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = C.dim, thick = false, dashed = false }: {
  x1: number; y1: number; x2: number; y2: number; color?: string; thick?: boolean; dashed?: boolean;
}) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 1) return null;
  const ux = dx / L, uy = dy / L;
  const ax = x2 - ux * 7, ay = y2 - uy * 7;
  const px = -uy * 4, py = ux * 4;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={color} strokeWidth={thick ? 2 : 1.5}
        strokeDasharray={dashed ? "4 3" : undefined} />
      <polygon points={`${x2},${y2} ${ax + px},${ay + py} ${ax - px},${ay - py}`} fill={color} />
    </g>
  );
}

function PtrLabel({ cx, y, color, label }: { cx: number; y: number; color: string; label: string }) {
  return (
    <g>
      <polygon points={`${cx - 5},${y} ${cx + 5},${y} ${cx},${y + 7}`} fill={color} />
      <T x={cx} y={y - 4} s={label} fill={color} size={9} bold />
    </g>
  );
}

function Label({ text }: { text: string }) {
  return <T x={W / 2} y={H - 8} s={text} fill={C.dim} size={8} />;
}

// ─── Array helpers ────────────────────────────────────────────────────────────
const CW = 26, CG = 30;
function arrSX(n: number) { return (W - (n * CW + (n - 1) * 4)) / 2; }
function cellCX(n: number, i: number) { return arrSX(n) + i * CG + CW / 2; }

// ─────────────────────────────────────────────────────────────────────────────
// 1. TWO POINTERS
// ─────────────────────────────────────────────────────────────────────────────
function TwoPointersViz() {
  const step = useStep(10, 620);
  const arr = [3, 1, 4, 1, 5, 9, 2, 6];
  const n = arr.length;
  const sx = arrSX(n);
  const L = Math.min(step, 3);
  const R = Math.max(n - 1 - step, n - 4);
  const found = L === 3 && R === 4;
  const done = step >= 4 && step <= 6;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Two Pointers" fill={C.dim} size={9} bold />
      {arr.map((v, i) => (
        <Cell key={i} x={sx + i * CG} y={22} label={v}
          fill={done ? C.green : i === L ? C.blue : i === R ? C.red : C.cell} />
      ))}
      {!done && <PtrLabel cx={cellCX(n, L)} y={56} color={C.blue} label="L" />}
      {!done && <PtrLabel cx={cellCX(n, R)} y={56} color={C.red} label="R" />}
      {done && <PtrLabel cx={cellCX(n, 3)} y={56} color={C.green} label="✓" />}
      {done && <PtrLabel cx={cellCX(n, 4)} y={56} color={C.green} label="✓" />}
      <T x={W / 2} y={82} s={done ? "Pair found!" : `L=${L}  R=${R}  →  moving inward`} fill={done ? C.green : C.dim} size={9} bold={done} />
      <T x={W / 2} y={100} s={`sum = ${arr[L] + arr[R]}`} fill={C.lit} size={10} />
      <Label text="O(n) time · O(1) space" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SLIDING WINDOW
// ─────────────────────────────────────────────────────────────────────────────
function SlidingWindowViz() {
  const step = useStep(10, 700);
  const arr = [2, 1, 5, 2, 3, 4, 1, 2];
  const n = arr.length;
  const sx = arrSX(n);
  const WIN = 3;
  const wStart = step < 6 ? step : 5;
  const windowSum = arr.slice(wStart, wStart + WIN).reduce((a, b) => a + b, 0);
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Sliding Window (fixed size 3)" fill={C.dim} size={9} bold />
      <rect x={sx + wStart * CG - 2} y={20} width={(WIN - 1) * CG + CW + 4} height={CW + 4}
        rx={5} fill={`${C.cyan}20`} stroke={C.cyan} strokeWidth={1.5} />
      {arr.map((v, i) => {
        const inWin = i >= wStart && i < wStart + WIN;
        return <Cell key={i} x={sx + i * CG} y={22} label={v} fill={inWin ? C.cyan : C.cell} />;
      })}
      <Arrow x1={sx + wStart * CG + (WIN * CG - 4) / 2} y1={52} x2={sx + (wStart + 1) * CG + (WIN * CG - 4) / 2} y2={52} color={step >= 6 ? C.dim : C.cyan} />
      <T x={W / 2} y={72} s={`Window [${wStart}–${wStart + WIN - 1}]`} fill={C.cyan} size={10} bold />
      <T x={W / 2} y={88} s={`Sum = ${windowSum}`} fill={C.lit} size={11} />
      <T x={W / 2} y={106} s={`→  slide right  →`} fill={C.dim} size={9} />
      <Label text="expand / shrink window • O(n) time" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HASH MAP
// ─────────────────────────────────────────────────────────────────────────────
function HashMapViz() {
  const step = useStep(8, 700);
  const pairs = [["eat","aet"], ["tea","aet"], ["tan","ant"], ["bat","abt"]];
  const buckets = [["eat","tea"], ["tan"], ["bat"]];
  const bY = [35, 70, 105];
  const activeKey = step < 4 ? step : -1;
  const filled = step < 4 ? step : 4;
  const bMap = [0, 0, 1, 2];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Hash Map — Group by Key" fill={C.dim} size={9} bold />
      {pairs.map((p, i) => {
        const active = i === activeKey;
        const done = i < filled;
        return (
          <g key={i}>
            <rect x={8} y={i * 28 + 20} width={64} height={22} rx={3}
              fill={active ? C.blue : done ? `${C.blue}30` : C.cell} stroke={active ? C.blue : C.border} />
            <T x={40} y={i * 28 + 35} s={p[0]} fill={active ? C.bg : C.lit} size={10} bold={active} />
            {active && <Arrow x1={74} y1={i * 28 + 31} x2={170} y2={bY[bMap[i]]} color={C.blue} thick />}
          </g>
        );
      })}
      <T x={120} y={16} s="key (sorted)" fill={C.dim} size={8} />
      {buckets.map((b, i) => (
        <g key={i}>
          <rect x={175} y={bY[i] - 12} width={90} height={22} rx={3}
            fill={i < (step < 4 ? bMap[step] + 1 : 3) + (step >= 4 ? 10 : 0) ? `${C.green}20` : C.cell}
            stroke={C.border} />
          <T x={220} y={bY[i] + 3} s={b.join(", ")} fill={C.lit} size={9} />
        </g>
      ))}
      <T x={220} y={16} s="bucket" fill={C.dim} size={8} />
      <Label text="O(n·k log k) · group by sorted key" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PREFIX SUM
// ─────────────────────────────────────────────────────────────────────────────
function PrefixSumViz() {
  const step = useStep(10, 700);
  const arr = [1, 3, -2, 5, 2, -1];
  const prefix = [1, 4, 2, 7, 9, 8];
  const n = arr.length;
  const sx = arrSX(n);
  const filled = Math.min(step, n);
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Prefix Sum Array" fill={C.dim} size={9} bold />
      <T x={sx - 4} y={35} s="arr:" fill={C.dim} size={8} anchor="end" />
      {arr.map((v, i) => <Cell key={i} x={sx + i * CG} y={22} label={v} />)}
      <T x={sx - 4} y={80} s="pre:" fill={C.dim} size={8} anchor="end" />
      {arr.map((_, i) => (
        <Cell key={i} x={sx + i * CG} y={60}
          fill={i < filled ? (i === filled - 1 ? C.amber : `${C.amber}40`) : C.cell}
          label={i < filled ? prefix[i] : ""} />
      ))}
      {filled > 0 && filled <= n && (
        <Arrow x1={cellCX(n, filled - 1)} y1={48} x2={cellCX(n, filled - 1)} y2={58} color={C.amber} thick />
      )}
      {filled > 1 && (
        <T x={W / 2} y={100} s={`prefix[${filled - 1}] = prefix[${filled - 2}] + arr[${filled - 1}]`} fill={C.lit} size={9} />
      )}
      {filled === 1 && <T x={W / 2} y={100} s="prefix[0] = arr[0]" fill={C.lit} size={9} />}
      <T x={W / 2} y={115} s={`= ${prefix[Math.max(0, filled - 1)]}`} fill={C.amber} size={11} bold />
      <Label text="running sum · O(n) build · O(1) query" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. STACK
// ─────────────────────────────────────────────────────────────────────────────
function StackViz() {
  const step = useStep(10, 650);
  const ops = ["push A", "push B", "push C", "push D", "pop D", "pop C", "push E", "peek E"];
  const snapshots = [
    [], ["A"], ["A","B"], ["A","B","C"], ["A","B","C","D"],
    ["A","B","C"], ["A","B"], ["A","B","E"], ["A","B","E"],
  ];
  const i = Math.min(step, 8);
  const stack = snapshots[i];
  const op = ops[Math.min(step, 7)];
  const isPush = op?.startsWith("push");
  const isPeek = op?.startsWith("peek");
  const SX = 108, SW = 64, SH = 22, BASE = 126;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Stack (LIFO)" fill={C.dim} size={9} bold />
      <rect x={SX - 2} y={18} width={SW + 4} height={BASE - 18} rx={3}
        fill="transparent" stroke={C.border} strokeWidth={1} strokeDasharray="4 3" />
      {stack.map((v, j) => (
        <g key={j}>
          <rect x={SX} y={BASE - (j + 1) * (SH + 2)} width={SW} height={SH} rx={3}
            fill={j === stack.length - 1 ? (isPush ? C.blue : isPeek ? C.amber : C.green) : `${C.blue}30`}
            stroke={j === stack.length - 1 ? (isPush ? C.blue : isPeek ? C.amber : C.green) : C.border} />
          <T x={SX + SW / 2} y={BASE - (j + 1) * (SH + 2) + 14}
            s={v} fill={j === stack.length - 1 ? C.bg : C.lit} size={11} bold={j === stack.length - 1} />
        </g>
      ))}
      <T x={SX + SW / 2} y={BASE + 12} s="bottom" fill={C.dim} size={8} />
      <T x={210} y={55} s={op} fill={isPush ? C.blue : isPeek ? C.amber : C.green} size={10} bold />
      {stack.length > 0 && (
        <Arrow x1={210} y1={60} x2={SX + SW + 8} y2={BASE - stack.length * (SH + 2) + SH / 2} color={C.border} dashed />
      )}
      <T x={210} y={80} s={`size: ${stack.length}`} fill={C.dim} size={9} />
      <T x={210} y={95} s={`top: ${stack[stack.length - 1] ?? "—"}`} fill={C.lit} size={10} />
      <Label text="push/pop O(1) · LIFO order" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. MONOTONIC STACK
// ─────────────────────────────────────────────────────────────────────────────
function MonotonicStackViz() {
  const step = useStep(9, 750);
  const arr = [2, 1, 5, 6, 2, 3];
  const n = arr.length;
  const sx = arrSX(n);
  const cur = Math.min(step, n - 1);
  const snapshots: number[][] = [[], [], [], [1, 5], [1, 5, 6], [1, 2], [1, 2, 3], [1, 2, 3], [1, 2, 3]];
  const stack = snapshots[step] ?? [];
  const popping = step === 3 && arr[cur] > (snapshots[2][snapshots[2].length - 1] ?? -1);
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Monotonic Stack (increasing)" fill={C.dim} size={9} bold />
      {arr.map((v, i) => (
        <Cell key={i} x={sx + i * CG} y={22} label={v}
          fill={i < cur ? `${C.blue}25` : i === cur ? C.blue : C.cell} />
      ))}
      <PtrLabel cx={cellCX(n, cur)} y={56} color={C.blue} label="cur" />
      <T x={W / 2} y={76} s="stack (values):" fill={C.dim} size={8} />
      <rect x={30} y={82} width={220} height={24} rx={3} fill={C.cell} stroke={C.border} />
      {stack.map((v, j) => (
        <g key={j}>
          <rect x={34 + j * 28} y={84} width={24} height={20} rx={2}
            fill={j === stack.length - 1 && popping ? C.red : `${C.blue}50`} stroke={C.border} />
          <T x={46 + j * 28} y={97} s={v} fill={C.lit} size={10} />
        </g>
      ))}
      {stack.length === 0 && <T x={140} y={97} s="empty" fill={C.dim} size={9} />}
      <T x={W / 2} y={122} s={popping ? "← popping (violates increasing order)" : "← push smaller elements only"}
        fill={popping ? C.red : C.dim} size={8} />
      <Label text="O(n) · each element pushed/popped once" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. BINARY SEARCH
// ─────────────────────────────────────────────────────────────────────────────
function BinarySearchViz() {
  const step = useStep(9, 680);
  const arr = [1, 3, 5, 7, 9, 11, 13, 15];
  const target = 11;
  const n = arr.length;
  const sx = arrSX(n);
  const states = [
    { lo: 0, hi: 7, mid: 3 }, { lo: 0, hi: 7, mid: 3 },
    { lo: 4, hi: 7, mid: 5 }, { lo: 4, hi: 7, mid: 5 },
    { lo: 4, hi: 7, mid: 5 }, { lo: 4, hi: 7, mid: 5 },
  ];
  const s = states[Math.min(step, 5)];
  const found = step >= 3;
  return (
    <Wrap>
      <T x={W / 2} y={13} s={`Binary Search — target = ${target}`} fill={C.dim} size={9} bold />
      {arr.map((v, i) => {
        const inRange = i >= s.lo && i <= s.hi;
        const isMid = i === s.mid;
        return (
          <Cell key={i} x={sx + i * CG} y={22} label={v}
            fill={isMid && found ? C.green : isMid ? C.amber : inRange ? `${C.blue}30` : C.cell}
            stroke={isMid ? (found ? C.green : C.amber) : C.border} />
        );
      })}
      <PtrLabel cx={cellCX(n, s.lo)} y={56} color={C.blue} label="lo" />
      <PtrLabel cx={cellCX(n, s.mid)} y={56} color={found ? C.green : C.amber} label="mid" />
      <PtrLabel cx={cellCX(n, s.hi)} y={56} color={C.red} label="hi" />
      <T x={W / 2} y={80} s={found ? `arr[${s.mid}] = ${arr[s.mid]} = target ✓` : `arr[${s.mid}]=${arr[s.mid]} < ${target} → lo = mid+1`}
        fill={found ? C.green : C.lit} size={9} bold={found} />
      <T x={W / 2} y={96} s={`lo=${s.lo}  mid=${s.mid}  hi=${s.hi}`} fill={C.dim} size={9} />
      <T x={W / 2} y={112} s={found ? "FOUND!" : "search space halved"} fill={found ? C.green : C.blue} size={10} bold={found} />
      <Label text="O(log n) · halve range each step" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. LINKED LIST
// ─────────────────────────────────────────────────────────────────────────────
function LinkedListViz() {
  const step = useStep(9, 650);
  const vals = [1, 2, 3, 4, 5];
  const positions = [30, 80, 130, 180, 230];
  const cur = Math.min(step, vals.length - 1);
  const done = step >= vals.length;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Linked List Traversal" fill={C.dim} size={9} bold />
      {vals.map((v, i) => (
        <g key={i}>
          <Circ cx={positions[i]} cy={72} r={18}
            fill={done ? C.green : i === cur ? C.blue : i < cur ? `${C.blue}30` : C.cell}
            label={v} fs={12} />
          {i < vals.length - 1 && (
            <Arrow x1={positions[i] + 19} y1={72} x2={positions[i + 1] - 19} y2={72}
              color={i < cur ? C.blue : C.dim} />
          )}
        </g>
      ))}
      {!done && (
        <g>
          <polygon points={`${positions[cur] - 5},${100} ${positions[cur] + 5},${100} ${positions[cur]},${93}`} fill={C.blue} />
          <T x={positions[cur]} y={112} s="curr" fill={C.blue} size={9} bold />
        </g>
      )}
      <T x={positions[0] - 2} y={55} s="head" fill={C.dim} size={8} />
      <T x={W / 2} y={128} s={done ? "Traversal complete!" : `curr → node ${cur + 1}`}
        fill={done ? C.green : C.lit} size={9} bold={done} />
      <Label text="O(n) traversal · O(1) space" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. FAST & SLOW POINTERS
// ─────────────────────────────────────────────────────────────────────────────
function FastSlowViz() {
  const step = useStep(9, 600);
  const nodes = 6;
  const R = 44, CX = 140, CY = 75;
  const angle = (i: number) => (i / nodes) * 2 * Math.PI - Math.PI / 2;
  const pos = (i: number) => ({
    x: CX + R * Math.cos(angle(i)),
    y: CY + R * Math.sin(angle(i)),
  });
  const slow = step % nodes;
  const fast = (step * 2) % nodes;
  const met = slow === fast && step > 0;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Fast & Slow Pointers" fill={C.dim} size={9} bold />
      {Array.from({ length: nodes }).map((_, i) => {
        const next = (i + 1) % nodes;
        const p = pos(i), pn = pos(next);
        const dx = pn.x - p.x, dy = pn.y - p.y, L = Math.hypot(dx, dy);
        const ux = dx / L, uy = dy / L, r = 14;
        return <Arrow key={i} x1={p.x + ux * r} y1={p.y + uy * r}
          x2={pn.x - ux * r} y2={pn.y - uy * r} color={C.dim} />;
      })}
      {Array.from({ length: nodes }).map((_, i) => {
        const p = pos(i);
        const isS = i === slow, isF = i === fast, isBoth = isS && isF;
        return <Circ key={i} cx={p.x} cy={p.y} r={14}
          fill={isBoth ? C.green : isS ? C.blue : isF ? C.red : C.cell}
          label={i} />;
      })}
      <T x={60} y={H - 28} s="● slow" fill={C.blue} size={9} bold />
      <T x={120} y={H - 28} s="● fast" fill={C.red} size={9} bold />
      {met && <T x={215} y={H - 28} s="CYCLE!" fill={C.green} size={10} bold />}
      {!met && <T x={185} y={H - 28} s={`step ${step}`} fill={C.dim} size={9} />}
      <Label text="slow +1 · fast +2 · meet → cycle detected" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. BFS TREE
// ─────────────────────────────────────────────────────────────────────────────
const TREE_POS = [
  [140, 20], [88, 62], [192, 62],
  [58, 104], [118, 104], [162, 104], [222, 104],
];
const TREE_EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
const BFS_ORDER = [0, 1, 2, 3, 4, 5, 6];
const DFS_ORDER = [0, 1, 3, 4, 2, 5, 6];

function BFSTreeViz() {
  const step = useStep(10, 650);
  const visited = new Set(BFS_ORDER.slice(0, Math.min(step, 7)));
  const vals = [4, 2, 6, 1, 3, 5, 7];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="BFS — Level-Order Traversal" fill={C.dim} size={9} bold />
      {TREE_EDGES.map(([a, b], i) => (
        <line key={i} x1={TREE_POS[a][0]} y1={TREE_POS[a][1]} x2={TREE_POS[b][0]} y2={TREE_POS[b][1]}
          stroke={visited.has(a) && visited.has(b) ? C.cyan : C.border} strokeWidth={1.5} />
      ))}
      {TREE_POS.map(([x, y], i) => (
        <Circ key={i} cx={x} cy={y} r={14}
          fill={visited.has(i) ? C.cyan : C.cell}
          stroke={visited.has(i) ? C.cyan : C.border}
          label={vals[i]} />
      ))}
      <T x={W / 2} y={H - 24} s={`visited: [${BFS_ORDER.slice(0, Math.min(step, 7)).map(i => vals[i]).join(", ")}]`}
        fill={C.lit} size={9} />
      <Label text="queue → visit level by level → O(n)" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. DFS TREE
// ─────────────────────────────────────────────────────────────────────────────
function DFSTreeViz() {
  const step = useStep(10, 650);
  const visited = new Set(DFS_ORDER.slice(0, Math.min(step, 7)));
  const cur = DFS_ORDER[Math.min(step, 6)];
  const vals = [4, 2, 6, 1, 3, 5, 7];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="DFS — Preorder Traversal" fill={C.dim} size={9} bold />
      {TREE_EDGES.map(([a, b], i) => (
        <line key={i} x1={TREE_POS[a][0]} y1={TREE_POS[a][1]} x2={TREE_POS[b][0]} y2={TREE_POS[b][1]}
          stroke={visited.has(a) && visited.has(b) ? C.purple : C.border} strokeWidth={1.5} />
      ))}
      {TREE_POS.map(([x, y], i) => (
        <Circ key={i} cx={x} cy={y} r={14}
          fill={i === cur && step < 7 ? C.amber : visited.has(i) ? C.purple : C.cell}
          stroke={visited.has(i) ? C.purple : C.border}
          label={vals[i]} />
      ))}
      <T x={W / 2} y={H - 24} s={`DFS: [${DFS_ORDER.slice(0, Math.min(step, 7)).map(i => vals[i]).join(", ")}]`}
        fill={C.lit} size={9} />
      <Label text="call stack → go deep → backtrack → O(n)" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. BFS GRAPH
// ─────────────────────────────────────────────────────────────────────────────
function BFSGraphViz() {
  const step = useStep(8, 750);
  const nodes = [[45, 55], [130, 25], [225, 50], [75, 110], [185, 110], [245, 100]];
  const edges: [number, number][] = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5]];
  const layers = [new Set([0]), new Set([1,3]), new Set([2,4]), new Set([5])];
  const visited = new Set<number>();
  for (let l = 0; l <= Math.min(step, 3); l++) layers[l].forEach(n => visited.add(n));
  const cur = layers[Math.min(step, 3)];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="BFS — Graph (shortest path)" fill={C.dim} size={9} bold />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={visited.has(a) && visited.has(b) ? `${C.cyan}80` : C.border} strokeWidth={1.5} />
      ))}
      {nodes.map(([x, y], i) => (
        <Circ key={i} cx={x} cy={y} r={14}
          fill={cur.has(i) && step < 5 ? C.amber : visited.has(i) ? C.cyan : C.cell}
          label={i === 0 ? "src" : i} fs={i === 0 ? 8 : 11} />
      ))}
      <T x={W / 2} y={H - 22} s={`layer ${Math.min(step, 3)} — dist = ${Math.min(step, 3)} from src`}
        fill={C.lit} size={9} />
      <Label text="queue → expand by layer → min distance" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. UNION FIND
// ─────────────────────────────────────────────────────────────────────────────
function UnionFindViz() {
  const step = useStep(9, 800);
  const nodes = [[45, 58], [110, 58], [175, 58], [75, 108], [140, 108], [205, 108]];
  const ops: [number, number][] = [[0, 1], [3, 4], [1, 2], [4, 5], [0, 3]];
  const colors = [C.blue, C.green, C.blue, C.green, C.amber];
  const groups: Set<number>[] = [];
  let parents = [0, 1, 2, 3, 4, 5];
  function find(x: number): number { return parents[x] === x ? x : find(parents[x]); }
  for (let i = 0; i < Math.min(step, ops.length); i++) {
    const [a, b] = ops[i];
    parents[find(a)] = find(b);
  }
  const rootColor: Record<number, string> = {};
  const colorList = [C.blue, C.green, C.amber, C.purple, C.cyan, C.red];
  let ci = 0;
  for (let i = 0; i < 6; i++) {
    const r = find(i);
    if (!(r in rootColor)) rootColor[r] = colorList[ci++];
  }
  const activeEdges = ops.slice(0, Math.min(step, ops.length));
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Union-Find" fill={C.dim} size={9} bold />
      {activeEdges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={colors[i]} strokeWidth={2} />
      ))}
      {nodes.map(([x, y], i) => (
        <Circ key={i} cx={x} cy={y} r={14} fill={rootColor[find(i)]} label={i} />
      ))}
      {step > 0 && step <= ops.length && (
        <T x={W / 2} y={H - 22} s={`union(${ops[step - 1][0]}, ${ops[step - 1][1]}) → same component`}
          fill={colors[step - 1]} size={9} bold />
      )}
      {step === 0 && <T x={W / 2} y={H - 22} s="6 isolated nodes" fill={C.dim} size={9} />}
      <Label text="path compression · union by rank · O(α(n))" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. TOPOLOGICAL SORT
// ─────────────────────────────────────────────────────────────────────────────
function TopoSortViz() {
  const step = useStep(9, 700);
  const npos = [[38, 72], [108, 34], [108, 110], [195, 72], [258, 72]];
  const edges: [number, number][] = [[0,1],[0,2],[1,3],[2,3],[3,4]];
  const order = [0, 1, 2, 3, 4];
  const removed = new Set(order.slice(0, Math.min(step, 5)));
  const cur = order[Math.min(step - 1, 4)];
  const labels = ["A", "B", "C", "D", "E"];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Topological Sort (Kahn's BFS)" fill={C.dim} size={9} bold />
      {edges.map(([a, b], i) => {
        if (removed.has(a) && removed.has(b)) return null;
        return <Arrow key={i} x1={npos[a][0]} y1={npos[a][1]}
          x2={npos[b][0]} y2={npos[b][1]} color={removed.has(a) ? C.dim : C.border} />;
      })}
      {npos.map(([x, y], i) => (
        <Circ key={i} cx={x} cy={y} r={16}
          fill={removed.has(i) ? `${C.dim}40` : i === cur && step > 0 && step <= 5 ? C.amber : C.blue}
          stroke={removed.has(i) ? C.dim : C.blue}
          label={removed.has(i) ? "✓" : labels[i]} fs={removed.has(i) ? 10 : 12} />
      ))}
      <T x={W / 2} y={H - 22} s={step === 0 ? "in-degree 0 → process first" :
        step <= 5 ? `processed: ${order.slice(0, step).map(i => labels[i]).join(" → ")}` : "done!"}
        fill={step > 4 ? C.green : C.lit} size={9} bold={step > 4} />
      <Label text="in-degree 0 → queue → process → O(V+E)" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. MIN HEAP
// ─────────────────────────────────────────────────────────────────────────────
function MinHeapViz() {
  const step = useStep(8, 700);
  const heapPos = [[140, 22], [88, 60], [192, 60], [60, 100], [116, 100], [165, 100], [222, 100]];
  const heapEdges: [number,number][] = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  const heapVals = [3, 5, 7, 8, 9, 10, null];
  const steps = [
    [3,5,7,8,9,10,null],[3,5,7,8,9,10,1],[3,5,7,8,9,10,1],[3,5,1,8,9,10,7],[1,5,3,8,9,10,7],[1,5,3,8,9,10,7],[1,5,3,8,9,10,7]
  ];
  const swaps: [number,number][] = [[-1,-1],[-1,-1],[6,2],[2,0],[-1,-1],[-1,-1],[-1,-1]];
  const vals = (steps[Math.min(step, 6)] ?? steps[5]);
  const [swA, swB] = swaps[Math.min(step, 6)] ?? [-1, -1];
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Min-Heap — Insert & Bubble Up" fill={C.dim} size={9} bold />
      {heapEdges.map(([a, b], i) => (
        vals[b] != null && (
          <line key={i} x1={heapPos[a][0]} y1={heapPos[a][1]} x2={heapPos[b][0]} y2={heapPos[b][1]}
            stroke={C.border} strokeWidth={1.5} />
        )
      ))}
      {heapPos.map(([x, y], i) => {
        if (vals[i] == null) return null;
        const isSwap = i === swA || i === swB;
        const isNew = i === 6 && step === 1;
        return <Circ key={i} cx={x} cy={y} r={14}
          fill={isSwap ? C.amber : isNew ? C.cyan : i === 0 && step >= 4 ? C.green : C.blue}
          label={vals[i] ?? ""} />;
      })}
      <T x={W / 2} y={H - 22} s={
        step === 0 ? "initial heap [3,5,7,8,9,10]" :
        step === 1 ? "insert 1 at last position" :
        step === 2 ? "1 < 7 → swap with parent" :
        step === 3 ? "1 < 3 → swap with root" :
        "1 is at root! heap property restored"
      } fill={step >= 4 ? C.green : C.lit} size={9} bold={step >= 4} />
      <Label text="heapify-up O(log n) · root = minimum" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. GREEDY INTERVALS
// ─────────────────────────────────────────────────────────────────────────────
function GreedyIntervalsViz() {
  const step = useStep(9, 750);
  const intervals = [[1,4],[2,5],[7,9],[8,11],[13,15]];
  const TY = 65, BAR_H = 14, SX = 20, SCALE = 16;
  const toX = (v: number) => SX + v * SCALE;
  const merged = [[1,5],[7,11],[13,15]];
  const showMerged = step >= 4;
  const activeIdx = Math.min(step - 1, intervals.length - 1);
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Greedy — Merge Intervals" fill={C.dim} size={9} bold />
      <line x1={SX} y1={TY + BAR_H * 1.5} x2={SX + 15 * SCALE} y2={TY + BAR_H * 1.5} stroke={C.border} strokeWidth={1} />
      {[0,3,6,9,12,15].map(v => (
        <g key={v}>
          <line x1={toX(v)} y1={TY + BAR_H * 1.5 - 3} x2={toX(v)} y2={TY + BAR_H * 1.5 + 3} stroke={C.dim} strokeWidth={1} />
          <T x={toX(v)} y={TY + BAR_H * 1.5 + 11} s={v} fill={C.dim} size={8} />
        </g>
      ))}
      {!showMerged && intervals.map(([s, e], i) => (
        <g key={i}>
          <rect x={toX(s)} y={TY - i * (BAR_H + 3)} width={toX(e) - toX(s)} height={BAR_H} rx={3}
            fill={i === activeIdx ? `${C.blue}80` : i < activeIdx ? `${C.blue}30` : C.cell}
            stroke={i === activeIdx ? C.blue : C.border} />
          <T x={toX(s) + (toX(e) - toX(s)) / 2} y={TY - i * (BAR_H + 3) + BAR_H - 3}
            s={`[${s},${e}]`} fill={C.lit} size={8} />
        </g>
      ))}
      {showMerged && merged.map(([s, e], i) => (
        <g key={i}>
          <rect x={toX(s)} y={TY - i * (BAR_H + 3)} width={toX(e) - toX(s)} height={BAR_H} rx={3}
            fill={`${C.green}50`} stroke={C.green} />
          <T x={toX(s) + (toX(e) - toX(s)) / 2} y={TY - i * (BAR_H + 3) + BAR_H - 3}
            s={`[${s},${e}]`} fill={C.lit} size={8} />
        </g>
      ))}
      <T x={W / 2} y={H - 22} s={showMerged ? `merged into ${merged.length} intervals ✓` : "sort by start → extend or start new"}
        fill={showMerged ? C.green : C.lit} size={9} bold={showMerged} />
      <Label text="O(n log n) sort + O(n) merge" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 17. BACKTRACKING
// ─────────────────────────────────────────────────────────────────────────────
function BacktrackingViz() {
  const step = useStep(10, 720);
  const nodes = [[140,22],[80,66],[200,66],[80,112],[140,112],[200,112]];
  const edges: [number,number][] = [[0,1],[0,2],[1,3],[1,4],[2,5]];
  const labels = ["[ ]","[1]","[2]","[1,2]","[1,3]","[2,3]"];
  const bfsSteps = [
    new Set<number>(),
    new Set([0]),
    new Set([0,1]),
    new Set([0,1,3]),
    new Set([0,1]),
    new Set([0,1,4]),
    new Set([0]),
    new Set([0,2]),
    new Set([0,2,5]),
    new Set([0]),
  ];
  const solutions = step === 3 || step === 5 || step === 8;
  const backtrack = step === 4 || step === 6;
  const visited = bfsSteps[Math.min(step, 9)];
  const curNode = [...visited].at(-1) ?? -1;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="Backtracking — Subsets of [1,2,3]" fill={C.dim} size={9} bold />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={visited.has(a) && visited.has(b) ? (backtrack ? C.red : C.purple) : C.border}
          strokeWidth={1.5} strokeDasharray={backtrack && visited.has(b) ? "4 3" : undefined} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 11} width={44} height={22} rx={4}
            fill={i === curNode && !backtrack ? (solutions ? C.green : C.purple) : visited.has(i) && !backtrack ? `${C.purple}30` : C.cell}
            stroke={visited.has(i) ? (backtrack ? C.red : C.purple) : C.border} strokeWidth={1} />
          <T x={x} y={y + 4} s={labels[i]} fill={visited.has(i) ? C.lit : C.dim} size={8} />
        </g>
      ))}
      <T x={W / 2} y={H - 22} s={solutions ? `✓ solution: ${labels[curNode]}` : backtrack ? "↩ backtrack" : "→ explore"}
        fill={solutions ? C.green : backtrack ? C.red : C.purple} size={9} bold />
      <Label text="choose → explore → un-choose (backtrack)" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 18. DP 1D
// ─────────────────────────────────────────────────────────────────────────────
function DP1DViz() {
  const step = useStep(9, 750);
  const arr = [2, 7, 9, 3, 1];
  const dp = [2, 7, 11, 11, 12];
  const n = arr.length;
  const sx = arrSX(n);
  const filled = Math.min(step, n);
  const cur = Math.min(step - 1, n - 1);
  return (
    <Wrap>
      <T x={W / 2} y={13} s="1D DP — House Robber Pattern" fill={C.dim} size={9} bold />
      <T x={sx - 4} y={34} s="arr:" fill={C.dim} size={8} anchor="end" />
      {arr.map((v, i) => <Cell key={i} x={sx + i * CG} y={22} label={v} />)}
      <T x={sx - 4} y={80} s="dp:" fill={C.dim} size={8} anchor="end" />
      {arr.map((_, i) => (
        <Cell key={i} x={sx + i * CG} y={65}
          fill={i < filled ? (i === cur ? C.blue : `${C.blue}35`) : C.cell}
          label={i < filled ? dp[i] : ""} />
      ))}
      {cur >= 2 && step <= n && (
        <>
          <Arrow x1={cellCX(n, cur - 2) + 3} y1={65} x2={cellCX(n, cur)} y2={65} color={`${C.amber}80`} dashed />
          <Arrow x1={cellCX(n, cur - 1) + 3} y1={65} x2={cellCX(n, cur)} y2={65} color={`${C.amber}80`} dashed />
        </>
      )}
      <T x={W / 2} y={100} s={cur >= 2 && step <= n
        ? `dp[${cur}] = max(dp[${cur-1}], dp[${cur-2}] + arr[${cur}])`
        : cur === 1 ? `dp[1] = max(arr[0], arr[1])` : cur === 0 ? `dp[0] = arr[0]` : ""}
        fill={C.lit} size={8} />
      <T x={W / 2} y={115} s={filled > 0 ? `= ${dp[Math.min(cur, n-1)]}` : ""} fill={C.blue} size={11} bold />
      <Label text="dp[i] = max(dp[i-1], dp[i-2] + arr[i])" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 19. DP 2D
// ─────────────────────────────────────────────────────────────────────────────
function DP2DViz() {
  const step = useStep(12, 650);
  const ROWS = 3, COLS = 4;
  const CW2 = 30, CG2 = 34;
  const totalW = COLS * CW2 + (COLS - 1) * 4;
  const totalH = ROWS * CW2 + (ROWS - 1) * 4;
  const SX = (W - totalW) / 2, SY = (H - totalH) / 2 - 6;
  const dp = [[1,1,1,1],[1,2,3,4],[1,3,6,10]];
  const cellIdx = (r: number, c: number) => r * COLS + c;
  const filled = Math.min(step, ROWS * COLS);
  const curR = Math.floor((filled - 1) / COLS);
  const curC = (filled - 1) % COLS;
  return (
    <Wrap>
      <T x={W / 2} y={12} s="2D DP — Unique Paths Grid" fill={C.dim} size={9} bold />
      {Array.from({ length: ROWS }).map((_, r) =>
        Array.from({ length: COLS }).map((_, c) => {
          const idx = cellIdx(r, c);
          const isCur = idx === filled - 1 && step <= ROWS * COLS;
          const isDone = idx < filled;
          const isAbove = r === curR - 1 && c === curC && isCur;
          const isLeft = r === curR && c === curC - 1;
          const fill = isCur ? C.cyan : isDone ? `${C.cyan}35` : C.cell;
          const cx = SX + c * CG2 + CW2 / 2, cy = SY + r * CG2 + CW2 / 2;
          return (
            <g key={`${r}-${c}`}>
              <rect x={SX + c * CG2} y={SY + r * CG2} width={CW2} height={CW2} rx={3} fill={fill} stroke={isCur ? C.cyan : C.border} strokeWidth={1} />
              {isDone && <T x={cx} y={cy + 4} s={dp[r][c]} fill={isCur ? C.bg : C.lit} size={10} bold={isCur} />}
              {isCur && r > 0 && <Arrow x1={cx} y1={SY + (r-1) * CG2 + CW2} x2={cx} y2={SY + r * CG2} color={`${C.amber}90`} />}
              {isCur && c > 0 && <Arrow x1={SX + (c-1) * CG2 + CW2} y1={cy} x2={SX + c * CG2} y2={cy} color={`${C.amber}90`} />}
            </g>
          );
        })
      )}
      <T x={W / 2} y={H - 20} s={filled >= ROWS * COLS ? `answer = ${dp[ROWS-1][COLS-1]} paths ✓` :
        curR === 0 || curC === 0 ? `dp[${curR}][${curC}] = 1 (edge)` :
        `dp[${curR}][${curC}] = dp[${curR-1}][${curC}] + dp[${curR}][${curC-1}]`}
        fill={filled >= ROWS * COLS ? C.green : C.lit} size={9} bold={filled >= ROWS * COLS} />
      <Label text="fill from top-left · dp[i][j] = above + left" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 20. STATE MACHINE DP
// ─────────────────────────────────────────────────────────────────────────────
function StateMachineViz() {
  const step = useStep(9, 800);
  const states = [
    { label: "HELD", cx: 75, cy: 95, color: C.blue },
    { label: "SOLD", cx: 205, cy: 95, color: C.green },
    { label: "REST", cx: 140, cy: 30, color: C.amber },
  ];
  const transitions = [
    { from: 0, to: 1, label: "sell", mid: [140, 72] },
    { from: 1, to: 2, label: "cooldown", mid: [195, 55] },
    { from: 2, to: 0, label: "buy", mid: [85, 55] },
  ];
  const selfLoops = [
    { node: 0, label: "hold" },
    { node: 2, label: "rest" },
  ];
  const sequence = [2, 0, 0, 1, 1, 2, 2, 0, 1];
  const activeState = sequence[Math.min(step, 8)];
  const activeTrans = step > 0 ? transitions.findIndex(t => t.from === sequence[step - 1] && t.to === sequence[Math.min(step, 8)]) : -1;
  return (
    <Wrap>
      <T x={W / 2} y={13} s="State Machine DP — Stock w/ Cooldown" fill={C.dim} size={9} bold />
      {transitions.map((t, i) => {
        const isActive = i === activeTrans;
        const f = states[t.from], to = states[t.to];
        return (
          <g key={i}>
            <path d={`M ${f.cx} ${f.cy} Q ${t.mid[0]} ${t.mid[1]} ${to.cx} ${to.cy}`}
              stroke={isActive ? states[t.from].color : C.border} strokeWidth={isActive ? 2 : 1}
              fill="none" markerEnd="none" />
            <T x={t.mid[0]} y={t.mid[1] - 5} s={t.label} fill={isActive ? states[t.from].color : C.dim} size={8} bold={isActive} />
          </g>
        );
      })}
      {selfLoops.map(({ node, label }) => {
        const s = states[node];
        return (
          <g key={node}>
            <path d={`M ${s.cx - 8} ${s.cy - 14} C ${s.cx - 25} ${s.cy - 35} ${s.cx + 25} ${s.cy - 35} ${s.cx + 8} ${s.cy - 14}`}
              stroke={C.border} strokeWidth={1} fill="none" />
            <T x={s.cx} y={s.cy - 35} s={label} fill={C.dim} size={7} />
          </g>
        );
      })}
      {states.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={22}
            fill={i === activeState ? s.color : `${s.color}20`}
            stroke={s.color} strokeWidth={i === activeState ? 2 : 1} />
          <T x={s.cx} y={s.cy + 4} s={s.label} fill={i === activeState ? C.bg : s.color} size={8} bold={i === activeState} />
        </g>
      ))}
      <T x={W / 2} y={H - 20} s={`active: ${states[activeState].label}`} fill={states[activeState].color} size={10} bold />
      <Label text="3 states · hold / sell / cooldown transitions" />
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
const VIZ_MAP: Record<VizType, React.FC> = {
  "two-pointers": TwoPointersViz,
  "sliding-window": SlidingWindowViz,
  "hash-map": HashMapViz,
  "prefix-sum": PrefixSumViz,
  "stack": StackViz,
  "monotonic-stack": MonotonicStackViz,
  "binary-search": BinarySearchViz,
  "linked-list": LinkedListViz,
  "fast-slow-pointers": FastSlowViz,
  "bfs-tree": BFSTreeViz,
  "dfs-tree": DFSTreeViz,
  "bfs-graph": BFSGraphViz,
  "union-find": UnionFindViz,
  "topological-sort": TopoSortViz,
  "min-heap": MinHeapViz,
  "greedy-intervals": GreedyIntervalsViz,
  "backtracking": BacktrackingViz,
  "dp-1d": DP1DViz,
  "dp-2d": DP2DViz,
  "state-machine": StateMachineViz,
};

export function AlgorithmViz({ type }: { type: VizType }) {
  const Viz = VIZ_MAP[type] ?? HashMapViz;
  return <Viz />;
}
