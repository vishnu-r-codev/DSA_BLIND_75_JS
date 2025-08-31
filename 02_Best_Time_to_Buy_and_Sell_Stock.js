/*
LeetCode 121: Best Time to Buy and Sell Stock

Question:
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4

Approach & Explanation:
We want to find the best day to buy before the best day to sell.
We'll keep track of the minimum price seen so far (minPrice), and for each day's price, calculate the profit if we sold on that day (price - minPrice).
We update the maximum profit (maxProfit) whenever we find a bigger profit.

This solution only needs one pass through the array, so it's O(n) time and O(1) space.

*/

function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        // If we find a lower price, update minPrice
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            // Else, check if selling at this price gives better profit
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}

// Example usage:
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // Output: 5
console.log(maxProfit([7, 6, 4, 3, 1]));    // Output: 0

/*
Explanation of first example:
- Buy at 1 (day 2), sell at 6 (day 5), profit = 5
- No other buy/sell pair gives a better profit.

Explanation of second example:
- Prices only go down, so no profit can be made. Return 0.
*/// Solution file
