import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "05", path)).split("\n\n");

    const freshIngredients = input
        .at(0)
        .split("\n")
        .map((line) => line.split("-").map((x) => Number(x)));

    const uniqueFreshIngredientRanges = [];
    for (let [start, end] of freshIngredients) {
        const conflicting = uniqueFreshIngredientRanges.filter(
            ([uStart, uEnd]) =>
                (start >= uStart && start <= uEnd) ||
                (end >= uStart && end <= uEnd) ||
                (start <= uStart && end >= uEnd)
        );

        for (const [uniqueStart, uniqueEnd] of conflicting) {
            if (uniqueStart >= start && uniqueEnd <= end) {
                // wrapping an existing
                freshIngredients.push([start, uniqueStart - 1]);
                freshIngredients.push([uniqueEnd + 1, end]);
                start = 0;
                end = 0;
                break;
            }
            if (uniqueStart <= start) {
                if (end <= uniqueEnd) {
                    //completely within
                    start = 0;
                    end = 0;
                    break;
                }

                start = uniqueEnd + 1;
            }

            if (uniqueEnd >= end) {
                end = uniqueStart - 1;
            }
        }

        if (start === 0 && end === 0) continue;

        uniqueFreshIngredientRanges.push([start, end]);
    }

    console.log(
        "unique ingredients in fresh list",
        uniqueFreshIngredientRanges
    );
    console.log(
        "number of unique fresh ingredient ids",
        uniqueFreshIngredientRanges
            .map(([start, end]) => end - start + 1)
            .reduce((acc, x) => acc + x)
    );
}

main();
