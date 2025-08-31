// 13. Counting Bits

/*
Question:
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Example 1:
Input: n = 2
Output: [0,1,1]
Explanation:
- 0 --> 0 (zero 1's)
- 1 --> 1 (one 1)
- 2 --> 10 (one 1)

Example 2:
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
- 0 --> 0 (zero 1's)
- 1 --> 1 (one 1)
- 2 --> 10 (one 1)
- 3 --> 11 (two 1's)
- 4 --> 100 (one 1)
- 5 --> 101 (two 1's)

Constraints:
- 0 <= n <= 10^5

Explanation:
We can solve this problem using dynamic programming. 
Notice that the number of 1's in the binary representation of i is equal to the number of 1's in i // 2 (i right-shifted by 1), plus i % 2 (which is 1 if i is odd, 0 if even).

That is: 
    ans[i] = ans[i >> 1] + (i & 1)

This formula works because:
- i >> 1 removes the last bit from i (essentially dividing by 2)
- (i & 1) checks if the last bit is 1 or 0

Solution:
*/

var countBits = function(n) {
    let ans = new Array(n + 1).fill(0);
    for(let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
};

// Example usage:
console.log(countBits(2)); // Output: [0,1,1]
console.log(countBits(5)); // Output: [0,1,1,2,1,2]
