import type { Question } from "./questions";
import type { VizType } from "../components/AlgorithmViz";

export function getVizType(q: Question): VizType {
  const pat = q.pattern.toLowerCase();
  switch (q.category) {
    case "arrays":
      if (pat.includes("prefix")) return "prefix-sum";
      if (pat.includes("heap") || pat.includes("bucket")) return "min-heap";
      return "hash-map";
    case "two-pointers":
      return "two-pointers";
    case "sliding-window":
      return "sliding-window";
    case "strings":
      if (pat.includes("stack")) return "stack";
      if (pat.includes("sliding window") || pat.includes("window") || pat.includes("fixed")) return "sliding-window";
      if (pat.includes("expand") || pat.includes("palindrom") || pat.includes("two pointer")) return "two-pointers";
      if (pat.includes("string dp") || pat.includes("dp")) return "dp-1d";
      return "hash-map";
    case "stack":
      if (pat.includes("monoton")) return "monotonic-stack";
      if (pat.includes("backtrack")) return "backtracking";
      return "stack";
    case "binary-search":
      return "binary-search";
    case "linked-list":
      if (pat.includes("fast") || pat.includes("slow") || pat.includes("cycle") || pat.includes("two pointer")) return "fast-slow-pointers";
      return "linked-list";
    case "trees":
      if (pat.includes("bfs") || pat.includes("level")) return "bfs-tree";
      return "dfs-tree";
    case "graphs":
      if (pat.includes("union") || pat.includes("component")) return "union-find";
      if (pat.includes("topo") || pat.includes("kahn")) return "topological-sort";
      if (pat.includes("dijkstra") || pat.includes("weighted")) return "min-heap";
      return "bfs-graph";
    case "heap":
      return "min-heap";
    case "greedy":
      return "greedy-intervals";
    case "backtracking":
      return "backtracking";
    case "dp":
      if (pat.includes("state machine")) return "state-machine";
      if (
        pat.includes("2d") || pat.includes("grid") ||
        pat.includes("string dp") || pat.includes("lcs") ||
        pat.includes("knapsack")
      ) return "dp-2d";
      return "dp-1d";
    default:
      return "hash-map";
  }
}
