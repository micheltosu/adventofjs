const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2022','02')).split('\n');

    console.log(`Score if everything goes according to strategy guide: ${input
        .map(i => calculateScore(i))
        .reduce((a,b) => a+b, 0)}`);
}

const calculateScore = (input) => {
    const [opponent, response] = input.split(' ');

    const resultScore = roundScore(roundResult(opponent, response));
    const moveScore = scoreMove(toMove(response));

    return resultScore + moveScore;
}

const scoreMove = (move) => {
    if (move === 'ROCK') {
        return 1;
    } else if (move === 'PAPER') {
        return 2;
    } else if (move === 'SCISSORS') {
        return 3;
    }
}

const roundResult = (opponent, player) => {
    const opponentMove = toMove(opponent);
    const playerMove = toMove(player);

    if (opponentMove === playerMove) {
        return 'DRAW';
    } else if (opponentMove === 'ROCK') {
        if (playerMove === 'SCISSORS') {
            return 'LOSE';
        } else if (playerMove === 'PAPER') {
            return 'WIN';
        }
    } else if (opponentMove === 'PAPER') {
      if (playerMove === 'SCISSORS') {
        return 'WIN';
      } else if (playerMove === 'ROCK') {
        return 'LOSE';
      }
    } else if (opponentMove === 'SCISSORS') {
        if (playerMove === 'PAPER') {
            return 'LOSE';
        } else if (playerMove === 'ROCK') {
            return 'WIN';
        }
    }
}

const roundScore = (result) => {
    if (result === 'WIN') {
        return 6;
    } else if (result === 'DRAW') {
        return 3;
    } else if (result === 'LOSE') {
        return 0;
    }
}

const toMove = (move) => {
    switch (move) {
        case 'A':
        case 'X':
            return 'ROCK';
        case 'B':
        case 'Y':
            return 'PAPER';
        case 'C':
        case 'Z':
            return 'SCISSORS';
    }
}

main();
