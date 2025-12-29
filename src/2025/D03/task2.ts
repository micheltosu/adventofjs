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
    // 146127957541505 too low
    // 146127957541641 too low
}

main();

function findHighestJoltageBatteryCombination(batteries: number[]): number {
    let batteriesUsed = batteries.slice().splice(0, 12);
    let joltage = numArrayToNumber(batteriesUsed);

    for (let idx = 12; idx < batteries.length; idx += 1) {
        for (let idx2 = 0; idx2 < batteriesUsed.length; idx2 += 1) {
            const alternativeBatteries = batteriesUsed.slice();
            alternativeBatteries.splice(idx2, 1);
            alternativeBatteries.push(batteries[idx]);
            const joltageIfNextCombinationIsUsed =
                numArrayToNumber(alternativeBatteries);

            if (joltageIfNextCombinationIsUsed > joltage) {
                batteriesUsed = alternativeBatteries;
                joltage = joltageIfNextCombinationIsUsed;
                break;
            }
        }
    }

    return joltage;
}

function numArrayToNumber(nums: number[]): number {
    return Number(nums.join(""));
}

function removeLeftmostLowestElement(nums: number[]) {
    let lowestIndex = 0;

    for (let idx = 0; idx < nums.length; idx += 1) {
        if (nums[idx] < nums[lowestIndex]) lowestIndex = idx;
    }

    const numsCopy = nums.slice();
    numsCopy.splice(lowestIndex, 1);
    return numsCopy;
}
