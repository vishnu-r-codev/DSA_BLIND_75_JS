// Solution file
/**
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers
 */
function twoSum(nums, target) {
    // Create a map to store value and its index
    const numToIndex = {};

    // Loop through the array
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]; // Find the complement that adds up to target

        // If complement exists in map, return the indices
        if (numToIndex.hasOwnProperty(complement)) {
            return [numToIndex[complement], i];
        }

        // Otherwise, store the current number and its index in the map
        numToIndex[nums[i]] = i;
    }

    // If no solution is found (according to constraints, this won't happen)
    return [];
}

// Example usage:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
