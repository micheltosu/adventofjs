const { getInputForDay } = require('../../util/InputFetcher');

export async function main() {
    const input: string[][] = await (await getInputForDay('2022', '12')).split('\n')
        .map(line => Array.from(line));

    const startingPoints = input
        .flatMap((line, y) => line.reduce((acc, col, x) => col === 'a' ? [...acc ,[x,y]] : acc, []))
        .map(pos => findShortestPath(pos, input))
        .filter(result => result !== undefined)
        .sort((a, b) => a.steps - b.steps);
        console.log(startingPoints.shift());
}

function findShortestPath(start: [number, number], input: string[][]) {
    const height = input.length;
    const width = input[0].length;

    let candidates: { x: number, y: number, stepsTaken: [number, number][], count: number }[] = [];
    returnCandidates(start)
        .filter(([x, y]) =>
            x >= 0 &&
            x < width &&
            y >= 0 &&
            y < height)
        .filter(([x,y]) => input[y][x].charCodeAt(0) - 'a'.charCodeAt(0) <= 1)
        .forEach(([x, y]) => candidates.push({ x, y, stepsTaken: [[x, y]], count: 1 }));

    const foundPaths: { steps: number, path: [number, number][] }[] = [];
    const visited = new Map<string, number>();

    while (candidates.length !== 0) {
        const candidate = candidates.shift();

        const posString = `${candidate.x},${candidate.y}`;
        if (!visited.has(posString) || visited.get(posString) > candidate.count) {
            visited.set(posString, candidate.count)
        }
        if (input[candidate.y][candidate.x] === 'E') {
            foundPaths.push({ steps: candidate.count, path: candidate.stepsTaken });
            continue;
        }

        const last = [candidate.x, candidate.y];
        const possibleCandidates = returnCandidates(last);

        possibleCandidates
            .filter(([x, y]) =>
                x >= 0 &&
                x < width &&
                y >= 0 &&
                y < height)
            .filter(([x, y]) => (input[y][x] === 'E' ? 'z' : input[y][x]).charCodeAt(0) - input[candidate.y][candidate.x].charCodeAt(0) <= 1)
            .filter((pos) => !visited.has(pos.join(',')) || visited.get(pos.join(',')) > candidate.count + 1)
            .filter(((pos) => !candidates.some(c => pos.join(',') === `${c.x},${c.y}` && c.count < candidate.count + 1 )))
            .forEach(([x, y]) => candidates.push({
                x,
                y,
                stepsTaken: [...candidate.stepsTaken, [x, y]],
                count: candidate.count + 1
            }));

        candidates = candidates.filter(c =>  !visited.has([c.x, c.y].join(',')) || visited.get([c.x, c.y].join(',')) > candidate.count + 1)

    }

    return Array.from(foundPaths.values()).sort((a,b) => b.steps - a.steps).pop();
}

main();
function returnCandidates(last: number[]) {
    return [
        [last[0] + 1, last[1]],
        [last[0] - 1, last[1]],
        [last[0], last[1] + 1],
        [last[0], last[1] - 1],
    ];
}

