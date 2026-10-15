function scrollToModules() {
    document.getElementById("modules").scrollIntoView({
        behavior: "smooth"
    });
}


function showModule(module) {

    const workspace =
        document.getElementById("workspaceContent");

    if (module === "ingestion") {

        showIngestionModule();

    } else if (module === "catalog") {

        showCatalogModule();

    } else if (module === "search") {

    showSearchModule();

    } else if (module === "optimizer") {

    showOptimizerModule();

    } else if (module === "graph") {

    showGraphModule();

    } else {

        const moduleNames = {
            optimizer: "Optimizer",
            graph: "Graph Visualization"
        };

        workspace.innerHTML = `
            <div class="empty-workspace">
                <div class="empty-icon">⚙</div>
                <h3>${moduleNames[module]}</h3>
                <p>
                    The interactive ${moduleNames[module]}
                    module will appear here.
                </p>
            </div>
        `;
    }

    document
        .getElementById("moduleWorkspace")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   DATA INGESTION MODULE
========================= */

function showIngestionModule() {

    const workspace = document.getElementById("workspaceContent");

    workspace.innerHTML = `
        <div class="module-workspace">

            <div class="workspace-info">
                <h3>Data Ingestion System</h3>
                <p>
                    Add incoming orders to the Queue. Orders are processed
                    using the FIFO principle and stored in a Hash Table
                    for fast retrieval.
                </p>
            </div>

            <div class="input-container">

                <input
                    type="text"
                    id="orderName"
                    placeholder="Enter order name"
                >

                <input
                    type="number"
                    id="orderPriority"
                    placeholder="Enter priority"
                >

                <button onclick="addOrder()">
                    + Add Order
                </button>

                <button
                    class="process-btn"
                    onclick="processOrder()"
                >
                    Process Next →
                </button>

            </div>

            <div class="queue-section">

                <div class="queue-header">
                    <h3>Queue Visualization</h3>

                    <span id="queueSize">
                        0 items
                    </span>
                </div>

                <div id="queueVisualization"
                     class="queue-visualization">
                </div>

            </div>

            <div class="processed-section">

                <h3>Processed Orders</h3>

                <div
                    id="processedOrders"
                    class="processed-orders"
                >
                    <p class="empty-message">
                        No orders processed yet.
                    </p>
                </div>

            </div>

        </div>
    `;

    updateQueueVisualization();
}


function addOrder() {

    const nameInput =
        document.getElementById("orderName");

    const priorityInput =
        document.getElementById("orderPriority");

    const name = nameInput.value.trim();
    const priority = priorityInput.value;

    if (name === "") {
        alert("Please enter an order name.");
        return;
    }

    const orderId =
        "ORD-" + Math.floor(Math.random() * 100000);

    const order = {
        id: orderId,
        name: name,
        priority: priority || "Normal"
    };


    // Add order to Queue

    orderQueue.enqueue(order);


    // Store order in Hash Table

    orderDatabase.set(orderId, order);


    // Clear inputs

    nameInput.value = "";
    priorityInput.value = "";


    updateQueueVisualization();
}


function processOrder() {

    const order = orderQueue.dequeue();

    if (order === null) {
        alert("Queue is empty.");
        return;
    }


    updateQueueVisualization();


    const processedContainer =
        document.getElementById("processedOrders");


    const emptyMessage =
        processedContainer.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }


    const orderElement =
        document.createElement("div");

    orderElement.className = "processed-order";


    orderElement.innerHTML = `
        <strong>${order.id}</strong>
        <span>${order.name}</span>
        <span class="priority">
            Priority: ${order.priority}
        </span>
    `;


    processedContainer.prepend(orderElement);
}


