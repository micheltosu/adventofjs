const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '05')).split('\n');
    const vents = input.map(s => s.split('->').map(s => s.trim().split(',').map(s => Number(s))));

    const ventPoints = vents.flatMap(([[aX, aY], [bX, bY]]) => {
        let points = [];
        const xDiff= bX - aX;
        const yDiff = bY - aY;

        let xPos = aX, yPos = aY;
        for (let i = 0 ; i <= Math.max(Math.abs(xDiff), Math.abs(yDiff)); i++) {
            points.push([xPos,yPos]);

            xPos = xPos != aX + xDiff ? xPos += (xDiff/Math.abs(xDiff)) : xPos;
            yPos = yPos != aY + yDiff ? yPos += (yDiff/Math.abs(yDiff)) : yPos;
        }
        
        return points;
    });


    const maxX = ventPoints.reduce((acc, val) => acc > val[0] ? acc : val[0], 0);
    const maxY = ventPoints.reduce((acc, val) => acc > val[1] ? acc : val[1], 0);
    
    let map = Array(maxY).fill([]);
    for (let row = 0; row < map.length; row++) {
        map[row] = Array(maxX).fill(0);
    }

    for(const [x,y] of ventPoints) {
        map[y-1][x-1] = map[y-1][x-1] + 1;
    }

    const overlapCount = map.flat(1)
       .reduce((acc, count) => count > 1 ? acc + 1 : acc, 0);

    console.log(`Overlap exist on ${overlapCount} points;`)

}

main();