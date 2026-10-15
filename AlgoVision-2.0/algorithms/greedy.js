class GreedyOptimizer {

    selectActivities(activities) {

        // Sort activities by finish time
        activities.sort(
            (a, b) => a.finish - b.finish
        );

        const selected = [];

        let lastFinish = -1;

        activities.forEach(activity => {

            if (activity.start >= lastFinish) {

                selected.push(activity);

                lastFinish = activity.finish;
            }

        });

        return selected;
    }
}

const greedyOptimizer = new GreedyOptimizer();