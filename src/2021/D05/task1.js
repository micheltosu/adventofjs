const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '05')).split('\n');

    const vents = input.map(s => s.split('->').map(s => s.trim().split(',').map(s => Number(s))));
    console.log(vents);

    const straightVents = vents.filter(([[aX, aY], [bX, bY]]) => aX - bX === 0 || aY - bY === 0);
    console.log(straightVents);

    const ventPoints = straightVents
            .map(([a, b]) => [a, b, [a[0] - b[0], a[1] - b[1]]])
            .flatMap(([a, b, vector]) => {
                const points = []
                dir = vector[0] === 0 ? 1 : 0;
                const min = Math.min(a[dir], b[dir]);
                const max = Math.max(a[dir], b[dir]);
                
                for (let pos = min; pos <= max; pos++) {
                    points.push((dir === 0 ? [pos, a[1]] : [a[0], pos]));
                }
                
                return points;
            });
    console.log(ventPoints);

    const ventMap = ventPoints
        .reduce((acc, point) => {acc[point.join(',')] = (acc[point.join(',')] ?? 0) + 1; return acc;}, {});
    console.log(ventMap);

    const ventMapOverlapping = Object.keys(ventMap).reduce((acc, key) => {
        if (ventMap[key] > 1) {
            acc[key] = ventMap[key];
        }

        return acc;
    }, {});
    console.log(ventMapOverlapping);
    console.log(`Overlap exist on ${Object.keys(ventMapOverlapping).length} points;`)
}

main();