import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "05", path)).split("\n\n");

    const freshIngredients = input
        .at(0)
        .split("\n")
        .map((line) => line.split("-").map((x) => Number(x)));

    console.log("ingredients in fresh list", freshIngredients);

    const freshInventory = input
        .at(1)
        .split("\n")
        .map((x) => Number(x))
        .filter((x) =>
            freshIngredients.find(([start, end]) => x >= start && x <= end)
        );
    console.log(freshInventory, "length :" + freshInventory.length);
}

main();
