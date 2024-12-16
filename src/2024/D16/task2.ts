import { getInputForDay } from '../../util/InputFetcher';
import { Point, direction, addPos, rotateCcw, rotateCw, toStr } from '../../util/point';


interface searchPos {
    dir: keyof typeof direction, pos: Point, score: number, path: [pos: Point, dir: keyof typeof direction][]
}

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '16', path)).split('\n').map(val => Array.from(val));

    const startSpot = input
        .map(line => line.indexOf('S'))
        .map((x, idx) => ({ x, y: idx }))
        .find(({ x, y }) => x !== -1);


    const tested = new Map<string, number>()
    const paths: { score, path: [pos: Point, dir: keyof typeof direction][] }[] = [];
    var searchQ: searchPos[] = [{ dir: 'RIGHT', pos: startSpot, score: 0, path: [] }];
    while (searchQ.length > 0) {
        const { dir, pos, score, path } = searchQ.shift()
        const posValue = input[pos.y][pos.x];
        const pathToHere = [...path, [pos, dir]] as [pos: Point, dir: "UP" | "RIGHT" | "DOWN" | "LEFT"][]

        if (posValue === 'E') {
            paths.push({ score, path: pathToHere })
        }

        if (input[pos.y][pos.x] === '#') {
            continue;
        }

        const strPos = toStr(pos);
        tested.set(strPos + dir, score)
        const nextPos = addPos(pos, { x: direction[dir][0], y: direction[dir][1] });

        if (!tested.has(toStr(nextPos) + dir) || tested.get(toStr(nextPos) + dir) >= score + 1) {
            searchQ.push({
                dir,
                pos: nextPos,
                score: score + 1,
                path: pathToHere,
            })
        }


        const newDir = rotateCw(dir)
        if (!tested.has(toStr(pos) + newDir) || tested.get(toStr(pos) + newDir) >= score + 1000)

            searchQ.push({
                dir: newDir,
                pos,
                score: score + 1000,
                path: pathToHere,
            })


        const newCCwDir = rotateCcw(dir)
        if (!tested.has(toStr(pos) + newCCwDir) || tested.get(toStr(pos) + newCCwDir) >= score + 1000)

            searchQ.push({
                dir: newCCwDir,
                pos,
                score: score + 1000,
                path: pathToHere,
            })
    }

    const bestScore = paths.sort((a, b) => a.score - b.score).shift().score
    console.log(bestScore)

    const bestTiles = paths.filter(path => path.score === bestScore).flatMap(p => p.path.map(pp => toStr(pp[0]))).reduce((acc, pos) => acc.add(pos), new Set<string>())
    console.log("Tiles on best path ", bestTiles.size)

    // for (const tile of bestTiles) {
    //     const [x, y] = tile.split(',').map(n => parseInt(n));
    //     input[y][x] = 'O'
    // }

    // console.log(input.map(l => l.join('')).join('\n'))
}



// Attempts: 543



main();

