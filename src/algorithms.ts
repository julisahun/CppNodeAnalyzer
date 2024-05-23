/* 
    https://www.geeksforgeeks.org/detect-cycle-in-a-graph/
*/

export function isRecursive(dependencies: {
  [key: string]: string[];
}): boolean {
  const inDegree: { [key: string]: number } = Object.keys(dependencies).reduce(
    (acc, curr) => {
      acc[curr] = 0;
      return acc;
    },
    {},
  );
  // calculate in-degree of each vertex
  for (const fun in dependencies) {
    for (let calls of dependencies[fun]) {
      inDegree[calls]++;
    }
  }

  // enqueue vertices with 0 in-degree

  let q = Object.entries(inDegree)
    .filter(([_, inDegree]) => inDegree === 0)
    .map(([functionName, _]) => functionName);

  let visited: number = 0;
  // BFS traversal
  while (q.length > 0) {
    const u = q.shift();
    visited++;

    // reduce in-degree of adjacent vertices
    for (let functionCall of dependencies[u] || []) {
      inDegree[functionCall]--;
      // if in-degree becomes 0, enqueue the vertex
      if (inDegree[functionCall] === 0) {
        q.push(functionCall);
      }
    }
  }

  return visited !== Object.keys(dependencies).length; // if not all vertices are visited, there is a cycle
}
