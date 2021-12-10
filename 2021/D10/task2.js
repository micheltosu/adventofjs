const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','10')).split('\n');

    const charDict = new Map([
        ['(', ')'],
        ['{', '}'],
        ['[', ']'],
        ['<', '>'],

    ]);

    const charValues = new Map([
        [')', 1],
        ['}', 3],
        [']', 2],
        ['>', 4],
    ]);

    let incompleteLines = [];
    for (let line of input) {
        let openingStack = [];
        let illegalLine = false;
        for (const char of line.split('')) {
            if (charDict.has(char)) {
                openingStack.push(char);
            } else {
                if( charDict.get(openingStack.pop()) !== char) {
                    illegalLine = true;
                    break;
                }
            }
        }
        if (!illegalLine) {
            incompleteLines.push(openingStack);
        }
    }

    let completionStringValues = [];
    for (let line of incompleteLines) {
        let lineSum = 0;
        while (line.length !== 0) {
            lineSum = (lineSum * 5) + charValues.get(charDict.get(line.pop()));
        }
        completionStringValues.push(lineSum);
    }

    completionStringValues.sort((a, b) => a - b);
    console.log(`Total syntax errors: ${completionStringValues[(completionStringValues.length - 1) / 2]}`)
}

main();
    