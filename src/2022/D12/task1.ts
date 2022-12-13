const { getInputForDay } = require('../../util/InputFetcher');

export async function main() {
    const input: string[][] = await (await getInputForDay('2022', '12')).split('\n')
        .map(line => Array.from(line));

    const height = input.length;
    const width = input[0].length;

    let start: [number, number];
    let end: [number, number];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (input[y][x] === 'S') {
                start = [x, y];
            } else if (input[y][x] === 'E') {
                end = [x, y];
            }

        }
    }

    console.log(`start: ${start}, end ${end}`);
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
        // console.log(`${candidates.length}: Testing (${candidate.x}, ${candidate.y}), ${candidate.stepsTaken}`)

        const posString = `${candidate.x},${candidate.y}`;
        if (!visited.has(posString) || visited.get(posString) > candidate.count) {
            visited.set(posString, candidate.count)
            // console.log(`update visited with ${posString}: ${candidate.count}`);
        }
        if (end[0] === candidate.x && end[1] === candidate.y) {
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
            // .filter(pos => !candidate.stepsTaken.some(visited => pos[0] === visited[0] && pos[1] === visited[1]))
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

    console.log(Array.from(foundPaths.values()).map(p => p.path.map(pos =>`[${pos.join(',')}]`).join(', ')));
    console.log(`Min number of steps: ${Array.from(foundPaths.values()).sort((a,b) => b.steps - a.steps).pop().path.length}`)
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