function updateQueueVisualization() {

    const visualization =
        document.getElementById("queueVisualization");

    if (!visualization) return;


    const queueSize =
        document.getElementById("queueSize");


    visualization.innerHTML = "";


    if (orderQueue.isEmpty()) {

        visualization.innerHTML = `
            <p class="empty-message">
                Queue is empty. Add an order to begin.
            </p>
        `;

    } else {

        orderQueue.getItems().forEach(
            (order, index) => {

                const orderElement =
                    document.createElement("div");

                orderElement.className = "queue-item";


                orderElement.innerHTML = `
                    <div class="queue-position">
                        ${index === 0
                            ? "FRONT"
                            : index === orderQueue.size() - 1
                            ? "REAR"
                            : "#" + (index + 1)
                        }
                    </div>

                    <strong>${order.name}</strong>

                    <small>${order.id}</small>
                `;


                visualization.appendChild(orderElement);
            }
        );
    }


    queueSize.textContent =
        orderQueue.size() +
        (orderQueue.size() === 1
            ? " item"
            : " items");


    // Update dashboard statistics

    const dashboardCount =
        document.getElementById("queueCount");

    if (dashboardCount) {
        dashboardCount.textContent =
            orderQueue.size();
    }
}
/* =========================
   CATALOGING MODULE
========================= */

function showCatalogModule() {

    const workspace =
        document.getElementById("workspaceContent");

    workspace.innerHTML = `
        <div class="module-workspace">

            <div class="workspace-info">
                <h3>Product Catalog System</h3>

                <p>
                    Manage products using Array operations.
                    Add, remove, search and sort products
                    dynamically.
                </p>
            </div>


            <div class="catalog-inputs">

                <input
                    type="text"
                    id="productName"
                    placeholder="Enter product name"
                >

                <input
                    type="number"
                    id="productPrice"
                    placeholder="Enter price"
                >

                <button onclick="addProduct()">
                    + Add Product
                </button>

            </div>


            <div class="catalog-controls">

                <input
                    type="text"
                    id="searchProduct"
                    placeholder="Search product..."
                    oninput="searchProduct()"
                >

                <button onclick="sortProducts()">
                    ↕ Sort A–Z
                </button>

            </div>


            <div class="catalog-header">

                <h3>Product Catalog</h3>

                <span id="catalogSize">
                    0 products
                </span>

            </div>


            <div
                id="catalogVisualization"
                class="catalog-visualization"
            >
            </div>

        </div>
    `;

    updateCatalogVisualization();
}


/* ADD PRODUCT */

function addProduct() {

    const nameInput =
        document.getElementById("productName");

    const priceInput =
        document.getElementById("productPrice");

    const name =
        nameInput.value.trim();

    const price =
        priceInput.value;


    if (name === "") {

        alert("Please enter a product name.");

        return;
    }


    const product = {

        id:
            "PROD-" +
            Math.floor(Math.random() * 100000),

        name: name,

        price:
            price || 0
    };


    productCatalog.add(product);


    nameInput.value = "";
    priceInput.value = "";


    updateCatalogVisualization();
}


/* DELETE PRODUCT */

function deleteProduct(id) {

    productCatalog.remove(id);

    updateCatalogVisualization();
}


/* SEARCH PRODUCT */

function searchProduct() {

    const searchInput =
        document.getElementById("searchProduct");

    const keyword =
        searchInput.value.trim();


    if (keyword === "") {

        updateCatalogVisualization();

        return;
    }


    const results =
        productCatalog.search(keyword);


    renderCatalog(results);
}


/* SORT PRODUCTS */

function sortProducts() {

    productCatalog.sortByName();

    updateCatalogVisualization();
}


/* UPDATE CATALOG */

function updateCatalogVisualization() {

    renderCatalog(
        productCatalog.getAll()
    );


    const catalogSize =
        document.getElementById("catalogSize");


    if (catalogSize) {

        const count =
            productCatalog.size();


        catalogSize.textContent =
            count +
            (count === 1
                ? " product"
                : " products");
    }


    const dashboardCount =
        document.getElementById("catalogCount");


    if (dashboardCount) {

        dashboardCount.textContent =
            productCatalog.size();
    }
}


/* RENDER PRODUCTS */

