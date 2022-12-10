const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','06')).split(',').map(val => Number(val));

    let fishes = input.sort((a,b) => a - b);

    for (let i = 0; i < 80; i++) {
        let givingBirth = [];
        while(fishes[0] === 0) {
            fishes.shift();
            fishes.push(...[6,8]);
        }

        fishes = fishes.map(f => f - 1).sort((a,b) => a - b);

    }
    console.log(fishes);
    console.log(`Fishes count: ${fishes.length}`);
}

main();
    