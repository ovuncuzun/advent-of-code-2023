const fs = require('fs');
const fileName = "input.txt";

function expandText(text) {
    const replacements = {
        "one": "o1ne",
        "two": "t2wo",
        "three": "t3hree",
        "four": "f4our",
        "five": "f5ive",
        "six": "s6ix",
        "seven": "s7even",
        "eight": "e8ight",
        "nine": "n9ine"
    };

    let expandedText = text;
    for (const [key, value] of Object.entries(replacements)) {
        expandedText = expandedText.replaceAll(key, value);
    }

    return expandedText;
}

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
let sum = 0;

function extractNumber(text) {
    const [, firstDigit] = text.match(/(\d{1}?)/) || [];
    const [, lastDigit] = text.match(/(\d{1}?)(?:\D*)$/) || [];
    return Number(`${firstDigit || ''}${lastDigit || ''}`);
}

// part 1
for (let i = 0; i < lines.length; i++) {
    sum += extractNumber(lines[i]);
}

console.log(sum); // 55538
sum = 0;

// part 2
for (let i = 0; i < lines.length; i++) {
    const replacedText = expandText(lines[i]);
    sum += extractNumber(replacedText);
}

console.log(sum); // 54875
