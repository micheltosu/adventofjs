import { readFileSync } from "fs";

async function main() {
    const file = readFileSync(`src/2023/D02/input.txt`, { encoding: 'utf-8', flag: 'r' });
    const games = file
        .split('\n')
        .map(l => {
            const game = l.split(':')
            const rounds = game[1].split(';')
                .map(r => r.split(','))
                .map(hands =>
                    hands.map(h => {
                        const [num, color] = h.trim().split(' ')
                        return { [color]: parseInt(num) };
                    })
                        .reduce((round, dice) => ({ ...round, ...dice }), {})
                );



            return {
                game: parseInt(game[0].split(' ')[1]),
                rounds
            }
        });

    console.log(games)


    const validGames = games
        .map(game => {
            const validatedRounds = game.rounds.map(h => ({ ...h, isValid: isValidHand(h) }))
            const invalidRounds = validatedRounds.filter(r => !r.isValid)

            game.isValid = !invalidRounds.length
            return game
        })
        .filter(g => g.isValid)

    console.log(validGames)
    const sumOfValidGames = validGames.reduce((acc, g) => acc + g.game, 0);
    console.log(sumOfValidGames)
    // console.log(`Sum of calculations ${batchSums}`);
}

main();

function isValidHand(hand) {
    const maxOrbs = {
        red: 12,
        green: 13,
        blue: 14,
    }

    for (const color in hand) {
        if (hand[color] > maxOrbs[color]) {
            return false
        }
    }

    return true;
}