import { getInputForDay } from "../../util/InputFetcher";


async function main() {
    const input = (await getInputForDay('2023', '03')).split('\n').map(val => (val + '.').split('')); //append one more pos to be able to step past numbers at the end of lines
    let partsSum = 0
    for (const [y, row] of input.entries()) {
        var currentNumber = [];
        for (const [x,pos] of row.entries()) {
            const posAsNum = parseInt(pos);
            
            if (!isNaN(posAsNum)) {
                currentNumber.push(posAsNum);
            } else if (currentNumber.length !== 0) {
                const rowAbove = input[y - 1]?.slice(Math.max(x - currentNumber.length - 1, 0), x + 1) ?? [];
                const rowBelow = input[y + 1]?.slice(Math.max(x - currentNumber.length - 1, 0), x + 1) ?? [];
                const charBefore = [input[y][x - currentNumber.length - 1] ?? '.'];
                const charAfter = [input[y][x] ?? '.'];
                
                const symbols = [].concat(rowAbove, rowBelow, charBefore, charAfter).filter(c => isNaN(parseInt(c)) && c !== '.')
                if (symbols.length > 0 ) {
                    partsSum = partsSum + parseInt(currentNumber.join(''))
                }
                currentNumber = []
            }
        }
    }

    if (partsSum !== 539637) throw "invalid answer"
    console.log(`Sum of all parts are ${partsSum}`);
}

main();
