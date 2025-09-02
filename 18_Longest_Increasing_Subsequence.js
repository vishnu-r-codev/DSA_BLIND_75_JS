// 18. Longest Increasing Subsequence
// LeetCode Link: https://leetcode.com/problems/longest-increasing-subsequence/

/*
Question:
Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,18], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraints:
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4

Follow up: Can you come up with an algorithm that runs in O(n log n) time complexity?

Explanation:
There are two main approaches:
1. Dynamic Programming - O(n²) time, O(n) space
2. Binary Search with patience sorting - O(n log n) time, O(n) space

DP Approach:
- dp[i] represents the length of LIS ending at index i
- For each position, check all previous positions and extend the longest valid subsequence
- dp[i] = max(dp[j] + 1) where j < i and nums[j] < nums[i]

Binary Search Approach:
- Maintain an array that stores the smallest ending element for each possible LIS length
- For each element, find the position where it should be placed using binary search
*/

// Solution 1: Dynamic Programming - O(n²)
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    let maxLength = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// Solution 2: Binary Search (Patience Sorting) - O(n log n)
function lengthOfLISOptimal(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (let num of nums) {
        let left = 0, right = tails.length;
        
        // Binary search for the position to insert/replace
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // If left == tails.length, append; otherwise replace
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// Solution 3: DP with actual subsequence tracking
function lengthOfLISWithSequence(nums) {
    if (nums.length === 0) return { length: 0, sequence: [] };
    
    const dp = new Array(nums.length).fill(1);
    const prev = new Array(nums.length).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;
    
    // Fill DP array and track previous elements
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }
    
    // Reconstruct the sequence
    const sequence = [];
    let current = maxIndex;
    while (current !== -1) {
        sequence.unshift(nums[current]);
        current = prev[current];
    }
    
    return { length: maxLength, sequence: sequence };
}

// Helper function for binary search approach with custom comparator
function binarySearch(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// Example usage:
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Output: 4
console.log(lengthOfLIS([0,1,0,3,2,3])); // Output: 4
console.log(lengthOfLIS([7,7,7,7,7,7,7])); // Output: 1

console.log(lengthOfLISOptimal([10,9,2,5,3,7,101,18])); // Output: 4
console.log(lengthOfLISWithSequence([10,9,2,5,3,7,101,18])); 
// Output: { length: 4, sequence: [2, 3, 7, 18] }

/*
Time Complexity:
- DP Solution: O(n²)
- Binary Search Solution: O(n log n)

Space Complexity: O(n) for both

Key Insights:
1. DP solution is straightforward but slower for large inputs
2. Binary search solution uses "patience sorting" concept
3. The tails array doesn't store the actual LIS, but enables us to find the length
4. For the actual subsequence, we need additional tracking (prev array)
5. Binary search finds the leftmost position where element should be inserted
*/
