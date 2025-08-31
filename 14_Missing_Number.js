// LeetCode 268. Missing Number

/*
Question:
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Follow up: Could you implement a solution using only O(1) extra space and O(n) runtime complexity?

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2, so the numbers are [0,2], and 2 is missing.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9, so the numbers are [0,9], and 8 is missing.

Constraints:
- n == nums.length
- 1 <= n <= 10^4
- 0 <= nums[i] <= n
- All the numbers of nums are unique.
*/

/*
Explanation:
The sum of numbers from 0 to n is n*(n+1)/2. If we sum all the elements in the array and subtract this from the expected sum, we get the missing number.

Steps:
1. Calculate the expected sum of numbers from 0 to n.
2. Subtract the actual sum of nums from the expected sum.
3. The result is the missing number.
*/

function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
    return expectedSum - actualSum;
}

// Example usage:
console.log(missingNumber([3,0,1])); // Output: 2
console.log(missingNumber([0,1])); // Output: 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // Output: 8
