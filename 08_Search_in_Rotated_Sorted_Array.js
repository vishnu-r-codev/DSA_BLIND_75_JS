/*
Search in Rotated Sorted Array

Question:
----------------
Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:
Input: nums = [1], target = 0
Output: -1

Explanation:
----------------
- The input array nums is originally sorted in ascending order, but is rotated at some pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
- Your task is to efficiently search for a given target value in this rotated array using binary search logic.

Approach:
----------------
1. Use Binary Search.
2. At each step, determine whether the left half or the right half is sorted.
3. If the left half is sorted, check if the target is in this range. If yes, move right pointer. If not, move left pointer.
4. If the right half is sorted, check if the target is in this range. If yes, move left pointer. If not, move right pointer.

Solution:
----------------
*/

function search(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Determine which side is sorted
        if (nums[left] <= nums[mid]) {
            // Left side is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Target is in the left half
            } else {
                left = mid + 1; // Target is in the right half
            }
        } else {
            // Right side is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Target is in the right half
            } else {
                right = mid - 1; // Target is in the left half
            }
        }
    }
    return -1;
}


console.log(search([4,5,6,7,0,1,2], 0));    // Output: 4
console.log(search([4,5,6,7,0,1,2], 3));    // Output: -1
console.log(search([1], 0));                // Output: -1
console.log(search([5,1,3], 5));            // Output: 0
console.log(search([5,1,3], 1));            // Output: 1
