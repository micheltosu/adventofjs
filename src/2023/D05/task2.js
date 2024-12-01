const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2023','05')).split('\n\n').map(val => val);

    const seeds = input.shift().split(':')[1].trim().split(' ').map(n => parseInt(n));

    const maps = input.reduce((acc, g) => {
        const lines = g.split('\n');

        const [, source, destination] = new RegExp(/^(\w+)-to-(\w+).*/).exec(lines.shift())
        acc.push({
            source,
            destination,
            map: lines.map(l => l.split(' ').map(n => parseInt(n)))
        });

        return acc;
    }, [])

    var minLocation = Number.MAX_VALUE
    seeds
        .forEach((s, idx, arr) => {
            const start = s;
            const end = start + arr.splice(idx + 1, 1)[0];
            console.log(`testing start: ${start}, end ${end}`)
            for (var i = s; i < end; i++) {
                const result = mapSourceToDestination('seed', 'location', i, maps) 
                if (result < minLocation)
                    minLocation = result;
            }
        }, [])
    

    // if (minLocation !== 261668924) throw "This is broken"
    console.log(`Smallest location number is ${minLocation}`)
}

main();

function mapSourceToDestination(source, destination, value, maps) {
    if (source === destination) {
        return value;
    }

    var result = value;
    for (const map of maps) {
        result = translate(map, result)
    }

    return result;
}
    
function translate(map, value) {
    for (const [dest, source, range] of map.map) {
        if (value >= source && value < source+range) {
            return dest + (value - source);
        }
    }

    return value;
}

