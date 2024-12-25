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

    regionPerimeter(checked) {
        let perimeter = 0;
        let updatedChecked = checked ? checked.add(this) : new Set([this]);
        for (const direction in this.neighbours) {
            if (!this.neighbours[direction]) {
                perimeter += 1;
                continue;
            }
            if (updatedChecked.has(this.neighbours[direction]))
                continue;

            perimeter += this.neighbours[direction].regionPerimeter(updatedChecked)
        }

        return perimeter;
    }

    regionArea(checked) {
        let area = 1;
        let updatedChecked = checked ? checked.add(this) : new Set([this]);
        for (const direction in this.neighbours) {
            if (!this.neighbours[direction])
                continue;
            if (updatedChecked.has(this.neighbours[direction]))
                continue;

            area += this.neighbours[direction].regionArea(updatedChecked)

        }

        return area;
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
    const regions = {}
    while (next) {
        const key = coordToKey(next.x, next.y)
        const currNode = nodes[key];
        regions[currNode.value] = [...(regions[currNode.value] ?? []), currNode]
        const added = currNode.addNeighbours(nodes);
        for (const { x: xx, y: yy } of added) {
            const removeNode = leftToScan.findIndex(({ x, y }) => xx === x && yy === y)
            if (removeNode >= 0) {
                leftToScan.splice(removeNode, 1)

            }
        }
        next = leftToScan.shift()
    }

    let cost = 0;
    for (const node of Object.values(regions).flat()) {
        const area = node.regionArea();
        const perimeter = node.regionPerimeter();
        console.log(node.x, node.y, node.value, area, perimeter, area * perimeter);
        cost += (area * perimeter);
    }

    console.log("cost ", cost)

}

function coordToKey(x, y) {
    return `${x},${y}`;
}

main();
