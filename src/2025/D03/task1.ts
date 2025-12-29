import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const banks = (await getInputForDay("2025", "03", path))
        .split("\n")
        .map((row) => Array.from(row).map((char) => Number(char)));

    const result = banks
        .map(findHighestJoltageBatteryCombination)
        .reduce((acc, x) => acc + x);

    console.log(banks);
    console.log(result);
}

main();
function findHighestJoltageBatteryCombination(batteries: number[]): number {
    let highestIndex = 0;

    for (let idx = 0; idx < batteries.length; idx += 1) {
        if (
            batteries[idx] > batteries[highestIndex] &&
            idx + 1 !== batteries.length
        )
            highestIndex = idx;
    }

    let secondHighest = highestIndex + 1;

    for (let idx = highestIndex + 1; idx < batteries.length; idx += 1) {
        if (batteries[idx] > batteries[secondHighest]) secondHighest = idx;
    }

    return Number(`${batteries[highestIndex]}${batteries[secondHighest]}`);
}
