const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '02')).split('\n');
    const movements = input
        .map(val => val.split(' '))
        .map(a => { return { [a[0]]: Number(a[1]) } })
        .reduce((acc, next) => { 
            for (const key of Object.keys(next)) {
                acc[key] = next[key] + (acc[key] ?? 0);
            }

            return acc;
        });
    
    const normalizedMovements = {horizontal: movements.forward, vertical: movements.down - movements.up};
    console.log(movements);
    console.log(normalizedMovements);
    console.log(`Multiplied v * h = ${normalizedMovements.horizontal * normalizedMovements.vertical}`);
}

main();