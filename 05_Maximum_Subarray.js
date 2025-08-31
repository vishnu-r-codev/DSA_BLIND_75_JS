// 53. Maximum Subarray
// Source: https://leetcode.com/problems/maximum-subarray/

// Question:
// Given an integer array nums, find the contiguous subarray (containing at least one number) 
// which has the largest sum and return its sum.
//
// A subarray is a contiguous part of an array.
//
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
//
// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum = 1.
//
// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum = 23.
//
// Constraints:
// - 1 <= nums.length <= 10^5
// - -10^4 <= nums[i] <= 10^4
//
// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

// Solution Explanation (Kadane's Algorithm):
// We iterate through the array, maintaining a running sum (currentSum).
// - If currentSum becomes negative, we reset it to the current number, since any previous sum would only decrease the total.
// - We keep track of the maximum sum seen so far (maxSum).
// This ensures we always consider the best possible subarray ending at each position.
// Time Complexity: O(n), Space Complexity: O(1)

function maxSubArray(nums) {
    let maxSum = nums[0];      // Start with the first element as max
    let currentSum = nums[0];  // Start with the first element as running sum

    for (let i = 1; i < nums.length; i++) {
        // If currentSum is negative, start new subarray from nums[i]
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// Example Usage:
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6
console.log(maxSubArray([1]));                     // Output: 1
console.log(maxSubArray([5,4,-1,7,8]));            // Output: 23
