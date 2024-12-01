const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2023','09', 'test')).split('\n').map(line => line.split(' ').map(x => parseInt(x)));

    const lastNumbers = [];
    for (const line of input) {
        const differences = [line];

        while(!differences.at(-1).every(x => x === 0)) {
            const lastDiff = differences.at(-1);
            if (lastDiff.length === 1) {
                differences.push([0]);
                continue;
            }
            const currentDiff = [];
            for(let i = 0 ; i < (lastDiff.length - 1); i++) {
                const value = lastDiff[i];
                const prevValue = lastDiff[i+1]
                const result = Math.max(value, prevValue) - Math.min(value, prevValue)
                currentDiff.push(value < 0 && prevValue < 0 ? 0 - result : result);
            }
            differences.push(currentDiff)
        }

        for(let i = differences.length - 1; i >= 0; i--) {
            differences[i].push((differences[i+1] ?? [0]).at(-1) + differences[i].at(-1));
        }

        lastNumbers.push(differences.at(0).at(-1));
    }

    // x > 799089056
    // x < 1488360717
    //     1494737123
    console.log(`Result is ${lastNumbers.reduce((acc, x) => acc + x, 0)}`)

}

main();
    