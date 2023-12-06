const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = (await getInputForDay('2023', '06')).split('\n')

    const time = parseInt(input[0].match(/(\d+)/g).join(''))
    const distance = parseInt(input[1].match(/(\d+)/g).join(''))

    var waysToWin = 0;
    const raceLength = time;

    for (var pressLength = 0; pressLength < raceLength; pressLength++) {
        const attemptDistance = calculateDistance(pressLength, raceLength);
        if (attemptDistance > distance)
           waysToWin++
    }

    if (waysToWin !== 35150181)
        throw "incorrect result"
    console.log(waysToWin);
}

main();


function calculateDistance(press, raceLength) {
    return (raceLength - press) * press
}