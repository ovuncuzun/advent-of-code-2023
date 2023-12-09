/*
--- Day 8: Haunted Wasteland ---
https://adventofcode.com/2023/day/8
*/

const fs = require("fs");

const parseNode = (line) => {
    const self = line.substring(0, 3);
    const L = line.substring(7, 10);
    const R = line.substring(12, 15);
    return { [self]: { L, R } };
};

const main = () => {
    fs.readFile("input.txt", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const [directions, , ...nodes] = data.split("\n");

        const nodesMap = {};
        nodes.forEach((x) => Object.assign(nodesMap, parseNode(x)));

        let dirIndex = 0;
        let steps = 0;
        let current = "AAA";

        while (current !== "ZZZ") {
            dirIndex = dirIndex % directions.length;
            current = nodesMap[current][directions[dirIndex]];
            steps++;
            dirIndex++;
        }

        console.log(steps); // 18157
    });
};

main();
