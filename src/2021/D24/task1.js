const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','24')).split('\n').map(val => Number(val));

}

main();
    