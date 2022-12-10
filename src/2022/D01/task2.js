const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const inputBatches = await (await getInputForDay('2022','01'))
    .split('\n\n')
    .map(inputBatch => inputBatch.split('\n').map(val => Number(val)));

    const batchSums = inputBatches
      .map(batch => batch.reduce((acc, x) => acc + x, 0))
      .sort((a,b) => b - a);
    console.log(`Calories for elf carrying most calories ${batchSums[0]}`);

    const topThree = batchSums
      .slice(0, 3)
      .reduce((acc, x) => acc + x, 0);
    console.log(`Calories for top three elves: ${topThree}`)
}

main();
