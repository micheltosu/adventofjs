const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','07')).split(',').map(val => Number(val));

    const sorted = input.sort((a,b) => a - b);

    const min = sorted[0];
    const max = sorted[input.length - 1];

    const positionDistances = new Map();
    for (let i = min; i <= max; i++) {
        positionDistances.set(i, 0);
    }

    for (let pos of positionDistances.keys()) {
        let posDistance = 0;
        for(let crab of input) {
            posDistance += Math.abs(pos - crab);
        }
        positionDistances.set(pos, posDistance);

    }

    let posWithShortestDistance = [0,Number.MAX_SAFE_INTEGER]
    for (let entry of positionDistances.entries()) {
        if (entry[1] < posWithShortestDistance[1]) {
            posWithShortestDistance = entry;
        }
    }

    console.log(`Pos with shortest distance to all crabs ${posWithShortestDistance}`);

}

main();
    