function renderCatalog(products) {

    const container =
        document.getElementById(
            "catalogVisualization"
        );


    if (!container) return;


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No products found.
                Add a product to begin.
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const productElement =
            document.createElement("div");


        productElement.className =
            "product-item";


        productElement.innerHTML = `

            <div class="product-info">

                <strong>
                    ${product.name}
                </strong>

                <small>
                    ${product.id}
                </small>

            </div>


            <div class="product-price">

                ₹${product.price}

            </div>


            <button
                class="delete-btn"

                onclick="deleteProduct('${product.id}')"
            >
                Delete
            </button>

        `;


        container.appendChild(
            productElement
        );

    });
}
/* =========================
   SEARCH ENGINE MODULE
========================= */

function showSearchModule() {

    const workspace =
        document.getElementById("workspaceContent");

    workspace.innerHTML = `
        <div class="module-workspace">

            <div class="workspace-info">
                <h3>Search Engine & Priority Queue</h3>

                <p>
                    Add values to a Binary Search Tree for efficient
                    searching and add tasks to a Max Heap where the
                    highest-priority task is processed first.
                </p>
            </div>


            <!-- BST SECTION -->

            <div class="search-panel">

                <h3>🌳 Binary Search Tree</h3>

                <div class="catalog-inputs">

                    <input
                        type="number"
                        id="bstValue"
                        placeholder="Enter a number"
                    >

                    <button onclick="addBSTValue()">
                        + Insert
                    </button>

                    <button
                        class="heap-btn"
                        onclick="searchBSTValue()"
                    >
                        🔍 Search
                    </button>

                </div>

                <div id="bstResult"
                     class="algorithm-result">
                    Insert numbers into the BST.
                </div>

                <div id="bstVisualization"
                     class="bst-visualization">
                </div>

            </div>


            <!-- HEAP SECTION -->

            <div class="search-panel">

                <h3>🔺 Priority Queue (Max Heap)</h3>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="taskName"
                        placeholder="Enter task name"
                    >

                    <input
                        type="number"
                        id="taskPriority"
                        placeholder="Priority (1–100)"
                    >

                    <button onclick="addPriorityTask()">
                        + Add Task
                    </button>

                    <button
                        class="heap-btn"
                        onclick="processPriorityTask()"
                    >
                        Process Highest
                    </button>

                </div>

                <div id="heapResult"
                     class="algorithm-result">
                    Add tasks to the Priority Queue.
                </div>

                <div id="heapVisualization"
                     class="heap-visualization">
                </div>

            </div>

        </div>
    `;

    updateBSTVisualization();
    updateHeapVisualization();
}


/* BST FUNCTIONS */

function addBSTValue() {

    const input =
        document.getElementById("bstValue");

    const value = Number(input.value);

    if (input.value === "") {
        alert("Please enter a number.");
        return;
    }

    searchTree.insert(value);

    input.value = "";

    document.getElementById(
        "bstResult"
    ).textContent =
        value + " inserted into the BST.";

    updateBSTVisualization();
}


function searchBSTValue() {

    const input =
        document.getElementById("bstValue");

    if (input.value === "") {
        alert("Enter a number to search.");
        return;
    }

    const value = Number(input.value);

    const found =
        searchTree.search(value);

    document.getElementById(
        "bstResult"
    ).textContent =
        found
            ? "✓ " + value + " was found in the BST."
            : "✗ " + value + " was not found.";

    input.value = "";
}


/* BST VISUALIZATION */

