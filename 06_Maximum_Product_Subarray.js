/**
 * Question: Maximum Product Subarray
 * 
 * Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
 * 
 * A subarray is a sequence of consecutive elements within the array.
 * 
 * Examples:
 * 
 * Example 1:
 * Input: nums = [2, 3, -2, 4]
 * Output: 6
 * Explanation: The subarray [2,3] has the largest product = 6.
 * 
 * Example 2:
 * Input: nums = [-2,0,-1]
 * Output: 0
 * Explanation: The result cannot be -2, because the subarray must contain at least one number. The subarray [0] has product 0.
 * 
 * Example 3:
 * Input: nums = [-2,3,-4]
 * Output: 24
 * Explanation: The subarray [-2,3,-4] has the product (-2)*3*(-4) = 24.
 * 
 * Constraints:
 * - 1 <= nums.length <= 2 * 10^4
 * - -10 <= nums[i] <= 10
 * - The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * 
 * Solution:
 */

function maxProduct(nums) {
    if (nums.length === 0) return 0;

    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let curr = nums[i];
        let tempMax = Math.max(curr, maxProd * curr, minProd * curr);
        let tempMin = Math.min(curr, maxProd * curr, minProd * curr);

        maxProd = tempMax;
        minProd = tempMin;

        result = Math.max(result, maxProd);
    }

    return result;
}

/**
 * Explanation:
 * 
 * - We keep track of both the maximum and minimum product up to the current position.
 * - This is necessary because multiplying by a negative number swaps the largest and smallest values.
 * - At each step, we update maxProd and minProd to be the maximum and minimum of:
 *    - The current number itself,
 *    - The product of the current number and the previous maxProd,
 *    - The product of the current number and the previous minProd.
 * - We update the final result at each step by comparing it with the current maxProd.
 * 
 * This approach runs in O(n) time and O(1) space.
 */

// Example usage:
console.log(maxProduct([2, 3, -2, 4])); // Output: 6
console.log(maxProduct([-2, 0, -1]));   // Output: 0
console.log(maxProduct([-2, 3, -4]));   // Output: 24
