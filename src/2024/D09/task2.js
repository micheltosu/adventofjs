const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '09', path)).split('').map(val => Number(val));

    const memory = [];
    const freeSpace = {};


    var fileId = 0;
    var even = true;
    input.forEach((pos, idx) => {
        const positions = []
        for (var i = 0; i < pos; i++) {
            const position = memory.push(even ? fileId : '.')
            positions.push(position - 1)
        }

        if (!even) freeSpace[positions.at(0)] = positions.length
        if (even && pos !== 0) fileId++
        even = !even

    })

    var file = [];
    for (var i = memory.length - 1; i >= 0; i--) {
        const fileId = memory[i]
        if (fileId !== '.' && (file.length === 0 || fileId === file.at(0))) {
            file.push(fileId)

        };

        if ((fileId === '.' || memory[i - 1] !== fileId) && file.length > 0) {

            var enoughSpace;
            for (const [key, length] of Object.entries(freeSpace)
                .map(([key, length]) => [parseInt(key), length])
                .sort(([a, aa], [b, bb]) => a - b)) {
                if (length >= file.length && key < i) {
                    enoughSpace = [key, length];
                    break;
                }
            }

            if (enoughSpace) {
                const removedSpace = memory.splice(enoughSpace[0], file.length, ...file);
                memory.splice(i, removedSpace.length, ...removedSpace);
                freeSpace[enoughSpace[0] + removedSpace.length] = enoughSpace[1] - removedSpace.length;
                delete freeSpace[enoughSpace[0]]
                enoughSpace = null;
            }

            file = [];
        }


    }

    console.log("checksum", hash(memory))
}

function hash(memory) {
    return memory.reduce((acc, value, idx) => {
        if (value === '.') return acc;
        return acc + value * idx
    }, 0)
}
main();


