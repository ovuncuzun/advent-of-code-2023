const fs = require("fs");

function readInput(filePath) {
    const content = fs.readFileSync(filePath, "utf-8").trim().split("\n");
    const seedsInput = content[0].split(" ").slice(1).map(Number);
    const seeds = [];

    for (let i = 0; i < seedsInput.length; i += 2) {
        seeds.push([seedsInput[i], seedsInput[i + 1]]);
    }

    const maps = [];
    let i = 2;

    while (i < content.length) {
        const [catA, , catB] = content[i].split(" ")[0].split("-");
        maps.push([]);
        i += 1;

        while (i < content.length && content[i] !== "") {
            const [dstStart, srcStart, rangeLen] = content[i].split(" ").map(Number);
            maps[maps.length - 1].push([dstStart, srcStart, rangeLen]);
            i += 1;
        }

        maps[maps.length - 1].sort((a, b) => a[1] - b[1]);
        i += 1;
    }

    return { seeds, maps };
}

function remap(lo, hi, m) {
    const ans = [];

    for (const [dst, src, R] of m) {
        const end = src + R - 1;
        const D = dst - src;

        if (!(end < lo || src > hi)) {
            ans.push([Math.max(src, lo), Math.min(end, hi), D]);
        }
    }

    if (ans.length === 0) {
        ans.push([lo, hi]);
    } else {
        for (let i = 0; i < ans.length; i++) {
            const [l, r, D] = ans[i];
            ans[i] = [l + D, r + D];

            if (i < ans.length - 1 && ans[i][1] >= ans[i + 1][0]) {
                ans[i][1] = ans[i + 1][0] - 1;
            }
        }
    }

    return ans;
}

function processIntervals(seeds, maps) {
    let ans = 1 << 60;

    for (const [start, R] of seeds) {
        let curIntervals = [[start, start + R - 1]];
        let newIntervals = [];

        for (const m of maps) {
            for (const [lo, hi] of curIntervals) {
                newIntervals.push(...remap(lo, hi, m));
            }

            [curIntervals, newIntervals] = [newIntervals, []];
        }

        for (const [lo] of curIntervals) {
            ans = Math.min(ans, lo);
        }

        console.log(ans);
    }
}

const filePath = "input.txt";
const { seeds, maps } = readInput(filePath);
processIntervals(seeds, maps);
