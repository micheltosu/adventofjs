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
            currentBoard.push(line.split(' ')
                .filter(s => s !== '')
                .map(s => { return { val: Number(s), marked: false } }));
        }
    }

    // console.log(bingoBoards);

    let winners = [];
    for (const num of bingoInput) {
        for (const board of bingoBoards) {
            for (let y = 0; y < board.length; y++) {
                for (let x = 0; x < board[y].length; x++) {
                    if (board[y][x].val == num) {
                        board[y][x].marked = true;
                    }
                }
            }
        }

        // Check for winners
        for (let boardIdx = 0; boardIdx < bingoBoards.length; boardIdx++) {
            let winner = false;
            const board = bingoBoards[boardIdx];
            for (let y = 0; y < board.length; y++) {
                if (winner) {
                    break;
                }
                let marked = 0;
                for (let x = 0; x < board[y].length; x++) {
                    if (board[y][x].marked) {
                        marked++;
                    }
                }

                winner = marked === 5 ? true : false;
            }

            for (let x = 0; x < board.length; x++) {
                if (winner) {
                    break;
                }
                let marked = 0;
                for (let y = 0; y < board.length; y++) {
                    if (board[y][x].marked) {
                        marked++;
                    }
                }

                winner = marked === 5 ? true : false;
            }
            

            if (winner) {
                winners.push([bingoBoards[boardIdx], num]);
                bingoBoards.splice(boardIdx,1);
                boardIdx--;
            }
        }


        // bingoBoards = bingoBoards.map(board => board.map(row => row.filter(col => col != num)));
        // const newWinners = bingoBoards.filter(board => board.filter(row => row.length === 0).length > 0).map(b => [b, num]);
        // bingoBoards = bingoBoards.filter(board => board.filter(row => row.length > 0).length === 5)
        // winners = [...winners, ...newWinners];
    }
    console.log(winners);
    const [lastWinner, num] = winners.pop();
    printWinner(lastWinner, num);
    
}

main();

function printWinner(winner, num) {
    const score = winner.reduce((prev, next) => prev + next.filter(num => !num.marked).reduce((p, c) => p + c.val, 0), 0) * num;
    console.log(`Winner on number ${num} with score ${score} is: `);
    console.log(winner);
}
