import { addPos, direction, Point, toStr } from "./point";

export const parseMatrix = (input: string): string[][] => {
    return input.split('\n').map(line => Array.from(line));
};


export const mapMatrix = <T>(mapper: (char: string) => T, input: string[][]) => {
    return input.map(line => line.map(mapper));
}

export const findElementPositionsInMatrix = <T>(needle: T, matrix: T[][]): Record<string, Point> => {
    return matrix
        .flatMap((line, y) =>
            line.map((char, x) => char === needle ? { x, y } as Point : null)
                .filter(elem => elem !== null))
        .reduce((positions, point) => ({ ...positions, [toStr(point)]: point }), {})
}

export const surroundingPositions = <T>(pos: Point, matrix: T[][]) => {
    if (matrix.length === 0) throw new Error("Matrix is of 0 rows");

    const maxY = matrix.length;
    const maxX = matrix.at(0).length

    return Object.values(direction)
        .map(([x, y]) => addPos({ x, y }, pos))
        .filter(({ x, y }) => x >= 0 && x < maxX && y >= 0 && y < maxY);
}