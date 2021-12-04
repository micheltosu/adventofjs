const { expectation } = require('sinon');
const { getInputForDay } = require('../../util/InputFetcher');
//    return Object.keys(charCounts).reduce((prev, next) => mostCommon[prev] > mostCommon[next] ? prev : next);

const histogram = (inputArray) => {
    return inputArray.reduce((prev, next) => {
        return {...prev, ...{[next]: (prev[next] ?? 0) + 1}};
    }, {});

}

async function main() {
    const input = await (await getInputForDay('2021', '03')).split('\n');
    
    let oxygenRating = input.map(val => {return {originalValue: val, value: val.split('') }})
    while(oxygenRating.length > 1) {
        const histo = histogram(oxygenRating.map(v => { const [first, ...rest] = v.value; return first; }));
        const zeros = histo['0'];
        const ones = histo['1'];
        const mostCommon = ones >= zeros ? '1' : '0'; 

        oxygenRating = oxygenRating.filter(v => v.value.shift() === mostCommon).map(v => {return {...v, value: v.value}});
    }

    console.log(oxygenRating);

    
    // let co2ScrubberRating = input;
    // for (let i = 0; i < mostCommon.length; i++) {
    //     if (oxygenRating.length <= 1) {
    //         break;
    //     }
    //     co2ScrubberRating = co2ScrubberRating.filter(val => val[i] != mostCommon[i]);
    // }
    // console.log(parseInt(co2ScrubberRating, 2));

    // //console.log(`Solution: ${solution}`);
}

main();