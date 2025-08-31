/**
 * 238. Product of Array Except Self
 * Leetcode: https://leetcode.com/problems/product-of-array-except-self/
 * 
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
 * 
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * 
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 * 
 * Example 1:
 * Input: nums = [1,2,3,4]
 * Output: [24,12,8,6]
 * Explanation: 
 * - The product of all elements except nums[0] is 2*3*4 = 24.
 * - The product except nums[1] is 1*3*4 = 12.
 * - The product except nums[2] is 1*2*4 = 8.
 * - The product except nums[3] is 1*2*3 = 6.
 * 
 * Example 2:
 * Input: nums = [-1,1,0,-3,3]
 * Output: [0,0,9,0,0]
 * Explanation: 
 * - The product except nums[0] is 1*0*-3*3 = 0.
 * - The product except nums[1] is -1*0*-3*3 = 0.
 * - The product except nums[2] is -1*1*-3*3 = 9.
 * - The product except nums[3] is -1*1*0*3 = 0.
 * - The product except nums[4] is -1*1*0*-3 = 0.
 * 
 * Approach:
 * - We need to find the product of all elements except the current one for each index.
 * - We can't use division, so we use two passes:
 *   1. Calculate prefix products: for each index, multiply all elements to the left
 *   2. Calculate suffix products: for each index, multiply all elements to the right
 *   3. Multiply prefix and suffix products for final result
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) (excluding the output array)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const answer = new Array(n);
    
    // answer[i] contains the product of all elements to the left of i
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }
    
    // R contains the product of all elements to the right
    let R = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] = answer[i] * R;
        R *= nums[i];
    }
    
    return answer;
};

// Example Usage:
console.log(productExceptSelf([1,2,3,4]));      // Output: [24, 12, 8, 6]
console.log(productExceptSelf([-1,1,0,-3,3]));  // Output: [0, 0, 9, 0, 0]
