import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "04", path))
        .split("\n")
        .map((line) => Array.from(line));

    let clearedPaperRolls = 0;
    let hasFreePositions = true;
    while (hasFreePositions) {
        const positionsToClear = [];
        input.forEach((row, rowIdx, rows) => {
            row.forEach((position, colIdx, cols) => {
                if (position !== "@") return;
                const paperRollsAround = enumeratePositionsAround(
                    colIdx,
                    rowIdx,
                    rows
                )
                    .map(([x, y]) => rows[y][x])
                    .filter((elem) => elem === "@");

                if (paperRollsAround.length < 4) {
                    positionsToClear.push([colIdx, rowIdx]);
                    console.log(`position ${colIdx},${rowIdx} is accessible`);
                }
            });
        });

        if (positionsToClear.length > 0) {
            clearedPaperRolls += positionsToClear.length;
            clearRolls(positionsToClear, input);
        } else {
            hasFreePositions = false;
        }
    }

    console.log("Number or accessible paper rolls: " + clearedPaperRolls);
    //1521 too high
}

function clearRolls(positions: [x: number, y: number][], grid) {
    const positionsToClear = [];
    positions.forEach(([x, y]) => (grid[y][x] = "X"));
}

function enumeratePositionsAround(
    x: number,
    y: number,
    grid: string[][]
): [x: number, y: number][] {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const isFirstRow = y === 0;
    const isFirstCol = x === 0;
    const isLastRow = y + 1 === rowCount;
    const isLastCol = x + 1 === colCount;

    const positions = [];

    if (!isFirstRow) {
        if (!isFirstCol) positions.push([x - 1, y - 1]);
        positions.push([x, y - 1]);
        if (!isLastCol) positions.push([x + 1, y - 1]);
    }

    if (!isFirstCol) positions.push([x - 1, y]);
    // positions.push([x, y]);
    if (!isLastCol) positions.push([x + 1, y]);

    if (!isLastRow) {
        if (!isFirstCol) positions.push([x - 1, y + 1]);
        positions.push([x, y + 1]);
        if (!isLastCol) positions.push([x + 1, y + 1]);
    }

    return positions;
}

main();
