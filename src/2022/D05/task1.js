const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2022','05')).split('\n').map(val => Number(val));

}

main();
    