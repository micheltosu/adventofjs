const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const [towers, moves] = (await getInputForDay('2022','05')).split('\n\n').map(s => s.split('\n'));

    const towerDeclaration = towers.pop(); 

    const towerPositions = towerDeclaration
        .trim()
        .replace(/ +/g, ',')
        .split(',')
        .map(num => towerDeclaration.indexOf(num));

    // console.log(towerPositions);

    const stacks = towerPositions
        .map(pos => []);

    for (const level of towers.reverse()) {
        for(const tower in towerPositions) {
            const towerChar = level.charAt(towerPositions[tower]);
            if ( towerChar !== ' ') {
                stacks[tower].push(towerChar);
            }
        }
    }
    console.log(stacks);

    for (const move of moves) {
        const [_, num, from, to] = move.match(/move (\d+) from (\d+) to (\d+)/);

        stacks[to - 1].push(...(stacks[from - 1].splice(-num).reverse()));
    }   

    console.log(stacks.flatMap(s => s.slice(-1)).join(''));

}

main();
    