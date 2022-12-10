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
        [')', 3],
        ['}', 1197],
        [']', 57],
        ['>', 25137]
    ]);

    let illegalChars = [];
    for (let line of input) {
        let openingStack = [];

        for (const char of line.split('')) {
            if (charDict.has(char)) {
                openingStack.push(char);
            } else {
                if( charDict.get(openingStack.pop()) !== char) {
                    illegalChars.push(char);
                    break;
                }
            }
        }
    }

    console.log(`Total syntax errors: ${illegalChars.reduce((p, c) => p + charValues.get(c), 0)}`)
}

main();
    