function updateBSTVisualization() {

    const container =
        document.getElementById(
            "bstVisualization"
        );

    if (!container) return;

    const values =
        searchTree.inOrder();

    if (values.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                BST is empty.
            </p>
        `;

        return;
    }

    container.innerHTML = "";

    values.forEach(value => {

        const node =
            document.createElement("div");

        node.className = "bst-node";

        node.textContent = value;

        container.appendChild(node);
    });
}


/* HEAP FUNCTIONS */

function addPriorityTask() {

    const nameInput =
        document.getElementById("taskName");

    const priorityInput =
        document.getElementById("taskPriority");

    const name =
        nameInput.value.trim();

    const priority =
        Number(priorityInput.value);

    if (name === "") {
        alert("Enter a task name.");
        return;
    }

    if (
        priorityInput.value === "" ||
        priority < 1 ||
        priority > 100
    ) {
        alert("Priority must be between 1 and 100.");
        return;
    }

    priorityQueue.insert({
        name: name,
        priority: priority
    });

    nameInput.value = "";
    priorityInput.value = "";

    document.getElementById(
        "heapResult"
    ).textContent =
        name + " added with priority " +
        priority + ".";

    updateHeapVisualization();
}


function processPriorityTask() {

    const task =
        priorityQueue.extractMax();

    if (task === null) {

        document.getElementById(
            "heapResult"
        ).textContent =
            "Priority Queue is empty.";

        return;
    }

    document.getElementById(
        "heapResult"
    ).textContent =
        "✓ Processing: " +
        task.name +
        " (Priority: " +
        task.priority +
        ")";

    updateHeapVisualization();
}


/* HEAP VISUALIZATION */

function updateHeapVisualization() {

    const container =
        document.getElementById(
            "heapVisualization"
        );

    if (!container) return;

    const tasks =
        priorityQueue.getItems();

    if (tasks.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Priority Queue is empty.
            </p>
        `;

        return;
    }

    container.innerHTML = "";

    tasks.forEach((task, index) => {

        const taskElement =
            document.createElement("div");

        taskElement.className =
            "heap-item";

        taskElement.innerHTML = `
            <span class="heap-index">
                #${index + 1}
            </span>

            <strong>${task.name}</strong>

            <span>
                Priority: ${task.priority}
            </span>
        `;

        container.appendChild(taskElement);
    });
}
/* =========================
   OPTIMIZER MODULE
========================= */

function showOptimizerModule() {

    const workspace =
        document.getElementById("workspaceContent");

    workspace.innerHTML = `
        <div class="module-workspace">

            <div class="workspace-info">

                <h3>Algorithm Optimizer</h3>

                <p>
                    Compare two important optimization techniques:
                    Greedy Algorithms and Dynamic Programming.
                </p>

            </div>


            <!-- GREEDY SECTION -->

            <div class="search-panel">

                <h3>⚡ Greedy Algorithm — Activity Selection</h3>

                <p class="panel-description">
                    Enter an activity with its start and finish time.
                    The algorithm selects the maximum number of
                    non-overlapping activities.
                </p>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="activityName"
                        placeholder="Activity name"
                    >

                    <input
                        type="number"
                        id="activityStart"
                        placeholder="Start time"
                    >

                    <input
                        type="number"
                        id="activityFinish"
                        placeholder="Finish time"
                    >

                    <button onclick="addActivity()">
                        + Add Activity
                    </button>

                    <button
                        class="heap-btn"
                        onclick="runGreedyAlgorithm()"
                    >
                        Run Greedy
                    </button>

                </div>

                <div
                    id="greedyActivities"
                    class="activity-list"
                >
                </div>

                <div
                    id="greedyResult"
                    class="algorithm-result"
                >
                    Add activities to begin.
                </div>

            </div>


            <!-- DYNAMIC PROGRAMMING SECTION -->

            <div class="search-panel">

                <h3>🧠 Dynamic Programming — 0/1 Knapsack</h3>

                <p class="panel-description">
                    Add items with a weight and value. Then set the
                    maximum capacity and find the maximum possible value.
                </p>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="itemName"
                        placeholder="Item name"
                    >

                    <input
                        type="number"
                        id="itemWeight"
                        placeholder="Weight"
                    >

                    <input
                        type="number"
                        id="itemValue"
                        placeholder="Value"
                    >

                    <button onclick="addKnapsackItem()">
                        + Add Item
                    </button>

                </div>


                <div class="catalog-inputs">

                    <input
                        type="number"
                        id="knapsackCapacity"
                        placeholder="Maximum capacity"
                    >

                    <button
                        class="heap-btn"
                        onclick="runKnapsack()"
                    >
                        Calculate Maximum Value
                    </button>

                </div>


                <div
                    id="knapsackItems"
                    class="activity-list"
                >
                </div>

                <div
                    id="knapsackResult"
                    class="algorithm-result"
                >
                    Add items and set a capacity.
                </div>

            </div>

        </div>
    `;

    renderActivities();
    renderKnapsackItems();
}


/* =========================
   GREEDY ALGORITHM
========================= */

const activities = [];


