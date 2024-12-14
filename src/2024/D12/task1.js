const { getInputForDay } = require('../../util/InputFetcher');

class RegionNode {


    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.neighbours = { UP: null, DOWN: null, LEFT: null, RIGHT: null }
    }

    addNeighbours(nodes, checked = []) {
        const added = [this];
        if (this.neighbours.UP === null) {
            const node = nodes[coordToKey(this.x, this.y - 1)];
            if (node?.value === this.value) {
                this.neighbours.UP = node;
                if (!(checked.includes(node) || added.includes(node)))
                    added.push(...node.addNeighbours(nodes, [...added, ...checked]))
            }
        }
        if (this.neighbours.RIGHT === null) {
            const node = nodes[coordToKey(this.x + 1, this.y)];
            if (node?.value === this.value) {
                this.neighbours.RIGHT = node;
                if (!(checked.includes(node) || added.includes(node)))
                    added.push(...node.addNeighbours(nodes, [...added, ...checked]))
            }
        }
        if (this.neighbours.DOWN === null) {
            const node = nodes[coordToKey(this.x, this.y + 1)];
            if (node?.value === this.value) {
                this.neighbours.DOWN = node;
                if (!(checked.includes(node) || added.includes(node)))
                    added.push(...node.addNeighbours(nodes, [...added, ...checked]))
            }
        }
        if (this.neighbours.LEFT === null) {
            const node = nodes[coordToKey(this.x - 1, this.y)];
            if (node?.value === this.value) {
                this.neighbours.LEFT = node;
                if (!(checked.includes(node) || added.includes(node)))
                    added.push(...node.addNeighbours(nodes, [...added, ...checked]))
            }
        }

        return added
    }

}

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = await (await getInputForDay('2024', '12', path)).split('\n').map(line => Array.from(line));

    const nodes = {};
    const leftToScan = [];

    input.forEach((line, y) => {
        line.forEach((char, x) => {
            leftToScan.push({ x, y });
            nodes[coordToKey(x, y)] = new RegionNode(x, y, char);
        })
    })

    var next = leftToScan.shift()
    while (next) {
        const currNode = nodes[coordToKey(next.x, next.y)];
        const added = currNode.addNeighbours(nodes);
        for (const { x: xx, y: yy } of added) {
            const removeNode = leftToScan.findIndex(({ x, y }) => xx === x && yy === y)
            leftToScan.splice(removeNode, 1)
        }
        next = leftToScan.shift()
    }

} // Härnäst, lägg till en nod från varje region till en map. 
// Skriv räkna ihop funktionen.
// Räkna ihop för varje region.

function coordToKey(x, y) {
    return `${x},${y}`;
}

main();
