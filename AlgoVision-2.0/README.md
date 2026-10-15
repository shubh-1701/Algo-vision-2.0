# AlgoVision 2.0

## DSA Analytics Platform

AlgoVision is an interactive web-based platform designed to demonstrate
the practical use of fundamental **Data Structures and Algorithms
(DSA)**. The project provides separate interactive modules where users
can add data, perform operations, and observe how different algorithms
and data structures work.

------------------------------------------------------------------------

## Features

### 1. Data Ingestion

-   **Queue** using the FIFO principle
-   **Hash Table** for efficient data storage and retrieval
-   Add incoming orders
-   Process the next order in sequence

### 2. Cataloging

-   **Array operations**
-   Add products
-   Search for products
-   Sort products alphabetically
-   Delete products

### 3. Search Engine

-   **Binary Search Tree (BST)**
-   Insert and search values
-   **Max Heap / Priority Queue**
-   Process the highest-priority task

### 4. Optimizer

-   **Greedy Algorithm** using activity selection
-   **Dynamic Programming**
-   **0/1 Knapsack Problem**

### 5. Graph Visualization

-   Create graph nodes
-   Add weighted connections
-   Graph representation
-   **Dijkstra's Shortest Path Algorithm**
-   Highlight the calculated shortest path

### Additional Features

-   Sidebar navigation for direct module access
-   Interactive module cards
-   Reset Project Data button
-   Responsive dashboard interface
-   Input validation and user feedback

------------------------------------------------------------------------

## Technologies Used

-   **HTML5** --- Structure of the application
-   **CSS3** --- Styling and responsive interface
-   **JavaScript (ES6)** --- Application logic and interactivity

No external framework is required to run the project.

------------------------------------------------------------------------

## Project Structure

``` text
AlgoVision-2.0/
│
├── index.html
├── style.css
├── app.js
│
└── algorithms/
    ├── arrayOperations.js
    ├── bst.js
    ├── dynamicProgramming.js
    ├── graph.js
    ├── greedy.js
    ├── hashTable.js
    ├── heap.js
    └── queue.js
```

------------------------------------------------------------------------

## Data Structures and Algorithms Used

  Module                Data Structure / Algorithm
  --------------------- ---------------------------------------
  Data Ingestion        Queue, Hash Table
  Cataloging            Array Operations
  Search Engine         Binary Search Tree, Max Heap
  Optimizer             Greedy Algorithm, Dynamic Programming
  Graph Visualization   Graph, Dijkstra's Algorithm

------------------------------------------------------------------------

## How to Run the Project

1.  Download or extract the project folder.
2.  Open the folder in **Visual Studio Code**.
3.  Open `index.html`.
4.  Run the project using a local development server such as **Live
    Server**.
5.  Open the generated local address in a web browser.

Example:

``` text
http://127.0.0.1:5500/index.html
```

------------------------------------------------------------------------

## How to Use

1.  Start from the **Dashboard**.
2.  Select a module from the sidebar or click **Open Module**.
3.  Enter the required data.
4.  Perform the available operations.
5.  Observe the result and visualization.
6.  Use **Reset Project Data** when you want to clear all module data.

------------------------------------------------------------------------

## Example Demonstration

### Data Ingestion

Add:

-   Mouse --- Priority 1200
-   Laptop --- Priority 5000
-   Keyboard --- Priority 2500

When **Process Next** is used, the Queue follows FIFO order:

``` text
Mouse → Laptop → Keyboard
```

### Graph Visualization

Create nodes:

``` text
A, B, C, D
```

Add weighted connections:

``` text
A — B : 4
A — C : 2
C — B : 1
B — D : 5
C — D : 8
```

The shortest path from `A` to `D` is:

``` text
A → C → B → D
Total Distance: 8
```

------------------------------------------------------------------------

## Project Objective

The objective of AlgoVision is to provide an interactive and practical
understanding of important Data Structures and Algorithms by connecting
theoretical concepts with real-world-style operations such as order
processing, catalog management, searching, optimization, and route
calculation.

------------------------------------------------------------------------

## Conclusion

AlgoVision successfully demonstrates multiple fundamental Data
Structures and Algorithms through a single interactive web application.
Each module allows users to perform operations and observe algorithmic
behavior, making the project useful as a practical demonstration of DSA
concepts.

------------------------------------------------------------------------

## Future Enhancements

Possible future improvements include:

-   Persistent storage using a database
-   User authentication
-   Advanced graph visualization
-   Animation of algorithm execution
-   Performance and time-complexity comparisons
-   Additional sorting and searching algorithms
-   Exportable reports and analytics

------------------------------------------------------------------------

## Author

**Shubham Kumar**

Capstone Project --- Data Structures & Algorithms
