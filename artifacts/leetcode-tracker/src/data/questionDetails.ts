export interface QuestionDetail {
  id: number;
  concepts: string[];
  conceptExplanation: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  relatedPatterns: string[];
}

export const questionDetails: Record<number, QuestionDetail> = {
  // ─── Arrays & Hashing ───────────────────────────────────────────────────────
  1: {
    id: 1,
    concepts: ["Hash Map", "String Manipulation", "Sorting"],
    conceptExplanation:
      "A hash map is like a labeled drawer system — you put things in drawers by a 'key' and instantly find them later. Here, the key is the sorted version of a word (so 'eat' and 'tea' both sort to 'aet') and the value is a list of words that share that sorted form.",
    approach:
      "1. Create an empty dictionary.\n2. For each word, sort its letters to get a 'canonical key'.\n3. Append the word to the list at that key.\n4. Return all the lists (values) from the dictionary.",
    timeComplexity: "O(n · k log k) — n words, each sorted in O(k log k)",
    spaceComplexity: "O(n · k) — storing all words in the map",
    relatedPatterns: [
      "Group words by any shared property (hash key = property)",
      "Count character frequencies instead of sorting for O(n·k)",
      "Valid Anagram (#242)",
      "Find All Anagrams in a String (#438)",
    ],
  },
  2: {
    id: 2,
    concepts: ["Hash Map", "Bucket Sort", "Min-Heap"],
    conceptExplanation:
      "Imagine counting how often each word appears in a book. A hash map tallies those counts. 'Top K frequent' means you only care about the K most popular ones — bucket sort groups numbers by their frequency (frequency is the bucket index), so you read from the highest bucket down.",
    approach:
      "1. Count each element's frequency with a dictionary.\n2. Create buckets: bucket[i] holds all elements with frequency i.\n3. Iterate buckets from high to low, collecting elements until you have K.",
    timeComplexity: "O(n) — counting + bucket pass",
    spaceComplexity: "O(n) — bucket array and count map",
    relatedPatterns: [
      "Top K Frequent Words (#692)",
      "K Closest Points to Origin (#973)",
      "Sort Characters By Frequency (#451)",
      "Min-Heap approach: O(n log k)",
    ],
  },
  3: {
    id: 3,
    concepts: ["Prefix Product", "Array Traversal"],
    conceptExplanation:
      "You can't divide (what if there's a zero?), so instead you use 'prefix' and 'suffix' products. For each position, multiply everything to its left (prefix) with everything to its right (suffix). Think of it as two sweeps — one left-to-right, one right-to-left.",
    approach:
      "1. Build a prefix array: prefix[i] = product of all elements before index i.\n2. Build a suffix array: suffix[i] = product of all elements after index i.\n3. answer[i] = prefix[i] * suffix[i].\n4. Optimize: do it in one output array + a running suffix variable.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) extra (output array doesn't count)",
    relatedPatterns: [
      "Trapping Rain Water (prefix max + suffix max)",
      "Running product windows",
      "Subarray Product Less Than K (#713)",
    ],
  },
  4: {
    id: 4,
    concepts: ["Hash Set", "Sequence Detection"],
    conceptExplanation:
      "Put all numbers in a set for O(1) lookup. A sequence can only start from a number that has no left neighbor (n-1 doesn't exist in the set). From each start, keep counting up until the chain breaks. The longest chain wins.",
    approach:
      "1. Add all numbers to a set.\n2. For each number, check if num-1 is NOT in the set (it's a sequence start).\n3. Count how long the consecutive sequence is from that start.\n4. Track the maximum length.",
    timeComplexity: "O(n) — each number is visited at most twice",
    spaceComplexity: "O(n) — the hash set",
    relatedPatterns: [
      "Missing Number (#268)",
      "Find All Numbers Disappeared in an Array (#448)",
      "Arithmetic progressions / consecutive detection",
    ],
  },
  5: {
    id: 5,
    concepts: ["Prefix Sum", "Hash Map"],
    conceptExplanation:
      "Running sum trick: if the sum from index 0 to j is S, and sum from 0 to i is S-k, then the subarray from i+1 to j sums to exactly k. Store 'how many times we've seen each prefix sum' — every time current_sum - k is in the map, we found valid subarrays.",
    approach:
      "1. Keep a running sum and a dictionary {prefix_sum: count}, seeded with {0: 1}.\n2. For each element, add it to the running sum.\n3. If (running_sum - k) is in the dictionary, add that count to the result.\n4. Increment the count for the current running sum.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — the prefix sum map",
    relatedPatterns: [
      "Continuous Subarray Sum (#523)",
      "Subarray Sum Divisible by K (#974)",
      "Binary Subarrays With Sum (#930)",
      "Path Sum III in trees uses same prefix sum idea",
    ],
  },
  6: {
    id: 6,
    concepts: ["Hash Set", "Matrix Validation"],
    conceptExplanation:
      "A valid Sudoku means no row, column, or 3×3 box has duplicate digits 1–9. Use three separate sets for rows, columns, and boxes. The box index for cell (r, c) is (r//3)*3 + (c//3) — this maps 9 boxes to indices 0–8.",
    approach:
      "1. Create sets for rows[9], cols[9], boxes[9].\n2. Iterate all 81 cells; skip empty cells ('.').\n3. Compute box index = (r//3)*3 + (c//3).\n4. If the digit is already in the row/col/box set → invalid.\n5. Otherwise add to all three sets.",
    timeComplexity: "O(1) — fixed 81 cells",
    spaceComplexity: "O(1) — fixed set sizes",
    relatedPatterns: [
      "Solve Sudoku (#37) — backtracking extension",
      "N-Queens (matrix constraint checking)",
    ],
  },

  // ─── Two Pointers ────────────────────────────────────────────────────────────
  7: {
    id: 7,
    concepts: ["Greedy", "Two Pointers"],
    conceptExplanation:
      "Start with the widest container (left pointer at 0, right at end). The area = min(height[l], height[r]) * width. Shrinking the wider wall never helps (width decreases AND height can't improve), so always move the shorter wall inward hoping for a taller one.",
    approach:
      "1. l=0, r=len-1.\n2. Compute area = min(h[l], h[r]) * (r - l). Update max.\n3. Move whichever pointer points to the shorter bar inward.\n4. Repeat until l >= r.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Trapping Rain Water (#42) — per-cell contribution",
      "Two Pointers on sorted array",
      "Greedy: always discard the locally worse option",
    ],
  },
  8: {
    id: 8,
    concepts: ["Sort + Two Pointers", "Duplicate Avoidance"],
    conceptExplanation:
      "Sort first so duplicates are adjacent and you can skip them. Fix one number, then use two pointers on the remainder to find pairs summing to the negative of that number. Move pointers inward, skipping duplicates as you go.",
    approach:
      "1. Sort the array.\n2. For each index i (skip if nums[i] == nums[i-1]):\n   a. l = i+1, r = len-1.\n   b. While l < r: if sum==0 → add triplet, skip duplicates, move both; sum<0 → l++; sum>0 → r--.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1) extra (output list doesn't count)",
    relatedPatterns: [
      "Two Sum II (#167)",
      "4Sum (#18)",
      "Closest 3Sum (#16)",
      "Two Pointers on sorted array pattern",
    ],
  },
  9: {
    id: 9,
    concepts: ["Two Pointers", "In-place Array Modification"],
    conceptExplanation:
      "Allow at most 2 copies of any element. Use a slow pointer (k) for the valid region. For each element, only write it if the element two spots back (nums[k-2]) is different — that ensures at most 2 duplicates.",
    approach:
      "1. k = 0 (slow pointer).\n2. For each num in the array:\n   If k < 2 or nums[k-2] != num → write nums[k] = num, k++.\n3. Return k (new length).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Remove Duplicates from Sorted Array (#26) — allow 1 copy",
      "Generalize: allow at most k copies",
    ],
  },
  10: {
    id: 10,
    concepts: ["Dutch National Flag", "Three-way Partition"],
    conceptExplanation:
      "Sort an array of 0s, 1s, and 2s in one pass without counting. Use three pointers: 'low' (end of 0-region), 'mid' (current element), 'high' (start of 2-region). Swap 0s to the left and 2s to the right; 1s stay in the middle naturally.",
    approach:
      "1. low=0, mid=0, high=n-1.\n2. While mid <= high:\n   - nums[mid]==0 → swap with low, low++, mid++\n   - nums[mid]==1 → mid++\n   - nums[mid]==2 → swap with high, high-- (don't mid++ — newly swapped element is unchecked)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Wiggle Sort",
      "3-way quicksort partition",
      "Any k-color sort (generalize to k partitions)",
    ],
  },

  // ─── Sliding Window ──────────────────────────────────────────────────────────
  11: {
    id: 11,
    concepts: ["Sliding Window", "Hash Set"],
    conceptExplanation:
      "Picture a window sliding over the string. The window grows to the right when the new character is unique, and shrinks from the left when a duplicate is found. A set tracks what's currently inside the window.",
    approach:
      "1. l=0, seen=set(), max_len=0.\n2. For r from 0 to n-1:\n   While s[r] in seen: remove s[l] from seen, l++.\n   Add s[r] to seen. Update max_len = max(max_len, r-l+1).\n3. Return max_len.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, alphabet_size))",
    relatedPatterns: [
      "Longest Substring with At Most K Distinct Characters (#340)",
      "Fruit Into Baskets (#904)",
      "Permutation in String (#567)",
    ],
  },
  12: {
    id: 12,
    concepts: ["Sliding Window", "Frequency Map"],
    conceptExplanation:
      "Key insight: a valid window can have at most one character that appears more than the rest. If window_size - max_freq > k, the window is invalid — shrink from left. You can keep max_freq as a running max (no need to decrease it) because a smaller window with same max_freq won't give a longer answer.",
    approach:
      "1. l=0, max_freq=0, freq=defaultdict(int).\n2. For r from 0 to n-1:\n   freq[s[r]]++; max_freq = max(max_freq, freq[s[r]]).\n   If (r-l+1) - max_freq > k: freq[s[l]]--, l++.\n   Update result = r-l+1.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(26) = O(1) for lowercase letters",
    relatedPatterns: [
      "Longest Subarray with Ones After Replacement (#1004)",
      "Any 'allow K replacements' sliding window",
    ],
  },
  13: {
    id: 13,
    concepts: ["Sliding Window", "Variable Window"],
    conceptExplanation:
      "Find the shortest window whose sum ≥ target. Grow the window right, and as soon as the sum is big enough, record the window size then shrink from the left — you want the minimum, so keep shrinking while still valid.",
    approach:
      "1. l=0, current_sum=0, min_len=infinity.\n2. For r from 0 to n-1:\n   current_sum += nums[r].\n   While current_sum >= target: min_len=min(min_len, r-l+1), current_sum-=nums[l], l++.\n3. Return min_len (or 0 if infinity).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Minimum Window Substring (#76) — character version",
      "Shortest Subarray with Sum at Least K (#862) — handles negatives with deque",
    ],
  },
  14: {
    id: 14,
    concepts: ["Sliding Window", "Frequency Map", "Anagram Detection"],
    conceptExplanation:
      "A permutation of s1 inside s2 means some window of s2 has the exact same character counts as s1. Use a fixed-size window (length of s1) and slide it across s2, comparing frequency maps.",
    approach:
      "1. Count frequencies in s1. Maintain a window frequency map in s2.\n2. Use 'matches' counter = number of chars with equal counts.\n3. Slide window: add right char, remove left char, update matches accordingly.\n4. If matches == 26 (all chars match), return True.",
    timeComplexity: "O(n) — n = len(s2)",
    spaceComplexity: "O(1) — two fixed-size arrays of 26",
    relatedPatterns: [
      "Find All Anagrams in a String (#438) — same idea, collect all positions",
      "Minimum Window Substring (#76) — variable window version",
    ],
  },

  // ─── Strings ─────────────────────────────────────────────────────────────────
  15: {
    id: 15,
    concepts: ["Expand Around Center", "Dynamic Programming"],
    conceptExplanation:
      "Every palindrome has a center. Expand outward from each possible center (either a single character or between two characters) as long as the characters match. The widest valid expansion is your palindrome.",
    approach:
      "1. For each index i, try two centers: single char (i, i) and between chars (i, i+1).\n2. Expand while left >= 0 and right < n and s[l]==s[r].\n3. Track the longest palindrome seen.\n4. Return the substring.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1) (Manacher's gives O(n) time)",
    relatedPatterns: [
      "Palindromic Substrings (#647) — count all palindromes",
      "Longest Palindromic Subsequence (#516) — DP approach",
      "Manacher's Algorithm for O(n)",
    ],
  },
  16: {
    id: 16,
    concepts: ["Expand Around Center", "Counting"],
    conceptExplanation:
      "Same expand-around-center as Longest Palindromic Substring, but instead of tracking the longest, count every valid palindrome (every successful expansion = +1 palindrome).",
    approach:
      "1. For each center (single and between-pair), expand outward.\n2. Each successful expansion adds 1 to the count.\n3. Return total count.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Longest Palindromic Substring (#5)",
      "Count Substrings That Differ by One Character (#1638)",
    ],
  },
  17: {
    id: 17,
    concepts: ["String Encoding", "Length-Prefix Protocol"],
    conceptExplanation:
      "You need to encode a list of strings into ONE string and decode it back. The trick: prefix each word with its length and a delimiter (e.g., '4#word'). Since you know the length, you can skip over any '#' characters that appear inside words.",
    approach:
      "Encode: for each word, write len(word) + '#' + word.\nDecode: scan with a pointer. Read digits until '#' to get length L. The next L characters are the word. Move pointer by L.",
    timeComplexity: "O(n) encode and decode",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Serialize and Deserialize Binary Tree (#297) — same length-prefix idea",
      "Protocol Buffers / network serialization in real systems",
    ],
  },
  18: {
    id: 18,
    concepts: ["Sliding Window", "Frequency Map", "Anagram Detection"],
    conceptExplanation:
      "Same as Permutation in String but you collect all starting indices instead of returning True/False. Slide a fixed window of size len(p) across s, comparing character counts at each position.",
    approach:
      "1. Build freq map for p. Maintain window freq map for s.\n2. Track 'matches' (how many chars have equal counts).\n3. Slide window: update counts and matches.\n4. When matches == 26, record the left pointer.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — two 26-element arrays",
    relatedPatterns: [
      "Permutation in String (#567) — boolean version",
      "Minimum Window Substring (#76) — variable window",
    ],
  },
  19: {
    id: 19,
    concepts: ["Sliding Window", "Variable Window", "Two Pointers"],
    conceptExplanation:
      "Find the smallest window in s that contains all characters of t. Grow the window right until all required characters are covered, then shrink from the left as much as possible. Record the smallest valid window seen.",
    approach:
      "1. Count needed chars from t. Use 'have' and 'need' counters.\n2. Expand r: when a char's count matches requirement, increment 'have'.\n3. When have==need: record window, shrink from l; if a char drops below needed, decrement 'have', stop shrinking.\n4. Repeat.",
    timeComplexity: "O(n + m) — n=len(s), m=len(t)",
    spaceComplexity: "O(m) — character counts for t",
    relatedPatterns: [
      "Find All Anagrams in a String (#438) — fixed window",
      "Smallest Subarray With All Occurrences of a Most Frequent Element",
      "Sliding window with 'at least k distinct' constraints",
    ],
  },
  20: {
    id: 20,
    concepts: ["String DP", "Digit Grouping"],
    conceptExplanation:
      "Like climbing stairs but with rules. Each digit or valid pair of digits (10–26) can be decoded. Think of it as: at each position, you can take 1 step (current digit) or 2 steps (current + previous digit, if it forms 10–26). DP tracks the count of valid decodings.",
    approach:
      "1. dp[0]=1 (empty string), dp[1]=1 if s[0]!='0' else 0.\n2. For i from 2 to n:\n   one_digit = int(s[i-1]) → add dp[i-1] if 1–9.\n   two_digit = int(s[i-2:i]) → add dp[i-2] if 10–26.\n3. Return dp[n].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — only need two previous values",
    relatedPatterns: [
      "Climbing Stairs (#70) — same DP skeleton",
      "Decode Ways II (#639) — with wildcards",
      "Letter Combinations of a Phone Number (#17)",
    ],
  },
  21: {
    id: 21,
    concepts: ["Two Pointers", "String In-place Reversal"],
    conceptExplanation:
      "Split the string into words, reverse the entire list of words, then rejoin. Or: reverse the whole string, then reverse each word individually. The key insight is that reversing at two levels (whole string + each word) gives the reversed word order.",
    approach:
      "1. Split on whitespace (handles multiple spaces).\n2. Reverse the list of words.\n3. Join with single spaces.\nAlternative in-place: strip, reverse all chars, then reverse each word individually.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Rotate Array (#189) — same reverse-then-reverse technique",
      "Reverse String (#344)",
      "Reverse Words in a String III (#557)",
    ],
  },
  22: {
    id: 22,
    concepts: ["Stack", "Path Normalization"],
    conceptExplanation:
      "A Unix path like '/a/b/../c/./d' needs to be simplified. Use a stack: push real directory names, pop on '..', ignore '.' and empty parts. At the end, join the stack with '/'.",
    approach:
      "1. Split the path by '/'.\n2. Use a stack:\n   - '' or '.' → skip\n   - '..' → pop if stack not empty\n   - anything else → push\n3. Return '/' + '/'.join(stack).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Evaluate Reverse Polish Notation (#150) — stack simulation",
      "Basic Calculator (#224)",
      "File path normalization in OS internals",
    ],
  },

  // ─── Stack ────────────────────────────────────────────────────────────────────
  23: {
    id: 23,
    concepts: ["Stack Simulation", "Arithmetic"],
    conceptExplanation:
      "RPN (postfix notation) removes the need for parentheses. Numbers go onto a stack; operators pop the top two numbers, compute, and push the result. Like using an old HP calculator.",
    approach:
      "1. Use a stack.\n2. For each token:\n   - If number → push.\n   - If operator (+,-,*,/) → pop b, pop a, compute a OP b, push result.\n   Note: division truncates toward zero (int(a/b) in Python).\n3. Return stack[0].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Basic Calculator (#224) — infix with parentheses",
      "Basic Calculator II (#227)",
      "Shunting Yard algorithm (infix → postfix conversion)",
    ],
  },
  24: {
    id: 24,
    concepts: ["Backtracking", "Recursion", "String Building"],
    conceptExplanation:
      "Build the parentheses string character by character. At any point you can add '(' if you haven't used all n open brackets, or ')' if the number of close brackets is less than open brackets so far. Backtrack when the string is complete.",
    approach:
      "1. Recursive function with (current_string, open_count, close_count).\n2. Base: if len == 2n, add to results.\n3. If open < n → recurse with '(' added.\n4. If close < open → recurse with ')' added.",
    timeComplexity: "O(4^n / √n) — Catalan number",
    spaceComplexity: "O(n) — recursion depth",
    relatedPatterns: [
      "Combination Sum (#39) — general backtracking",
      "Permutations (#46)",
      "All valid parentheses → Catalan number family",
    ],
  },
  25: {
    id: 25,
    concepts: ["Monotonic Stack", "Next Greater Element"],
    conceptExplanation:
      "A monotonic (decreasing) stack keeps track of temperatures waiting for a warmer day. When a new temperature is warmer than the stack's top, that top's wait is over — the answer is today's index minus its index. Temperatures still waiting stay on the stack.",
    approach:
      "1. Stack stores indices of temperatures (not values).\n2. For each i:\n   While stack and temperatures[i] > temperatures[stack[-1]]:\n     j = stack.pop(); result[j] = i - j.\n   Push i.\n3. Remaining items in stack → result stays 0.",
    timeComplexity: "O(n) — each index pushed and popped once",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Next Greater Element I & II (#496, #503)",
      "Largest Rectangle in Histogram (#84) — monotonic increasing stack",
      "Stock Span Problem",
    ],
  },

  // ─── Binary Search ────────────────────────────────────────────────────────────
  26: {
    id: 26,
    concepts: ["Binary Search", "Rotated Array"],
    conceptExplanation:
      "In a rotated sorted array, one half is always fully sorted. The minimum is the only element smaller than its left neighbor — it's where the rotation happened. Binary search toward the 'unsorted' half.",
    approach:
      "1. l=0, r=n-1.\n2. While l < r:\n   mid = (l+r)//2.\n   If nums[mid] > nums[r] → min is in right half, l=mid+1.\n   Else → min is in left half (including mid), r=mid.\n3. Return nums[l].",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Search in Rotated Sorted Array (#33)",
      "Find Minimum in Rotated Sorted Array II (#154) — with duplicates",
    ],
  },
  27: {
    id: 27,
    concepts: ["Binary Search", "Rotated Array", "Conditional Halving"],
    conceptExplanation:
      "Determine which half is sorted, then check if the target could be in the sorted half. If yes, search there; if no, search the other half. This keeps the binary search structure despite the rotation.",
    approach:
      "1. l=0, r=n-1.\n2. While l<=r: mid=(l+r)//2.\n   If nums[mid]==target → return mid.\n   If left half sorted (nums[l]<=nums[mid]):\n     If nums[l]<=target<nums[mid]: r=mid-1 else l=mid+1.\n   Else right half sorted:\n     If nums[mid]<target<=nums[r]: l=mid+1 else r=mid-1.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Find Minimum in Rotated Sorted Array (#153)",
      "Search in Rotated Sorted Array II (#81) — with duplicates",
    ],
  },
  28: {
    id: 28,
    concepts: ["Binary Search on Answer Space"],
    conceptExplanation:
      "Instead of searching in an array, search for the answer itself. 'Can Koko eat all bananas in H hours if she eats k per hour?' — binary search on k. Check if a given eating speed k is feasible in O(n).",
    approach:
      "1. lo=1, hi=max(piles).\n2. While lo < hi:\n   mid=(lo+hi)//2.\n   hours = sum(ceil(p/mid) for p in piles).\n   If hours <= h: hi=mid (mid might be valid, try smaller).\n   Else: lo=mid+1.\n3. Return lo.",
    timeComplexity: "O(n log m) — m = max pile",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Minimum Speed to Arrive on Time (#1870)",
      "Capacity to Ship Packages Within D Days (#1011)",
      "Split Array Largest Sum (#410)",
      "'Minimize the maximum' or 'maximize the minimum' problems → binary search on answer",
    ],
  },
  29: {
    id: 29,
    concepts: ["Binary Search", "Hash Map", "Design"],
    conceptExplanation:
      "A key-value store where each key has multiple timestamped values. For a given timestamp, you want the value with the largest timestamp ≤ query. Binary search on the list of (timestamp, value) pairs stored per key.",
    approach:
      "Set: store (timestamp, value) in a list per key.\nGet: binary search that list for the largest timestamp ≤ query using bisect_right.",
    timeComplexity: "Set: O(1). Get: O(log n)",
    spaceComplexity: "O(n) — all stored values",
    relatedPatterns: [
      "Binary search on sorted list (bisect module in Python)",
      "Snapshot Array (#1146)",
      "Design pattern: sorted list + binary search for range queries",
    ],
  },
  30: {
    id: 30,
    concepts: ["Binary Search", "Matrix Flattening"],
    conceptExplanation:
      "An m×n matrix with sorted rows and first element of each row > last element of previous row is essentially a sorted 1D array. Map a 1D index mid to 2D: row = mid // n, col = mid % n. Run standard binary search.",
    approach:
      "1. lo=0, hi=m*n-1.\n2. While lo<=hi: mid=(lo+hi)//2.\n   val = matrix[mid//n][mid%n].\n   If val==target: return True.\n   If val<target: lo=mid+1.\n   Else: hi=mid-1.\n3. Return False.",
    timeComplexity: "O(log(m·n))",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Search a 2D Matrix II (#240) — not fully sorted, use staircase search",
      "Binary search on any monotone mapping",
    ],
  },

  // ─── Linked List ─────────────────────────────────────────────────────────────
  31: {
    id: 31,
    concepts: ["Fast/Slow Pointers", "List Reversal", "Merge"],
    conceptExplanation:
      "Three-step recipe: (1) Find the middle with fast/slow pointers. (2) Reverse the second half. (3) Interleave the two halves. Like zipping two lists together — take one from the first, one from the reversed second, repeat.",
    approach:
      "1. Find mid with slow/fast pointers.\n2. Reverse from mid+1 to end.\n3. Merge: pointer p1 at head, p2 at reversed start. Alternate next pointers.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Palindrome Linked List (#234) — same find-mid + reverse pattern",
      "Merge Two Sorted Lists (#21)",
    ],
  },
  32: {
    id: 32,
    concepts: ["Fast/Slow Pointers", "N-th from End"],
    conceptExplanation:
      "Send a fast pointer N steps ahead. Then move both at the same pace — when fast hits the end, slow is exactly at the node to remove. Use a dummy head to handle edge cases (removing the first node).",
    approach:
      "1. Create dummy node pointing to head.\n2. fast = dummy; advance fast N+1 steps.\n3. slow = dummy; advance both until fast is None.\n4. slow.next = slow.next.next.\n5. Return dummy.next.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Middle of the Linked List (#876)",
      "K-th element from end pattern",
      "Reorder List (#143)",
    ],
  },
  33: {
    id: 33,
    concepts: ["Hash Map", "Deep Copy", "Graph Cloning"],
    conceptExplanation:
      "You can't just copy nodes — the random pointer might point to a node you haven't created yet. Use a dictionary mapping old_node → new_node. First pass: create all new nodes. Second pass: assign .next and .random using the map.",
    approach:
      "1. Dictionary: old_node → new_node.\n2. First pass: create all new nodes (no pointers yet).\n3. Second pass: set new_node.next = map[old.next], new_node.random = map[old.random].\n4. Return map[head].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — the hash map",
    relatedPatterns: [
      "Clone Graph (#133) — same hash map cloning pattern",
      "O(1) space trick: interleave copied nodes in original list",
    ],
  },
  34: {
    id: 34,
    concepts: ["Carry Simulation", "Digit-by-Digit Addition"],
    conceptExplanation:
      "Simulate grade-school addition. Traverse both lists simultaneously, adding digits plus any carry from the previous position. When the sum ≥ 10, the carry becomes 1. Keep going until both lists are exhausted AND carry is 0.",
    approach:
      "1. dummy → result list. carry=0.\n2. While l1 or l2 or carry:\n   val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry.\n   carry = val // 10; digit = val % 10.\n   Append digit node; advance l1, l2.\n3. Return dummy.next.",
    timeComplexity: "O(max(m, n))",
    spaceComplexity: "O(max(m, n)) — result list",
    relatedPatterns: [
      "Plus One (#66)",
      "Multiply Strings (#43)",
      "Add Binary (#67)",
    ],
  },
  35: {
    id: 35,
    concepts: ["Floyd's Cycle Detection", "Two Pointers"],
    conceptExplanation:
      "Phase 1: fast and slow pointers meet inside the cycle. Phase 2: reset one pointer to head. Move both one step at a time — they meet exactly at the cycle's start. This is a mathematical property of Floyd's algorithm.",
    approach:
      "1. slow=fast=head.\n2. Phase 1: while True: slow=slow.next; fast=fast.next.next. If slow==fast: break.\n3. Phase 2: slow=head. While slow!=fast: slow=slow.next; fast=fast.next.\n4. Return slow (cycle start).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Linked List Cycle (#141) — just detection",
      "Happy Number (#202) — cycle in number sequence",
      "Find the Duplicate Number (#287) — array as linked list",
    ],
  },

  // ─── Trees ────────────────────────────────────────────────────────────────────
  36: {
    id: 36,
    concepts: ["BFS", "Queue"],
    conceptExplanation:
      "Visit the tree level by level using a queue. At each level, process all nodes currently in the queue (snapshot the size), collect their values, and enqueue their children for the next level.",
    approach:
      "1. Queue with root. result=[].\n2. While queue:\n   level=[], level_size=len(queue).\n   For _ in range(level_size): node=queue.popleft(); level.append(node.val); enqueue children.\n   result.append(level).\n3. Return result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — the queue",
    relatedPatterns: [
      "Binary Tree Zigzag Level Order (#103)",
      "Right Side View (#199)",
      "BFS template: process level by level",
    ],
  },
  37: {
    id: 37,
    concepts: ["BFS", "Rightmost Node per Level"],
    conceptExplanation:
      "The 'right side view' is just the last node you see at each level. Use BFS level-order and take the last node of each level, OR use DFS and keep a list indexed by depth — update it each time you go deeper (right child visited last overwrites left).",
    approach:
      "BFS: same as level order, just record the last element of each level.\nDFS: right_view[depth] = node.val; recurse left then right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Binary Tree Level Order Traversal (#102)",
      "Deepest Leaves Sum (#1302)",
    ],
  },
  38: {
    id: 38,
    concepts: ["BFS", "Deque", "Zigzag"],
    conceptExplanation:
      "Level order traversal with a twist — odd levels go left-to-right, even levels go right-to-left. Use a deque for each level: appendleft vs append based on direction. Flip direction each level.",
    approach:
      "1. BFS with level snapshots. Toggle direction flag each level.\n2. If left-to-right: normal append; if right-to-left: appendleft (or just reverse the level list).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Binary Tree Level Order Traversal (#102)",
      "Spiral Matrix — similar alternating direction",
    ],
  },
  39: {
    id: 39,
    concepts: ["DFS", "Running Maximum"],
    conceptExplanation:
      "A 'good node' is one where no node on the path from root to it is greater than it. DFS carries the maximum seen so far. If the current node's value ≥ running max, it's good. Update the running max for children.",
    approach:
      "1. DFS(node, max_so_far):\n   If node is None: return 0.\n   good = 1 if node.val >= max_so_far else 0.\n   new_max = max(max_so_far, node.val).\n   return good + DFS(left, new_max) + DFS(right, new_max).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) — recursion stack (h = height)",
    relatedPatterns: [
      "Path Sum (#112) — DFS with running sum",
      "Maximum Depth of Binary Tree",
    ],
  },
  40: {
    id: 40,
    concepts: ["DFS", "BST Property", "Bounds Checking"],
    conceptExplanation:
      "A BST requires every node in its left subtree to be less than it AND every ancestor to the right. Track valid range [min, max] that the current node's value must fall within. Root: (-∞, +∞). Go left: max becomes parent's value. Go right: min becomes parent's value.",
    approach:
      "1. DFS(node, min_val, max_val):\n   If None: return True.\n   If not min_val < node.val < max_val: return False.\n   return DFS(left, min_val, node.val) and DFS(right, node.val, max_val).\n2. Call with (-inf, +inf).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedPatterns: [
      "Recover Binary Search Tree (#99)",
      "BST insertion and deletion",
      "Inorder traversal of BST gives sorted sequence",
    ],
  },
  41: {
    id: 41,
    concepts: ["BST Inorder Traversal", "Counting"],
    conceptExplanation:
      "Inorder traversal (left → root → right) of a BST visits nodes in ascending order. The Kth node visited is the Kth smallest. Use a counter and stop early when count reaches K.",
    approach:
      "1. counter=0, result=None.\n2. Inorder DFS:\n   Recurse left; counter++; if counter==k: save result and return;\n   Recurse right.\n3. Return result.",
    timeComplexity: "O(h + k) — O(n) worst case",
    spaceComplexity: "O(h)",
    relatedPatterns: [
      "BST Iterator (#173) — inorder with O(h) space",
      "Convert BST to Greater Tree (#538)",
    ],
  },
  42: {
    id: 42,
    concepts: ["Recursive Tree Construction", "Index Mapping"],
    conceptExplanation:
      "Preorder tells you the root first. Find that root in inorder — everything left of it is the left subtree, everything right is the right subtree. Recurse with those slices. Use a hash map for O(1) inorder lookups.",
    approach:
      "1. Map inorder values → index.\n2. preorder[0] is the root. Find its index in inorder.\n3. Left subtree size = inorder_index - inorder_start.\n4. Recurse: build_left with preorder[1 : 1+left_size], build_right with the rest.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — hash map",
    relatedPatterns: [
      "Construct Binary Tree from Inorder and Postorder (#106)",
      "Serialize and Deserialize Binary Tree (#297)",
    ],
  },
  43: {
    id: 43,
    concepts: ["DFS Post-order", "Ancestor Finding"],
    conceptExplanation:
      "Post-order DFS: process children before the current node. If a node is p or q, return it. If both children return non-null, the current node is the LCA. If only one side returns, propagate that up — the LCA is somewhere above.",
    approach:
      "1. DFS(node):\n   If None or node==p or node==q: return node.\n   left = DFS(node.left); right = DFS(node.right).\n   If left and right: return node (this is LCA).\n   return left or right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedPatterns: [
      "LCA of a BST (#235) — faster using BST property",
      "Smallest Common Region",
      "LCA in graphs with parent pointers",
    ],
  },
  44: {
    id: 44,
    concepts: ["DFS", "Prefix Sum", "Hash Map"],
    conceptExplanation:
      "Count paths summing to target — paths don't need to start at the root. Use a prefix sum (running sum from root) + hash map. If current_sum - target exists in the map, there's a valid path ending here. Reset map state after returning from a subtree (backtrack).",
    approach:
      "1. DFS(node, current_sum, prefix_count):\n   If None: return 0.\n   current_sum += node.val.\n   count = prefix_count.get(current_sum - target, 0).\n   prefix_count[current_sum] += 1.\n   count += DFS(left) + DFS(right).\n   prefix_count[current_sum] -= 1 (backtrack).\n   return count.\n2. Seed prefix_count={0:1}.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — hash map",
    relatedPatterns: [
      "Subarray Sum Equals K (#560) — same prefix sum pattern on array",
      "Path Sum I & II (#112, #113) — root-to-leaf only",
    ],
  },
  45: {
    id: 45,
    concepts: ["DFS", "Tree to Linked List", "Right-child Threading"],
    conceptExplanation:
      "Flatten the tree into a linked list following preorder (root, left, right). Key insight: find the rightmost node of the left subtree, attach the right subtree to it, then move the left subtree to become the right child. Repeat for each node.",
    approach:
      "Iterative (Morris-like):\n1. cur = root.\n2. While cur:\n   If cur.left: find rightmost of left subtree (predecessor).\n   predecessor.right = cur.right; cur.right = cur.left; cur.left = None.\n   cur = cur.right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Morris Traversal (inorder/preorder without stack)",
      "Convert BST to Doubly Linked List",
    ],
  },
  46: {
    id: 46,
    concepts: ["BFS", "Next Pointer", "O(1) Space"],
    conceptExplanation:
      "The 'next' pointer links nodes at the same level. Since it's a perfect binary tree, you can traverse level N using existing next pointers to set up level N+1. Use a 'leftmost' pointer to know where each level starts.",
    approach:
      "1. leftmost = root. While leftmost.left (not leaf level):\n   cur = leftmost.\n   While cur:\n     cur.left.next = cur.right.\n     If cur.next: cur.right.next = cur.next.left.\n     cur = cur.next.\n   leftmost = leftmost.left.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Populating Next Right Pointers in Each Node II (#117) — imperfect tree",
      "Level order BFS generalizes this",
    ],
  },
  47: {
    id: 47,
    concepts: ["DFS", "Running Accumulator", "Leaf Detection"],
    conceptExplanation:
      "At each node, multiply the accumulated number by 10 and add the current digit (like building a decimal number left to right). When you hit a leaf, add the final number to the total sum.",
    approach:
      "1. DFS(node, current_num):\n   If None: return 0.\n   current_num = current_num * 10 + node.val.\n   If leaf: return current_num.\n   return DFS(left, current_num) + DFS(right, current_num).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedPatterns: [
      "Path Sum (#112, #113) — similar DFS with accumulator",
      "Binary Tree Paths (#257)",
    ],
  },
  48: {
    id: 48,
    concepts: ["DFS", "Parent Map", "BFS from Target"],
    conceptExplanation:
      "The tree only has downward edges, so distance K might go 'up'. First, DFS to build a parent map (child → parent). Then BFS from the target node outward in all directions (left, right, parent) stopping at distance K.",
    approach:
      "1. DFS to build parent_map.\n2. BFS from target with a visited set.\n3. At each step, expand to left child, right child, and parent.\n4. After K steps, collect all remaining nodes.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Adding parent pointers converts tree to graph → standard BFS",
      "Find Leaves of Binary Tree",
    ],
  },
  49: {
    id: 49,
    concepts: ["BFS", "Node Indexing"],
    conceptExplanation:
      "Assign indices to nodes: root=1, left child of node i = 2i, right child = 2i+1 (like a heap array). The width of a level = rightmost_index - leftmost_index + 1. To prevent integer overflow, normalize indices at the start of each level.",
    approach:
      "1. BFS: queue holds (node, index).\n2. At each level, record first and last index. Width = last - first + 1.\n3. Normalize: subtract the first index of each level from all indices at that level.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Heap indexing (parent/child relationship)",
      "Complete Binary Tree Inserter (#919)",
    ],
  },
  50: {
    id: 50,
    concepts: ["DFS", "Tree Serialization", "Hash Map"],
    conceptExplanation:
      "Serialize each subtree into a unique string (postorder: left_serial, right_serial, root_val). Store each serialization in a map. If a serialization appears twice, that subtree is a duplicate — add its root to results.",
    approach:
      "1. DFS returns a serialized string for each subtree.\n2. Format: 'left_str,right_str,val'.\n3. Use a Counter or dict. If count becomes 2, add root to result list.",
    timeComplexity: "O(n²) naive (string hashing), O(n) with integer IDs",
    spaceComplexity: "O(n²) — storing serialized strings",
    relatedPatterns: [
      "Serialize and Deserialize Binary Tree (#297)",
      "Encode and Decode Strings (#271)",
    ],
  },

  // ─── Graphs ───────────────────────────────────────────────────────────────────
  51: {
    id: 51,
    concepts: ["DFS", "Grid Traversal", "Flood Fill"],
    conceptExplanation:
      "Every time you find a '1', that's the start of an island. DFS outward to mark all connected '1's as visited (change to '0' or use a visited set). Count how many times you start a new DFS.",
    approach:
      "1. For each cell (r, c): if grid[r][c]=='1':\n   count++; DFS to mark all connected land as '0'.\n2. DFS: if out of bounds or '0' → return. Mark '0'. Recurse in 4 directions.",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n) — recursion stack in worst case",
    relatedPatterns: [
      "Max Area of Island (#695) — count cells per island",
      "Flood Fill (#733)",
      "Number of Provinces (#547) — adjacency list version",
    ],
  },
  52: {
    id: 52,
    concepts: ["DFS", "Hash Map", "Graph Deep Copy"],
    conceptExplanation:
      "Like copying a linked list with random pointers. Use a dictionary mapping old_node → new_node. For each node, if already in the map, return the copy. Otherwise create a new node, add to map, then recursively copy all neighbors.",
    approach:
      "1. visited = {}.\n2. DFS(node):\n   If node in visited: return visited[node].\n   clone = Node(node.val); visited[node] = clone.\n   For neighbor in node.neighbors: clone.neighbors.append(DFS(neighbor)).\n   return clone.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) — visited map",
    relatedPatterns: [
      "Copy List with Random Pointer (#138)",
      "Any deep copy of a graph/cyclic structure",
    ],
  },
  53: {
    id: 53,
    concepts: ["DFS", "Grid Traversal", "Area Counting"],
    conceptExplanation:
      "Same as Number of Islands but instead of just counting islands, count their cells and return the max. DFS returns the size of each island it explores.",
    approach:
      "1. For each unvisited land cell, DFS to count the island's area.\n2. Track the maximum area seen.",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    relatedPatterns: [
      "Number of Islands (#200)",
      "Flood Fill (#733)",
      "Making a Large Island (#827) — union-find extension",
    ],
  },
  54: {
    id: 54,
    concepts: ["Multi-source BFS", "Reverse Thinking"],
    conceptExplanation:
      "Instead of asking 'can water flow from here to both oceans?', ask 'which cells can the ocean reach?' BFS inward from all Pacific border cells, and separately from all Atlantic border cells. The answer is the intersection.",
    approach:
      "1. Multi-source BFS from all Pacific border cells (top row + left col).\n2. Multi-source BFS from all Atlantic border cells (bottom row + right col).\n3. Return cells reachable by both BFS runs.",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    relatedPatterns: [
      "Rotting Oranges (#994) — multi-source BFS",
      "01 Matrix (#542)",
      "'Work backward from the goal' pattern",
    ],
  },
  55: {
    id: 55,
    concepts: ["DFS", "Border-connected Region"],
    conceptExplanation:
      "Any 'O' connected to the border can't be surrounded. DFS/BFS from all border 'O's and mark them safe. After that, any remaining 'O' is surrounded — flip to 'X'. Restore the safe ones.",
    approach:
      "1. DFS from every 'O' on the border, marking them as 'S' (safe).\n2. Scan the whole grid: 'O' → 'X', 'S' → 'O'.",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    relatedPatterns: [
      "Number of Islands (#200)",
      "Pacific Atlantic Water Flow (#417) — multi-source from border",
    ],
  },
  56: {
    id: 56,
    concepts: ["Multi-source BFS", "Shortest Path"],
    conceptExplanation:
      "All rotten oranges rot neighbors simultaneously. This is exactly multi-source BFS. Start with all rotten oranges in the queue, expand one minute at a time. The answer is the number of BFS rounds needed.",
    approach:
      "1. Enqueue all initially rotten oranges, count fresh ones.\n2. BFS: each round, rot all queue neighbors; decrement fresh count.\n3. If fresh == 0: return rounds. Else return -1.",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    relatedPatterns: [
      "01 Matrix (#542)",
      "Walls and Gates (#286)",
      "Any 'spread from multiple sources simultaneously' problem",
    ],
  },
  57: {
    id: 57,
    concepts: ["Topological Sort", "Cycle Detection", "DFS Coloring"],
    conceptExplanation:
      "Can you take all courses given prerequisites? This is cycle detection in a directed graph. If there's a cycle, it's impossible. Use DFS with 3 states: unvisited, visiting (in current DFS path), visited. If you reach a 'visiting' node, there's a cycle.",
    approach:
      "1. Build adjacency list.\n2. DFS with states [0=unvisited, 1=visiting, 2=visited].\n3. If state[node]==1 → cycle detected → return False.\n4. If state[node]==2 → already safe → return True.\n5. Mark 1, recurse neighbors, mark 2.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    relatedPatterns: [
      "Course Schedule II (#210) — return the order",
      "Detect Cycle in Directed Graph",
      "Build a project dependency resolver",
    ],
  },
  58: {
    id: 58,
    concepts: ["Topological Sort", "Kahn's Algorithm", "BFS"],
    conceptExplanation:
      "Kahn's algorithm: track in-degrees (number of prerequisites) for each course. Start with all courses that have no prerequisites (in-degree 0). Process them, reducing neighbors' in-degrees. When a neighbor reaches 0, it's ready. If all courses are processed, return the order.",
    approach:
      "1. Build adj list and in-degree array.\n2. Queue all nodes with in-degree 0.\n3. BFS: pop node, add to result. For each neighbor: in-degree--; if 0 → enqueue.\n4. If result length == n, return it; else cycle exists → return [].",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    relatedPatterns: [
      "Course Schedule (#207) — detection version",
      "Alien Dictionary (#269) — Kahn's on inferred order",
      "Task Scheduler — topological ordering",
    ],
  },
  59: {
    id: 59,
    concepts: ["Union-Find", "DFS", "Connected Components"],
    conceptExplanation:
      "Each node starts in its own group. Union-Find merges groups when there's an edge. At the end, count distinct groups (roots). Alternative: DFS — mark each unvisited node and all its neighbors as one component.",
    approach:
      "Union-Find:\n1. parent[i]=i, rank[i]=0.\n2. For each edge (u,v): union(u,v).\n3. Count distinct find(i) values.\n\nFind with path compression: parent[x] = find(parent[x]).\nUnion by rank: attach smaller tree under larger root.",
    timeComplexity: "O(n · α(n)) with Union-Find — nearly O(n)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Redundant Connection (#684)",
      "Graph Valid Tree (#261)",
      "Accounts Merge (#721)",
    ],
  },
  60: {
    id: 60,
    concepts: ["Union-Find", "Cycle Detection"],
    conceptExplanation:
      "Process edges one by one. For each edge, if the two nodes are already in the same component (find(u)==find(v)), this edge creates a cycle — it's redundant, return it. Otherwise union them.",
    approach:
      "1. parent = list(range(n+1)).\n2. For each edge (u, v):\n   If find(u)==find(v): return [u,v] (redundant).\n   union(u, v).",
    timeComplexity: "O(n · α(n))",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Number of Connected Components (#323)",
      "Graph Valid Tree (#261) — same idea",
      "Minimum Spanning Tree (Kruskal's uses same union-find structure)",
    ],
  },
  61: {
    id: 61,
    concepts: ["BFS Shortest Path", "Word Transformation"],
    conceptExplanation:
      "Each word is a node. Two words are connected if they differ by exactly one letter. BFS gives the shortest path (fewest transformations). The trick is generating all possible one-letter mutations and checking if they exist in the wordList set.",
    approach:
      "1. Put wordList in a set.\n2. BFS from beginWord, level by level.\n3. For each word, try all 26 letter swaps at each position. If the mutation is in the set, add to queue and remove from set.\n4. Return level count when endWord is found.",
    timeComplexity: "O(n · m · 26) — n words of length m",
    spaceComplexity: "O(n · m)",
    relatedPatterns: [
      "Word Ladder II (#126) — return all shortest paths",
      "Open the Lock (#752)",
      "BFS on implicit graphs (state space search)",
    ],
  },
  62: {
    id: 62,
    concepts: ["BFS", "Grid Shortest Path", "8-directional Movement"],
    conceptExplanation:
      "Shortest path in an unweighted grid = BFS. Move in all 8 directions. Start at (0,0) if it's 0, expand outward. The first time you reach (n-1, n-1), that's the shortest path length.",
    approach:
      "1. If grid[0][0]==1 or grid[n-1][n-1]==1: return -1.\n2. BFS from (0,0) with distance 1. Expand in 8 directions.\n3. Return distance when (n-1,n-1) is reached.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n²)",
    relatedPatterns: [
      "Number of Islands (#200) — 4-directional DFS",
      "01 Matrix (#542) — BFS for distance to nearest 0",
      "A* search for weighted version",
    ],
  },
  63: {
    id: 63,
    concepts: ["Dijkstra's Algorithm", "Shortest Weighted Path", "Min-Heap"],
    conceptExplanation:
      "BFS works for unweighted graphs. For weighted graphs, use Dijkstra's: always process the node with the current smallest distance using a min-heap. When you process a node, relax its neighbors' distances.",
    approach:
      "1. dist = {node: infinity for all}; dist[src] = 0.\n2. Min-heap: push (0, src).\n3. While heap: pop (d, u). If d > dist[u]: skip (stale). For each (v, w) in adj[u]: if dist[u]+w < dist[v]: update, push to heap.\n4. Return max(dist.values()) or -1.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V + E)",
    relatedPatterns: [
      "Cheapest Flights Within K Stops (#787) — Bellman-Ford / modified Dijkstra",
      "Path With Minimum Effort (#1631)",
      "Swim in Rising Water (#778)",
    ],
  },
  64: {
    id: 64,
    concepts: ["BFS/DFS Graph Coloring", "Bipartite Check"],
    conceptExplanation:
      "A graph is bipartite if you can color it with 2 colors such that no two adjacent nodes share a color. BFS/DFS and try to 2-color: color neighbors the opposite color. If you ever need to give a node the same color as its neighbor, it's not bipartite.",
    approach:
      "1. color = {} (or array). For each unvisited node: BFS.\n2. Color it 0. For each neighbor: if uncolored → color 1-color[current]; if same color as current → return False.\n3. Return True.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    relatedPatterns: [
      "Possible Bipartition (#886)",
      "Detect cycle in undirected graph (DFS coloring)",
      "Graph coloring problems",
    ],
  },

  // ─── Heap ─────────────────────────────────────────────────────────────────────
  65: {
    id: 65,
    concepts: ["Min-Heap", "Quickselect"],
    conceptExplanation:
      "Maintain a min-heap of size k. If the heap exceeds k elements, pop the smallest. The Kth largest is always at the top of the min-heap. Quickselect (like quicksort's partition) finds it in O(n) average.",
    approach:
      "Min-heap approach:\n1. Use Python's heapq. Push all elements, pop when size > k.\n2. Return heap[0].\n\nQuickselect: partition around pivot; recurse only on the side containing the Kth position.",
    timeComplexity: "O(n log k) heap; O(n) avg Quickselect",
    spaceComplexity: "O(k) heap; O(1) Quickselect",
    relatedPatterns: [
      "Top K Frequent Elements (#347)",
      "K Closest Points to Origin (#973)",
      "Find Median from Data Stream (#295)",
    ],
  },
  66: {
    id: 66,
    concepts: ["Greedy", "Max-Heap", "Interval Scheduling"],
    conceptExplanation:
      "Always run the most frequent remaining task to minimize idle time. Use a max-heap of (frequency, task). Each cycle of n+1 slots, pick up to n+1 tasks greedily (most frequent first). If fewer tasks than slots, add idle time.",
    approach:
      "1. Count frequencies. Max-heap of (-freq, task).\n2. Each cycle (of length n+1): pop up to n+1 tasks, decrement freq, store in temp. Time += max(n+1, tasks_executed_this_cycle).\n3. Re-push tasks with remaining freq.\n4. Return total time.",
    timeComplexity: "O(n log n) — n tasks, each pushed/popped once",
    spaceComplexity: "O(1) — only 26 distinct tasks",
    relatedPatterns: [
      "Course Schedule (dependency ordering)",
      "Reorganize String (#767) — same greedy pattern",
    ],
  },
  67: {
    id: 67,
    concepts: ["Max-Heap", "Sorting", "Geometry"],
    conceptExplanation:
      "Distance from origin = √(x²+y²) (don't need sqrt — just compare x²+y²). For K closest, use a max-heap of size K: if a new point is closer than the farthest in the heap, swap it in.",
    approach:
      "1. Max-heap of size k (negate distances for Python's min-heap).\n2. For each point, push (-dist, point). If len > k: heappop.\n3. Return all points in the heap.",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    relatedPatterns: [
      "Kth Largest Element (#215)",
      "Top K Frequent Elements (#347)",
      "Closest K Points in geography apps",
    ],
  },
  68: {
    id: 68,
    concepts: ["Min-Heap", "Custom Comparator", "Frequency Count"],
    conceptExplanation:
      "Count word frequencies. Use a min-heap of size k with a custom comparator: sort by frequency descending, then alphabetically for ties. Python's heapq pops the smallest — negate frequency and use the word itself for alphabetical ordering.",
    approach:
      "1. Count frequencies.\n2. Push (-freq, word) into min-heap; pop when size > k.\n3. Extract and reverse to get descending frequency, ascending alpha order.",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Top K Frequent Elements (#347) — no alphabetical tie-breaking",
      "Sort Characters By Frequency (#451)",
    ],
  },

  // ─── Greedy ───────────────────────────────────────────────────────────────────
  69: {
    id: 69,
    concepts: ["Sort", "Greedy Merge"],
    conceptExplanation:
      "Sort intervals by start time. Then walk through: if the current interval overlaps the last merged one (current.start ≤ last.end), extend the last interval's end. Otherwise start a new merged interval.",
    approach:
      "1. Sort intervals by start.\n2. result = [intervals[0]].\n3. For each interval: if interval.start <= result[-1].end: result[-1].end = max(result[-1].end, interval.end). Else: result.append(interval).\n4. Return result.",
    timeComplexity: "O(n log n) — sorting dominates",
    spaceComplexity: "O(n) — output",
    relatedPatterns: [
      "Insert Interval (#57)",
      "Meeting Rooms I & II (#252, #253)",
      "Non-overlapping Intervals (#435)",
    ],
  },
  70: {
    id: 70,
    concepts: ["Greedy", "Circular Array"],
    conceptExplanation:
      "One pass: track total_gain and current_gain. If current_gain goes negative, reset it and start from the next station. The last starting point where total_gain ends up ≥ 0 is the answer. Total gain ≥ 0 guarantees a solution exists.",
    approach:
      "1. total=0, current=0, start=0.\n2. For each i: gain = gas[i] - cost[i]. total+=gain; current+=gain.\n3. If current < 0: start=i+1; current=0.\n4. Return start if total >= 0 else -1.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Maximum Subarray (Kadane's Algorithm) — same reset pattern",
      "Circular array traversal",
    ],
  },
  71: {
    id: 71,
    concepts: ["Greedy", "Ordered Map", "Consecutive Groups"],
    conceptExplanation:
      "You must form groups of W consecutive cards. Sort the cards and process from smallest to largest using an ordered map. The smallest unplaced card must start a new group — greedily consume the next W values. If any value is missing, return False.",
    approach:
      "1. Count card frequencies with an ordered dict (or sort+Counter).\n2. For each card with count > 0:\n   For each consecutive card in [card, card+W): if count is 0 → return False; decrement count.",
    timeComplexity: "O(n log n) — sorting",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Divide Array in Sets of K Consecutive Numbers (#1296) — same problem",
      "Greedy interval/grouping problems",
    ],
  },

  // ─── Backtracking ─────────────────────────────────────────────────────────────
  72: {
    id: 72,
    concepts: ["Backtracking", "Recursive Exploration", "Pruning"],
    conceptExplanation:
      "Build combinations by choosing numbers from the list. Since repeats are allowed, you can pick the same number again. Use a start index to avoid going backwards (prevents duplicates). Prune when the running sum exceeds target.",
    approach:
      "1. DFS(start, current_combo, current_sum):\n   If sum == target: add combo to results.\n   If sum > target: return (prune).\n   For i from start to len(candidates):\n     DFS(i, combo+[candidates[i]], sum+candidates[i]).",
    timeComplexity: "O(n^(t/m)) — t=target, m=min candidate",
    spaceComplexity: "O(t/m) — recursion depth",
    relatedPatterns: [
      "Combination Sum II (#40) — no repeats",
      "Subsets (#78)",
      "General backtracking template",
    ],
  },
  73: {
    id: 73,
    concepts: ["Backtracking", "Duplicate Skipping", "Subsets"],
    conceptExplanation:
      "Like generating all subsets but with duplicates in the array. Sort first. During backtracking, skip choosing the same value twice at the same recursive level (if nums[i]==nums[i-1] and i > start, skip). This prevents duplicate subsets.",
    approach:
      "1. Sort nums.\n2. DFS(start, current):\n   Add current to results.\n   For i from start to n:\n     If i > start and nums[i]==nums[i-1]: continue (skip duplicate).\n     DFS(i+1, current+[nums[i]]).",
    timeComplexity: "O(n · 2^n)",
    spaceComplexity: "O(n) — recursion depth",
    relatedPatterns: [
      "Subsets (#78) — no duplicates",
      "Combination Sum II (#40)",
      "Permutations II (#47) — duplicate permutations",
    ],
  },
  74: {
    id: 74,
    concepts: ["Backtracking", "State Restoration"],
    conceptExplanation:
      "Generate all orderings of a list. At each step, pick any unused number, add it to the current permutation, recurse, then remove it (backtrack). A 'used' array tracks which numbers are in the current path.",
    approach:
      "1. DFS(current_perm, used):\n   If len==n: add to results.\n   For i in range(n):\n     If used[i]: continue.\n     used[i]=True; DFS(current+[nums[i]], used); used[i]=False.",
    timeComplexity: "O(n · n!)",
    spaceComplexity: "O(n) — recursion depth + used array",
    relatedPatterns: [
      "Permutations II (#47) — with duplicates",
      "N-Queens (#51) — constrained permutations",
    ],
  },
  // ─── Dynamic Programming ──────────────────────────────────────────────────────
  76: {
    id: 76,
    concepts: ["1D DP", "Circular Array", "Problem Reduction"],
    conceptExplanation:
      "House Robber I is a straight line — you can't rob adjacent houses. House Robber II is a circle — the first and last houses are also adjacent. The trick: run House Robber I twice: once on houses[0..n-2] and once on houses[1..n-1]. The answer is the max of both. This way the first and last are never both included.",
    approach:
      "def rob(nums): dp_prev2, dp_prev = 0, 0; for n in nums: dp_prev2, dp_prev = dp_prev, max(dp_prev, dp_prev2 + n); return dp_prev.\n\n1. Return max(rob(nums[:-1]), rob(nums[1:])).\n   Base cases: if len==1 return nums[0].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — only two variables",
    relatedPatterns: [
      "House Robber (#198) — linear version",
      "House Robber III (#337) — on a tree (DFS + DP)",
      "Delete and Earn (#740) — same reduce-to-robber pattern",
    ],
  },
  77: {
    id: 77,
    concepts: ["Unbounded Knapsack", "BFS on State Space", "Bottom-up DP"],
    conceptExplanation:
      "You want the fewest coins to make amount. Each coin can be reused (unbounded). Think of it as: dp[i] = fewest coins to make amount i. For each amount, try every coin — if you use coin c, you need dp[i - c] more coins plus 1. Take the minimum over all valid coins.",
    approach:
      "1. dp = [infinity] * (amount + 1); dp[0] = 0.\n2. For i from 1 to amount:\n   For each coin c: if i >= c: dp[i] = min(dp[i], dp[i-c] + 1).\n3. Return dp[amount] if finite else -1.",
    timeComplexity: "O(amount × n) — n = number of coins",
    spaceComplexity: "O(amount)",
    relatedPatterns: [
      "Coin Change II (#518) — count ways, not minimum",
      "Combination Sum IV (#377) — ordered combinations",
      "Perfect Squares (#279) — same unbounded knapsack structure",
    ],
  },
  78: {
    id: 78,
    concepts: ["0/1 Knapsack", "Boolean DP", "Subset Sum"],
    conceptExplanation:
      "Can we split the array into two equal-sum subsets? That means: can any subset sum to total/2? This is the classic 0/1 knapsack — each number can be used at most once. dp[j] = True if we can form sum j from elements seen so far. Iterate backwards to avoid using the same element twice.",
    approach:
      "1. If total is odd: return False. target = total // 2.\n2. dp = {0} (set of reachable sums).\n3. For each num: dp |= {s + num for s in dp if s + num <= target}.\n4. Return target in dp.\n\nAlternative: dp boolean array, iterate j from target down to num.",
    timeComplexity: "O(n × target)",
    spaceComplexity: "O(target)",
    relatedPatterns: [
      "Target Sum (#494) — count subsets with given sum difference",
      "Last Stone Weight II (#1049) — same reduction",
      "0/1 knapsack template: iterate items outer, capacity inner (backwards)",
    ],
  },
  79: {
    id: 79,
    concepts: ["LIS — Patience Sorting", "Binary Search + DP"],
    conceptExplanation:
      "The O(n²) DP is intuitive: dp[i] = length of LIS ending at i. But the O(n log n) solution is elegant: maintain a 'tails' array where tails[i] is the smallest tail of all LIS of length i+1. For each number, binary search for its position in tails and replace — tails always stays sorted.",
    approach:
      "O(n log n) — Patience Sort:\n1. tails = [].\n2. For each num:\n   Binary search (bisect_left) for the position of num in tails.\n   If pos == len(tails): append (new longest).\n   Else: replace tails[pos] = num.\n3. Return len(tails).",
    timeComplexity: "O(n log n) with binary search; O(n²) naive DP",
    spaceComplexity: "O(n) — tails array",
    relatedPatterns: [
      "Number of Longest Increasing Subsequences (#673)",
      "Russian Doll Envelopes (#354) — 2D LIS",
      "Patience sorting is also used in card game optimal strategy",
    ],
  },
  80: {
    id: 80,
    concepts: ["2D Grid DP", "Combinatorics"],
    conceptExplanation:
      "You can only move right or down. The number of ways to reach cell (i, j) = ways to reach (i-1, j) + ways to reach (i, j-1). It's just addition — you're counting paths. The grid fills naturally bottom-up. Mathematically it's C(m+n-2, m-1) but DP is the key pattern to learn.",
    approach:
      "1. dp = [[1] * n for _ in range(m)] (first row and col are all 1 — only one path).\n2. For i from 1 to m-1, j from 1 to n-1:\n   dp[i][j] = dp[i-1][j] + dp[i][j-1].\n3. Return dp[m-1][n-1].\n\nOptimize to O(n) space with a 1D array.",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(n) with rolling array",
    relatedPatterns: [
      "Unique Paths II (#63) — with obstacles",
      "Minimum Path Sum (#64) — same grid, minimize sum",
      "Triangle (#120) — 1D DP variant",
    ],
  },
  81: {
    id: 81,
    concepts: ["Greedy", "1D DP", "Reach Tracking"],
    conceptExplanation:
      "Can you reach the last index? Track the farthest index you can currently reach. As you walk forward, update max_reach = max(max_reach, i + nums[i]). If you ever reach a position beyond max_reach before getting there, you're stuck.",
    approach:
      "Greedy (O(n) time, O(1) space):\n1. max_reach = 0.\n2. For i from 0 to n-1:\n   If i > max_reach: return False (can't get here).\n   max_reach = max(max_reach, i + nums[i]).\n3. Return True.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Jump Game II (#45) — minimum jumps",
      "Jump Game III (#1306) — arbitrary jumps",
      "Reach the last stone — greedy reach pattern",
    ],
  },
  82: {
    id: 82,
    concepts: ["Greedy BFS", "Implicit Level Traversal"],
    conceptExplanation:
      "Think of it as BFS levels: from the current range [l, r] you can reach, find the farthest position reachable from any index in that range. That's your next level. The number of levels = minimum jumps. It's greedy BFS — at each step, jump as far as possible.",
    approach:
      "1. jumps=0, current_end=0, farthest=0.\n2. For i from 0 to n-2:\n   farthest = max(farthest, i + nums[i]).\n   If i == current_end: jumps++; current_end = farthest.\n3. Return jumps.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Jump Game (#55) — boolean version",
      "Video Stitching (#1024) — interval covering same pattern",
      "BFS level-count problems",
    ],
  },
  83: {
    id: 83,
    concepts: ["String DP", "BFS on String Index", "Trie Extension"],
    conceptExplanation:
      "Can the string be segmented into dictionary words? dp[i] = True means s[0..i-1] can be segmented. For each position i, check all substrings ending at i: if dp[j] is True and s[j..i] is in the dictionary, dp[i] = True. Start with dp[0] = True (empty string).",
    approach:
      "1. word_set = set(wordDict). dp = [False] * (n+1); dp[0] = True.\n2. For i from 1 to n:\n   For j from 0 to i:\n     If dp[j] and s[j:i] in word_set: dp[i] = True; break.\n3. Return dp[n].",
    timeComplexity: "O(n³) naive — O(n²) with max word length bound",
    spaceComplexity: "O(n)",
    relatedPatterns: [
      "Word Break II (#140) — return all segmentations",
      "Concatenated Words (#472) — multi-word version",
      "BFS approach: queue of indices, expand by valid words",
    ],
  },
  84: {
    id: 84,
    concepts: ["2D String DP", "LCS", "Sequence Alignment"],
    conceptExplanation:
      "LCS asks: what's the longest sequence of characters that appears in both strings in order (not necessarily consecutive)? dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]. If characters match: dp[i][j] = dp[i-1][j-1] + 1. If not: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    approach:
      "1. dp = [[0] * (n+1) for _ in range(m+1)].\n2. For i in range(1, m+1), j in range(1, n+1):\n   If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1.\n   Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).\n3. Return dp[m][n].",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n) — optimizable to O(min(m,n))",
    relatedPatterns: [
      "Edit Distance (#72) — LCS extended with insert/delete/replace",
      "Shortest Common Supersequence (#1092)",
      "Delete Operation for Two Strings (#583)",
      "Diff tools (git diff) use LCS internally",
    ],
  },
  85: {
    id: 85,
    concepts: ["2D Grid DP", "Path Optimization"],
    conceptExplanation:
      "Same grid structure as Unique Paths, but instead of counting paths, minimize the sum. dp[i][j] = minimum cost path from (0,0) to (i,j). At each cell, you came from above or from the left — take whichever was cheaper.",
    approach:
      "1. Modify grid in-place (or use separate dp).\n2. Fill first row and column with running sums (only one direction possible).\n3. For i,j from 1: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).\n4. Return dp[m-1][n-1].",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(1) if modifying input, else O(m × n)",
    relatedPatterns: [
      "Unique Paths (#62) — count paths",
      "Dungeon Game (#174) — backwards DP",
      "Cherry Pickup (#741) — two simultaneous path DP",
    ],
  },
  86: {
    id: 86,
    concepts: ["DP — Min & Max Tracking", "Subarray Product"],
    conceptExplanation:
      "Unlike sum, negative × negative = positive (a very negative number could become very positive after another negative). So you must track both the current minimum AND maximum product ending at each index. When you see a negative number, swap min and max.",
    approach:
      "1. max_prod = min_prod = result = nums[0].\n2. For num in nums[1:]:\n   candidates = (num, max_prod * num, min_prod * num).\n   max_prod = max(candidates).\n   min_prod = min(candidates).\n   result = max(result, max_prod).\n3. Return result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Maximum Subarray (#53) — Kadane's Algorithm (sum version)",
      "Maximum Product of Three Numbers (#628)",
      "Subarray Product Less Than K (#713)",
    ],
  },
  87: {
    id: 87,
    concepts: ["State Machine DP", "Stock Trading with Cooldown"],
    conceptExplanation:
      "Model the problem as 3 states: HELD (holding stock), SOLD (just sold, in cooldown), REST (resting, can buy). Transitions: HELD → sell → SOLD; SOLD → cooldown → REST; REST or REST → buy → HELD. At each day, update all three states. The answer is max(SOLD, REST) at the end.",
    approach:
      "1. held = -infinity (can't hold without buying), sold = 0, rest = 0.\n2. For each price:\n   prev_held = held\n   held = max(held, rest - price)   # keep holding OR buy from rest\n   sold = prev_held + price          # sell today\n   rest = max(rest, sold)            # stay resting OR come out of cooldown\n3. Return max(sold, rest).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedPatterns: [
      "Best Time to Buy and Sell Stock II (#122) — no cooldown",
      "Best Time to Buy and Sell Stock with Transaction Fee (#714)",
      "State machine DP: model as FSM, one variable per state",
    ],
  },

  // ─── Backtracking (kept at end for historical ordering) ───────────────────────
  75: {
    id: 75,
    concepts: ["DFS + Backtracking", "Grid Traversal", "Character Matching"],
    conceptExplanation:
      "DFS from each cell trying to match the word character by character. Mark the current cell as visited (temporarily change it) before recursing, then restore it (backtrack). This lets DFS explore without revisiting the same cell in one path.",
    approach:
      "1. For each cell: if board[r][c]==word[0]: DFS(r, c, 0).\n2. DFS(r, c, index):\n   If index==len(word): return True.\n   If out of bounds or board[r][c]!=word[index]: return False.\n   temp=board[r][c]; board[r][c]='#' (mark visited).\n   found = DFS in 4 directions with index+1.\n   board[r][c]=temp (restore).\n   return found.",
    timeComplexity: "O(m·n · 4^L) — L = word length",
    spaceComplexity: "O(L) — recursion depth",
    relatedPatterns: [
      "Word Search II (#212) — Trie + backtracking",
      "N-Queens, Sudoku Solver — constrained grid backtracking",
    ],
  },
};
