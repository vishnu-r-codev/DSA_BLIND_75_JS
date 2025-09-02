// 19. Longest Common Subsequence
// LeetCode Link: https://leetcode.com/problems/longest-common-subsequence/

/*
Question:
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".

A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

Constraints:
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters.

Explanation:
This is a classic 2D Dynamic Programming problem.

DP State:
dp[i][j] = length of LCS for text1[0...i-1] and text2[0...j-1]

Recurrence Relation:
- If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
- Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

Base Case:
dp[0][j] = 0 and dp[i][0] = 0 (empty string has LCS length 0)
*/

// Solution 1: 2D DP - O(m*n) space
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table with (m+1) x (n+1) dimensions
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // Characters match, extend previous LCS
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Characters don't match, take maximum from excluding either character
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Solution 2: Space Optimized - O(min(m,n)) space
function longestCommonSubsequenceOptimized(text1, text2) {
    // Ensure text1 is the shorter string for space optimization
    if (text1.length > text2.length) {
        [text1, text2] = [text2, text1];
    }
    
    const m = text1.length;
    const n = text2.length;
    
    // Use only two rows instead of full 2D array
    let prev = new Array(m + 1).fill(0);
    let curr = new Array(m + 1).fill(0);
    
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[i] = prev[i - 1] + 1;
            } else {
                curr[i] = Math.max(prev[i], curr[i - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }
    
    return prev[m];
}

// Solution 3: With actual LCS reconstruction
function longestCommonSubsequenceWithString(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct the LCS string
    let lcs = "";
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return { length: dp[m][n], sequence: lcs };
}

// Solution 4: Recursive with memoization
function longestCommonSubsequenceMemo(text1, text2, memo = {}) {
    function lcs(i, j) {
        // Base cases
        if (i === 0 || j === 0) return 0;
        
        const key = `${i},${j}`;
        if (memo[key] !== undefined) return memo[key];
        
        if (text1[i - 1] === text2[j - 1]) {
            memo[key] = lcs(i - 1, j - 1) + 1;
        } else {
            memo[key] = Math.max(lcs(i - 1, j), lcs(i, j - 1));
        }
        
        return memo[key];
    }
    
    return lcs(text1.length, text2.length);
}

// Example usage:
console.log(longestCommonSubsequence("abcde", "ace")); // Output: 3
console.log(longestCommonSubsequence("abc", "abc")); // Output: 3
console.log(longestCommonSubsequence("abc", "def")); // Output: 0

console.log(longestCommonSubsequenceOptimized("abcde", "ace")); // Output: 3

const result = longestCommonSubsequenceWithString("abcde", "ace");
console.log(result); // Output: { length: 3, sequence: "ace" }

console.log(longestCommonSubsequenceMemo("abcde", "ace")); // Output: 3

/*
Time Complexity: O(m * n) where m and n are lengths of the two strings
Space Complexity: 
- 2D DP: O(m * n)
- Optimized: O(min(m, n))
- Memoization: O(m * n) for memo + O(m + n) for recursion stack

Key Insights:
1. Classic 2D DP problem where we build solution bottom-up
2. When characters match, we extend the LCS from previous state
3. When characters don't match, we take the best from either direction
4. Space can be optimized since we only need previous row
5. The actual LCS can be reconstructed by backtracking through the DP table
6. This problem has optimal substructure and overlapping subproblems
*/
