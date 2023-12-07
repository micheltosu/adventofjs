const { getInputForDay } = require('../../util/InputFetcher');

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const handTypes = {
    '5': 7, 
    '41': 6, 
    '32': 5, 
    '311': 4, 
    '221': 3, 
    '2111': 2, 
    '11111': 1
}

async function main() {
    const hands = await (await getInputForDay('2023', '07')).split('\n').map(val => parseHand(val));

    const sorted = hands.sort((a,b) => {
        if (a.cardsWithCounts === b.cardsWithCounts) {
            return sortByHighCard(a,b);
        } else {
            return a.rank - b.rank;
        }
    })
    const winnings = sorted.map((hand, idx) => hand.bet * (idx + 1))
    console.log(`Total winnings are ${winnings.reduce((acc, x) => acc + x)}`);
}

main();

function parseHand(line) {
    const [hand, bet] = line.split(' ');
    const cards = hand.split('').reduce((map, card) => ({...map, [card]: 1 + (map[card] ?? 0)}), {})
    
    const cardCounts = Object.values(cards).sort((a,b) => b-a).join('');
    return {
        cards,
        hand,
        cardsWithCounts: cardCounts,
        rank: handTypes[cardCounts],
        bet: parseInt(bet),
    }

}

function sortByHighCard(a, b) {
    for(const i in a.hand) {
        if (a.hand[i] !== b.hand[i]) {
            return cards.indexOf(a.hand[i]) - cards.indexOf(b.hand[i]);
        }
    }

    return 0;
}