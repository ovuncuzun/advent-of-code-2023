const fs = require('fs');
const fileName = "input.txt";

const target = {
    "red": 12,
    "green": 13,
    "blue": 14
};

function parseGame(game) {
    const gameInfo = {
        max: {},
        power: 0,
        rounds: []
    };

    const colonIndex = game.indexOf(":");
    const rawRounds = game.substring(colonIndex + 1);
    const rounds = rawRounds.split(";");

    for (const round of rounds) {
        const results = round.split(",").map(result => result.trim().split(" "));
        const outcomes = { "red": 0, "green": 0, "blue": 0 };

        for (const [count, color] of results) {
            const countNumber = Number(count);
            outcomes[color] = countNumber;

            if (gameInfo.max[color]) {
                if (countNumber > gameInfo.max[color]) {
                    gameInfo.max[color] = countNumber;
                }
            } else {
                gameInfo.max[color] = countNumber;
            }
        }

        gameInfo.rounds.push(outcomes);
    }

    gameInfo.power = gameInfo.max.red * gameInfo.max.green * gameInfo.max.blue;

    return gameInfo;
}

function isGamePossible(game, target) {
    return Object.keys(target).every(color => game.max[color] <= target[color]);
}

// Read each line in the file named fileName
const file = fs.readFileSync(fileName, 'utf8');
const games = file.split(/\r?\n/);

const gameResults = games.map((game, index) => {
    const parsedGame = parseGame(game);
    const gamePossible = isGamePossible(parsedGame, target);

    return {
        index: index + 1,
        power: parsedGame.power,
        possible: gamePossible
    };
});

const possibleGames = gameResults.filter(result => result.possible);

let sumPossibleGames = 0;
let sumTotalPower = 0;

for (const game of possibleGames) {
    sumPossibleGames += game.index;
}

for (const game of gameResults) {
    sumTotalPower += game.power;
}

console.log(`Part 1 - Possible games sum: ${sumPossibleGames}`); // 2771
console.log(`Part 2 - Total power sum: ${sumTotalPower}`); // 70924
