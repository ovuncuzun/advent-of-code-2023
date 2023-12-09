/*
--- Day 4: Scratchcards ---
https://adventofcode.com/2023/day/4
*/

const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").map((x) => x.replace(/  /g, " 0"));

    let res = 0;

    for (const row of input) {
        const [, cards] = row.split(": ");
        const [winners, myCards] = cards.split(" | ");

        const point = myCards.split(" ").filter((card) => winners.includes(card)).length;
        const value = point > 0 ? Math.pow(2, point - 1) : 0;

        res += value;
    }

    console.log(res); // 22674
});
