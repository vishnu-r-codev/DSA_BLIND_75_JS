// 11. Sum of Two Integers
// LeetCode Link: https://leetcode.com/problems/sum-of-two-integers/

/*
Question:
Given two integers a and b, return the sum of the two integers without using the operators + and -.

Example 1:
Input: a = 1, b = 2
Output: 3

Example 2:
Input: a = 2, b = 3
Output: 5

Constraints:
- -2^31 <= a, b <= 2^31 - 1
*/

/*
Explanation:
The problem requires summing two integers without directly using the + or - operators.
This can be achieved using bit manipulation:
- The XOR (^) operation performs addition without carrying.
- The AND (&) operation followed by a left shift (<<) finds the carry.
- We repeat the process until there is no carry left.
For JavaScript, to prevent infinite loops with negative numbers, we use a mask to simulate 32-bit integer overflow.
*/

function getSum(a, b) {
    // 32 bits mask in hexadecimal
    const mask = 0xFFFFFFFF;
    while (b !== 0) {
        let carry = (a & b) << 1;
        a = (a ^ b) & mask;
        b = carry & mask;
    }
    // if a is negative, get its 32-bit signed value
    return a > 0x7FFFFFFF ? ~(a ^ mask) : a;
}

// Examples
console.log(getSum(1, 2)); // Output: 3
console.log(getSum(2, 3)); // Output: 5
console.log(getSum(-2, 3)); // Output: 1
console.log(getSum(-1, -1)); // Output: -2
