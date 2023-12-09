/*
--- Day 5: If You Give A Seed A Fertilizer ---
https://adventofcode.com/2023/day/5
*/

const fs = require("fs").promises;

const mapXtoY = (mapping, X) => {
    const foundRow = mapping && mapping.find((row) => {
        const [end, start, count] = row.split(" ").map(Number);
        return X >= start && X <= start + count;
    });

    return foundRow ? parseInt(foundRow.split(" ")[0]) - parseInt(foundRow.split(" ")[1]) + X : X;
};

const parseInput = (input) => input.split("\n").slice(1);

const processInput = (seeds, mappings) => {
    return seeds.reduce((result, n, index) => {
        const mapping = mappings[index];
        return result.map((m) => mapXtoY(mapping, m));
    }, seeds);
};

const findMinimum = (values) => Math.min(...values);

const readFileAndProcess = async () => {
    try {
        const data = await fs.readFile("input.txt", "utf-8");
        const input = data.split("\n\n");

        const inputSeeds = input[0].split("seeds: ")[1].split(" ").map(Number);
        const mappings = input.slice(1).map(parseInput);

        const result = processInput(inputSeeds, mappings);
        console.log(findMinimum(result));
    } catch (err) {
        console.error("Error reading file:", err);
    }
};

readFileAndProcess(); // 282277027
