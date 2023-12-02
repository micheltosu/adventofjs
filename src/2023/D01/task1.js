import { readFileSync } from "fs";

async function main() {
    const file = readFileSync(`src/2023/D01/input.txt`, {encoding: 'utf-8', flag: 'r'});
    const lines = file
        .split('\n')
        .map(line => Array.from(line));

        console.log(lines)
    const batchSums = lines
        .map(line => [findFirstNumber(line), findLastNumber(line)])
        .map(line => parseInt(line.join('')))
        .reduce((acc, line) => acc + line, 0);

    console.log(`Sum of calculations ${batchSums}`);
}

main();

function findFirstNumber(array) {
    for (const char of array) {
        if (!isNaN(parseInt(char, 10))) {
            return parseInt(char, 10)
        }
    }
}

function findLastNumber(array) {
    var char = array.pop();
    while (char) {
        if (!isNaN(parseInt(char, 10))) {
            return parseInt(char, 10);
        }

        char = array.pop()
    }

    throw "boom"
}