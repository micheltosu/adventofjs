const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','01')).split('\n').map(val => Number(val));

    let increases = 0;
    let lastWindowSum = input.slice(0,3).reduce((p,c) => p+c);
    let currentWindowSum;
    for(let i = 3; i < input.length; i++) {
        currentWindowSum = input.slice(i-2,i+1).reduce((p,c) => p+c);
        
        if (currentWindowSum > lastWindowSum) {
            increases += 1;
        }
        
        lastWindowSum = currentWindowSum;
    }

    
    console.log(`Number of windows with a larger sum than the last one is: ${increases}`);
}

main();