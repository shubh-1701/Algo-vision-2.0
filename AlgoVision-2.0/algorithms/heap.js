class MaxHeap {

    constructor() {
        this.heap = [];
    }

    insert(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    extractMax() {

        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];

        this.heap[0] = this.heap.pop();

        this.heapifyDown();

        return max;
    }

    heapifyUp() {

        let index = this.heap.length - 1;

        while (index > 0) {

            const parentIndex =
                Math.floor((index - 1) / 2);

            if (
                this.heap[parentIndex].priority >=
                this.heap[index].priority
            ) {
                break;
            }

            [
                this.heap[parentIndex],
                this.heap[index]
            ] =
            [
                this.heap[index],
                this.heap[parentIndex]
            ];

            index = parentIndex;
        }
    }

    heapifyDown() {

        let index = 0;

        while (true) {

            let largest = index;

            const leftChild =
                2 * index + 1;

            const rightChild =
                2 * index + 2;

            if (
                leftChild < this.heap.length &&
                this.heap[leftChild].priority >
                this.heap[largest].priority
            ) {
                largest = leftChild;
            }

            if (
                rightChild < this.heap.length &&
                this.heap[rightChild].priority >
                this.heap[largest].priority
            ) {
                largest = rightChild;
            }

            if (largest === index) {
                break;
            }

            [
                this.heap[index],
                this.heap[largest]
            ] =
            [
                this.heap[largest],
                this.heap[index]
            ];

            index = largest;
        }
    }

    getItems() {
        return this.heap;
    }

    size() {
        return this.heap.length;
    }
}

const priorityQueue = new MaxHeap();