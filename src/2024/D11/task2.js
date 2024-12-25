const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2024', '11', path)).split(' ');

    let stones = input.reduce((acc, x) => ({ ...acc, [x]: (acc[x] ?? 0) + 1 }), {})
    for (let i = 0; i < 75; i++) {
        const newStones = {}
        for (const [stone, count] of Object.entries(stones)) {
            const newStone = applyRules(stone);
            if (Array.isArray(newStone)) {
                for (const val of newStone) {
                    newStones[val] = (newStones[val] ?? 0) + count;
                }
            } else {
                newStones[newStone] = (newStones[newStone] ?? 0) + count;
            }
        }

        stones = newStones
    }

    console.log(Object.values(stones).reduce((acc, x) => acc + x, 0))
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
