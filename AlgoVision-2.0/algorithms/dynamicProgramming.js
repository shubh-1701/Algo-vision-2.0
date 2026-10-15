class DynamicProgramming {

    knapsack(items, capacity) {

        const n = items.length;

        const dp = Array.from(
            { length: n + 1 },
            () => Array(capacity + 1).fill(0)
        );

        for (let i = 1; i <= n; i++) {

            for (let w = 0; w <= capacity; w++) {

                if (items[i - 1].weight <= w) {

                    dp[i][w] = Math.max(

                        items[i - 1].value +
                        dp[
                            i - 1
                        ][
                            w - items[i - 1].weight
                        ],

                        dp[i - 1][w]

                    );

                } else {

                    dp[i][w] =
                        dp[i - 1][w];

                }
            }
        }

        return {
            maxValue: dp[n][capacity],
            table: dp
        };
    }
}

const dynamicProgramming =
    new DynamicProgramming();