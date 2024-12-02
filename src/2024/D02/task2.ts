import { getInputForDay } from '../../util/InputFetcher';

async function main() {
    const input = (await getInputForDay('2024', '02')).split('\n')
        .map(line => line.split(' ').map(Number))
    console.log(input)

    var count = 0;
    for (const line of input) {
        if (isSafe(line) || isSafe(line.slice(1), false))
            count += 1;
    }
    console.log(count)
}

function isSafe(report: number[], safety: boolean = true): boolean {
    var problemDammpener = safety;

    const [first, ...rest] = report;
    const isIncreasing = first < rest[0];

    var previous = first;
    for (const report of rest) {
        const diff = Math.abs(report - previous);
        const reportDecreasing = previous < report;
        if (isIncreasing !== reportDecreasing || !(diff > 0 && diff < 4)) {
            if (problemDammpener) {
                problemDammpener = false;
                continue;
            }
            return false;

        }
        previous = report;
    }
    return true;


}

// har gissat på 704, 762, 798, 708

main();
