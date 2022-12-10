const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '03')).split('\n');
    
    const reduced = input.reduce((prev, next) => {
        let added = [];
        for (let i = 0; i < prev.length; i++) {
            added.push(Number(prev[i]) + Number(next[i]));
        }
        return added;
    });

    const gamma = reduced.map(pos => pos > (input.length/2) ? 1 : 0);
    const epsilon = gamma.map(val => val ? 0 : 1);

    const gammaInt = parseInt(gamma.join(''),2);
    const epsilonInt = parseInt(epsilon.join(''),2);
    const solution = gammaInt * epsilonInt;
    console.log(`Solution: ${solution}`);
}

main();