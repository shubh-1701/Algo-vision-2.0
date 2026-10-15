class Graph {

    constructor() {
        this.adjacencyList = {};
    }


    addNode(node) {

        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = [];
        }
    }


    addEdge(node1, node2, weight) {

        this.addNode(node1);
        this.addNode(node2);

        this.adjacencyList[node1].push({
            node: node2,
            weight: weight
        });

        this.adjacencyList[node2].push({
            node: node1,
            weight: weight
        });
    }


    getNodes() {

        return Object.keys(
            this.adjacencyList
        );
    }


    getEdges() {

        const edges = [];
        const added = new Set();


        for (const node in this.adjacencyList) {

            this.adjacencyList[node].forEach(
                connection => {

                    const edgeId =
                        [node, connection.node]
                            .sort()
                            .join("-");


                    if (!added.has(edgeId)) {

                        edges.push({
                            from: node,
                            to: connection.node,
                            weight:
                                connection.weight
                        });

                        added.add(edgeId);
                    }

                }
            );
        }

        return edges;
    }


    dijkstra(start, end) {

        const nodes =
            this.getNodes();

        const distances = {};

        const previous = {};

        const unvisited =
            new Set(nodes);


        nodes.forEach(node => {

            distances[node] =
                Infinity;

            previous[node] =
                null;
        });


        distances[start] = 0;


        while (unvisited.size > 0) {

            let current = null;


            unvisited.forEach(node => {

                if (
                    current === null ||
                    distances[node] <
                    distances[current]
                ) {
                    current = node;
                }

            });


            if (
                current === null ||
                distances[current] === Infinity
            ) {
                break;
            }


            unvisited.delete(current);


            if (current === end) {
                break;
            }


            this.adjacencyList[current]
                .forEach(neighbor => {

                    if (
                        !unvisited.has(
                            neighbor.node
                        )
                    ) {
                        return;
                    }


                    const newDistance =
                        distances[current] +
                        neighbor.weight;


                    if (
                        newDistance <
                        distances[neighbor.node]
                    ) {

                        distances[
                            neighbor.node
                        ] =
                            newDistance;


                        previous[
                            neighbor.node
                        ] =
                            current;
                    }

                });
        }


        if (
            distances[end] === Infinity
        ) {

            return {
                distance: Infinity,
                path: []
            };
        }


        const path = [];

        let current = end;


        while (current !== null) {

            path.unshift(current);

            current =
                previous[current];
        }


        return {
            distance:
                distances[end],

            path: path
        };
    }
}


const projectGraph =
    new Graph();