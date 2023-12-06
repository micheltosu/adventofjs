const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = (await getInputForDay('2023','06')).split('\n')

    const times = input[0].match(/(\d+)/g)
    const distances = input[1].match(/(\d+)/g)

    const raceResults = []
    for (const raceNum in times) {
        raceResults.push([]);
        const raceLength = times[raceNum];

        for (var pressLength = 0; pressLength < raceLength; pressLength++) {
            const distance = calculateDistance(pressLength, raceLength);
            if (distance > distances[raceNum])
                raceResults[raceNum].push(distance);
        }
    }

    const result = raceResults.map(results => results.length).reduce((sum, num) => sum * num);
    if (result !== 293046) 
        throw "incorrect result"

    console.log(`${result} ways to win`)
}

main();
    

function calculateDistance(press, raceLength) {
    return (raceLength - press ) * press
}