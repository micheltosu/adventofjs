const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','09')).split('\n').map(val => val.split('').map(e => Number(e)));

    let lowPoints = [];
    for (let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[y].length; x++) {
            const xBefore = x-1 >= 0 ? input[y][x-1] : Number.MAX_SAFE_INTEGER;
            const xAfter = x+1 < input[y].length ? input[y][x+1] : Number.MAX_SAFE_INTEGER;
            const yBefore = y-1 >= 0 ? input[y-1][x] : Number.MAX_SAFE_INTEGER;
            const yAfter = y+1 < input.length ? input[y+1][x] : Number.MAX_SAFE_INTEGER;

            const point = input[y][x];
            if (point < xBefore && point < xAfter && point < yBefore && point < yAfter) {
                lowPoints.push([x, y]);
            }
        }
    }

    let basinSizes = [];
    for (let point of lowPoints) {
        console.log(`Checking basin for ${point}`);
        let inBasin = [];
        let visitQueue = [point];
        let visited = new Set();

        while (visitQueue.length !== 0) {
            let [x, y] = visitQueue.shift();
            if (visited.has(`${x},${y}`)) {
                continue;
            }

            if (y >= 0 && y < input.length && 
                x >= 0 && x < input[y].length) {
                let pos = input[y][x];

                if (pos !== 9) {
                    visitQueue.push([x-1, y])
                    visitQueue.push([x+1, y])
                    visitQueue.push([x, y-1])
                    visitQueue.push([x, y+1])
                    inBasin.push([x,y]);
                    visited.add(`${x},${y}`);
                }
            }
        }
        console.log(`Basin has size ${inBasin.length}`)
        basinSizes.push(inBasin.length);
    }

    console.log(`Total size of three largest basins ${basinSizes.sort((a,b) => b - a).splice(0,3).reduce((p,c) => p * c)}`);
}

main();
    