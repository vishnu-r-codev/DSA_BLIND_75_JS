// 21. Combination Sum
// LeetCode Link: https://leetcode.com/problems/combination-sum/

/*
Question:
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Example 1:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2:
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Example 3:
Input: candidates = [2], target = 1
Output: []

Constraints:
- 1 <= candidates.length <= 30
- 1 <= candidates[i] <= 200
- All elements of candidates are distinct.
- 1 <= target <= 500

Explanation:
This is a classic backtracking problem with dynamic programming characteristics.
We can use either:
1. Backtracking with recursion
2. Dynamic Programming approach
3. BFS approach

The key insight is that we can reuse numbers unlimited times, and we need to avoid duplicate combinations by maintaining order.
*/

// Solution 1: Backtracking (Most Common Approach)
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(startIndex, currentCombination, remainingTarget) {
        // Base case: found valid combination
        if (remainingTarget === 0) {
            result.push([...currentCombination]);
            return;
        }
        
        // Base case: target exceeded
        if (remainingTarget < 0) {
            return;
        }
        
        // Try each candidate from startIndex onwards
        for (let i = startIndex; i < candidates.length; i++) {
            const candidate = candidates[i];
            
            // Include current candidate
            currentCombination.push(candidate);
            
            // Recurse with same startIndex (can reuse same number)
            backtrack(i, currentCombination, remainingTarget - candidate);
            
            // Backtrack
            currentCombination.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Solution 2: Dynamic Programming Approach
function combinationSumDP(candidates, target) {
    // dp[i] will store all combinations that sum to i
    const dp = Array(target + 1).fill().map(() => []);
    dp[0] = [[]]; // Base case: one way to make 0 (empty combination)
    
    for (let i = 1; i <= target; i++) {
        for (let candidate of candidates) {
            if (candidate <= i && dp[i - candidate].length > 0) {
                // Add current candidate to all combinations that sum to (i - candidate)
                for (let combination of dp[i - candidate]) {
                    // Only add if candidate >= last element to avoid duplicates
                    if (combination.length === 0 || candidate >= combination[combination.length - 1]) {
                        dp[i].push([...combination, candidate]);
                    }
                }
            }
        }
    }
    
    return dp[target];
}

// Solution 3: Optimized Backtracking with Pruning
function combinationSumOptimized(candidates, target) {
    // Sort candidates for better pruning
    candidates.sort((a, b) => a - b);
    const result = [];
    
    function backtrack(startIndex, currentCombination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...currentCombination]);
            return;
        }
        
        for (let i = startIndex; i < candidates.length; i++) {
            const candidate = candidates[i];
            
            // Pruning: if current candidate > remaining target, skip rest
            if (candidate > remainingTarget) {
                break;
            }
            
            currentCombination.push(candidate);
            backtrack(i, currentCombination, remainingTarget - candidate);
            currentCombination.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Solution 4: BFS Approach
function combinationSumBFS(candidates, target) {
    const result = [];
    const queue = [{ combination: [], sum: 0, startIndex: 0 }];
    
    while (queue.length > 0) {
        const { combination, sum, startIndex } = queue.shift();
        
        if (sum === target) {
            result.push([...combination]);
            continue;
        }
        
        if (sum > target) {
            continue;
        }
        
        for (let i = startIndex; i < candidates.length; i++) {
            const candidate = candidates[i];
            queue.push({
                combination: [...combination, candidate],
                sum: sum + candidate,
                startIndex: i
            });
        }
    }
    
    return result;
}

// Solution 5: Combination Sum II (for distinct combinations)
function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];
    
    function backtrack(startIndex, currentCombination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...currentCombination]);
            return;
        }
        
        for (let i = startIndex; i < candidates.length; i++) {
            // Skip duplicates
            if (i > startIndex && candidates[i] === candidates[i - 1]) {
                continue;
            }
            
            const candidate = candidates[i];
            if (candidate > remainingTarget) {
                break;
            }
            
            currentCombination.push(candidate);
            // Use i + 1 instead of i (each number used at most once)
            backtrack(i + 1, currentCombination, remainingTarget - candidate);
            currentCombination.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Helper function to test and display results
function testCombinationSum() {
    const testCases = [
        { candidates: [2, 3, 6, 7], target: 7 },
        { candidates: [2, 3, 5], target: 8 },
        { candidates: [2], target: 1 }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Candidates: [${testCase.candidates.join(', ')}], Target: ${testCase.target}`);
        console.log(`Result: ${JSON.stringify(combinationSum(testCase.candidates, testCase.target))}`);
        console.log('---');
    });
}

// Example usage:
console.log(combinationSum([2, 3, 6, 7], 7)); 
// Output: [[2,2,3],[7]]

console.log(combinationSum([2, 3, 5], 8)); 
// Output: [[2,2,2,2],[2,3,3],[3,5]]

console.log(combinationSum([2], 1)); 
// Output: []

console.log(combinationSumOptimized([2, 3, 6, 7], 7)); 
// Output: [[2,2,3],[7]]

/*
Time Complexity: O(N^(T/M)) where:
- N = number of candidates
- T = target value  
- M = minimal value among candidates

Space Complexity: O(T/M) for recursion depth

Key Insights:
1. Backtracking explores all possible combinations systematically
2. We avoid duplicates by maintaining order (only consider candidates >= current index)
3. Same number can be used multiple times (unlike Combination Sum II)
4. Pruning optimizations: sort array and break early when candidate > remaining target
5. DP approach builds up solutions from smaller targets
6. BFS explores level by level but may use more memory
7. The problem has overlapping subproblems but the nature of generating all combinations makes backtracking more natural
*/
