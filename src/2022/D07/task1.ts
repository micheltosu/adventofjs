import { getInputForDay } from "../../util/InputFetcher";

type Node = {
    name: string;
    size: number;
    children: Node[];
    parentNode?: Node;
}

export class FileTreeParser {
    currentNode: Node;
    rootNode: Node;

    constructor() {
        this.rootNode = {
            name: '/',
            size: 0,
            children: [],
        };

        this.currentNode = this.rootNode;
    }

    parse(input: string[]) {
        for (const line of input) {
            const tokens = line.split(" ");
            if (tokens[0] === '$') {
                this.interpretCommand(tokens.slice(1));
            } else {
                this.readNodeInfo(tokens)
            }
        }
    }

    readNodeInfo(nodeInfo: string[]) {
        console.log(`node: ${nodeInfo}`);
        const node = this.currentNode.children.find(n => nodeInfo[1] === n.name)

        if (!node) {
            console.log(`created new node ${nodeInfo[1]}`);
            const newNode = {
                name: nodeInfo[1],
                size: nodeInfo[0] === 'dir' ? 0 : Number(nodeInfo[0]),
                isDir: nodeInfo[0] === 'dir',
                children: [],
                parentNode: this.currentNode,
            };

            this.currentNode.children.push(newNode);
            this.updateSize(newNode.parentNode);
        }
    }

    interpretCommand([command, arg]: string[]) {
        if (command === 'cd') {
            console.log(`changedir: ${arg}`)
            if (arg === '..') {
                if (this.currentNode.parentNode) {
                    this.currentNode = this.currentNode.parentNode;
                }
            } else if (arg === '/') {
                this.currentNode = this.rootNode;
            } else { // Change dir to subfolder
                const node = this.currentNode.children.find(n => n.name === arg);
                if (!node) {
                    throw `No node with name ${arg} found in ${this.currentNode.name}`
                }
                console.log(`Current node is: ${this.currentNode.name}`)
                this.currentNode = node;
            }
        }
    }

    updateSize(node: Node) {
        node.size = node.children.reduce((acc, c) => acc + c.size, 0);
        if (node.parentNode) {
            this.updateSize(node.parentNode)
        }
    }

    printTree() {
        this.printNode(this.rootNode);
    }

    printNode(node: Node, level: number = 0) {
        console.log(`${'-'.repeat(level)} ${node.name} ${node.size}`);
        node.children.forEach(c => this.printNode(c, level + 1))
    }

    depthFirstWalk<T>(node: Node, op: (Node) => T): T[] {
        const res = op(node);
        const childResults = node.children.flatMap(child => this.depthFirstWalk(child, op));

        return [res, ...childResults];
    }
}

async function main() {
    const input = (await getInputForDay("2022", "07")).split("\n");

    const parser = new FileTreeParser();
    parser.parse(input);
    parser.printTree()

    const sumOfSmallDirs = parser
        .depthFirstWalk(parser.rootNode, node => {
            if (node.isDir && node.size <= 100000) {
                return [node.name, node.size];
            } else {
                return [];
            }
        })
        .reduce((acc, res) => res.length > 0 ? acc + res[1] : acc, 0);

    console.log(`Sum of small dirs: ${sumOfSmallDirs}`)
}

main();
