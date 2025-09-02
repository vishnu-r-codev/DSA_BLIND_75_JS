// 22. House Robber
// LeetCode Link: https://leetcode.com/problems/house-robber/

/*
Question:
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

Constraints:
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

Explanation:
This is a classic dynamic programming problem.

DP State:
dp[i] = maximum money that can be robbed from houses 0 to i

Recurrence Relation:
For each house i, we have two choices:
1. Rob house i: dp[i] = nums[i] + dp[i-2] (can't rob adjacent house i-1)
2. Don't rob house i: dp[i] = dp[i-1] (take previous maximum)

So: dp[i] = max(nums[i] + dp[i-2], dp[i-1])

Base Cases:
- dp[0] = nums[0] (only one house)
- dp[1] = max(nums[0], nums[1]) (take better of first two houses)
*/

// Solution 1: Dynamic Programming with Array
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        // Either rob current house + best from i-2, or don't rob (take i-1)
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }
    
    return dp[nums.length - 1];
}

// Solution 2: Space Optimized DP (O(1) space)
function robOptimized(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0]; // dp[i-2]
    let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]
    
    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Solution 3: Even more concise space-optimized version
function robConcise(nums) {
    let rob = 0; // Maximum money robbed so far
    let notRob = 0; // Maximum money when not robbing current house
    
    for (let num of nums) {
        const temp = rob;
        rob = notRob + num; // Rob current house + previous notRob
        notRob = Math.max(temp, notRob); // Don't rob current, take max of previous states
    }
    
    return Math.max(rob, notRob);
}

// Solution 4: Recursive with Memoization
function robMemo(nums, index = 0, memo = {}) {
    // Base cases
    if (index >= nums.length) return 0;
    if (memo[index] !== undefined) return memo[index];
    
    // Two choices: rob current house or skip it
    const robCurrent = nums[index] + robMemo(nums, index + 2, memo);
    const skipCurrent = robMemo(nums, index + 1, memo);
    
    memo[index] = Math.max(robCurrent, skipCurrent);
    return memo[index];
}

// Solution 5: Alternative DP interpretation
function robAlternative(nums) {
    // incl: maximum money when including previous house
    // excl: maximum money when excluding previous house
    let incl = nums[0];
    let excl = 0;
    
    for (let i = 1; i < nums.length; i++) {
        const newExcl = Math.max(incl, excl);
        incl = excl + nums[i];
        excl = newExcl;
    }
    
    return Math.max(incl, excl);
}

// Solution 6: House Robber with house positions (for debugging)
function robWithPositions(nums) {
    if (nums.length === 0) return { maxMoney: 0, houses: [] };
    if (nums.length === 1) return { maxMoney: nums[0], houses: [0] };
    
    const dp = new Array(nums.length);
    const houses = new Array(nums.length);
    
    dp[0] = nums[0];
    houses[0] = [0];
    
    if (nums[0] > nums[1]) {
        dp[1] = nums[0];
        houses[1] = [0];
    } else {
        dp[1] = nums[1];
        houses[1] = [1];
    }
    
    for (let i = 2; i < nums.length; i++) {
        const robCurrent = nums[i] + dp[i - 2];
        const skipCurrent = dp[i - 1];
        
        if (robCurrent > skipCurrent) {
            dp[i] = robCurrent;
            houses[i] = [...houses[i - 2], i];
        } else {
            dp[i] = skipCurrent;
            houses[i] = [...houses[i - 1]];
        }
    }
    
    return { maxMoney: dp[nums.length - 1], houses: houses[nums.length - 1] };
}

// Helper function to test different approaches
function testHouseRobber() {
    const testCases = [
        [1, 2, 3, 1],
        [2, 7, 9, 3, 1],
        [2, 1, 1, 2],
        [5],
        [1, 2]
    ];
    
    testCases.forEach((nums, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}]`);
        console.log(`DP Result: ${rob(nums)}`);
        console.log(`Optimized Result: ${robOptimized(nums)}`);
        console.log(`Concise Result: ${robConcise(nums)}`);
        console.log(`Memo Result: ${robMemo(nums)}`);
        
        const detailed = robWithPositions(nums);
        console.log(`Max Money: ${detailed.maxMoney}, Houses: [${detailed.houses.join(', ')}]`);
        console.log('---');
    });
}

// Example usage:
console.log(rob([1, 2, 3, 1])); // Output: 4
console.log(rob([2, 7, 9, 3, 1])); // Output: 12

console.log(robOptimized([1, 2, 3, 1])); // Output: 4
console.log(robConcise([2, 7, 9, 3, 1])); // Output: 12

const detailed = robWithPositions([2, 7, 9, 3, 1]);
console.log(detailed); // Output: { maxMoney: 12, houses: [0, 2, 4] }

/*
Time Complexity: O(n) - single pass through the array
Space Complexity: 
- DP with array: O(n)
- Space optimized: O(1)
- Memoization: O(n) for memo + O(n) for recursion stack

Key Insights:
1. Classic DP problem with optimal substructure
2. At each house, we have two choices: rob or skip
3. If we rob current house, we must skip the previous house
4. State only depends on previous two states, so we can optimize space
5. The recurrence relation captures the constraint perfectly
6. Multiple ways to implement the same logic (rob/notRob, incl/excl, etc.)
7. Can be extended to track which houses were robbed for the optimal solution

Variations:
- House Robber II: Houses are in a circle (first and last are adjacent)
- House Robber III: Houses are arranged in a binary tree
*/
