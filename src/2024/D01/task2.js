const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = (await getInputForDay('2024', '01')).split('\n');

    const pairs = input.map(line => line.split('   ').map(Number))
    console.log(pairs)

    const [left, right] = pairs.reduce((acc, [l, r]) => ([[...acc[0], l], [...acc[1], r]]), [[], []])
    console.log(left, right)

    const appearanceMap = right.reduce((acc, num) => ({ ...acc, [num]: (acc[num] ?? 0) + 1 }), {})
    const leftMultiplied = left.map(num => num * (appearanceMap[num] ?? 0));

    const diffSum = leftMultiplied.reduce((acc, diff) => acc + diff, 0)
    console.log(diffSum)
}

main();
