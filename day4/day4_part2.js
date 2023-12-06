const { readFile } = require("fs").promises;

async function readInputFile(filePath) {
    try {
        const data = await readFile(filePath, "utf-8");
        return data.split("\n").map((x) => x.replace(/  /g, " 0"));
    } catch (err) {
        throw new Error(`Error reading file: ${err.message}`);
    }
}

function calculateCardCount(input) {
    const cardCount = new Array(input.length).fill(1);

    input.forEach((row, index) => {
        const [, cards] = row.split(": ");
        const [winners, myCards] = cards.split(" | ");

        const point = myCards
            .split(" ")
            .filter((card) => winners.includes(card)).length;

        if (point) {
            for (let i = index + 1; i < index + 1 + point; i++) {
                if (cardCount[i]) cardCount[i] += cardCount[index] || 0;
            }
        }
    });

    return cardCount.reduce((acc, v) => acc + v, 0);
}

async function main() {
    try {
        const filePath = "input.txt";
        const input = await readInputFile(filePath);
        const result = calculateCardCount(input);
        console.log(result);
    } catch (err) {
        console.error(err.message);
    }
}

main();
