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

    const invalid = updates.split('\n').map(update => update.split(',')).filter((update) =>
        !checkUpdate(update, befores, afters));

    var result = invalid;
    while (!result.every(update => checkUpdate(update, befores, afters))) {
        result = fixUpdate(result, befores, afters);
    }

    console.log(result.map(update => update[Math.floor(update.length / 2)]).reduce((acc, val) => acc + parseInt(val), 0));

}
function checkUpdate(update, befores, afters) {
    return update.every(num => checkBefore(num, update, befores[num] ?? []) && checkAfter(num, update, afters[num] ?? []));
}

function fixUpdate(updates, befores, afters) {

    return updates.map(update => update.reduce((acc, val) => {
        const aftersInUpdate = (afters[val] ?? []).filter(a => update.includes(a));
        const beforesInUpdate = (befores[val] ?? []).filter(b => update.includes(b))
        const currencIndex = acc.indexOf(val);
        const before = acc.slice(0, currencIndex);
        const after = acc.slice(currencIndex + 1);

        const afterToBefore = after.filter(a => aftersInUpdate.includes(a));
        const beforeToAfter = before.filter(b => beforesInUpdate.includes(b));
        return [...before.filter(b => !beforeToAfter.includes(b)), ...afterToBefore, val, ...beforeToAfter, ...after.filter(a => !afterToBefore.includes(a))]
    }, update))
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
