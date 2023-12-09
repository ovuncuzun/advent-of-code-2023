/*
--- Day 3: Gear Ratios ---
https://adventofcode.com/2023/day/3
*/


const fs = require("fs");

const hasSymbol = (str) => {
    return str?.length && str.split("").some((x) => isNaN(x) && x !== ".");
};

fs.readFile("input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").filter((n) => n);
    const rows = input.length;
    const cols = input[0].length;

    const founds = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const currentChar = input[i][j];
            if (isNaN(currentChar)) continue;

            let num = currentChar;
            while (++j < cols) {
                if (Number.isInteger(parseInt(input[i][j]))) num += input[i][j];
                else break;
            }

            const top = i === 0 ? "" : input[i - 1].substring(j - num.length - 1, j + 1);
            const bottom = i === rows - 1 ? "" : input[i + 1].substring(j - num.length - 1, j + 1);
            const left = input[i][j - num.length - 1] || "";
            const right = input[i][j] || "";

            if (hasSymbol(top) || hasSymbol(bottom) || hasSymbol(right) || hasSymbol(left)) {
                founds.push(Number(num));
            }
        }
    }

    const sum = founds.reduce((a, c) => a + c, 0);
    console.log(sum); // 521601
});
