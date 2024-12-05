const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const [rules, updates] = await (await getInputForDay('2024', '05', path)).split('\n\n');

    const { befores, afters } = rules.split('\n').reduce(({ befores, afters }, pair) => {
        const [before, after] = pair.split('|');
        befores[before] = [...(befores[before] ?? []), after]
        afters[after] = [...(afters[after] ?? []), before]

        return { befores, afters };
    }, { befores: {}, afters: {} })

    console.log(befores, afters, updates)

    const result = updates.split('\n').map(update => update.split(',')).reduce((acc, update) => {
        const valid = update.every(num => checkBefore(num, update, befores[num] ?? []) && checkAfter(num, update, afters[num] ?? []));
        return valid ? [...acc, parseInt(update.at(update.length / 2))] : acc;
    }, [])
    console.log(result.reduce((acc, res) => acc + res, 0));
}

function checkBefore(val, update, befores) {
    const index = update.indexOf(val);
    return befores.every(before => {
        const beforeIndex = update.indexOf(before);
        return beforeIndex === -1 || beforeIndex > index
    });
}
function checkAfter(val, update, afters) {
    const index = update.indexOf(val);
    return afters.every(after => {
        const afterIndex = update.indexOf(after);
        return afterIndex === -1 || afterIndex < index
    });
}

main();