function addActivity() {

    const nameInput =
        document.getElementById("activityName");

    const startInput =
        document.getElementById("activityStart");

    const finishInput =
        document.getElementById("activityFinish");


    const name =
        nameInput.value.trim();

    const start =
        Number(startInput.value);

    const finish =
        Number(finishInput.value);


    if (
        name === "" ||
        startInput.value === "" ||
        finishInput.value === ""
    ) {

        alert("Please fill in all activity details.");

        return;
    }


    if (finish <= start) {

        alert(
            "Finish time must be greater than start time."
        );

        return;
    }


    activities.push({
        name: name,
        start: start,
        finish: finish
    });


    nameInput.value = "";
    startInput.value = "";
    finishInput.value = "";


    renderActivities();
}


function renderActivities() {

    const container =
        document.getElementById(
            "greedyActivities"
        );

    if (!container) return;


    if (activities.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No activities added yet.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    activities.forEach((activity, index) => {

        const element =
            document.createElement("div");

        element.className = "activity-item";


        element.innerHTML = `

            <span class="activity-number">
                #${index + 1}
            </span>

            <strong>
                ${activity.name}
            </strong>

            <span>
                ${activity.start} → ${activity.finish}
            </span>

        `;


        container.appendChild(element);

    });
}


function runGreedyAlgorithm() {

    if (activities.length === 0) {

        alert(
            "Add at least one activity first."
        );

        return;
    }


    const selected =
        greedyOptimizer.selectActivities(
            [...activities]
        );


    const names =
        selected.map(
            activity => activity.name
        ).join(", ");


    document.getElementById(
        "greedyResult"
    ).innerHTML = `
        ✓ Selected ${selected.length} activity(s):

        <strong>${names}</strong>
    `;
}


/* =========================
   DYNAMIC PROGRAMMING
========================= */

const knapsackItems = [];


function addKnapsackItem() {

    const nameInput =
        document.getElementById("itemName");

    const weightInput =
        document.getElementById("itemWeight");

    const valueInput =
        document.getElementById("itemValue");


    const name =
        nameInput.value.trim();

    const weight =
        Number(weightInput.value);

    const value =
        Number(valueInput.value);


    if (
        name === "" ||
        weightInput.value === "" ||
        valueInput.value === ""
    ) {

        alert("Please fill in all item details.");

        return;
    }


    if (weight <= 0 || value < 0) {

        alert(
            "Weight must be greater than 0 and value cannot be negative."
        );

        return;
    }


    knapsackItems.push({
        name: name,
        weight: weight,
        value: value
    });


    nameInput.value = "";
    weightInput.value = "";
    valueInput.value = "";


    renderKnapsackItems();
}


function renderKnapsackItems() {

    const container =
        document.getElementById(
            "knapsackItems"
        );

    if (!container) return;


    if (knapsackItems.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No items added yet.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    knapsackItems.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "activity-item";


        element.innerHTML = `

            <span class="activity-number">
                #${index + 1}
            </span>

            <strong>
                ${item.name}
            </strong>

            <span>
                Weight: ${item.weight}
            </span>

            <span>
                Value: ${item.value}
            </span>

        `;


        container.appendChild(element);

    });
}


function runKnapsack() {

    const capacityInput =
        document.getElementById(
            "knapsackCapacity"
        );

    const capacity =
        Number(capacityInput.value);


    if (
        capacityInput.value === "" ||
        capacity <= 0
    ) {

        alert(
            "Please enter a valid capacity."
        );

        return;
    }


    if (knapsackItems.length === 0) {

        alert(
            "Add at least one item first."
        );

        return;
    }


    const result =
        dynamicProgramming.knapsack(
            knapsackItems,
            capacity
        );


    document.getElementById(
        "knapsackResult"
    ).innerHTML = `
        ✓ Maximum Value:

        <strong>${result.maxValue}</strong>

        with a capacity of

        <strong>${capacity}</strong>
    `;
}
/* =========================
   GRAPH VISUALIZATION MODULE
========================= */

