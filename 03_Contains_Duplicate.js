// Solution file
/**
 * LeetCode #217: Contains Duplicate
 * 
 * Question:
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 * 
 * Example 1:
 * Input: nums = [1,2,3,1]
 * Output: true
 * Explanation: The value 1 appears twice.
 * 
 * Example 2:
 * Input: nums = [1,2,3,4]
 * Output: false
 * Explanation: All elements are distinct.
 * 
 * Example 3:
 * Input: nums = [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 * Explanation: Several values appear more than once.
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 * 
 * Explanation:
 * To determine if there are duplicates, the most efficient way is to use a Set.
 * A Set only stores unique values. As we iterate through the array, we check if
 * the value is already in the Set. If it is, we return true. If not, we add it
 * to the Set. If we finish iterating without finding duplicates, we return false.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) {
            return true; // Duplicate found
        }
        seen.add(num);
    }
    return false; // All elements are unique
};

// Example usage:
console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // true
