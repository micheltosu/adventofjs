const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','17')).split(': ')[1].split(', ').map(a => a.split('='));
    // const input = await ('target: x=20..30, y=-10..-5').split(': ')[1].split(', ').map(a => a.split('='));

    const [[x1, x2], [y1, y2]] = input.map(x => x[1].split('..').map(x => Number(x)));
    const p1 = [x1, y1];
    const p2 = [x2, y2];

    console.log(p1);
    console.log(p2);

    let highest = 0;

    let hits = new Set();
    for (let x = 0; x <= p2[0]; x++) {
        for (let y = p1[1]; y < 1000; y++) {

            let shot = fire(x, y, p1, p2);
            if (shot[0]) {
                hits.add([x,y].join(','));
                highest = Math.max(highest, shot[1]);
            }
    
        }
    }

    console.log(hits.size);
    console.log("Highest: " + highest);

}

function fire(x, y, p1, p2) {
    let highestY = 0;
    let xVelocity = x;
    let yVelocity = y;

    let xPos = 0;
    let yPos = 0;
    while(xPos <= p2[0] && yPos >= p1[1] ) {
        xPos += xVelocity;
        yPos += yVelocity;
        highestY = Math.max(highestY, yPos);        

        if (xPos >= p1[0] && xPos <= p2[0] &&
            yPos >= p1[1] && yPos <= p2[1]) {
                return [true, highestY];
        }

        if (xVelocity !== 0) {
            xVelocity -= xVelocity >= 0 ? 1 : -1;
        }
        yVelocity -= 1;         
    }

    return [false, 0];

}

main();
    