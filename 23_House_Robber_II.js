// 23. House Robber II
// LeetCode Link: https://leetcode.com/problems/house-robber-ii/

/*
Question:
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last house. Meanwhile, adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and house 3 (money = 2), because they are adjacent houses.

Example 2:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 3:
Input: nums = [1,2,3]
Output: 3

Constraints:
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000

Explanation:
This is an extension of the classic House Robber problem with a twist: houses are arranged in a circle.

Key insight: Since houses are in a circle, we cannot rob both the first and last house.

So we have two scenarios:
1. Rob houses from index 0 to n-2 (exclude last house, can include first)
2. Rob houses from index 1 to n-1 (exclude first house, can include last)

We solve both scenarios using the standard House Robber algorithm and take the maximum.

Edge Cases:
- If only 1 house: rob it
- If only 2 houses: rob the one with more money
*/

// Main solution: Handle circular constraint by solving two linear problems
function rob(nums) {
    const n = nums.length;
    
    // Edge cases
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);
    
    // Case 1: Rob houses 0 to n-2 (can include first, exclude last)
    const maxExcludingLast = robLinear(nums, 0, n - 2);
    
    // Case 2: Rob houses 1 to n-1 (exclude first, can include last)  
    const maxExcludingFirst = robLinear(nums, 1, n - 1);
    
    return Math.max(maxExcludingLast, maxExcludingFirst);
}

// Helper function: Solve linear House Robber problem for a range
function robLinear(nums, start, end) {
    let prev2 = 0; // dp[i-2]
    let prev1 = 0; // dp[i-1]
    
    for (let i = start; i <= end; i++) {
        const current = Math.max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Alternative implementation with more explicit DP
function robAlternative(nums) {
    const n = nums.length;
    
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);
    
    // Case 1: Include first house, exclude last house
    const case1 = robRange(nums.slice(0, n - 1));
    
    // Case 2: Exclude first house, include last house  
    const case2 = robRange(nums.slice(1));
    
    return Math.max(case1, case2);
}

// Standard House Robber algorithm for linear array
function robRange(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Solution with detailed tracking of robbed houses
function robWithTracking(nums) {
    const n = nums.length;
    
    if (n === 0) return { maxMoney: 0, houses: [], scenario: null };
    if (n === 1) return { maxMoney: nums[0], houses: [0], scenario: "only_house" };
    if (n === 2) {
        return nums[0] > nums[1] 
            ? { maxMoney: nums[0], houses: [0], scenario: "first_of_two" }
            : { maxMoney: nums[1], houses: [1], scenario: "second_of_two" };
    }
    
    // Case 1: Houses 0 to n-2
    const result1 = robLinearWithTracking(nums, 0, n - 2);
    
    // Case 2: Houses 1 to n-1
    const result2 = robLinearWithTracking(nums, 1, n - 1);
    
    if (result1.maxMoney >= result2.maxMoney) {
        return { ...result1, scenario: "exclude_last" };
    } else {
        return { ...result2, scenario: "exclude_first" };
    }
}

// Helper with tracking for linear case
function robLinearWithTracking(nums, start, end) {
    const houses = [];
    let prev2Money = 0, prev1Money = 0;
    let prev2Houses = [], prev1Houses = [];
    
    for (let i = start; i <= end; i++) {
        const robCurrent = nums[i] + prev2Money;
        const skipCurrent = prev1Money;
        
        if (robCurrent > skipCurrent) {
            const currentMoney = robCurrent;
            const currentHouses = [...prev2Houses, i];
            
            prev2Money = prev1Money;
            prev2Houses = [...prev1Houses];
            prev1Money = currentMoney;
            prev1Houses = [...currentHouses];
        } else {
            prev2Money = prev1Money;
            prev2Houses = [...prev1Houses];
            // prev1 stays the same
        }
    }
    
    return { maxMoney: prev1Money, houses: prev1Houses };
}

// Recursive solution with memoization
function robRecursive(nums) {
    const n = nums.length;
    
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);
    
    // Case 1: Rob from 0 to n-2
    const memo1 = {};
    const case1 = robMemo(nums, 0, n - 2, memo1);
    
    // Case 2: Rob from 1 to n-1
    const memo2 = {};
    const case2 = robMemo(nums, 1, n - 1, memo2);
    
    return Math.max(case1, case2);
}

function robMemo(nums, start, end, memo, index = start) {
    if (index > end) return 0;
    if (memo[index] !== undefined) return memo[index];
    
    // Rob current or skip current
    const robCurrent = nums[index] + robMemo(nums, start, end, memo, index + 2);
    const skipCurrent = robMemo(nums, start, end, memo, index + 1);
    
    memo[index] = Math.max(robCurrent, skipCurrent);
    return memo[index];
}

// Test function
function testHouseRobberII() {
    const testCases = [
        [2, 3, 2],
        [1, 2, 3, 1],
        [1, 2, 3],
        [1],
        [1, 2],
        [2, 1, 1, 2],
        [5, 5, 10, 100, 10, 5]
    ];
    
    testCases.forEach((nums, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}]`);
        console.log(`Maximum money: ${rob(nums)}`);
        
        if (nums.length >= 3) {
            const detailed = robWithTracking(nums);
            console.log(`Houses robbed: [${detailed.houses.join(', ')}], Scenario: ${detailed.scenario}`);
        }
        console.log('---');
    });
}

// Example usage:
console.log(rob([2, 3, 2])); // Output: 3
console.log(rob([1, 2, 3, 1])); // Output: 4
console.log(rob([1, 2, 3])); // Output: 3

const detailed = robWithTracking([1, 2, 3, 1]);
console.log(detailed); 
// Output: { maxMoney: 4, houses: [0, 2], scenario: "exclude_last" }

/*
Time Complexity: O(n) - we solve two linear problems, each taking O(n)
Space Complexity: O(1) - only using constant extra space for variables

Key Insights:
1. Circular constraint means first and last house cannot both be robbed
2. Break into two linear subproblems and take maximum
3. Case 1: Rob from houses 0 to n-2 (can include first, must exclude last)
4. Case 2: Rob from houses 1 to n-1 (must exclude first, can include last)
5. Each subproblem is solved using standard House Robber DP
6. Edge cases need special handling (n=1, n=2)

Complexity Analysis:
- We essentially run the linear House Robber algorithm twice
- No additional space complexity beyond the linear version
- The circular constraint is elegantly handled by problem decomposition

Pattern Recognition:
- When constraints create cycles, often we can break the cycle by fixing certain choices
- This transforms a complex constrained problem into simpler subproblems
*/