function showGraphModule() {

    const workspace =
        document.getElementById(
            "workspaceContent"
        );

    workspace.innerHTML = `
        <div class="module-workspace">

            <div class="workspace-info">

                <h3>
                    Graph Visualization & Shortest Path
                </h3>

                <p>
                    Create nodes and weighted connections.
                    Use Dijkstra's Algorithm to calculate
                    the shortest path between two nodes.
                </p>

            </div>


            <!-- ADD NODE -->

            <div class="search-panel">

                <h3>◯ Add Graph Node</h3>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="graphNode"
                        placeholder="Enter node name (A, B, C...)"
                    >

                    <button onclick="addGraphNode()">
                        + Add Node
                    </button>

                </div>

            </div>


            <!-- ADD CONNECTION -->

            <div class="search-panel">

                <h3>🔗 Add Connection</h3>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="edgeFrom"
                        placeholder="From node"
                    >

                    <input
                        type="text"
                        id="edgeTo"
                        placeholder="To node"
                    >

                    <input
                        type="number"
                        id="edgeWeight"
                        placeholder="Weight"
                    >

                    <button onclick="addGraphEdge()">
                        + Connect
                    </button>

                </div>

            </div>


            <!-- SHORTEST PATH -->

            <div class="search-panel">

                <h3>🛣 Find Shortest Path</h3>

                <div class="catalog-inputs">

                    <input
                        type="text"
                        id="pathStart"
                        placeholder="Start node"
                    >

                    <input
                        type="text"
                        id="pathEnd"
                        placeholder="Destination node"
                    >

                    <button
                        class="heap-btn"
                        onclick="findShortestPath()"
                    >
                        Find Path
                    </button>

                </div>

                <div
                    id="pathResult"
                    class="algorithm-result"
                >
                    Add nodes and connections to begin.
                </div>

            </div>


            <!-- GRAPH VISUALIZATION -->

            <div class="search-panel">

                <div class="graph-header">

                    <h3>Network Graph</h3>

                    <span id="graphStats">
                        0 nodes • 0 connections
                    </span>

                </div>

                <div
                    id="graphVisualization"
                    class="graph-visualization"
                >
                </div>

            </div>

        </div>
    `;

    updateGraphVisualization();
}


/* =========================
   ADD NODE
========================= */

function addGraphNode() {

    const input =
        document.getElementById(
            "graphNode"
        );

    const node =
        input.value
            .trim()
            .toUpperCase();


    if (node === "") {

        alert(
            "Please enter a node name."
        );

        return;
    }


    projectGraph.addNode(node);

    input.value = "";


    document.getElementById(
        "pathResult"
    ).textContent =
        "✓ Node " +
        node +
        " added successfully.";


    updateGraphVisualization();
}


/* =========================
   ADD CONNECTION
========================= */

function addGraphEdge() {

    const fromInput =
        document.getElementById(
            "edgeFrom"
        );

    const toInput =
        document.getElementById(
            "edgeTo"
        );

    const weightInput =
        document.getElementById(
            "edgeWeight"
        );


    const from =
        fromInput.value
            .trim()
            .toUpperCase();

    const to =
        toInput.value
            .trim()
            .toUpperCase();

    const weight =
        Number(
            weightInput.value
        );


    if (
        from === "" ||
        to === "" ||
        weightInput.value === ""
    ) {

        alert(
            "Please fill in all connection details."
        );

        return;
    }


    if (from === to) {

        alert(
            "A node cannot connect to itself."
        );

        return;
    }


    if (weight <= 0) {

        alert(
            "Weight must be greater than 0."
        );

        return;
    }


    projectGraph.addEdge(
        from,
        to,
        weight
    );


    fromInput.value = "";
    toInput.value = "";
    weightInput.value = "";


    document.getElementById(
        "pathResult"
    ).textContent =
        "✓ Connection added: " +
        from +
        " ↔ " +
        to +
        " (Weight: " +
        weight +
        ")";


    updateGraphVisualization();
}


/* =========================
   SHORTEST PATH
========================= */

