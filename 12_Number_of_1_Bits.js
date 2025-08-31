// 12. Number of 1 Bits
// Source: https://leetcode.com/problems/number-of-1-bits/

// --- Question ---
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
// Example: Given the input 00000000000000000000000000001011, the function should return 3, because there are three '1' bits.

// --- Solution ---
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;
    while (n !== 0) {
        count += n & 1; // Check if the least significant bit is '1'
        n = n >>> 1; // Unsigned right shift by 1
    }
    return count;
};

// --- Explanation ---
// We count the number of '1' bits by iterating through all 32 bits of the unsigned integer.
// In each iteration, we check the least significant bit using bitwise AND with 1 (n & 1).
// If it's '1', we increment the count.
// Then, we use the unsigned right shift operator (>>>) to move to the next bit.
// We repeat this until all bits have been checked (i.e., n becomes 0).

// The use of >>> (unsigned right shift) is important because it fills leftmost bits with 0,
// and works properly for 32-bit unsigned integers in JavaScript.

// --- Examples ---

// Example 1:
// Input: n = 00000000000000000000000000001011
// Output: 3
// Explanation: The input binary string '00000000000000000000000000001011' has a total of three '1' bits.

// Example 2:
// Input: n = 00000000000000000000000010000000
// Output: 1
// Explanation: The input binary string '00000000000000000000000010000000' has a total of one '1' bit.

// Example 3:
// Input: n = 11111111111111111111111111111101
// Output: 31
// Explanation: The input binary string '11111111111111111111111111111101' has a total of thirty-one '1' bits.

// --- Usage ---
console.log(hammingWeight(0b00000000000000000000000000001011)); // Output: 3
console.log(hammingWeight(0b00000000000000000000000010000000)); // Output: 1
console.log(hammingWeight(0b11111111111111111111111111111101)); // Output: 31
