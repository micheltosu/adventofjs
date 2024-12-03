const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2024', '03', path));

    var sum = 0
    const muls = input.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g);
    const dos = input.matchAll(/do\(\)/g);
    const donts = input.matchAll(/don\'t\(\)/g);

    const all = [
        ...Array.from(muls).map(({ 1: a, 2: b, index }) => ({ type: 'MUL', a: parseInt(a), b: parseInt(b), index })),
        ...Array.from(dos).map(({ index }) => ({ type: 'DO', index })),
        ...Array.from(donts).map(({ index }) => ({ type: 'DONT', index }))]
        .sort((a, b) => a.index - b.index)

    var enabled = true
    for (const instruction of all) {
        const { type, a, b } = instruction;
        if (type === 'MUL' && enabled) sum += a * b
        if (type === 'DO') enabled = true;
        if (type === 'DONT') enabled = false;
    }
    console.log("sum", sum);
    return;
}

main();
