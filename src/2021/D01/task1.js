const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','01')).split('\n').map(val => Number(val));

    let increases = 0;
    let last;
    for (const val of input) {
        if (last !== undefined && val > last) {
            increases += 1;
            console.log(`${val} is larger than ${last}`);
        }

        last = val;
    }
    console.log(increases);
}

main();