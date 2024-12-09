const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '09', path)).split('').map(val => Number(val));

    const memory = [];
    const freeSpace = [];


    var fileId = 0;
    var even = true;
    input.forEach((pos, idx) => {
        for (var i = 0; i < pos; i++) {
            const position = memory.push(even ? fileId : '.')
            if (!even) freeSpace.push(position - 1)
        }

        if (even && pos !== 0) fileId++
        even = !even

    })

    for (const freePos of freeSpace) {
        if (freePos >= memory.length) break;
        var pos = -1
        var lastChar = memory.at(pos);
        while (lastChar === '.') {
            pos--;
            lastChar = memory.at(pos);
        }
        memory[freePos] = lastChar;
        memory.splice(memory.length + pos, 1)
    }

    console.log("checksum", hash(memory.filter(e => e !== '.')))

}

function hash(memory) {
    return memory.reduce((acc, value, idx) => {
        return acc + value * idx
    }, 0)
}
main();

// Guess 6432869897158 too high
