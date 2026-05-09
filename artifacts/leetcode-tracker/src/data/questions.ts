export type Difficulty = "Medium";

export interface Question {
  id: number;
  title: string;
  difficulty: Difficulty;
  leetcodeId: number;
  pattern: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
  color: string;
  accent: string;
  description: string;
  questions: Question[];
}

export const categories: Category[] = [
  {
    id: "arrays",
    label: "Arrays & Hashing",
    color: "#6366f1",
    accent: "rgba(99,102,241,0.15)",
    description: "Hash maps, frequency counts, and array manipulation patterns",
    questions: [
      { id: 1, title: "Group Anagrams", difficulty: "Medium", leetcodeId: 49, pattern: "Hash Map", category: "arrays" },
      { id: 2, title: "Top K Frequent Elements", difficulty: "Medium", leetcodeId: 347, pattern: "Bucket Sort / Heap", category: "arrays" },
      { id: 3, title: "Product of Array Except Self", difficulty: "Medium", leetcodeId: 238, pattern: "Prefix Product", category: "arrays" },
      { id: 4, title: "Longest Consecutive Sequence", difficulty: "Medium", leetcodeId: 128, pattern: "Hash Set", category: "arrays" },
      { id: 5, title: "Subarray Sum Equals K", difficulty: "Medium", leetcodeId: 560, pattern: "Prefix Sum + Hash Map", category: "arrays" },
      { id: 6, title: "Valid Sudoku", difficulty: "Medium", leetcodeId: 36, pattern: "Hash Set", category: "arrays" },
    ],
  },
  {
    id: "two-pointers",
    label: "Two Pointers",
    color: "#ec4899",
    accent: "rgba(236,72,153,0.15)",
    description: "Two-pointer technique for sorted arrays and pair problems",
    questions: [
      { id: 7, title: "Container With Most Water", difficulty: "Medium", leetcodeId: 11, pattern: "Greedy Two Pointers", category: "two-pointers" },
      { id: 8, title: "3Sum", difficulty: "Medium", leetcodeId: 15, pattern: "Sort + Two Pointers", category: "two-pointers" },
      { id: 9, title: "Remove Duplicates from Sorted Array II", difficulty: "Medium", leetcodeId: 80, pattern: "Two Pointers", category: "two-pointers" },
      { id: 10, title: "Sort Colors", difficulty: "Medium", leetcodeId: 75, pattern: "Dutch National Flag", category: "two-pointers" },
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    color: "#f59e0b",
    accent: "rgba(245,158,11,0.15)",
    description: "Variable and fixed window techniques for substring/subarray problems",
    questions: [
      { id: 11, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeId: 3, pattern: "Variable Window", category: "sliding-window" },
      { id: 12, title: "Longest Repeating Character Replacement", difficulty: "Medium", leetcodeId: 424, pattern: "Variable Window + Freq Map", category: "sliding-window" },
      { id: 13, title: "Minimum Size Subarray Sum", difficulty: "Medium", leetcodeId: 209, pattern: "Variable Window", category: "sliding-window" },
      { id: 14, title: "Permutation in String", difficulty: "Medium", leetcodeId: 567, pattern: "Fixed Window + Freq Map", category: "sliding-window" },
    ],
  },
  {
    id: "strings",
    label: "Strings",
    color: "#14b8a6",
    accent: "rgba(20,184,166,0.15)",
    description: "String manipulation, palindromes, encoding and pattern matching",
    questions: [
      { id: 15, title: "Longest Palindromic Substring", difficulty: "Medium", leetcodeId: 5, pattern: "Expand Around Center", category: "strings" },
      { id: 16, title: "Palindromic Substrings", difficulty: "Medium", leetcodeId: 647, pattern: "Expand Around Center", category: "strings" },
      { id: 17, title: "Encode and Decode Strings", difficulty: "Medium", leetcodeId: 271, pattern: "Length-Prefix Encoding", category: "strings" },
      { id: 18, title: "Find All Anagrams in a String", difficulty: "Medium", leetcodeId: 438, pattern: "Sliding Window + Freq Map", category: "strings" },
      { id: 19, title: "Minimum Window Substring", difficulty: "Medium", leetcodeId: 76, pattern: "Sliding Window", category: "strings" },
      { id: 20, title: "Decode Ways", difficulty: "Medium", leetcodeId: 91, pattern: "String DP", category: "strings" },
      { id: 21, title: "Reverse Words in a String", difficulty: "Medium", leetcodeId: 151, pattern: "Two Pointers", category: "strings" },
      { id: 22, title: "Simplify Path", difficulty: "Medium", leetcodeId: 71, pattern: "Stack", category: "strings" },
    ],
  },
  {
    id: "stack",
    label: "Stack",
    color: "#8b5cf6",
    accent: "rgba(139,92,246,0.15)",
    description: "Monotonic stacks, expression evaluation, and nesting problems",
    questions: [
      { id: 23, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcodeId: 150, pattern: "Stack Simulation", category: "stack" },
      { id: 24, title: "Generate Parentheses", difficulty: "Medium", leetcodeId: 22, pattern: "Backtracking", category: "stack" },
      { id: 25, title: "Daily Temperatures", difficulty: "Medium", leetcodeId: 739, pattern: "Monotonic Stack", category: "stack" },
    ],
  },
  {
    id: "binary-search",
    label: "Binary Search",
    color: "#06b6d4",
    accent: "rgba(6,182,212,0.15)",
    description: "Classic binary search and search on answer space",
    questions: [
      { id: 26, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcodeId: 153, pattern: "Binary Search on Rotated", category: "binary-search" },
      { id: 27, title: "Search in Rotated Sorted Array", difficulty: "Medium", leetcodeId: 33, pattern: "Binary Search on Rotated", category: "binary-search" },
      { id: 28, title: "Koko Eating Bananas", difficulty: "Medium", leetcodeId: 875, pattern: "Binary Search on Answer", category: "binary-search" },
      { id: 29, title: "Time Based Key-Value Store", difficulty: "Medium", leetcodeId: 981, pattern: "Binary Search on Timestamp", category: "binary-search" },
      { id: 30, title: "Search a 2D Matrix", difficulty: "Medium", leetcodeId: 74, pattern: "Binary Search on Matrix", category: "binary-search" },
    ],
  },
  {
    id: "linked-list",
    label: "Linked List",
    color: "#f97316",
    accent: "rgba(249,115,22,0.15)",
    description: "Pointer manipulation, fast/slow pointers, and list restructuring",
    questions: [
      { id: 31, title: "Reorder List", difficulty: "Medium", leetcodeId: 143, pattern: "Find Mid + Reverse + Merge", category: "linked-list" },
      { id: 32, title: "Remove Nth Node From End of List", difficulty: "Medium", leetcodeId: 19, pattern: "Fast/Slow Pointers", category: "linked-list" },
      { id: 33, title: "Copy List with Random Pointer", difficulty: "Medium", leetcodeId: 138, pattern: "Hash Map", category: "linked-list" },
      { id: 34, title: "Add Two Numbers", difficulty: "Medium", leetcodeId: 2, pattern: "Carry Simulation", category: "linked-list" },
      { id: 35, title: "Linked List Cycle II", difficulty: "Medium", leetcodeId: 142, pattern: "Floyd's Algorithm", category: "linked-list" },
    ],
  },
  {
    id: "trees",
    label: "Trees",
    color: "#22c55e",
    accent: "rgba(34,197,94,0.15)",
    description: "BFS, DFS, BST operations, construction and path problems",
    questions: [
      { id: 36, title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeId: 102, pattern: "BFS", category: "trees" },
      { id: 37, title: "Binary Tree Right Side View", difficulty: "Medium", leetcodeId: 199, pattern: "BFS / DFS", category: "trees" },
      { id: 38, title: "Binary Tree Zigzag Level Order Traversal", difficulty: "Medium", leetcodeId: 103, pattern: "BFS + Deque", category: "trees" },
      { id: 39, title: "Count Good Nodes in Binary Tree", difficulty: "Medium", leetcodeId: 1448, pattern: "DFS with Max", category: "trees" },
      { id: 40, title: "Validate Binary Search Tree", difficulty: "Medium", leetcodeId: 98, pattern: "DFS with Bounds", category: "trees" },
      { id: 41, title: "Kth Smallest Element in a BST", difficulty: "Medium", leetcodeId: 230, pattern: "Inorder Traversal", category: "trees" },
      { id: 42, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", leetcodeId: 105, pattern: "Recursive Construction", category: "trees" },
      { id: 43, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeId: 236, pattern: "DFS Post-order", category: "trees" },
      { id: 44, title: "Path Sum III", difficulty: "Medium", leetcodeId: 437, pattern: "DFS + Prefix Sum", category: "trees" },
      { id: 45, title: "Flatten Binary Tree to Linked List", difficulty: "Medium", leetcodeId: 114, pattern: "Morris Traversal / DFS", category: "trees" },
      { id: 46, title: "Populating Next Right Pointers in Each Node", difficulty: "Medium", leetcodeId: 116, pattern: "BFS / O(1) Space", category: "trees" },
      { id: 47, title: "Sum Root to Leaf Numbers", difficulty: "Medium", leetcodeId: 129, pattern: "DFS with Accumulator", category: "trees" },
      { id: 48, title: "All Nodes Distance K in Binary Tree", difficulty: "Medium", leetcodeId: 863, pattern: "DFS + Parent Map", category: "trees" },
      { id: 49, title: "Maximum Width of Binary Tree", difficulty: "Medium", leetcodeId: 662, pattern: "BFS with Index", category: "trees" },
      { id: 50, title: "Find Duplicate Subtrees", difficulty: "Medium", leetcodeId: 652, pattern: "DFS + Serialization", category: "trees" },
    ],
  },
  {
    id: "graphs",
    label: "Graphs",
    color: "#ef4444",
    accent: "rgba(239,68,68,0.15)",
    description: "BFS/DFS traversal, union-find, topological sort and shortest paths",
    questions: [
      { id: 51, title: "Number of Islands", difficulty: "Medium", leetcodeId: 200, pattern: "DFS / BFS", category: "graphs" },
      { id: 52, title: "Clone Graph", difficulty: "Medium", leetcodeId: 133, pattern: "DFS + Hash Map", category: "graphs" },
      { id: 53, title: "Max Area of Island", difficulty: "Medium", leetcodeId: 695, pattern: "DFS", category: "graphs" },
      { id: 54, title: "Pacific Atlantic Water Flow", difficulty: "Medium", leetcodeId: 417, pattern: "Multi-source BFS", category: "graphs" },
      { id: 55, title: "Surrounded Regions", difficulty: "Medium", leetcodeId: 130, pattern: "DFS from Border", category: "graphs" },
      { id: 56, title: "Rotting Oranges", difficulty: "Medium", leetcodeId: 994, pattern: "Multi-source BFS", category: "graphs" },
      { id: 57, title: "Course Schedule", difficulty: "Medium", leetcodeId: 207, pattern: "Topological Sort / Cycle Detection", category: "graphs" },
      { id: 58, title: "Course Schedule II", difficulty: "Medium", leetcodeId: 210, pattern: "Topological Sort (Kahn's)", category: "graphs" },
      { id: 59, title: "Number of Connected Components in Undirected Graph", difficulty: "Medium", leetcodeId: 323, pattern: "Union-Find / DFS", category: "graphs" },
      { id: 60, title: "Redundant Connection", difficulty: "Medium", leetcodeId: 684, pattern: "Union-Find", category: "graphs" },
      { id: 61, title: "Word Ladder", difficulty: "Medium", leetcodeId: 127, pattern: "BFS Shortest Path", category: "graphs" },
      { id: 62, title: "Shortest Path in Binary Matrix", difficulty: "Medium", leetcodeId: 1091, pattern: "BFS", category: "graphs" },
      { id: 63, title: "Network Delay Time", difficulty: "Medium", leetcodeId: 743, pattern: "Dijkstra's Algorithm", category: "graphs" },
      { id: 64, title: "Is Graph Bipartite?", difficulty: "Medium", leetcodeId: 785, pattern: "BFS / DFS Coloring", category: "graphs" },
    ],
  },
  {
    id: "heap",
    label: "Heap / Priority Queue",
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.15)",
    description: "Min/max heaps for top-K, scheduling and order statistics",
    questions: [
      { id: 65, title: "Kth Largest Element in an Array", difficulty: "Medium", leetcodeId: 215, pattern: "Min-Heap / Quickselect", category: "heap" },
      { id: 66, title: "Task Scheduler", difficulty: "Medium", leetcodeId: 621, pattern: "Greedy + Max-Heap", category: "heap" },
      { id: 67, title: "K Closest Points to Origin", difficulty: "Medium", leetcodeId: 973, pattern: "Max-Heap", category: "heap" },
      { id: 68, title: "Top K Frequent Words", difficulty: "Medium", leetcodeId: 692, pattern: "Min-Heap + Custom Comparator", category: "heap" },
    ],
  },
  {
    id: "greedy",
    label: "Greedy",
    color: "#fb923c",
    accent: "rgba(251,146,60,0.15)",
    description: "Locally optimal choices that lead to global solutions",
    questions: [
      { id: 69, title: "Merge Intervals", difficulty: "Medium", leetcodeId: 56, pattern: "Sort + Merge", category: "greedy" },
      { id: 70, title: "Gas Station", difficulty: "Medium", leetcodeId: 134, pattern: "Greedy Circular Scan", category: "greedy" },
      { id: 71, title: "Hand of Straights", difficulty: "Medium", leetcodeId: 846, pattern: "Greedy + Ordered Map", category: "greedy" },
    ],
  },
  {
    id: "backtracking",
    label: "Backtracking",
    color: "#f43f5e",
    accent: "rgba(244,63,94,0.15)",
    description: "Explore all possibilities with pruning and state restoration",
    questions: [
      { id: 72, title: "Combination Sum", difficulty: "Medium", leetcodeId: 39, pattern: "Backtracking with Repetition", category: "backtracking" },
      { id: 73, title: "Subsets II", difficulty: "Medium", leetcodeId: 90, pattern: "Backtracking with Skip", category: "backtracking" },
      { id: 74, title: "Permutations", difficulty: "Medium", leetcodeId: 46, pattern: "Backtracking with Used[]", category: "backtracking" },
      { id: 75, title: "Word Search", difficulty: "Medium", leetcodeId: 79, pattern: "DFS + Backtracking on Grid", category: "backtracking" },
    ],
  },
  {
    id: "dp",
    label: "Dynamic Programming",
    color: "#0ea5e9",
    accent: "rgba(14,165,233,0.15)",
    description: "Break problems into overlapping subproblems — memoize, tabulate, optimize",
    questions: [
      { id: 76, title: "House Robber II", difficulty: "Medium", leetcodeId: 213, pattern: "1D DP — Circular Array", category: "dp" },
      { id: 77, title: "Coin Change", difficulty: "Medium", leetcodeId: 322, pattern: "Unbounded Knapsack / BFS", category: "dp" },
      { id: 78, title: "Partition Equal Subset Sum", difficulty: "Medium", leetcodeId: 416, pattern: "0/1 Knapsack", category: "dp" },
      { id: 79, title: "Longest Increasing Subsequence", difficulty: "Medium", leetcodeId: 300, pattern: "LIS — DP + Binary Search", category: "dp" },
      { id: 80, title: "Unique Paths", difficulty: "Medium", leetcodeId: 62, pattern: "2D Grid DP", category: "dp" },
      { id: 81, title: "Jump Game", difficulty: "Medium", leetcodeId: 55, pattern: "Greedy / 1D DP", category: "dp" },
      { id: 82, title: "Jump Game II", difficulty: "Medium", leetcodeId: 45, pattern: "Greedy BFS (Implicit)", category: "dp" },
      { id: 83, title: "Word Break", difficulty: "Medium", leetcodeId: 139, pattern: "String DP / BFS", category: "dp" },
      { id: 84, title: "Longest Common Subsequence", difficulty: "Medium", leetcodeId: 1143, pattern: "2D String DP", category: "dp" },
      { id: 85, title: "Minimum Path Sum", difficulty: "Medium", leetcodeId: 64, pattern: "2D Grid DP", category: "dp" },
      { id: 86, title: "Maximum Product Subarray", difficulty: "Medium", leetcodeId: 152, pattern: "DP — Track Min & Max", category: "dp" },
      { id: 87, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", leetcodeId: 309, pattern: "State Machine DP", category: "dp" },
    ],
  },
];

export const allQuestions: Question[] = categories.flatMap((c) => c.questions);

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
