/*
--- Day 8: Haunted Wasteland ---
https://adventofcode.com/2023/day/8
*/

const fs = require("fs");

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const [directions, , ...nodes] = data.split("\n");

    const nodesMap = {};
    for (const x of nodes) {
        const self = x.substring(0, 3);
        const L = x.substring(7, 10);
        const R = x.substring(12, 15);
        nodesMap[self] = { L, R };
    }

    const getCurrentNodes = () =>
        Object.keys(nodesMap).filter((node) => node.endsWith("A"));

    const calculatePathLengths = (currentNodes) => {
        const pathLengths = [];
        for (const node of currentNodes) {
            let dirIndex = 0;
            let steps = 0;
            let currentNode = node;
            while (!currentNode.endsWith("Z")) {
                dirIndex %= directions.length;
                currentNode = nodesMap[currentNode][directions[dirIndex]];
                steps++;
                dirIndex++;
            }
            pathLengths.push(steps);
        }
        return pathLengths;
    };

    const pathLengths = calculatePathLengths(getCurrentNodes());
    const result = pathLengths.reduce((acc, curr) => lcm(acc, curr), 1);

    console.log(result); // 14299763833181
});
