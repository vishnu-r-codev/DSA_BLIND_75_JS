// 3Sum (LeetCode #15)
// Source: https://leetcode.com/problems/3sum/

// --- Question ---
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
// i != j, i != k, and j != k, and
// nums[i] + nums[j] + nums[k] == 0.
//
// Notice that the solution set must not contain duplicate triplets.
//
// --- Example 1 ---
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
//
// --- Example 2 ---
// Input: nums = [0,1,1]
// Output: []
//
// --- Example 3 ---
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
//
// --- Constraints ---
// 1 <= nums.length <= 3000
// -10^5 <= nums[i] <= 10^5

// --- Solution ---
// The idea is to sort the array. For each number, use two pointers to find pairs that sum up to the negative of the current number.
// Skip duplicate numbers to avoid duplicate triplets.

function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicate nums[i]

        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip duplicates for left and right
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

// --- Explanation ---
// 1. Sort the array to easily skip duplicates and use two pointers.
// 2. Loop through the array, for each number nums[i]:
//    - If it's the same as the previous, skip to avoid duplicate triplets.
//    - Set left and right pointers to the ends of the subarray after i.
//    - Move pointers inward to find all pairs where nums[i] + nums[left] + nums[right] == 0.
//    - After finding a triplet, skip duplicate values for left and right to avoid duplicate triplets in the result.
//

// --- Examples ---

console.log(threeSum([-1,0,1,2,-1,-4])); // Output: [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0,1,1]));          // Output: []
console.log(threeSum([0,0,0]));          // Output: [[0,0,0]]
