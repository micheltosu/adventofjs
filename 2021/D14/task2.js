const {getInputForDay} = require('../../util/InputFetcher');
const fs = require('fs/promises');

async function main() {
    const path = '2021/D14/polymers';
    let [polymer, rules] = (await getInputForDay('2021','14')).split('\n\n');

    rules = rules.split('\n').map(r => r.split(' -> ')).reduce((acc, rule) => acc.set(...rule), new Map());
    console.log(rules);

    await fs.writeFile(path + 'in', polymer, {flag: 'w+', encoding: 'utf-8'});

    // Should try to do thiw with streams
    for (const i of Array(40)) {
        // const infile = await fs.open(path + 'in', 'w+');
        const outfile = await fs.open(path + 'out', 'w+');
        let polycount = 0;
        let totalPolyCount = 0;
        const polyfile = await fs.open(path + 'in', 'r');
        let newPolymer = [];
        let readPos = 0;
        let buffer = Buffer.alloc(1);
        let last = null;

        while(await (await polyfile.read(buffer, 0, 1, readPos)).bytesRead != 0) {
            readPos += 1;
            
            const current = buffer.toString();
            const pair = [last, current].join('')
            polycount += 1;
            if (polycount > 2000) {
                await outfile.appendFile(newPolymer.join(''), 'utf-8');
                newPolymer = [];
                totalPolyCount += polycount;
                polycount = 0;
            }

            if (rules.has(pair)) {
                newPolymer.push(rules.get(pair));
            }
            newPolymer.push(current);
            last = current;
        }
        
        totalPolyCount += polycount;
        console.log(`Polycount: ${totalPolyCount}`);
        await outfile.appendFile(newPolymer.join(''), 'utf-8');
        await outfile.close();
        await polyfile.close();
        await fs.cp(path + 'out', path + 'in', {force: true})
    }
    console.log(polymer.length + " loop done");

    polymer = await fs.readFile(path + 'in', {encoding: 'utf-8'});
    const occurances = polymer.split('').reduce((map, poly) => { 
        map.has(poly) ? map.set(poly, map.get(poly) + 1) : map.set(poly, 1); 
        return map;
    }, new Map());

    let max = 0, min = Number.MAX_SAFE_INTEGER;
    for (let entry of occurances.entries()) {
        max = Math.max(max, entry[1]);
        min = Math.min(min, entry[1]);
    }
    console.log(`Diff is ${max-min}`);

}

main();
    