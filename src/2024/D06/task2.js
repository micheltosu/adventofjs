const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '06', path)).split('\n').map(line => line.split(''));

    const startRow = input.findIndex(line => line.find(char => char === "<" || char == ">" || char === "^" || char === "v" || char === "V"))
    const startPos = input[startRow].join('').match(/[<>^vV]/).index

    const maxY = input.length;
    const maxX = input.at(0).length
    var posCount = 1;
    var blockLocations = 0;
    var blockPositions = []
    var currPos = [startPos, startRow]
    while (true) {

        const direction = input[currPos[1]][currPos[0]];
        const [nextX, nextY] = getMovementChange(direction);
        const nextPos = [currPos[0] + nextX, currPos[1] + nextY]
        if (!(nextPos[0] >= 0 && nextPos[0] < maxX && nextPos[1] >= 0 && nextPos[1] < maxY)) {
            break;
        }

        if (input[nextPos[1]][nextPos[0]] !== '#') {
            if (input[nextPos[1]][nextPos[0]] === '.')
                posCount += 1;
            input[nextPos[1]][nextPos[0]] = direction;
            input[currPos[1]][currPos[0]] = 'X';

            const positionToRight = getPositionToRight(direction);
            const rightChar = input[currPos[1] + positionToRight[1]][currPos[0] + positionToRight[0]]
            if (blockInStraightLine(positionToRight, currPos, input, maxX, maxY)) {
                blockPositions.push([currPos[0], currPos[1]])
                blockLocations += 1;
            }

            currPos = nextPos;
        }
        else {
            input[currPos[1]][currPos[0]] = rotate(direction)
        }
    }
    console.log(input);
    console.log("visited", posCount)
    console.log("blocklocations", blockLocations)
    console.log("blockpositions", blockPositions)
}
function blockInStraightLine(direction, currentPos, input, maxX, maxY) {
    var [x, y] = currentPos;
    const [xX, yY] = direction;

    while (x + xX >= 0 && x + xX < maxX && y + yY >= 0 && y + yY < maxY) {
        if (input[y + yY][x + xX] === '#' && input[y][x] === 'X') {
            return true;
        } else {
            x += xX;
            y += yY;
        }
    }
    return false;
}
function trailChar(char) {
    switch (char) {
        case '^':
        case 'v':
        case 'V':
            return '|';
        case '<':
        case '>':
            return "-";
    }
}
function getPositionToRight(char) {
    switch (char) {
        case '^':
            return [1, 0];
        case '<':
            return [0, -1];
        case '>':
            return [0, 1];
        case 'v':
        case 'V':
            return [-1, 0];
    }
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
