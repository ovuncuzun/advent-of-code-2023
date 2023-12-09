/*
--- Day 9: Mirage Maintenance ---
https://adventofcode.com/2023/day/9
*/

const fs = require("fs").promises;

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data.split("\n").map((line) => line.split(" ").map(Number));
    } catch (err) {
        console.error("Error reading the file:", err);
        throw err;
    }
}

function getHistory(line) {
    const history = [line];
    let current = line;

    while (true) {
        let next = [];
        for (let i = 0; i < current.length - 1; i++) {
            next.push(current[i + 1] - current[i]);
        }
        history.push(next);
        if (next.some((x) => x)) {
            current = next;
            next = [];
        } else {
            break;
        }
    }
    return history;
}

function getNext(history) {
    history.reverse();
    for (let i = 0; i < history.length - 1; i++) {
        const sum = history[i + 1][0] - history[i][0];
        history[i + 1][0] = sum; // Update the first element in the last subarray
    }
    return history[history.length - 1][0];
}

async function main() {
    try {
        const filePath = "input.txt";
        const parsed = await readFileAsync(filePath);

        let result = 0;

        for (const line of parsed.map(getHistory).map(getNext)) {
            result += line;
        }

        console.log(result);
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

main();
