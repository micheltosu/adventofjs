const { getInputForDay } = require('../../util/InputFetcher');
const fs = require('fs/promises');
const { assert } = require('console');
async function main() {
    const inputNumbers = await (await getInputForDay('2021', '18')).split('\n');
    let magnitudes = [];

    for (let a of inputNumbers) {
        for (let b of inputNumbers) {
            let rawNumber = ['[', a, ',', b, ']'].join('');
            let exploded;
            let reduced;
            do {
                exploded = explode(rawNumber);
                reduced = exploded ?? reduce(rawNumber);
                rawNumber = reduced ?? rawNumber;

            } while (exploded || reduced);

            let magnitude = 0;
            // Calculate the magnitude 
            while (rawNumber.includes('[')) {
                let pairs = rawNumber.matchAll(/\[(\d+),(\d+)\]/g);
                let newStr = rawNumber;
                for (let pair of pairs) {
                    magnitude = (pair[1] * 3) + (pair[2] * 2);
                    newStr = newStr.replace(pair[0], magnitude);

                }
                rawNumber = newStr;
            }
            magnitudes.push(magnitude);
        }
    }
    console.log('Largest magnitude: ' + magnitudes.sort((a,b) => parseInt(b) - parseInt(a)).shift());
    // console.log(`Number ${a}, + ${b} prodces magnitude\n${magnitude}`);

}

function reduce(str) {
    let newStr = str;
    const numbers = [];
    const splitted = str.split('');
    while (splitted.length > 0) {
        const char = splitted[0];
        if (Number.isInteger(parseInt(char))) {
            numbers.push(readNumber(splitted));
        } else {
            splitted.shift();
        }
    }

    if (numbers.length === 0) {
        return null;
    }

    for (const num of numbers) {
        if (num >= 10) {
            let replacement = ['[', Math.floor(num / 2), ',', Math.ceil(num / 2), ']'];
            newStr = newStr.replace(num, replacement.join(''));
            return newStr;
        }
    }
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

            let rawBeginning = addToLastInt(left, rawNumber.substring(0, i - 1));
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

function readNumber(input) {
    let result = [];
    while (Number.isInteger(Number(input[0]))) {
        result.push(input.shift());
    }

    return Number(result.join(''))
}

main();