function findShortestPath() {

    const startInput =
        document.getElementById(
            "pathStart"
        );

    const endInput =
        document.getElementById(
            "pathEnd"
        );


    const start =
        startInput.value
            .trim()
            .toUpperCase();

    const end =
        endInput.value
            .trim()
            .toUpperCase();


    if (
        start === "" ||
        end === ""
    ) {

        alert(
            "Enter both start and destination nodes."
        );

        return;
    }


    const nodes =
        projectGraph.getNodes();


    if (
        !nodes.includes(start) ||
        !nodes.includes(end)
    ) {

        alert(
            "One or both nodes do not exist."
        );

        return;
    }


    const result =
        projectGraph.dijkstra(
            start,
            end
        );


    if (
        result.distance === Infinity
    ) {

        document.getElementById(
            "pathResult"
        ).textContent =
            "No path exists between " +
            start +
            " and " +
            end +
            ".";

        return;
    }


    document.getElementById(
        "pathResult"
    ).innerHTML = `
        ✓ Shortest Path:

        <strong>
            ${result.path.join(" → ")}
        </strong>

        <br>

        Total Distance:

        <strong>
            ${result.distance}
        </strong>
    `;


    updateGraphVisualization(
        result.path
    );
}


/* =========================
   VISUALIZATION
========================= */

function updateGraphVisualization(
    shortestPath = []
) {

    const container =
        document.getElementById(
            "graphVisualization"
        );

    if (!container) return;


    const nodes =
        projectGraph.getNodes();

    const edges =
        projectGraph.getEdges();


    const stats =
        document.getElementById(
            "graphStats"
        );


    if (stats) {

        stats.textContent =
            nodes.length +
            (nodes.length === 1
                ? " node • "
                : " nodes • ") +
            edges.length +
            (edges.length === 1
                ? " connection"
                : " connections");
    }


    if (nodes.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Graph is empty.
                Add nodes to begin.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    /* GRAPH CONNECTIONS */

    const edgeContainer =
        document.createElement("div");

    edgeContainer.className =
        "graph-connections";


    edges.forEach(edge => {

        const edgeElement =
            document.createElement("div");

        const isInPath =
            shortestPath.includes(
                edge.from
            ) &&
            shortestPath.includes(
                edge.to
            );


        edgeElement.className =
            isInPath
                ? "graph-edge active-edge"
                : "graph-edge";


        edgeElement.innerHTML = `
            <strong>
                ${edge.from}
                ↔
                ${edge.to}
            </strong>

            <span>
                Weight: ${edge.weight}
            </span>
        `;


        edgeContainer.appendChild(
            edgeElement
        );

    });


    /* GRAPH NODES */

    const nodeContainer =
        document.createElement("div");

    nodeContainer.className =
        "graph-nodes";


    nodes.forEach(node => {

        const nodeElement =
            document.createElement("div");


        const isInPath =
            shortestPath.includes(
                node
            );


        nodeElement.className =
            isInPath
                ? "graph-node active-node"
                : "graph-node";


        nodeElement.textContent =
            node;


        nodeContainer.appendChild(
            nodeElement
        );

    });


    container.appendChild(
        edgeContainer
    );

    container.appendChild(
        nodeContainer
    );
}
/* =========================
   RESET ALL PROJECT DATA
========================= */

function resetAllData() {

    const confirmed = confirm(
        "Are you sure you want to reset all project data?"
    );

    if (!confirmed) {
        return;
    }

    // Reset Queue
    if (typeof orderQueue !== "undefined") {
        orderQueue.items = [];
    }

    // Reset Hash Table
    if (typeof orderDatabase !== "undefined") {
        orderDatabase.table = {};
    }

    // Reset Catalog
    if (typeof productCatalog !== "undefined") {
        productCatalog.items = [];
    }

    // Reset BST
    if (typeof searchTree !== "undefined") {
        searchTree.root = null;
    }

    // Reset Priority Queue
    if (typeof priorityQueue !== "undefined") {
        priorityQueue.heap = [];
    }

    // Reset Optimizer
    activities.length = 0;
    knapsackItems.length = 0;

    // Reset Graph
    if (typeof projectGraph !== "undefined") {
        projectGraph.adjacencyList = {};
    }

    alert("All project data has been reset.");

    // Reload the page so all visualizations return to empty state
    location.reload();
}