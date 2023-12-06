/*
https://adventofcode.com/2023/day/6
*/

const fs = require("fs");

function extractValues(line) {
    return (line.match(/\d+/g) || []).map(Number);
}

function calculateWaysToWin(times, distances) {
    let total = 1;

    for (let i = 0; i < times.length; i++) {
        let waysToWin = 0;
        for (let buttonLength = 0; buttonLength < times[i]; buttonLength++) {
            if ((times[i] - buttonLength) * buttonLength > distances[i]) {
                waysToWin++;
            }
        }
        total *= waysToWin;
    }

    return total;
}

function partOne(lines) {
    const times = extractValues(lines[0]);
    const distances = extractValues(lines[1]);

    return calculateWaysToWin(times, distances);
}

function partTwo(lines) {
    const times = extractValues(lines[0]);
    const distances = extractValues(lines[1]);

    const time = parseInt(times.join(''), 10);
    const distance = parseInt(distances.join(''), 10);

    let waysToWin = 0;
    for (let buttonLength = 0; buttonLength < time; buttonLength++) {
        if ((time - buttonLength) * buttonLength > distance) {
            waysToWin++;
        }
    }

    return waysToWin;
}

fs.readFile("input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");
    console.log(`Part One: ${partOne(lines)}`); // 5133600
    console.log(`Part One: ${partTwo(lines)}`); // 40651271
});