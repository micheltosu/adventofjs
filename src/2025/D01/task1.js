const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2025','01', path)).split('\n').map(row => Array.from(row));


    let pos = 50;
    let zeros = 0;

    for (const [direction, ...clicks] of input) {
        console.log(direction, clicks.join(""));
        const noClicks = parseInt(clicks.join(''))

        if (direction === "R") {
            pos = (pos + noClicks)%100;
        } 
        else if (direction === "L") {
            pos = (pos - noClicks)%100;

            if (pos < 0)
                pos = pos+100;
        }

        if (pos === 0) zeros += 1;
        console.log(pos, zeros)
    }

    console.log("zeros", zeros)

}

main();
    