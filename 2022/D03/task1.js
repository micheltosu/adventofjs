const {getInputForDay} = require('../../util/InputFetcher');

async function task1() {
    const input = (await getInputForDay('2022','03')).split('\n');

    const answer = input
        .map(i => [i.slice(0, i.length/2), i.slice(i.length/2)])
        .map(([a,b]) => [Array.from(a), Array.from(b)])
        .map(([a,b]) => a.filter(x => b.find(y => y === x)))
        .map(chars => Array.from(new Set(chars).values()))
        .map(chars => chars.reduce((acc, x) => acc + toPriority(x), 0))
        .reduce((acc, x) => acc + x, 0);

    console.log(`Sum of priorities: ${answer}`);
}

function toPriority(item) {
    if (item.match(/[a-z]/)) {
        return item.charCodeAt(0) - 96;
    } else if (item.match(/[A-Z]/)) {
        return item.charCodeAt(0) - 38;
    }
}

module.exports = { task1, toPriority };

