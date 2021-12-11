const {getInputForDay} = require('../../util/InputFetcher');

function findOctopusReadyToFlash(grid) {
    let flashing = []
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] > 9) {
                flashing.push([x,y]);
            }
        }
    }

    return flashing;
}

async function main() {
    let input = await (await getInputForDay('2021','11')).split('\n').map(x => x.split('').map(val => Number(val)));
    let flashCount = 0;
    for (const step of new Array(100)) {
        input = input.map(y => y.map(x => x + 1));
        let hasFlashed = new Set();

        console.log(input.map(y => y.join(',')));
        while (findOctopusReadyToFlash(input).length > 0) {
            let flashes = findOctopusReadyToFlash(input);
            flashes = flashes.filter(point => !hasFlashed.has(point.join(',')));
            if (flashes.length === 0) {
                break;
            }
    
            while (flashes.length > 0) {
                let [x,y] = flashes.shift();
                const point = [x,y].join(',');
                if(hasFlashed.has(point)) {
                    continue;
                }
    
                hasFlashed.add(point);
                flashCount += 1;
    
                if (y > 0) {
                    let yAbove = y - 1;
                    input[yAbove][x] += 1;
                    
                    if (x > 0) {
                        input[yAbove][x - 1 ] += 1;
                    }
                    
                    if (x < input[y].length - 1) {
                        input[yAbove][x + 1] += 1;
                    }
                }
                
                if (x > 0) {
                    input[y][x - 1] += 1;
                }
    
                if (x < input[y].length - 1) {
                    input[y][x + 1] += 1;
    
                }
    
                if (y < input.length - 1) {
                    input[y + 1][x] += 1;
    
                    if (x > 0) {
                        input[y + 1][x - 1] += 1;
                    }
    
                    if (x < input[y].length - 1) {
                        input[y + 1][x + 1] += 1;
                    }
                } 
            }
        };
        input = input.map(y => y.map(x => x > 9 ? 0 : x));
    }

    console.log("Flashcount was " + flashCount);

}

main();
