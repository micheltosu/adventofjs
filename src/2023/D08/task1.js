const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const [movements, nodes] = (await getInputForDay('2023','08')).split('\n\n');

    const network = nodes.split('\n')
        .map(line => line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/))
        .reduce((net, [all, node, left, right]) => Object.assign(net,  { [node]: {name: node,left, right}}), {});

    var counter = 0;
    const moves = movements.split('');
    var currentNode = network['AAA']
    while (true) {
        if (currentNode.name === 'ZZZ') {
            break
        }
        const nextnode = moves[counter % moves.length] === 'L' ? currentNode.left : currentNode.right;
        currentNode = network[nextnode];
        counter = counter += 1;
    }
    console.log(`${counter} steps needed to reach end`)
}

main();
    