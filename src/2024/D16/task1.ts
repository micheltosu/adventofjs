import { getInputForDay } from '../../util/InputFetcher';
import { Point, direction, addPos, rotateCcw, rotateCw, toStr } from '../../util/point';


interface searchPos {
    dir: keyof typeof direction, pos: Point, score: number, path: [Point, keyof typeof direction][]
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
        if (posValue === 'E') {
            paths.push({ score, path: [...path, [pos, dir]] })
        }

        if (input[pos.y][pos.x] === '#') {
            continue;
        }

        const strPos = toStr(pos);
        tested.set(strPos + dir, score)
        const nextPos = addPos(pos, { x: direction[dir][0], y: direction[dir][1] });

        if (!tested.has(toStr(nextPos) + dir) || tested.get(toStr(nextPos) + dir) >= score) {
            searchQ.push({
                dir,
                pos: nextPos,
                score: score + 1,
                path: [...path, [pos, dir]]
            })
        }


        const newDir = rotateCw(dir)
        if (!tested.has(toStr(pos) + newDir) || tested.get(strPos + dir) > score + 1000)

            searchQ.push({
                dir: newDir,
                pos,
                score: score + 1000,
                path: [...path, [pos, newDir]],
            })


        const newCCwDir = rotateCcw(dir)
        if (!tested.has(toStr(pos) + newDir) || tested.get(strPos + dir) > score + 1000)

            searchQ.push({
                dir: newCCwDir,
                pos,
                score: score + 1000,
                path: [...path, [pos, newDir]],
            })
    }

    console.log(paths.sort((a, b) => a.score - b.score).shift().score)



}

// Attempts: 111428



main();

