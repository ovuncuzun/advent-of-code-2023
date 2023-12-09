/*
--- Day 9: Mirage Maintenance ---
https://adventofcode.com/2023/day/9
*/

const fs = require("fs").promises;

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data.trim().split("\n").map((line) => line.split(" ").map(Number));
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
        } else {
            break;
        }
    }
    return history;
}

function getNext(history) {
    const reversedHistory = history.slice().reverse();
    let sum = 0;

    for (let i = 0; i < reversedHistory.length; i++) {
        const current = reversedHistory[i];
        sum += current[current.length - 1];
        current.push(sum);
    }

    return sum;
}

async function main() {
    try {
        const filePath = "input.txt";
        const parsed = await readFileAsync(filePath);

        let result = 0;
        for (const line of parsed) {
            const history = getHistory(line);
            result += getNext(history);
        }

        console.log(result); // 1708206096
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
