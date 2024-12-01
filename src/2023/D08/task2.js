const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const [movements, nodes] = (await getInputForDay('2023','08')).split('\n\n');

    const network = nodes.split('\n')
        .map(line => line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/))
        .reduce((net, [all, node, left, right]) => Object.assign(net,  { [node]: {name: node,left, right}}), {});


    var counter = 0;
    const moves = movements.split('');
    var currentNodes = Object.values(network).filter(node => node.name.endsWith('A'))
    while (true) {
        if (currentNodes.every(n => n.name.endsWith('Z'))) {
            break
        }
        const direction = moves[counter % moves.length];
        currentNodes = currentNodes.map(n => network[direction === 'L' ? n.left : n.right]);
        counter = counter += 1;
    }
    console.log(`${counter} steps needed to reach end`)
}

main();
    