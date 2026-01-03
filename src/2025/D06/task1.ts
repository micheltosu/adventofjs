import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "06", path))
        .split("\n")

        .map((line) => line.trim().replace(/\s+/g, " ").split(" "));
    const operators = input.pop();

    const results = [];
    for (let i = 0; i < input.at(0).length; i++) {
        const operands = [];
        for (let j = 0; j < input.length; j++)
            operands.push(Number(input.at(j).at(i)));

        switch (operators.at(i)) {
            case "+":
                results.push(operands.reduce((acc, x) => acc + x));
                break;
            case "-":
                results.push(operands.reduce((acc, x) => acc - x));
                break;
            case "*":
                results.push(operands.reduce((acc, x) => acc * x, 1));
                break;
        }
    }

    console.log(results.reduce((acc, x) => acc + x));
}

main();
