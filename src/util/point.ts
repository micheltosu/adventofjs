export interface Point {
    x: number,
    y: number,
}

export const direction = {
    'UP': [0, -1],
    'RIGHT': [1, 0],
    'DOWN': [0, 1],
    'LEFT': [-1, 0],
} as const;

export const rotateCw = (dir: keyof typeof direction) => {
    switch (dir) {
        case 'UP':
            return 'RIGHT';
        case 'RIGHT':
            return 'DOWN';
        case 'DOWN':
            return 'LEFT';
        case 'LEFT':
            return 'UP';
    }
}
export const rotateCcw = (dir: keyof typeof direction) => {
    switch (dir) {
        case 'UP':
            return 'LEFT';
        case 'RIGHT':
            return 'UP';
        case 'DOWN':
            return 'RIGHT';
        case 'LEFT':
            return 'DOWN';
    }
}

export const toStr = ({ x, y }: Point) => {
    return `${x},${y}`;
}

export const addPos = (a: Point, b: Point) => {
    return { x: a.x + b.x, y: a.y + b.y }
}
