const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2022','04')).split('\n');

    const answer = input.map(line => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
        .map(([_, ...matches]) => matches.map(str => Number(str)))
        .map(([start1, end1, start2, end2]) => {
            if ((start1 >= start2 && end1 <= end2) ||
            (start2 >= start1 && end2 <= end1)) {
                return true
            }

            return false
        })
        .reduce((acc, result) => !!result ? acc+1 : acc);

    console.log(`Number of fully contained assignments: ${answer}`);

}

main();
