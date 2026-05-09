export interface CompanySignal {
  tier: string;
  companies: string[];
  confidence: "building" | "solid" | "strong" | "elite";
  note: string;
}

export interface Milestone {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  gradient: string;
  categoryIds: string[];
  questionCount: number;
  conceptsMastered: string[];
  unlocksNext: string;
  companySignals: CompanySignal[];
  badge: string;
}

export const milestones: Milestone[] = [
  {
    id: "m1",
    level: 1,
    title: "Core Patterns",
    subtitle: "Arrays, Hashing, Two Pointers & Sliding Window",
    tagline: "Master the building blocks every algorithm is built on",
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    categoryIds: ["arrays", "two-pointers", "sliding-window"],
    questionCount: 14,
    conceptsMastered: [
      "Hash Map lookups in O(1)",
      "Prefix sum & running totals",
      "Shrink/grow window technique",
      "Two-pointer convergence",
      "Frequency counting",
      "Dutch National Flag (3-way partition)",
    ],
    unlocksNext:
      "You now intuitively reach for a hash map when you need fast lookups. Two-pointer thinking becomes second nature for sorted-array problems — skills you'll apply inside every tree, graph, and string problem ahead.",
    companySignals: [
      {
        tier: "Early-stage Startups",
        companies: ["Notion", "Linear", "Figma", "Vercel", "Supabase"],
        confidence: "solid",
        note: "Junior eng roles at product-focused startups that favour practical problem-solving over algorithm depth.",
      },
      {
        tier: "Mid-size Tech",
        companies: ["Shopify", "Atlassian", "HubSpot", "Twilio", "SendGrid"],
        confidence: "building",
        note: "You'll clear phone screens but will need more depth for onsite loops.",
      },
    ],
  },
  {
    id: "m2",
    level: 2,
    title: "Linear Structures",
    subtitle: "Strings, Stack, Linked List & Binary Search",
    tagline: "Control memory and master logarithmic thinking",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/5",
    categoryIds: ["strings", "stack", "linked-list", "binary-search"],
    questionCount: 20,
    conceptsMastered: [
      "Expand-around-center for palindromes",
      "Length-prefix string encoding",
      "Monotonic stack for next-greater problems",
      "Fast/slow pointer cycle detection",
      "Binary search on answer space (not just arrays)",
      "Floyd's cycle detection algorithm",
      "Stack-based expression evaluation",
    ],
    unlocksNext:
      "You can now reason about pointer manipulation and log-time search. These are prerequisites for tree traversal (trees are just recursive linked structures) and graph shortest-path algorithms that come in milestone 3 and 4.",
    companySignals: [
      {
        tier: "Product Companies",
        companies: ["Dropbox", "Stripe", "Square", "Coinbase", "Robinhood"],
        confidence: "solid",
        note: "Enough to pass most full interview loops at well-run product companies.",
      },
      {
        tier: "Big Tech (screening)",
        companies: ["Microsoft", "Apple", "LinkedIn", "Salesforce", "Adobe"],
        confidence: "building",
        note: "You'll pass phone screens at most Tier-2 FAANG-adjacent companies. Onsite loops need trees and graphs.",
      },
    ],
  },
  {
    id: "m3",
    level: 3,
    title: "Tree Mastery",
    subtitle: "Binary Trees, BSTs & Recursive Thinking",
    tagline: "The single biggest skill jump — recursive decomposition",
    color: "#22c55e",
    gradient: "from-green-500/20 to-green-600/5",
    categoryIds: ["trees"],
    questionCount: 15,
    conceptsMastered: [
      "BFS level-order traversal (queue)",
      "DFS pre/in/post-order with state",
      "BST properties and invariants",
      "Recursive tree construction from traversals",
      "Lowest Common Ancestor patterns",
      "Prefix sum + DFS for path problems",
      "Serialization & subtree fingerprinting",
      "Parent-pointer BFS trick",
    ],
    unlocksNext:
      "Trees are graphs without cycles. Every tree pattern (BFS, DFS, parent maps) transfers directly to graphs. Recursive thinking you build here powers backtracking completely. This is the hardest conceptual leap in the roadmap.",
    companySignals: [
      {
        tier: "FAANG — Junior / New Grad",
        companies: ["Amazon", "Meta", "Apple", "Microsoft"],
        confidence: "solid",
        note: "Trees are the most-asked topic at FAANG new-grad loops. Strong here = solid junior offer potential.",
      },
      {
        tier: "Top Product Companies",
        companies: ["Airbnb", "Lyft", "Uber", "DoorDash", "Instacart"],
        confidence: "strong",
        note: "You can now confidently handle most of the interview loop at top-tier unicorns.",
      },
      {
        tier: "Mid-size & Growth Stage",
        companies: ["Figma", "Notion", "Canva", "Airtable", "Asana"],
        confidence: "elite",
        note: "You'll comfortably clear full interview loops at high-growth companies.",
      },
    ],
  },
  {
    id: "m4",
    level: 4,
    title: "Graph Algorithms",
    subtitle: "BFS, DFS, Union-Find, Topo Sort & Dijkstra",
    tagline: "Think in systems — model anything as a graph",
    color: "#ef4444",
    gradient: "from-red-500/20 to-red-600/5",
    categoryIds: ["graphs"],
    questionCount: 14,
    conceptsMastered: [
      "Multi-source BFS (flood fill from multiple origins)",
      "Topological sort — DFS & Kahn's (BFS) versions",
      "Union-Find with path compression & rank",
      "Cycle detection in directed & undirected graphs",
      "Dijkstra's algorithm with a min-heap",
      "Graph coloring for bipartite detection",
      "Implicit graph BFS (word ladder, state-space search)",
      "Border-DFS reverse thinking pattern",
    ],
    unlocksNext:
      "You can now model real-world systems as graphs and apply the right traversal strategy. Combined with trees, you have the full recursion + search toolkit. Heaps and greedy in milestone 5 layer in optimal decision-making on top.",
    companySignals: [
      {
        tier: "FAANG — Mid-level",
        companies: ["Google", "Meta", "Amazon", "Apple", "Netflix"],
        confidence: "strong",
        note: "Graphs are heavily tested at L4/L5 at Google and Meta. Reaching this milestone puts you in range for mid-level offers.",
      },
      {
        tier: "FAANG — Junior",
        companies: ["Google", "Meta"],
        confidence: "elite",
        note: "You're now above the bar for most Google and Meta junior roles.",
      },
      {
        tier: "Quant & Finance Tech (entry)",
        companies: ["Jane Street", "Two Sigma", "Citadel", "Hudson River Trading"],
        confidence: "building",
        note: "You'll pass initial screens. Quant firms go deeper on algorithms — milestone 5 helps here.",
      },
    ],
  },
  {
    id: "m5",
    level: 5,
    title: "Advanced Patterns",
    subtitle: "Heap, Greedy & Backtracking",
    tagline: "Optimize, schedule, and explore the full solution space",
    color: "#a855f7",
    gradient: "from-purple-500/20 to-purple-600/5",
    categoryIds: ["heap", "greedy", "backtracking"],
    questionCount: 11,
    conceptsMastered: [
      "Min/max heap for top-K and scheduling",
      "Quickselect (O(n) order statistics)",
      "Greedy proof — why local optimal = global optimal",
      "Interval merging & scheduling",
      "Backtracking template with pruning",
      "State space tree traversal",
      "Combination/permutation generation",
      "Custom comparator design",
    ],
    unlocksNext:
      "This is the capstone milestone. You've covered the most-tested algorithm patterns across all major tech interviews. Dynamic Programming (intentionally excluded here) is your natural next step — everything in DP builds on the recursive thinking you've mastered.",
    companySignals: [
      {
        tier: "FAANG — Senior (L5/L6)",
        companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
        confidence: "strong",
        note: "Advanced patterns round out your FAANG prep. Combined with system design, you're ready for senior-loop targeting.",
      },
      {
        tier: "Quant & Hedge Funds",
        companies: ["Jane Street", "Two Sigma", "Citadel", "Optiver", "Jump Trading"],
        confidence: "solid",
        note: "Greedy and backtracking come up heavily in quant technical screens.",
      },
      {
        tier: "Top-tier Startups (Staff / Lead)",
        companies: ["OpenAI", "Anthropic", "Stripe", "Plaid", "Scale AI"],
        confidence: "strong",
        note: "You have the depth to target staff-track or founding-team positions at high-bar startups.",
      },
    ],
  },
  {
    id: "m6",
    level: 6,
    title: "Dynamic Programming",
    subtitle: "1D/2D DP, Knapsack, LIS, LCS & State Machines",
    tagline: "Turn exponential recursion into polynomial elegance",
    color: "#0ea5e9",
    gradient: "from-sky-500/20 to-sky-600/5",
    categoryIds: ["dp"],
    questionCount: 12,
    conceptsMastered: [
      "1D DP — linear & circular (House Robber pattern)",
      "Unbounded knapsack (Coin Change)",
      "0/1 knapsack (Subset sum problems)",
      "LIS with patience sorting O(n log n)",
      "2D grid DP (paths, min cost)",
      "2D string DP — LCS, edit distance family",
      "Greedy-as-DP (Jump Game I & II)",
      "State machine DP (buy/sell/cooldown)",
      "String segmentation DP (Word Break)",
      "DP with min & max tracking simultaneously",
    ],
    unlocksNext:
      "DP completes the core algorithm toolkit. From here, Hard-level interview questions become approachable — most are DP extensions, graph + DP hybrids, or multi-dimensional knapsack variants. System Design is now the main remaining frontier for senior levelling.",
    companySignals: [
      {
        tier: "FAANG — All Levels",
        companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft", "Netflix"],
        confidence: "elite",
        note: "DP is the most-tested advanced topic across all FAANG loops. Completing this milestone puts you above the bar for the vast majority of interview questions at any level.",
      },
      {
        tier: "Quant & Finance Tech",
        companies: ["Jane Street", "Two Sigma", "Citadel", "Optiver", "DE Shaw"],
        confidence: "strong",
        note: "Quant firms heavily test DP and combinatorics. This milestone combined with milestone 4 (graphs) makes you very competitive here.",
      },
      {
        tier: "Top AI / Research Labs",
        companies: ["OpenAI", "Anthropic", "DeepMind", "Waymo", "Scale AI"],
        confidence: "strong",
        note: "Research-adjacent engineering roles at AI labs expect deep algorithmic fluency. A complete roadmap demonstrates exactly that.",
      },
    ],
  },
];

export const confidenceConfig = {
  building: { label: "Building Confidence", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  solid: { label: "Solid Confidence", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  strong: { label: "Strong Confidence", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  elite: { label: "Elite Confidence", color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
};
