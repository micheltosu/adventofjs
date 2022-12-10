const { getInputForDay } = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2021', '15')).split('\n').map(val => val.split('').map(pos => Number(pos)));

    let visitQueue = [{ point: [0, 0], risk: 0, path: [] }];
    const destination = [input.length - 1, input[0].length - 1];
    let visitedMap = new Map();

    let destNode;
    while (visitQueue.length != 0) {
        let node = visitQueue.shift();
        let pointStr = node.point.join(',');
        let [x, y] = node.point;
        let oldVisit = visitedMap.get(pointStr);

        if (!oldVisit || oldVisit.risk > node.risk) {
            visitedMap.set(pointStr, node);
            if (pointStr === destination.join('')) {
                console.log('Destination reached');
                console.log(node);
                destNode = node;
            } else {
                if (destNode && node.risk > destNode.risk) {
                    continue;
                }
                // Add neighbours
                const left = [x - 1, y];
                const right = [x + 1, y];
                const up = [x, y - 1];
                const down = [x, y + 1];
                if (posWithinMatrix(input, ...left)) {
                    const previous = visitedMap.get(left.join(','));
                    const nextRisk = node.risk + input[left[1]][left[0]];
                    if (!previous || previous.risk >= nextRisk) {
                        visitQueue.push({ point: left, risk: nextRisk, path: [...node.path, node] });
                    }
                }
                if (posWithinMatrix(input, ...right)) {
                    const previous = visitedMap.get(right.join(','));
                    const nextRisk = node.risk + input[right[1]][right[0]];
                    if (!previous || previous.risk >= nextRisk) {
                        visitQueue.push({ point: right, risk: node.risk + input[right[1]][right[0]], path: [...node.path, node] });
                    }
                }
                if (posWithinMatrix(input, ...up)) {
                    const previous = visitedMap.get(up.join(','));
                    const nextRisk = node.risk + input[up[1]][up[0]];
                    if (!previous || previous.risk >= nextRisk) {
                        visitQueue.push({ point: up, risk: node.risk + input[up[1]][up[0]], path: [...node.path, node] });
                    }
                }
                if (posWithinMatrix(input, ...down)) {
                    const previous = visitedMap.get(down.join(','));
                    const nextRisk = node.risk + input[down[1]][down[0]];
                    if (!previous || previous.risk >= nextRisk) {
                        visitQueue.push({ point: down, risk: node.risk + input[down[1]][down[0]], path: [...node.path, node] });
                    }
                }

                visitQueue.sort((a,b) => a.risk - b.risk);
            }

        }
    }

    console.log(visitedMap.get(destination.join(',')));
}

function posWithinMatrix(input, x, y) {
    return y >= 0 && y < input.length && x >= 0 && x < input[y].length;
}

main();
