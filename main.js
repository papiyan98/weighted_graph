class Graph {
  constructor() {
    this.vertices = {};
    this.adjacencyMatrix = {};
    this.size = 0;
  }

  addVertex(vertex) {
    this.vertices[this.size] = vertex;

    this.size++;
  }

  addEdge(source, dest, weight) {
    if (!this.adjacencyMatrix[source]) {
      this.adjacencyMatrix[source] = { [dest]: weight };
    } else {
      this.adjacencyMatrix[source] = {
        ...this.adjacencyMatrix[source],
        [dest]: weight
      };
    }
  }

  // helper function for dijkstra algorithm to find nearest vertex
  _findNearestLowestCostVertex(costs, visited) {
    let minDistance = Infinity;
    let nearestVertex = null;

    Object.keys(costs).forEach(vertex => {
      if (!visited[vertex] && costs[vertex] < minDistance) {
        minDistance = costs[vertex];
        nearestVertex = vertex;
      }
    });

    return nearestVertex;
  }

  dijkstra(start, finish) {
    const visited = {};
    const parents = {};
    const costs = {};

    const vertices = Object.values(this.vertices);

    // default all costs are unknown
    vertices.forEach(vertex => {
      costs[vertex] = Infinity;
      parents[vertex] = null;
    });

    // distance to the starting vertex is 0
    costs[start] = 0;

    // find the most nearest vertex from unvisited
    let vertex = this._findNearestLowestCostVertex(costs, visited);

    // looping until we have unvisited verticies
    while(vertex && vertex != finish) {
      // distance to vertex
      let vertexDistance = costs[vertex];

      // adjacent vertices
      let neighbors = this.adjacencyMatrix[vertex];

      // recalculate costs for all adjacent vertices
      Object.keys(neighbors).forEach(neighborVertex => {
        // currently known distance
        let neighborDistance = costs[neighborVertex];

        // calculated distance
        let newNeighborDistance = vertexDistance + neighbors[neighborVertex];

        if (newNeighborDistance < neighborDistance) {
          costs[neighborVertex] = newNeighborDistance;
          parents[neighborVertex] = vertex;
        }
      });

      // mark vertex as visited
      visited[vertex] = true;

      vertex = this._findNearestLowestCostVertex(costs, visited);
    }
    
    return {parents, costs};
  }
}