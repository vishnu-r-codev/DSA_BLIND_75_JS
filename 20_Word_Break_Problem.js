// 20. Word Break Problem
// LeetCode Link: https://leetcode.com/problems/word-break/

/*
Question:
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

Constraints:
- 1 <= s.length <= 300
- 1 <= wordDict.length <= 1000
- 1 <= wordDict[i].length <= 20
- s and wordDict[i] consist of only lowercase English letters.
- All the strings of wordDict are unique.

Explanation:
This is a classic dynamic programming problem.

DP State:
dp[i] = true if string s[0...i-1] can be segmented using words from wordDict

Recurrence Relation:
dp[i] = true if there exists j < i such that:
1. dp[j] = true (prefix can be segmented)
2. s[j...i-1] is in wordDict (remaining part is a valid word)

Base Case:
dp[0] = true (empty string can always be segmented)
*/

// Solution 1: Dynamic Programming - Bottom Up
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict); // For O(1) lookup
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // Empty string can be segmented
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            // Check if prefix s[0...j-1] can be segmented and s[j...i-1] is in dict
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break; // Found valid segmentation, no need to check further
            }
        }
    }
    
    return dp[n];
}

// Solution 2: Optimized DP with early termination
function wordBreakOptimized(s, wordDict) {
    const wordSet = new Set(wordDict);
    const maxWordLength = Math.max(...wordDict.map(word => word.length));
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= n; i++) {
        // Only check words within maximum word length
        for (let j = Math.max(0, i - maxWordLength); j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

// Solution 3: Recursive with Memoization
function wordBreakMemo(s, wordDict, startIndex = 0, memo = {}) {
    if (startIndex === s.length) return true;
    if (memo[startIndex] !== undefined) return memo[startIndex];
    
    const wordSet = new Set(wordDict);
    
    for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {
        const word = s.substring(startIndex, endIndex);
        if (wordSet.has(word) && wordBreakMemo(s, wordDict, endIndex, memo)) {
            memo[startIndex] = true;
            return true;
        }
    }
    
    memo[startIndex] = false;
    return false;
}

// Solution 4: BFS Approach
function wordBreakBFS(s, wordDict) {
    const wordSet = new Set(wordDict);
    const queue = [0]; // Start from index 0
    const visited = new Set(); // To avoid revisiting same index
    
    while (queue.length > 0) {
        const start = queue.shift();
        
        if (visited.has(start)) continue;
        visited.add(start);
        
        for (let end = start + 1; end <= s.length; end++) {
            if (wordSet.has(s.substring(start, end))) {
                if (end === s.length) return true;
                queue.push(end);
            }
        }
    }
    
    return false;
}

// Solution 5: Word Break II - Return all possible sentences
function wordBreakII(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = {};
    
    function backtrack(start) {
        if (start === s.length) return [""]; // End reached
        if (memo[start] !== undefined) return memo[start];
        
        const result = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                const suffixWays = backtrack(end);
                for (let suffix of suffixWays) {
                    result.push(word + (suffix === "" ? "" : " " + suffix));
                }
            }
        }
        
        memo[start] = result;
        return result;
    }
    
    return backtrack(0);
}

// Helper function to demonstrate all approaches
function testWordBreak() {
    const testCases = [
        { s: "leetcode", wordDict: ["leet", "code"] },
        { s: "applepenapple", wordDict: ["apple", "pen"] },
        { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`String: "${testCase.s}"`);
        console.log(`Dictionary: [${testCase.wordDict.map(w => `"${w}"`).join(", ")}]`);
        console.log(`DP Result: ${wordBreak(testCase.s, testCase.wordDict)}`);
        console.log(`Memoization Result: ${wordBreakMemo(testCase.s, testCase.wordDict)}`);
        console.log(`BFS Result: ${wordBreakBFS(testCase.s, testCase.wordDict)}`);
        console.log('---');
    });
}

// Example usage:
console.log(wordBreak("leetcode", ["leet", "code"])); // Output: true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // Output: true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // Output: false

console.log(wordBreakOptimized("leetcode", ["leet", "code"])); // Output: true
console.log(wordBreakMemo("applepenapple", ["apple", "pen"])); // Output: true
console.log(wordBreakBFS("catsandog", ["cats", "dog", "sand", "and", "cat"])); // Output: false

// Word Break II examples
console.log(wordBreakII("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
// Output: ["cats and dog", "cat sand dog"]

/*
Time Complexity:
- DP Solution: O(n² + m) where n = s.length, m = total characters in wordDict
- Optimized DP: O(n × maxWordLength + m)
- Memoization: O(n² + m) in worst case
- BFS: O(n² + m)

Space Complexity:
- DP: O(n + m) for dp array and wordSet
- Memoization: O(n + m) for memo and wordSet
- BFS: O(n + m) for queue and visited set

Key Insights:
1. Convert wordDict to Set for O(1) lookup
2. DP builds solution incrementally - if prefix can be segmented and suffix is valid word
3. Memoization avoids recalculating same subproblems
4. BFS explores all possible segmentation paths level by level
5. Optimization: limit search to maximum word length in dictionary
6. Word Break II extends the problem to find all possible segmentations
*/
