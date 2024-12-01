const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = (await getInputForDay('2024', '01')).split('\n');


    const pairs = input.map(line => line.split('   ').map(Number))
    console.log(pairs)


    const [left, right] = pairs.reduce((acc, [l, r]) => ([[...acc[0], l], [...acc[1], r]]), [[], []])
    console.log(left, right)

    const leftSorted = left.sort()
    const rightSorted = right.sort()

    const diffs = leftSorted.map((l, idx) => Math.abs(l - rightSorted[idx]));
    const diffSum = diffs.reduce((acc, diff) => acc + diff, 0)
    console.log(diffSum)
}

main();
