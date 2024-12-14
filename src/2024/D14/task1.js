const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '14', path)).split('\n')
        .map(val => val.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/))
        .map(([, a, b, c, d]) => ({
            pos: { x: parseInt(a), y: parseInt(b) },
            v: { x: parseInt(c), y: parseInt(d) }
        }));


    const maxX = 101;
    const maxY = 103;

    for (const i of new Array(100).fill(0)) {
        for (const robot of input) {
            const newX = (robot.pos.x + robot.v.x);
            const newY = (robot.pos.y + robot.v.y);

            robot.pos.x = newX < 0 ? (newX + maxX) : (newX % (maxX));
            robot.pos.y = newY < 0 ? (newY + maxY) : (newY % (maxY));
            const test = 0
        }
    }

    const xMiddle = (maxX - 1) / 2;
    const yMiddle = (maxY - 1) / 2;
    const quadrants = input.reduce((acc, { pos: { x, y } }) => {
        if (x === xMiddle || y === yMiddle) return acc;

        const ySide = y < Math.floor(maxY / 2)
            ? "left"
            : "right";

        const xSide = x <
            Math.floor(maxX / 2)
            ? "top"
            : "bottom";

        if (ySide === "left") {
            if (xSide === "top") {
                acc[1] = (acc[1] ?? 0) + 1;
            } else {
                acc[3] = (acc[3] ?? 0) + 1;
            }
        } else {
            if (xSide === "top") {
                acc[2] = (acc[2] ?? 0) + 1;
            } else {
                acc[4] = (acc[4] ?? 0) + 1;
            }
        }
        return acc;
    }, {})
    console.log("safety factor", Object.values(quadrants)
        .reduce((acc, summ) => acc * summ));
}

// attempts 76129536


main();
