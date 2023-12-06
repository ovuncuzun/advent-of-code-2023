const fs = require("fs");

const processInput = (input) => {
    const gearsDic = {};

    const findGears = (str, num, i, j) => {
        j = j === -1 ? 0 : j;
        for (let k = 0; k < str.length; k++) {
            const ch = str.charAt(k);
            if (ch === "*") {
                const ind = `${i}-${j + k}`;
                gearsDic[ind] = gearsDic[ind] ? [...gearsDic[ind], +num] : [+num];
            }
        }
    };

    const rows = input.length;
    const cols = input[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const n = "" + input[i][j];
            if (isNaN(n)) continue;

            let num = n;
            while (++j < cols && Number.isInteger(+input[i][j])) {
                num += input[i][j];
            }

            const top = i === 0 ? "" : input[i - 1].substring(j - num.length - 1, j + 1);
            const btm = i === rows - 1 ? "" : input[i + 1].substring(j - num.length - 1, j + 1);
            const lft = input[i][j - num.length - 1] || "";
            const rgt = input[i][j] || "";

            findGears(top, num, i - 1, j - num.length - 1);
            findGears(btm, num, i + 1, j - num.length - 1);
            findGears(lft, num, i, j - num.length - 1);
            findGears(rgt, num, i, j);
        }
    }

    const v = Object.values(gearsDic)
        .filter((x) => x.length === 2)
        .reduce((a, x) => a + x[0] * x[1], 0);

    return v;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").filter((n) => n);
    const result = processInput(input);
    console.log(result); // 80694070
});
