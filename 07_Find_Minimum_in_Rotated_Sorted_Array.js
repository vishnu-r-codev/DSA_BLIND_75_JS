// 07. Find Minimum in Rotated Sorted Array

/*
Question:
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. 
For example, the array nums = [0,1,2,4,5,6,7] might become:
    [4,5,6,7,0,1,2] if it was rotated 4 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 0 times.

Constraints:
- n == nums.length
- 1 <= n <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are unique.
- nums is sorted and rotated between 1 and n times.
*/

/*
Explanation:
This problem is a variation of binary search.
The smallest value is the only element whose previous element is greater than it.
If there is no rotation (the array is already sorted), the first element is the smallest.

Approach:
- Use binary search to look for the inflection point (smallest element).
- If nums[mid] > nums[right], the minimum is to the right of mid.
- Else, the minimum is at mid or to the left of mid.
- Continue until left meets right.
*/

function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If the mid element is greater than the rightmost, min must be right of mid
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Min is at mid or to the left of mid
            right = mid;
        }
    }
    // At the end, left == right and points to the minimum element
    return nums[left];
}

// Example usage:
console.log(findMin([3,4,5,1,2])); // Output: 1
console.log(findMin([4,5,6,7,0,1,2])); // Output: 0
console.log(findMin([11,13,15,17])); // Output: 11
