import { getInputForDay } from '../../util/InputFetcher';

const symbols = {
    '/': (direction: Direction) => {
        switch (direction) {
            case 'UP':
                return ['RIGHT'];
            case 'DOWN':
                return ['LEFT'];
            case 'LEFT':
                return ['DOWN'];
            case 'RIGHT':
            default:
                return ['UP'];
        }
    },
    '\\': (dir: Direction) => {
        switch (dir) {
            case 'UP':
                return ['LEFT'];
            case 'DOWN':
                return ['RIGHT'];
            case 'LEFT':
                return ['UP'];
            case 'RIGHT':
            default:
                return ['DOWN'];
        }
    },
    '-': (dir: Direction) => {
        switch (dir) {
            case 'LEFT':
                return ['LEFT'];
            case 'RIGHT':
                return ['RIGHT'];
            default:
                return ['LEFT', 'RIGHT'];
        }
    },
    '|': (dir: Direction) => {
        switch (dir) {
            case 'UP':
                return ['UP'];
            case 'DOWN':
                return ['DOWN']
            default:
                return ['UP', 'DOWN'];
        }
    },
    '.': (dir: Direction) => [dir],
} as const;

const directionMap: Record<Direction, Position> = {
    'UP': { x: 0, y: -1 },
    'DOWN': { x: 0, y: 1 },
    'LEFT': { x: -1, y: 0 },
    'RIGHT': { x: 1, y: 0 },
}

function mapper(char) {
    return symbols[char];
}
interface Position { x: number, y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface Ray {
    tracing: boolean;
    path: Position[],
    direction: Direction,
}

function getNextPos(grid, ray: Ray) {
    const maxX = grid[0].length;
    const maxY = grid.length;

    const nextPos = addPositions((ray.path.at(-1) ?? { x: 0, y: 0 }), directionMap[ray.direction])
    if (nextPos.x >= 0 && nextPos.y < maxX && nextPos.y >= 0 && nextPos.y < maxY) {
        return nextPos;
    } else {
        return null;
    }
}

function traceRay(grid, ray: Ray) {
    const { x, y } = ray.path.at(-1);
    const nextDirection: Direction[] = symbols[grid[y][x]](ray.direction);
    const resultRays = nextDirection.map<Ray>(direction => ({ direction, path: ray.path, tracing: true }))

    return resultRays
        .map<[r: Ray, next: Position | null]>(r => [r, getNextPos(grid, r)])
        .map(([r, next]) => {
            if (next) {
                r.path.push(next);
            } else {
                r.tracing = false;
            }

            return r;
        });
}

async function main() {
    const grid = await (await getInputForDay('2023', '16')).split('\n')
        .map(line => line.split(''));

    let finishedRays: Ray[] = [];
    let activeRays: Ray[] = [{ tracing: true, path: [{ x: 0, y: 0 }], direction: 'RIGHT' }];
    while (activeRays.length > 0) {
        const resultRays = activeRays.flatMap(r => traceRay(grid, r));
        activeRays = resultRays.filter(r => r.tracing);
        finishedRays = finishedRays.concat(resultRays.filter(r => !r.tracing))
    }

    const coveredPositions = finishedRays.reduce((map, ray) => {
        ray.path.forEach(({ x, y }) => map[`${x},${y}`] += 1)
        return map;
    }, {})

    console.log(`${Object.keys(coveredPositions).length} covered positions`);
}

main();
function addPositions(a: Position, b: Position) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

