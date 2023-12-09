/*
--- Day 7: Camel Cards ---
https://adventofcode.com/2023/day/7
*/

const fs = require("fs");

const cardValues = {
    J: 0,
    T: 10,
    Q: 11,
    K: 12,
    A: 13,
};

function main() {
    fs.readFile("input.txt", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        const lines = data.split("\n");
        lines.sort((a, b) => sortHands(b.split(" ")[0], a.split(" ")[0]));

        let wins2 = 0;

        for (let i = 0; i < lines.length; i++) {
            const bid = lines[i].split(" ")[1];
            wins2 += bid * (i + 1);
        }

        console.log(wins2); // 251735672
    });
}

function sortHands(handA, handB) {
    const possibilitiesA = getAllPossibleValues(handA);
    const possibilitiesB = getAllPossibleValues(handB);
    const handValueA = Math.max(...possibilitiesA.map((hand) => getRank(hand)));
    const handValueB = Math.max(...possibilitiesB.map((hand) => getRank(hand)));

    if (handValueA > handValueB) return -1; // A wins
    if (handValueB > handValueA) return 1; // B wins
    return tieBreaker(handA, handB);
}

function getAllPossibleValues(hand) {
    if (!/J/.test(hand)) {
        return [hand];
    }

    const handSet = getHandSet(hand);
    return Object.keys(handSet).map((key) => hand.replace(/J/g, key));
}

function getRank(hand) {
    const handSet = getHandSet(hand);
    let hasPair = false;
    let hasThree = false;

    for (const key in handSet) {
        const val = handSet[key];

        if (val === 5) return 7;
        if (val === 4) return 6;
        if ((val === 3 && hasPair) || (val === 2 && hasThree)) return 5;
        if (val === 2 && hasPair) return 3;
        if (val === 3) hasThree = true;
        if (val === 2) hasPair = true;
    }

    return hasThree ? 4 : (hasPair ? 2 : 1);
}

function getHandSet(hand) {
    const handSet = {};

    for (const card of hand) {
        handSet[card] = (handSet[card] || 0) + 1;
    }

    return handSet;
}

function tieBreaker(handA, handB) {
    for (let i = 0; i < handA.length; i++) {
        const cardA = handA[i];
        const cardB = handB[i];
        const handAVal = isNaN(Number(cardA)) ? cardValues[cardA] : Number(cardA);
        const handBVal = isNaN(Number(cardB)) ? cardValues[cardB] : Number(cardB);

        if (handAVal > handBVal) return -1;
        if (handBVal > handAVal) return 1;
    }

    return 0;
}

main();
