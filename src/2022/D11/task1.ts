const { getInputForDay } = require('../../util/InputFetcher');

class Monkey {
    public name: string;
    public items: number[];
    public operation: (number: number) => number;
    public test: (number: number) => boolean;
    public trueDestination: string;
    public falseDestination: string;
    public inspectCount: number;

    printMonkey() {
        console.log(`Monkey ${this.name}\nItems: ${this.items}\n`)
    }

    constructor(
        name: string,
        items: number[],
        operation: (number: number) => number,
        test: (number: number) => boolean,
        trueDestination: string,
        falseDestination: string,
    ) {
        this.name = name;
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.trueDestination = trueDestination;
        this.falseDestination = falseDestination;
        this.inspectCount = 0;
    }
}

export async function main() {
    const input: string[] = await (await getInputForDay('2022', '11')).split('\n\n');
    const theMonkees: Map<string, Monkey> = input
        .map(lines => parseMonkey(lines.split('\n')))
        .reduce((dict, monkey) => dict.set(monkey.name.toLowerCase(), monkey), new Map());

    console.log(theMonkees);

    function doRound() {
        for (const monkey of theMonkees.values()) {
            if (monkey.items.length === 0) {
                continue;
            }

            monkey.printMonkey();

            monkey.inspectCount = monkey.inspectCount + monkey.items.length;
            monkey.items = monkey.items
                .map(item => monkey.operation(item))
                .map(item => Math.floor(item / 3));

            while (monkey.items.length > 0) {
                const item = monkey.items.shift();
                const destination = monkey.test(item) ? monkey.trueDestination : monkey.falseDestination;
                theMonkees.get(destination).items.push(item);
            }
        }
    }

    for (const i of Array(20)) {
        doRound();
    }


    const inspectCounts = Array.from(theMonkees.values())
        .map(monkey => monkey.inspectCount)
        .sort((a,b) => a - b);
    console.log(inspectCounts);
    console.log(`Level of monkey business ${inspectCounts.pop() * inspectCounts.pop()}`);

}


function parseMonkey(input: string[]): Monkey {
    if (input.length !== 6) {
        throw `Invalid input, length was ${input.length}`;
    }

    const [name] = input.shift().match(/Monkey \d+/);
    const items = input.shift().split(':')[1].split(',').map(s => Number(s));
    const [_, op, val] = input.shift().split(':')[1].match(/new = old (.) (\d+|old)/);
    const operation = createOperation(op, val);
    const [__, testDenominator] = input.shift().match(/divisible by (\d+)/);
    const test = (num: number) => {
        return num % Number(testDenominator) === 0
    };
    const [trueMonkey] = input.shift().trim().match(/monkey \d+/);
    const [falseMonkey] = input.shift().trim().match(/monkey \d+/);

    return new Monkey(name, items, operation, test, trueMonkey, falseMonkey);
}

function createOperation(op: string, val: string) {
    const resolveNum = (old: number, identifier: string): number => {
        if (identifier === 'old') {
            return old;
        } else {
            return Number(identifier);
        }
    }
    console.log(`create operation ${op} ${val}`)
    switch (op) {
        case '+':
            return (num: number) => num + resolveNum(num, val);
        case '-':
            return (num: number) => num - resolveNum(num, val);
        case '*':
            return (num: number) => num * resolveNum(num, val);
        case '/':
            return (num: number) => num / resolveNum(num, val);
        default:
            throw 'Unknown operation';
    }
}

main();
