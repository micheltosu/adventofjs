const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021','17')).split(': ')[1].split(', ').map(a => a.split('='));

    const [[x1, x2], [y1, y2]] = input.map(x => x[1].split('..').map(x => Number(x)));
    const p1 = [x1, y1];
    const p2 = [x2, y2];



    console.log(p1);
    console.log(p2);


    let highest = 0;
    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {

            let shot = fire(x, y, p1, p2);
            if (shot) {
                highest = Math.max(shot, highest);
            }
    
        }
    }
    console.log(highest);
    // console.log(hits.sort((a, b) => b[0] - a[0]));

}

function fire(x, y, p1, p2) {
    let highestY = 0;
    let velocity = x;
    let height = y;

    let xPos = 0;
    let yPos = 0;
    while(xPos <= p2[0] && yPos >= p1[1] ) {
        xPos += velocity;
        yPos += height;
        highestY = Math.max(highestY, yPos);        

        if (xPos >= p1[0] && xPos <= p2[0] &&
            yPos >= p1[1] && yPos <= p2[1]) {
                return highestY;
        }

        if (velocity !== 0) {
            velocity -= velocity >= 0 ? 1 : -1;
        }
        height -= 1; 
        
    }

    return null;

}

main();
    