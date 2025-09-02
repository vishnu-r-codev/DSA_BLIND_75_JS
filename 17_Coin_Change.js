// 17. Coin Change
// LeetCode Link: https://leetcode.com/problems/coin-change/

/*
Question:
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,3,4], amount = 6
Output: 2
Explanation: 6 = 3 + 3

Example 2:
Input: coins = [2], amount = 3
Output: -1
Explanation: The amount of 3 cannot be made up using coins of denomination 2.

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraints:
- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4

Explanation:
This is a classic dynamic programming problem (unbounded knapsack variant).
- We want to find the minimum number of coins needed to make each amount from 0 to target amount.
- For each amount, we try using each coin and take the minimum.
- dp[i] represents the minimum number of coins needed to make amount i.
- Recurrence relation: dp[amount] = min(dp[amount - coin] + 1) for all coins <= amount
*/

function coinChange(coins, amount) {
    // dp[i] represents minimum coins needed to make amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins needed to make amount 0
    
    // For each amount from 1 to target amount
    for (let i = 1; i <= amount; i++) {
        // Try each coin
        for (let coin of coins) {
            if (coin <= i) {
                // If we can use this coin, update minimum
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    // Return result, -1 if impossible
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Alternative solution: Bottom-up DP with coins outer loop
function coinChangeAlt(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    // For each coin
    for (let coin of coins) {
        // Update all amounts that can use this coin
        for (let i = coin; i <= amount; i++) {
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Recursive solution with memoization
function coinChangeMemo(coins, amount, memo = {}) {
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    if (memo[amount] !== undefined) return memo[amount];
    
    let minCoins = Infinity;
    
    for (let coin of coins) {
        const result = coinChangeMemo(coins, amount - coin, memo);
        if (result !== -1) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }
    
    memo[amount] = minCoins === Infinity ? -1 : minCoins;
    return memo[amount];
}

// Example usage:
console.log(coinChange([1, 3, 4], 6)); // Output: 2 (3 + 3)
console.log(coinChange([2], 3)); // Output: -1
console.log(coinChange([1], 0)); // Output: 0
console.log(coinChange([1, 2, 5], 11)); // Output: 3 (5 + 5 + 1)

/*
Time Complexity: O(amount × coins.length)
Space Complexity: O(amount)

Key Insights:
1. This is an unbounded knapsack problem - we can use each coin unlimited times
2. We build up solutions for smaller amounts to solve larger amounts
3. If dp[amount] remains Infinity, it means the amount cannot be made
4. We always take the minimum among all possible ways to make an amount
*/
