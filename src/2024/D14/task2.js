const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '14', path)).split('\n')
        .map(val => val.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/))
        .map(([, a, b, c, d]) => ({
            pos: { x: parseInt(a), y: parseInt(b) },
            v: { x: parseInt(c), y: parseInt(d) }
        }));


    const maxX = 11//101;
    const maxY = 7//103;

    var cont = true;
    var i = 0
    while (cont) {
        for (const robot of input) {
            const newX = (robot.pos.x + robot.v.x);
            const newY = (robot.pos.y + robot.v.y);

            robot.pos.x = newX < 0 ? (newX + maxX) : (newX % maxX);
            robot.pos.y = newY < 0 ? (newY + maxY) : (newY % maxY);
        }
        const matrix = new Array(maxY).fill([]).map(l => new Array(maxX).fill('.'))
        for (const { pos: { x, y } } of input) {
            matrix[y][x] = "#";
        }

        var tree = true;
        if (matrix.every((row, idx) => {
            const rowRobots = row.filter(x => x === "#");

            if (!(rowRobots.length === ((idx === 0 || idx === matrix.length - 1) ? 1 : 2))) {
                return false;
            }

            return true;
        })) {

            console.log(`\nIteration ${i}\n-----------\n`)
            console.log(matrix.map(line => line.join('')).join('\n'))

            cont = false;
        }

        i++
    }

    const xMiddle = (maxX - 1) / 2;
    const yMiddle = (maxY - 1) / 2;



}

// attempts 76129536


main();
