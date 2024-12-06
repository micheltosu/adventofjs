const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '06', path)).split('\n').map(line => line.split(''));

    const startRow = input.findIndex(line => line.find(char => char === "<" || char == ">" || char === "^" || char === "v" || char === "V"))
    const startPos = input[startRow].join('').match(/[<>^vV]/).index

    const maxY = input.length;
    const maxX = input.at(0).length
    var posCount = 1;
    var currPos = [startPos, startRow]
    while (true) {

        const currentDir = input[currPos[1]][currPos[0]];
        const [nextX, nextY] = getMovementChange(currentDir);
        const nextPos = [currPos[0] + nextX, currPos[1] + nextY]
        if (!(nextPos[0] >= 0 && nextPos[0] < maxX && nextPos[1] >= 0 && nextPos[1] < maxY)) {
            break;
        }

        if (input[nextPos[1]][nextPos[0]] !== '#') {
            if (input[nextPos[1]][nextPos[0]] === '.')
                posCount += 1;
            input[nextPos[1]][nextPos[0]] = currentDir;
            input[currPos[1]][currPos[0]] = 'X';
            currPos = nextPos;

        }
        else {
            input[currPos[1]][currPos[0]] = rotate(currentDir)
        }
    }
    console.log(input);
    console.log(posCount)
}

function getMovementChange(char) {
    switch (char) {
        case '^':
            return [0, -1];
        case '<':
            return [-1, 0];
        case '>':
            return [1, 0];
        case 'v':
        case 'V':
            return [0, 1];
    }
}
function rotate(char) {
    switch (char) {
        case '<':
            return '^';
        case '^':
            return '>';
        case '>':
            return 'v';
        case 'v':
        case 'V':
            return '<';
    }
}

main();
