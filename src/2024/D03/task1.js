const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2024', '03', path));

    // I think that writing a lexer/parser would be the correct solution and expandable.
    // Don't remember the principles from top of my mind.
    // for (var i = 0; i < input.length; i++) {
    //     console.log(input[i])

    // }

    var sum = 0
    const matches = input.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g);
    for (const [match, a, b] of matches) {
        console.log(match, a, b)
        sum += parseInt(a) * parseInt(b)
    }
    console.log(sum)

}

main();
