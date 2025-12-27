import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "02", path))
        .split(",")
        .map((sequence) => sequence.split("-"))
        .map((x) => x.map((y) => Number(y)));

    console.log(input);

    const invalid = input
        .flatMap(findInvalidIdsInRange)
        .reduce((acc, x) => acc + x);
    console.log("summarized invalid ids: " + invalid);
}

main();

const findInvalidIdsInRange = ([a, b]: [number, number]) => {
    const invalidIds = [];
    console.log(`Checking ${[a, b]}`);
    for (let i = a; i < b; i += 1) {
        // console.log(`Checking ${i}`);
        if (isIdInvalid(i)) invalidIds.unshift(i);
    }
    return invalidIds;
};

const isIdInvalid = (id: number) => {
    const idStr = id.toString();

    for (let i = 1; i <= idStr.length / 2; i += 1) {
        if (!Number.isInteger(i)) continue;
        const str = Array.from(idStr);
        const parts = new Set();
        while (str.length !== 0) {
            parts.add(str.splice(0, i).join(""));
        }

        if (parts.size === 1) {
            console.log(`The id ${id} is repeating!`);
            return true;
        }
    }

    return false;
};
