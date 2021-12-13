const {getInputForDay} = require('../../util/InputFetcher');
const fs = require('fs/promises');

async function main() {
    const input =  (await getInputForDay('2021','13')).split('\n\n');
    let dots = input[0].split('\n').map(line => line.split(',').map(x => Number(x)));
    const xMax = dots.reduce((acc, [x, y]) => x > acc ? x : acc, 0);
    const yMax = dots.reduce((acc, [x, y]) => y > acc ? y : acc, 0);
    let grid = new Array(yMax +1);
    grid.fill(0);
    grid = grid.map(y => new Array(xMax+1).fill('.'));
    dots.sort(([x1, y1], [x2, y2]) => y1-y2);

    const folds = input[1].split('\n').map(line => line.split(' ')).map(line => line[2].split('='));

    function fold(foldAxis, foldPos) {
        let xMap = foldAxis === 'x' ? foldPos: xMax;
        let yMap = foldAxis === 'y' ? foldPos: yMax;
        dots = dots.map(([x,y]) => {
            const x1 = x / xMap > 1 ? xMap - (x % xMap) : x;
            const y1 = y / yMap > 1 ? yMap - ((y) % yMap) : y;
            return [x1 === xMap ? 0 : x1, y1 === yMap ? 0 : y1]});

    }

    function print(points) {
        const xMax = points.reduce((acc, [x, y]) => x > acc ? x : acc, 0);
        const yMax = points.reduce((acc, [x, y]) => y > acc ? y : acc, 0);
        let grid = new Array(yMax + 1);
        grid.fill(0);
        grid = grid.map(y => new Array(xMax + 1).fill(' '));
        grid = dots.reduce((gr, [x,y]) => {
            gr[y][x] = '#';
            return gr;
        }, grid);

        return grid.map(l => l.join('')).join('\n');
    }

    for (let [axis, pos] of folds) {
        fold(axis, Number(pos));
    }


    console.log(`Number of visible dots ${dots.reduce((acc, point) => acc.add(point.join(',')), new Set()).size}.`)
    
    let gridAfter = print(dots);
    
    console.log(gridAfter);


}

main();
    