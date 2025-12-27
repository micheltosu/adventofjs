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
    if (idStr.length % 2 !== 0) return false;

    const [a, b] = [
        idStr.substring(0, idStr.length / 2),
        idStr.substring(idStr.length / 2),
    ];

    if (a === b) console.log(`${id} is invalid`);
    return a === b;
};
