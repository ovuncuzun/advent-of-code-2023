const fs = require("fs");

const readInputFile = (filePath, callback) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        callback(data);
    });
};

const getStartPoint = (input) => {
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        const x = row.indexOf("S");
        if (x !== -1) {
            return { x, y };
        }
    }
};

const initiateRays = (n) => Array.from({ length: n }, () => []);

const selectPath = (input, start, dir) => {
    const { x, y } = start;

    if (dir === "SOUTH" && ["|", "L", "J"].includes(input[y + 1][x])) {
        return { dir: "SOUTH", y: y + 1, x };
    }

    if (dir === "NORTH" && ["|", "F", "7"].includes(input[y - 1][x])) {
        return { dir: "NORTH", y: y - 1, x };
    }

    return { dir: "EAST", y, x: x + 1 };
};

const calculateCandidates = (current, dir) => {
    const mappings = {
        "| : SOUTH": { candidateY: 1 },
        "| : NORTH": { candidateY: -1 },
        "- : EAST": { candidateX: 1 },
        "- : WEST": { candidateX: -1 },
        "L : SOUTH": { candidateX: 1 },
        "L : WEST": { candidateY: -1 },
        "J : SOUTH": { candidateX: -1 },
        "J : EAST": { candidateY: -1 },
        "7 : NORTH": { candidateX: -1 },
        "7 : EAST": { candidateY: 1 },
        "F : NORTH": { candidateX: 1 },
        "F : WEST": { candidateY: 1 },
    };

    const key = `${current} : ${dir}`;
    const { candidateX = 0, candidateY = 0 } = mappings[key] || {};

    return { candidateX, candidateY };
};

const determineDirection = (candidateX, candidateY) => {
    if (candidateY === 1) return "SOUTH";
    if (candidateY === -1) return "NORTH";
    if (candidateX === -1) return "WEST";
    return "EAST";
};

const countIntersections = (input, rays) => {
    let count = 0;

    for (let y = 0; y < input.length; y++) {
        let crosses = 0;
        let corner = false;

        for (let x = 0; x < input[y].length; x++) {
            const isRay = rays[y][x];
            const currentSymbol = input[y][x];

            if (isRay) {
                if (currentSymbol === "|") {
                    crosses++;
                } else if (currentSymbol !== "-") {
                    if (corner && ((corner === "L" && currentSymbol === "7") || (corner === "F" && currentSymbol === "J"))) {
                        crosses++;
                        corner = false;
                    } else {
                        corner = currentSymbol;
                    }
                }
            } else if (crosses % 2 === 1) {
                count++;
            }
        }
    }

    return count;
};



const main = () => {
    readInputFile("input.txt", (data) => {
        const input = data.split("\n");
        const start = getStartPoint(input);
        const rays = initiateRays(input.length);

        let { dir, x, y } = selectPath(input, start, "SOUTH");
        let path = [start, { x, y }];
        rays[start.y][start.x] = true;
        rays[y][x] = true;

        while (x !== start.x || y !== start.y) {
            const { candidateX, candidateY } = calculateCandidates(input[y][x], dir);
            dir = determineDirection(candidateX, candidateY);
            x += candidateX;
            y += candidateY;
            rays[y] = rays[y] || [];
            rays[y][x] = true;
            path.push({ x, y });
        }

        const count = countIntersections(input, rays);
        console.log(count);
    });
};

main();
