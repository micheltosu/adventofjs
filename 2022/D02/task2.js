const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2022','02')).split('\n');

    console.log(`Score if everything goes according to strategy guide: ${input
        .map(i => calculateScore(i))
        .reduce((a,b) => a+b, 0)}`);
}

const calculateScore = (input) => {
    const [opponent, outcome] = input.split(' ');
    const playerMove = selectMove(opponent, outcome);

    const resultScore = roundScore(roundResult(opponent, playerMove));
    const moveScore = scoreMove(toMove(playerMove));

    return resultScore + moveScore;
}

const selectMove = (opponent, outcome) => {
  const opponentMove = toMove(opponent);
  const expectedResult = outcome === 'X' ? 'LOSE'
    : outcome === 'Y' ? 'DRAW'
    : 'WIN'

    if (expectedResult === 'DRAW') {
      return opponent;
    } else if (expectedResult === 'WIN') {
      if (opponentMove === 'ROCK') {
          return 'Y';
      } else if (opponentMove === 'PAPER') {
        return 'Z';
      } else if (opponentMove === 'SCISSORS') {
        return 'X';
      }
    } else if (expectedResult === 'LOSE') {
      if (opponentMove === 'ROCK') {
        return 'Z';
      } else if (opponentMove === 'PAPER') {
        return 'X';
      } else if (opponentMove === 'SCISSORS') {
        return 'Y';
      }
    }
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
