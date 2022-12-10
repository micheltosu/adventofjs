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
                lowPoints.push(point + 1);
            }
        }
    }


    console.log(lowPoints.reduce((p,c) => p+c));
}

main();
    