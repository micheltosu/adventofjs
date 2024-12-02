import { getInputForDay } from '../../util/InputFetcher';

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('2024', '02', path)).split('\n')
        .map(line => line.split(' ').map(Number))
    console.log(input)

    var count = 0;
    for (const line of input) {
        if (isSafe(line) || withoutOne(line))
            count += 1;
    }
    console.log(count)
}

function withoutOne(report: number[]): boolean {
    const results = report.map((value, idx) => isSafe([...report.slice(0, idx), ...report.slice(idx + 1)]));

    return results.filter(r => r).length >= 1;
}

function isSafe(report: number[], safety: boolean = true): boolean {

    const [first, ...rest] = report;
    const isIncreasing = first < rest[0];

    var previous = first;
    for (const report of rest) {
        const diff = Math.abs(report - previous);
        const reportDecreasing = previous < report;
        if (isIncreasing !== reportDecreasing || !(diff > 0 && diff < 4)) {
            return false;

        }
        previous = report;
    }
    return true;


}

// har gissat på 698, 704, 762, 798, 708

main();
