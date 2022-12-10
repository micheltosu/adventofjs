const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '04')).split('\n');
    const bingoInput = input.shift().split(',');
    let bingoBoards = [];

    let currentBoard;
    for (const line of input) {
        // console.log(`Input is '${line}'`);
        if (line === '') {
            (currentBoard != undefined && bingoBoards.push(currentBoard));
            currentBoard = [];
        } else {
            currentBoard.push(line.split(' ').filter(s => s !== '').map(s => Number(s)));
        }
    }

    console.log(bingoBoards);

    for (const num of bingoInput) {
        bingoBoards = bingoBoards.map(board => board.map(row => row.filter(col => col != num)));
        const winners = bingoBoards.filter(board => board.filter(row => row.length === 0).length > 0);

        
        if (winners.length != 0) {
            for (winner of winners) {
                const score = winner.reduce((prev, next) => prev + next.reduce((p,c) => p + c, 0), 0) * num;
                console.log(`Winner on number ${num} with score ${score} is: `);
                console.log(winner);
            }
            break;
        }
    }
    
}

main();