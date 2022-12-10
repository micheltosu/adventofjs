const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '02')).split('\n');
    const movements = input
        .map(val => val.split(' '))
        .map(a => { return { direction: a[0], value: Number(a[1]) } });

    const submarine = { aim: 0, hPos: 0, depth: 0 };
    const movedSub = [submarine, ...movements].reduce((sub, movement) => {
        const { direction, value } = movement;
        if (direction === 'forward') {
            return { ...sub, hPos: sub.hPos + value, depth: sub.depth + (sub.aim * value) }
        } else {
            const currentAim = sub.aim;
            return { ...sub, aim: direction === 'down' ? currentAim + value : currentAim - value }
        }
    });

    console.log(`Submarine hPos * depth = ${movedSub.depth * movedSub.hPos}`);
}

main();