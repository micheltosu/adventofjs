const { expectation } = require('sinon');
const { getInputForDay } = require('../../util/InputFetcher');

const histogram = (inputArray) => {
    return inputArray.reduce((prev, next) => {
        return { ...prev, ...{ [next]: (prev[next] ?? 0) + 1 } };
    }, {});
}

async function main() {
    const input = await (await getInputForDay('2021', '03')).split('\n');

    let oxygenRating = input.map(val => { return { originalValue: val, value: val.split('') } })
    while (oxygenRating.length > 1) {
        const histo = histogram(oxygenRating.map(v => { const [first, ...rest] = v.value; return first; }));
        const zeros = (histo['0'] ?? 0);
        const ones = (histo['1'] ?? 0);
        const mostCommon = ones >= zeros ? 1 : 0;

        oxygenRating = oxygenRating.filter(v => v.value.shift() == mostCommon);
    }

    let co2Scrubber = input.map(val => { return { originalValue: val, value: val.split('') } })
    while (co2Scrubber.length > 1) {
        const histo = histogram(co2Scrubber.map(v => { const [first, ...rest] = v.value; return first; }));
        const zeros = (histo['0'] ?? 0);
        const ones = (histo['1'] ?? 0);
        const leastCommon = zeros <= ones ? 0 : 1;

        co2Scrubber = co2Scrubber.filter(v => v.value.shift() == leastCommon);

    }
    console.log(`Life support rating: ${parseInt(oxygenRating.shift().originalValue, 2) * parseInt(co2Scrubber.shift().originalValue, 2)}`);
}

main();