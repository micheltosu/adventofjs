const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','07')).split(',').map(val => Number(val));

    const sorted = input.sort((a,b) => a - b);

    const min = sorted[0];
    const max = sorted[input.length - 1];

    const positionWithFuelCosts = new Map();
    for (let i = min; i <= max; i++) {
        positionWithFuelCosts.set(i, 0);
    }

    for (let pos of positionWithFuelCosts.keys()) {
        let posDistance = 0;
        for(let crab of input) {
            const distance = Math.abs(pos - crab);
            posDistance += (distance * (distance +1)) / 2;
        }
        positionWithFuelCosts.set(pos, posDistance);

    }

    let posWithShortestDistance = [0,Number.MAX_SAFE_INTEGER]
    for (let entry of positionWithFuelCosts.entries()) {
        if (entry[1] < posWithShortestDistance[1]) {
            posWithShortestDistance = entry;
        }
    }
    console.log(`Pos with shortest distance to all crabs ${posWithShortestDistance}`);
}

main();
    