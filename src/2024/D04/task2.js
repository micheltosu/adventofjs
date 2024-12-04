const { getInputForDay } = require('../../util/InputFetcher');
const xmas = ["X", "M", "A", "S"];


async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '04', path)).split('\n');

    const coords = input.flatMap((line, idx) => { return [...line.matchAll(/A/g)].map(({ index }) => { return [index, idx] }) })

    const matrix = input.map(line => Array.from(line))
    const result = coords.reduce((acc, coord) => acc + findXmas(coord, matrix), 0)
    console.log(result)
}

function findXmas([x, y], matrix) {
    const chars = [
        [-1, -1],
        [+1, -1],
        [-1, +1],
        [+1, +1],
    ].map(([xDiff, yDiff]) => matrix[y + yDiff]?.[x + xDiff])

    return ['MSMS', 'MMSS', 'SMSM', 'SSMM'].find(pred => pred === chars.join('')) ? 1 : 0;

}

main();
