// 16. Climbing Stairs
// LeetCode Link: https://leetcode.com/problems/climbing-stairs/

/*
Question:
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Constraints:
- 1 <= n <= 45

Explanation:
This is a classic dynamic programming problem similar to the Fibonacci sequence.
- To reach step n, you can either come from step (n-1) with 1 step or from step (n-2) with 2 steps.
- So the number of ways to reach step n = ways to reach (n-1) + ways to reach (n-2)
- Base cases: f(1) = 1, f(2) = 2

We can solve this using:
1. Recursive approach (exponential time)
2. Dynamic programming with memoization (O(n) time, O(n) space)
3. Iterative approach with space optimization (O(n) time, O(1) space)
*/

// Solution 1: Iterative approach with space optimization (Recommended)
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev1 = 1; // ways to reach step 1
    let prev2 = 2; // ways to reach step 2
    
    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}

// Solution 2: Dynamic Programming with array
function climbStairsDP(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Solution 3: Recursive with memoization
function climbStairsMemo(n, memo = {}) {
    if (n <= 2) return n;
    if (memo[n] !== undefined) return memo[n];
    
    memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
    return memo[n];
}

// Example usage:
console.log(climbStairs(2)); // Output: 2
console.log(climbStairs(3)); // Output: 3
console.log(climbStairs(4)); // Output: 5
console.log(climbStairs(5)); // Output: 8

/*
Time Complexity: O(n)
Space Complexity: O(1) for iterative, O(n) for DP array and memoization

Pattern Recognition:
- This follows the Fibonacci pattern
- Each state depends on the previous two states
- Can be optimized to use constant space
*/
