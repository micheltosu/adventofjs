const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2025','01', path)).split('\n').map(row => Array.from(row));


    let pos = 50;
    let zeros = 0;

    for (const [direction, ...clicks] of input) {
        console.log(direction, clicks.join(""));
        const noClicks = parseInt(clicks.join(''))
        const revolutions = noClicks / 100;
        if (revolutions >= 1) {
            console.log("adding revolutions: " + Math.floor(revolutions));

            zeros += Math.floor(revolutions);
        }

        if (direction === "R") {
            const clicks = pos + noClicks;
            const newPos = (clicks) % 100;
            if (pos !== 0 && (newPos < pos || newPos === 0)) {
                console.log("passing zero on right rotation");
                zeros += 1
            }
            pos = newPos;
        } 
        else if (direction === "L") {
            var newPos = (pos - noClicks) % 100;
            if (newPos < 0)
                newPos = newPos+100;
            
            if (pos !== 0 && (newPos > pos || newPos === 0)) {
                console.log("passing zero on left rotation");
                zeros += 1
            }
            pos = newPos;
            
        }

        // if (pos === 0 && !Number.isInteger(revolutions)) zeros += 1;
        console.log(pos, zeros)
    }

    console.log("zeros", zeros)
    // 5741 too low
    // 6967 too high
    // 8139 too high

}

main();
    