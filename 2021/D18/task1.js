const {getInputForDay} = require('../../util/InputFetcher');
const fs = require('fs/promises');
const { assert } = require('console');
async function main() {
    // const input = await (await getInputForDay('2021','18')).split('\n').map(val => Number(val));
    const inputNumbers = (await fs.readFile('2021/D18/testinput.txt', {encoding: 'utf-8'}))
        .split('\n');
    
    
    console.log(inputNumbers);

    let rawNumber = inputNumbers.shift();

    rawNumber = ['[',rawNumber, inputNumbers.shift(), ']'].join('');

    console.log(rawNumber);

    let exploded;
    let reduced;
    do {
        exploded = explode(rawNumber);
        reduced = exploded;
        rawNumber = reduced ?? rawNumber;

    } while (exploded || reduced);
    

    console.log(rawNumber);
    console.log(exploded);


    // const mappedNumbers = inputNumbers.map(str => str.split('')).map(n => parsePair(n));
    // console.log(mappedNumbers);

    // mappedNumbers.reduce((a,b) => addSnailNumber(a,b));

}

function explode(rawNumber) {
    let stack = [];
    for (let i = 0; i < rawNumber.length; i++) {
        let char = rawNumber.charAt(i);
        if (char === '[') {
            stack.push(char);
        } else if (Number.isInteger(Number(char)) && stack.length > 4) {
            stack.pop()
            let restOfString = rawNumber.substring(i);
            let pair = restOfString.substring(0, restOfString.indexOf(']')).split('');
            let stringAfterPair = restOfString.slice(restOfString.indexOf(']') + 1);
            let left = readNumber(pair);
            let right = readNumber(pair.slice(1));

            let rawBeginning = addToLastInt(left, rawNumber.substring(0, i-1));
            let rawEnding = addToFirstInt(right, stringAfterPair);
            
            return [rawBeginning, '0', rawEnding].join('');
        } else if (char === ']') {
            stack.pop();
        }
    }

    return null;
}

function addToLastInt(val, str) {
    let num = [];
    let splitt = str.split('');
    while (splitt.length > 0) {
        let char = parseInt(splitt.pop());
        if (Number.isInteger(char)) {
            num.unshift(char);
        } else if (num.length !== 0) {
            break;
        }
    }
    if (num.length === 0) {
        return str;
    }

    const lastInt = num.join('');
    const pos = str.lastIndexOf(lastInt);
    const numWidth = num.length;
    return str.substring(0, pos) + (parseInt(lastInt) + parseInt(val)) + str.substring(pos + numWidth);
}

function addToFirstInt(val, str) {
    
    let num = [];
    let splitt = str.split('');
    while (splitt.length > 0) {
        let char = parseInt(splitt.shift());
        if (Number.isInteger(char)) {
            num.push(char);
        } else if (num.length !== 0) {
            break;
        }
    }
    if (num.length === 0) {
        return str;
    }

    const lastInt = num.join('');
    const pos = str.indexOf(lastInt);
    const numWidth = num.length;
    return str.substring(0, pos) + (parseInt(lastInt) + parseInt(val)) + str.substring(pos + numWidth);

}

function reduce(number) {

    findDepth(number, 0);
}

function findDepth(number, depth) {
    
    if (depth === 4) {
        return true;
    }

    let left = findDepth(number.left, depth + 1);
    if (left === true) {

    }
    let right = findDepth(number.right)

}

function addSnailNumber(a, b) {
    const pair = [a, b];

    return reduce(pair);
}

function parsePair(input) {
    let pos = 0;
    let left, right;

    let peek = input[0];

    if (peek === '[') {
        input.shift();
        left = parsePair(input);
    } else {
        return readNumber(input);
    }

    const next = input.shift();
    assert(next === ',', 'Expected delimiter, got ' + next);

    if (input[0] === '[') {
        right = parsePair(input);
    } else {
        right = readNumber(input);
    }
    assert(input.shift() === ']', 'Expected closing of pair');
    
    return { left: left, right: right };

}

function readNumber(input) {
    let result = [];
    while(Number.isInteger(Number(input[0]))) {
        result.push(input.shift());
    }

    return Number(result.join(''))
}

main();
    