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

    const requiredNumberOfCubesPerGame = games
        .map(({ game, rounds }) => rounds.reduce((acc, hand) => ({
                green: Math.max(acc.green, hand.green ?? 0),
                blue: Math.max(acc.blue, hand.blue ?? 0),
                red: Math.max(acc.red, hand.red ?? 0),
            }), {green: 0, blue: 0, red: 0}))

    const powerOfGames = requiredNumberOfCubesPerGame.map(({ red, green, blue}) => red * green * blue)

    const sum = powerOfGames.reduce((acc, power) => acc + power, 0);
    
    if (sum !== 56322) throw "incorrect answer"
    console.log(`Power of the games ${sum}`);
}

main();