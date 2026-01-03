import { getInputForDay } from "../../util/InputFetcher";

async function main() {
    const path = process.argv.at(-1) === "test" ? "test.txt" : "input.txt";
    const input = (await getInputForDay("2025", "04", path))
        .split("\n")
        .map((line) => Array.from(line));

    let accessiblePaperRolls = 0;
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
                accessiblePaperRolls += 1;
                console.log(`position ${colIdx},${rowIdx} is accessible`);
            }
        });
    });

    console.log("Number or accessible paper rolls: " + accessiblePaperRolls);
    //1521 too high
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
