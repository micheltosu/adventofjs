const { getInputForDay } = require('../../util/InputFetcher');
const xmas = ["X", "M", "A", "S"];


async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '04', path)).split('\n');

    const coords = input.flatMap((line, idx) => { return [...line.matchAll(/X/g)].map(({ index }) => { return [index, idx] }) })

    const matrix = input.map(line => Array.from(line))
    const result = coords.reduce((acc, coord) => acc + findXmas(coord, matrix), 0)
    console.log(result)
}

function findXmas([x, y], matrix) {
    const checkQ = [[x, y, ['X']]];

    return [
        [-1, -1],
        [0, -1],
        [+1, -1],
        [-1, 0],
        [+1, 0],
        [-1, +1],
        [0, +1],
        [+1, +1],
    ].reduce((acc, direction) => acc + (checkDirection([x, y], xmas, matrix, direction) ? 1 : 0), 0)
}

function checkDirection([x, y], target, matrix, [changeX, changeY]) {
    const chars = [matrix[y][x]];
    var next = getNextChar(chars, target);
    var currentX = x + changeX;
    var currentY = y + changeY;
    while (matrix[currentY]?.[currentX] === next) {
        chars.push(next);
        next = getNextChar(chars, target);
        if (chars.toString() === target.toString()) {
            return true;
        }
        currentX += changeX;
        currentY += changeY;
    }
    return false;
}

function getNextChar(chars, target) {
    if (chars.length === 0) return target.at(0);
    return target[target.indexOf(chars.at(-1)) + 1]
}
main();
