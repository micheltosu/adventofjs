const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2024', '11', path)).split(' ');

    let stones = input
    for (let i = 0; i < 25; i++) {
        stones = stones.flatMap(stone => applyRules(stone)).filter(x => x !== '')
    }

    console.log(stones.length)
}

const applyRules = (stone) => {
    if (stone === '0') {
        return '1';
    }

    const chars = Array.from(stone);
    if (chars.length % 2 === 0) {
        return [
            parseInt(chars.slice(0, chars.length / 2).join('')).toFixed(0),
            parseInt(chars.slice(chars.length / 2).join('')).toFixed(0)
        ]
    }

    const numeric = parseInt(stone);
    return `${numeric * 2024}`
}

main();
