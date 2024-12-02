import type { Problem } from "../api/services/types";

export const problems: Problem[] = [
  { title: "3sum", difficulty: "medium" },
  { title: "alien-dictionary", difficulty: "hard" },
  { title: "best-time-to-buy-and-sell-stock", difficulty: "easy" },
  { title: "binary-tree-level-order-traversal", difficulty: "medium" },
  { title: "binary-tree-maximum-path-sum", difficulty: "hard" },
  { title: "climbing-stairs", difficulty: "easy" },
  { title: "clone-graph", difficulty: "medium" },
  { title: "coin-change", difficulty: "medium" },
  { title: "combination-sum", difficulty: "medium" },
  {
    title: "construct-binary-tree-from-preorder-and-inorder-traversal",
    difficulty: "medium",
  },
  { title: "container-with-most-water", difficulty: "medium" },
  { title: "contains-duplicate", difficulty: "easy" },
  { title: "course-schedule", difficulty: "medium" },
  { title: "counting-bits", difficulty: "easy" },
  { title: "decode-ways", difficulty: "medium" },
  { title: "design-add-and-search-words-data-structure", difficulty: "medium" },
  { title: "encode-and-decode-strings", difficulty: "medium" },
  { title: "find-median-from-data-stream", difficulty: "hard" },
  { title: "find-minimum-in-rotated-sorted-array", difficulty: "medium" },
  { title: "group-anagrams", difficulty: "medium" },
  { title: "graph-valid-tree", difficulty: "medium" },
  { title: "house-robber", difficulty: "medium" },
  { title: "house-robber-ii", difficulty: "medium" },
  { title: "implement-trie-prefix-tree", difficulty: "medium" },
  { title: "insert-interval", difficulty: "hard" },
  { title: "invert-binary-tree", difficulty: "easy" },
  { title: "jump-game", difficulty: "medium" },
  { title: "kth-smallest-element-in-a-bst", difficulty: "medium" },
  { title: "linked-list-cycle", difficulty: "easy" },
  { title: "longest-common-subsequence", difficulty: "medium" },
  { title: "longest-consecutive-sequence", difficulty: "medium" },
  { title: "longest-increasing-subsequence", difficulty: "medium" },
  { title: "longest-palindromic-substring", difficulty: "medium" },
  { title: "longest-repeating-character-replacement", difficulty: "medium" },
  {
    title: "longest-substring-without-repeating-characters",
    difficulty: "medium",
  },
  {
    title: "lowest-common-ancestor-of-a-binary-search-tree",
    difficulty: "easy",
  },
  { title: "maximum-depth-of-binary-tree", difficulty: "easy" },
  { title: "maximum-product-subarray", difficulty: "medium" },
  { title: "maximum-subarray", difficulty: "easy" },
  { title: "meeting-rooms", difficulty: "easy" },
  { title: "meeting-rooms-ii", difficulty: "medium" },
  { title: "merge-intervals", difficulty: "medium" },
  { title: "merge-k-sorted-lists", difficulty: "hard" },
  { title: "merge-two-sorted-lists", difficulty: "easy" },
  { title: "minimum-window-substring", difficulty: "hard" },
  { title: "missing-number", difficulty: "easy" },
  { title: "non-overlapping-intervals", difficulty: "medium" },
  { title: "number-of-1-bits", difficulty: "easy" },
  { title: "number-of-islands", difficulty: "medium" },
  {
    title: "number-of-connected-components-in-an-undirected-graph",
    difficulty: "medium",
  },
  { title: "pacific-atlantic-water-flow", difficulty: "medium" },
  { title: "palindromic-substrings", difficulty: "medium" },
  { title: "product-of-array-except-self", difficulty: "medium" },
  { title: "reorder-list", difficulty: "medium" },
  { title: "reverse-bits", difficulty: "easy" },
  { title: "reverse-linked-list", difficulty: "easy" },
  { title: "remove-nth-node-from-end-of-list", difficulty: "medium" },
  { title: "same-tree", difficulty: "easy" },
  { title: "search-in-rotated-sorted-array", difficulty: "medium" },
  { title: "serialize-and-deserialize-binary-tree", difficulty: "hard" },
  { title: "set-matrix-zeroes", difficulty: "medium" },
  { title: "spiral-matrix", difficulty: "medium" },
  { title: "subtree-of-another-tree", difficulty: "easy" },
  { title: "sum-of-two-integers", difficulty: "medium" },
  { title: "top-k-frequent-elements", difficulty: "medium" },
  { title: "two-sum", difficulty: "easy" },
  { title: "unique-paths", difficulty: "medium" },
  { title: "validate-binary-search-tree", difficulty: "medium" },
  { title: "valid-anagram", difficulty: "easy" },
  { title: "valid-palindrome", difficulty: "easy" },
  { title: "valid-parentheses", difficulty: "easy" },
  { title: "word-break", difficulty: "medium" },
  { title: "word-search", difficulty: "medium" },
  { title: "word-search-ii", difficulty: "hard" },
  { title: "rotate-image", difficulty: "medium" },
];

export const problemMap: Record<Problem["title"], Problem> = problems.reduce(
  (map, problem) => {
    map[problem.title] = problem;
    return map;
  },
  {} as Record<Problem["title"], Problem>,
);
