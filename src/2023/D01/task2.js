import { readFileSync } from "fs";

async function main() {
    const file = readFileSync(`src/2023/D01/input.txt`, { encoding: 'utf-8', flag: 'r' });
    const lines = file
        .split('\n')
        .map(line => Array.from(line))
        .map(line => findNumbers(line))

    const numbers = lines
        .map(numbers => [numbers.at(0), numbers.at(-1)])
        .map(numbers => numbers.join(''))
        .map(x => parseInt(x))

    const result = numbers
        .reduce((acc, line) => acc + line, 0);

    if (result !== 54591) throw "invalid result"
    console.log(`Sum of calculations ${result}`);
}

function findNumbers(array) {
    var chars = ''
    const numbers = []

    for (const char of array) {
        if (!isNaN(parseInt(char, 10))) {
            chars = ''
            numbers.push(parseInt(char, 10))
            break;
        }

        chars = chars + char
        const wordNum = numFromString(chars)
        if (!isNaN(wordNum)) {
            numbers.push(wordNum)
            chars = ''
            break;
        }
    }

    var currentChar = array.pop()
    var charsFromBack = currentChar
    while (array.length !== 0) {
        if (!isNaN(parseInt(currentChar, 10))) {
            numbers.push(parseInt(currentChar, 10))
            break;
        }

        const wordNum = numFromString(charsFromBack)
        if (!isNaN(wordNum)) {
            numbers.push(wordNum)
            break;
        }

        currentChar = array.pop()
        charsFromBack = currentChar + charsFromBack
    }
    
    return numbers
}

function numFromString(str) {
    
    var stringRep = str
    while (stringRep.length !== 0) {
        const mapping = mapStringToNum(stringRep)
        if (!isNaN(mapping)) {
            return mapping
        }

        stringRep = stringRep.substring(1)
    }

    var backwardsStringRep = str
    while (backwardsStringRep.length !== 0) {
        const mapping = mapStringToNum(backwardsStringRep)
        if (!isNaN(mapping)) {
            return mapping
        }

        backwardsStringRep = backwardsStringRep.substring(0, backwardsStringRep.length - 1)
    }

}
function mapStringToNum(str) {
    switch (str.toLowerCase()) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return NaN
    }
}

main();
