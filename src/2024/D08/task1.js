const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '08', path)).split('\n');

    const lineLength = input.at(0).length;
    const lines = input.length;

    const lineData = Array.from(input.join(''));
    const allOtherChars = lineData
        .reduce((acc, char, idx) => {
            if (char !== '.') {

                acc[char] = [...(acc[char] ?? []), { x: idx % lineLength, y: Math.floor(idx / lineLength) }]
            }
            return acc;
        }, {});



    const inverseNodes = {};
    for (const char in allOtherChars) {
        const positions = allOtherChars[char];

        positions.forEach(({ x, y }, idx) => {
            const otherAntennas = positions.slice(idx + 1);
            for (const { x: xx, y: yy } of otherAntennas) {
                const xDist = x - xx;
                const yDist = y - yy;

                const nodeA = { x: x + xDist, y: y + yDist };
                const nodeB = { x: xx - xDist, y: yy - yDist };

                const nodeAStr = `${nodeA.x},${nodeA.y}`
                if (within(nodeA, lineLength, lines)) inverseNodes[nodeAStr] =
                    [...(inverseNodes[nodeAStr] ?? []), char]
                const nodeBStr = `${nodeB.x},${nodeB.y}`
                if (within(nodeA, lineLength, lines)) inverseNodes[nodeBStr] =
                    [...(inverseNodes[nodeBStr] ?? []), char]
            }
        })



    }

    // for (const pos in )
    console.log(inverseNodes)
    console.log("unique positions", Object.keys(inverseNodes).reduce((acc, nodes) => acc + 1, 0))
}

function within({ x, y }, maxX, maxY) {
    return x >= 0 && x < maxX && y >= 0 && y < maxY;
}

main();

// Guessed: 270