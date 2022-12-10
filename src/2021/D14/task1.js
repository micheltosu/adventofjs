const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    let [polymer, rules] = (await getInputForDay('2021','14')).split('\n\n');

    rules = rules.split('\n').map(r => r.split(' -> ')).reduce((acc, rule) => acc.set(...rule), new Map());
    console.log(rules);

    for (const i of Array(10)) {
        console.log(polymer);

        let newPolymer = [polymer[0]];
        for(let pos = 1; pos < polymer.length; pos++) {
            const last = polymer[pos - 1];
            const current = polymer[pos];
            const pair = [last, current].join('')
            if (rules.has(pair)) {
                newPolymer.push(rules.get(pair));
            }
            newPolymer.push(current);
        }
        polymer = newPolymer.join('');
    }

    const occurances = polymer.split('').reduce((map, poly) => { 
        map.has(poly) ? map.set(poly, map.get(poly) + 1) : map.set(poly, 1); 
        return map;
    }, new Map());

    let max = 0, min = Number.MAX_SAFE_INTEGER;
    for (let entry of occurances.entries()) {
        max = Math.max(max, entry[1]);
        min = Math.min(min, entry[1]);
    }
    console.log(polymer);
    console.log(`Diff is ${max-min}`);

}

main();
    