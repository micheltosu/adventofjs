const { getInputForDay } = require('../../util/InputFetcher');

const mul = (a, b) => a * b;
const add = (a, b) => a + b;
const concat = (a, b) => parseInt(`${a}${b}`)
const ops = [mul, add, concat]

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '07', path))
        .split('\n')
        .map(val => val.split(':')
            .map(val => val.trim()))
        .map(([testValue, operands]) => ([parseInt(testValue), operands.split(' ').map(v => parseInt(v))]));


    const validCalibrations = []
    for (const [testValue, operands] of input) {


        var results = [0]
        for (const operand of operands) {

            const newResults = []
            for (const result of results) {
                if (result === 0) { newResults.push(operand); continue }


                for (const op of ops) {
                    newResults.push(op(result, operand));
                }
            }
            results = newResults
        }

        if (results.find(result => result === testValue))
            validCalibrations.push(testValue)
    }

    console.log("result: ", validCalibrations.reduce((acc, x) => acc + x));
}

main();
