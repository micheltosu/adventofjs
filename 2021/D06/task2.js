const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '06')).split(',').map(val => Number(val)).reduce((acc, t) => {
        acc.set(t, (acc.get(t) ?? 0) + 1);
        return acc;
    }, new Map());

    let fishes = input;

    for (let i = 0; i < 256; i++) {
        const newFishes = new Map();
        for (const [timer, count] of fishes.entries()) {
           if (timer === 0) {
            newFishes.set(6, (newFishes.get(6) ?? 0) + count);
            newFishes.set(8, count);
           } else {
               newFishes.set(timer - 1 , (newFishes.get(timer - 1) ?? 0) + count);
           };
        }
        fishes = newFishes;
    }
    
    const total = [...fishes.values()].reduce((acc, v) => acc + v);
    console.log(`Fishes count: ${total}`);
}

main();
