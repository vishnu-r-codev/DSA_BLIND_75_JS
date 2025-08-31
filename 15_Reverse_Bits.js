// 15. Reverse Bits
// LeetCode Link: https://leetcode.com/problems/reverse-bits/

// Question:
// Reverse bits of a given 32 bits unsigned integer.
// Note:
// - Note that in some languages, such as Java, there is no unsigned integer type. 
//   In this case, both input and output will be given as a signed integer type. 
//   They should not affect your implementation, as the integer's internal binary representation is the same.
// - You must solve the problem without using any built-in bitwise reversal functions.

// Example 1:
// Input: n = 00000010100101000001111010011100
// Output:    964176192 (00111001011110000010100101000000)
// Explanation: The input binary string 00000010100101000001111010011100
// becomes                   00111001011110000010100101000000 after reversing its bits.

// Example 2:
// Input: n = 11111111111111111111111111111101
// Output:   3221225471 (10111111111111111111111111111111)
// Explanation: The input binary string 11111111111111111111111111111101
// becomes                   10111111111111111111111111111111 after reversing its bits.

// Solution:
var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        // Shift result to left to make room for the next bit
        result <<= 1;
        // Add the least significant bit of n to result
        result |= (n & 1);
        // Shift n right to process the next bit
        n >>>= 1;
    }
    // result now contains the reversed bits
    return result >>> 0;
};

// Explanation:
// 1. The loop runs 32 times, once for each bit in a 32-bit integer.
// 2. Each time, we shift result to the left (by 1) to make room for the next bit.
// 3. We take the last bit from n (n & 1) and add it to result.
// 4. We shift n to the right (unsigned shift) to process the next bit in the next iteration.
// 5. After the loop, 'result' contains all bits in reverse order.
// 6. We use '>>> 0' to ensure the result is treated as an unsigned 32-bit integer.

// Examples:
// Example 1:
let input1 = parseInt('00000010100101000001111010011100', 2);
console.log(reverseBits(input1)); // Output: 964176192

// Example 2:
let input2 = parseInt('11111111111111111111111111111101', 2);
console.log(reverseBits(input2)); // Output: 3221225471
