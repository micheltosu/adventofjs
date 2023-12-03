import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const input = (await getInputForDay('2023', '03')).split('\n').map(val => (val + '.').split('')); //append one more pos to be able to step past numbers at the end of lines
    let partsSum = 0
    for (const [y, row] of input.entries()) {
        for (const [x, pos] of row.entries()) {
            if (pos !== '*') continue;

            const numbersAroundSymbol = findNumbersAroundPosition(x, y, input)

            if (numbersAroundSymbol.length === 2) {
                partsSum = partsSum + (numbersAroundSymbol[0] * numbersAroundSymbol[1])
            }
        }
    }

    if (partsSum !== 82818007) throw "invalid answer"
    console.log(`Sum of all parts are ${partsSum}`);
}

main();

function findNumbersAroundPosition(pos, row, input) {
    const foundNumbers = []
    for (var y = Math.max(0, row - 1); y <= Math.min(input.length, row + 1); y++) {
        for (var x = Math.max(0, pos - 1); x <= Math.min(input[y].length, pos + 1); x++) {
            if (!isNaN(parseInt(input[y][x]))) {
                foundNumbers.push([x, y])
            }
        }
    }

    return foundNumbers
        .map(([x, y]) => getNumberOverlappingPos(x, input[y]))
        .filter((a, idx, arr) => idx === arr.findIndex(b => a.number === b.number && a.positions.join('') === b.positions.join('')))
        .map(({ number }) => number);
}

function getNumberOverlappingPos(x, row) {
    const numbersWithPositions = {};
    var digits = []
    var positions = []

    for (const [idx, char] of row.entries()) {
        if (!isNaN(char)) {
            digits.push(char);
            positions.push(idx);
        } else if (digits.length !== 0) {
            const number = parseInt(digits.join(''));
            positions.forEach(p => numbersWithPositions[p] = { number, positions });
            digits = []
            positions = []
        }
    }

    return numbersWithPositions[x];
}
