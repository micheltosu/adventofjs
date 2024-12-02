import { getInputForDay } from '../../util/InputFetcher';

async function main() {
    const input = (await getInputForDay('2024', '02')).split('\n')
        .map(line => line.split(' ').map(Number))
    console.log(input)

    var count = 0;
    for (const line of input) {
        if (isSafe(line))
            count += 1;
    }
    console.log(count)
}

function isSafe(report: number[]): boolean {
    const [first, ...rest] = report;
    const isIncreasing = first < rest[0];

    var previous = first;
    for (const report of rest) {
        const diff = report - previous;
        if (isIncreasing && !(diff > 0 && diff < 4)) {
            return false;
        } else if (!isIncreasing && !(diff < 0 && diff > -4)) {
            return false;
        }
        previous = report;
    }
    return true;
}

main();
