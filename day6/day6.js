/*
--- Day 6: Wait For It ---
https://adventofcode.com/2023/day/6
*/

const fs = require("fs");

const extractValues = (line) => (line.match(/\d+/g) || []).map(Number);

const getWaysToWin = (time, distance) => {
    let waysToWin = 0;
    for (let buttonLength = 0; buttonLength < time; buttonLength++) {
        if ((time - buttonLength) * buttonLength > distance) {
            waysToWin++;
        }
    }
    return waysToWin;
};

const calculatePart = (lines, partNumber) => {
    const times = extractValues(lines[0]);
    const distances = extractValues(lines[1]);

    let values;
    if (partNumber === 1) {
        values = { times, distances };
    } else {
        values = {
            time: parseInt(times.join(''), 10),
            distance: parseInt(distances.join(''), 10),
        };
    }

    let total = 1;

    if (partNumber === 1) {
        for (let i = 0; i < values.times.length; i++) {
            let waysToWin = getWaysToWin(values.times[i], values.distances[i]);
            total *= waysToWin;
        }
    } else {
        total = getWaysToWin(values.time, values.distance);
    }

    return total;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    const lines = data.split("\n");
    console.log(`Part One: ${calculatePart(lines, 1)}`); // 5133600
    console.log(`Part Two: ${calculatePart(lines, 2)}`); // 40651271
});
