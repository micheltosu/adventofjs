const {getInputForDay} = require('../../util/InputFetcher');
const fs = require('fs/promises');

async function main() {
    const input =  (await getInputForDay('2021','13')).split('\n\n');
    let dots = input[0].split('\n').map(line => line.split(',').map(x => Number(x)));
    const xMax = dots.reduce((acc, [x, y]) => x > acc ? x : acc, 0);
    const yMax = dots.reduce((acc, [x, y]) => y > acc ? y : acc, 0);
    let grid = new Array(yMax +1);
    grid.fill(0);
    grid = grid.map(y => new Array(xMax+1).fill('c'));
    dots.sort(([x1, y1], [x2, y2]) => y1-y2);

    const folds = input[1].split('\n').map(line => line.split(' ')).map(line => line[2].split('='));

    function fold(foldAxis, foldPos) {
        let xMap = foldAxis === 'x' ? foldPos : xMax;
        let yMap = foldAxis === 'y' ? foldPos : yMax;
        dots = dots.map(([x,y]) => [(x / xMap > 1 ? xMap - (x % xMap) : x), (y / yMap > 1 ? yMap - (y % yMap) : y)]);
        // for (let y = 0; y < yMax; y++) {
        //     for (let x = 0; x < xMax; x++) {
        //         if (grid[y][x] === '#') {
        //             const xVal = x / xMap > 1 ? (xMap + 1) - (x % xMap) : x;
        //             const yVal = y / yMap > 1 ? (yMap + 1) - (y % yMap) : y;
        
        //             grid[yVal][xVal] = '#';
        //         }
        //     }
        // }

        // if (foldAxis === 'x') {
        //     return grid.map(y => y.slice(0, xMap));
        // } else {
        //     return grid.slice(yMap);
        // }
    }

    function print(points) {
        const xMax = points.reduce((acc, [x, y]) => x > acc ? x : acc, 0);
        const yMax = points.reduce((acc, [x, y]) => y > acc ? y : acc, 0);
        let grid = new Array(yMax +1);
        grid.fill(0);
        grid = grid.map(y => new Array(xMax+1).fill('.'));
        grid = dots.reduce((gr, [x,y]) => {
            gr[y][x] = '#';
            return gr;
        }, grid);

        fs.writeFile(`./2021/D13/output.txt`, grid.map(line => line.join('')).join('\n'), { flag: 'w+' });
        return grid;
    }

    for (let [axis, pos] of folds) {
        fold(axis, Number(pos));
    }



    // console.log(grid);
    // console.log(`Number of visible dots ${grid.map(line => line.reduce((acc, x) => x === '#' ? acc +1 : acc, 0)).reduce((p, c) => p + c)}.`)
    // grid = fold('x', 655);

    // // console.log(grid);
    // console.log(`Number of visible dots ${grid.map(line => line.reduce((acc, x) => x === '#' ? acc +1 : acc, 0)).reduce((p, c) => p + c)}.`)
    console.log(`Number of visible dots ${dots.reduce((acc, point) => acc.add(point.join(',')), new Set()).size}.`)
    
    let gridAfter = print(dots);
    
    console.log(gridAfter);


}

main();
    