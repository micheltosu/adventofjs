const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    let [polymer, rules] = (await getInputForDay('2021','14')).split('\n\n');

    rules = rules.split('\n').map(r => r.split(' -> ')).reduce((acc, rule) => acc.set(...rule), new Map());
    console.log(rules);

    polymer = polymer.split('');
    let polySet = new Map();
    for(let i = 1; i < polymer.length; i++) {
        let pair = [polymer[i-1], polymer[i]].join('');
        if (polySet.has(pair)) {
            polySet.set(pair, polySet.get(pair) + 1 );
        } else {
            polySet.set(pair, 1);

        }
    }

    for (const i of Array(40)) {
        let updates = [];
        for (let [pair, value] of polySet.entries()) {
            if (rules.has(pair)) {
                const [a,b] = pair.split('');
                const middle = rules.get(pair);
                updates.push([[a, middle].join(''), Math.max(0, value)]);
                updates.push([[middle, b].join(''), Math.max(0, value)]);
                updates.push([pair, 0]);
            } 
        }

        updates = updates.reduce((acc, [pair, val]) => {acc.set(pair, (acc.get(pair) ?? 0) + val); return acc;}, new Map());
        for (let update of updates) {
            polySet.set(...update);
        }
    }

    results = [];
    for (const polyPair of polySet.entries()) {
        const [a, b] = polyPair[0].split('');
        results.push([a, polyPair[1]]);
        results.push([b, polyPair[1]]);
    }

    let resultMap = results.reduce((acc, [key, val]) => { acc.set(key, (acc.get(key) ?? 0) + val); return acc; }, new Map());
    
    console.log(resultMap);
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for (const polymer of resultMap.entries()) {
        max = Math.max(max, polymer[1]);
        min = Math.min(min, polymer[1]);
    }
    console.log(`Diff is ${(max-min) /2}`);


    // for (const i of Array(10)) {
    //     console.log(polymer);

    //     let newPolymer = [polymer[0]];
    //     for(let pos = 1; pos < polymer.length; pos++) {
    //         const last = polymer[pos - 1];
    //         const current = polymer[pos];
    //         const pair = [last, current].join('')
    //         if (rules.has(pair)) {
    //             newPolymer.push(rules.get(pair));
    //         }
    //         newPolymer.push(current);
    //     }
    //     polymer = newPolymer.join('');
    // }

    // const occurances = polymer.split('').reduce((map, poly) => { 
    //     map.has(poly) ? map.set(poly, map.get(poly) + 1) : map.set(poly, 1); 
    //     return map;
    // }, new Map());

    // let max = 0, min = Number.MAX_SAFE_INTEGER;
    // for (let entry of occurances.entries()) {
    //     max = Math.max(max, entry[1]);
    //     min = Math.min(min, entry[1]);
    // }
    // console.log(polymer);
    // console.log(`Diff is ${max-min}`);

}

main();
    