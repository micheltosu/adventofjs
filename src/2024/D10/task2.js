const { getInputForDay } = require('../../util/InputFetcher');
const { parseMatrix, mapMatrix, findElementPositionsInMatrix, surroundingPositions } = require('../../util/matrixUtils');
const { toStr } = require('../../util/point');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const matrix = parseMatrix(await getInputForDay('2024', '10', path));
    const mappedMatrix = mapMatrix((string) => parseInt(string), matrix);

    const startPositions = findElementPositionsInMatrix(0, mappedMatrix);
    const trailheads = [];

    for (const startPos in startPositions) {
        const foundTrails = {}
        const searchQ = [{ pos: startPositions[startPos], visited: [], lastHeight: null }];


        while (searchQ.length > 0) {
            const { pos, visited, lastHeight } = searchQ.shift();
            const height = mappedMatrix[pos.y][pos.x];
            if (lastHeight !== null && height - lastHeight !== 1) {
                continue;
            }

            const newVisited = [...visited, pos];
            if (height === 9) {
                foundTrails[toStr(pos)] = [...(foundTrails[toStr(pos)] ?? []), { trail: newVisited }]
            }

            searchQ.push(...surroundingPositions(pos, mappedMatrix).map(pos => ({ pos, visited: newVisited, lastHeight: height })))
        }

        trailheads.push({ startPos, score: Object.values(foundTrails).reduce((acc, trails) => acc + trails.length, 0) });
    }

    console.log(`Found ${trailheads.length} trailheads with total score ${trailheads.reduce((acc, x) => acc + x.score, 0)}`)
}

main();




