const fs = require("fs");

const getStartPoint = (input) => {
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        const x = row.indexOf("S");
        if (x !== -1) {
            return { x, y };
        }
    }
};

const getNextDirection = (input, { x, y }) => {
    const directions = [
        { dir: "SOUTH", y: y + 1, x },
        { dir: "NORTH", y: y - 1, x },
        { dir: "EAST", y, x: x + 1 },
    ];

    for (const { dir, y: newY, x: newX } of directions) {
        const cell = input[newY] && input[newY][newX];
        if (cell && (cell === "|" || cell === "-" || /[LJ7F]/.test(cell))) {
            return { dir, y: newY, x: newX };
        }
    }

    // Default to EAST if no valid direction found
    return directions[2];
};

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const input = data.split("\n");
    const start = getStartPoint(input);

    let { dir, x, y } = getNextDirection(input, start);
    let path = [start, { x, y }];
    let steps = 1;

    while (x !== start.x || y !== start.y) {
        const direction = `${input[y][x]} : ${dir}`;
        const directionMap = {
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

        const { candidateX = 0, candidateY = 0 } = directionMap[direction];
        dir = candidateY === 1 ? "SOUTH" : candidateY === -1 ? "NORTH" : candidateX === -1 ? "WEST" : "EAST";

        x += candidateX;
        y += candidateY;
        steps++;
        path.push({ x, y });
    }

    console.log(steps / 2);
});
