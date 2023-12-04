const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const input = await (await getInputForDay('2023','04')).split('\n')
        .map(val => {
            const card = val.split(':');
            const numbers = card[1].split('|');
            
            return {
                id: parseInt(card[0].split(' ').at(-1)),
                winningNums: numbers[0].trim().split(' ').map(n => parseInt(n)).filter(n => !isNaN(n)),
                cardNums: numbers[1].trim().split(' ').map(n => parseInt(n)).filter(n => !isNaN(n))
            }
        });


    const cardWithValues = input
        .map(card => {
            card.correctNumbers = card.cardNums.filter(num => card.winningNums.includes(num));
            card.value = card.correctNumbers.length === 0 ? 0 : Math.pow(2, Math.max(0, card.correctNumbers.length - 1));
            
            return card;
        })
    console.log(input)
    console.log(`Total card values ${cardWithValues.reduce((acc, card) => acc + card.value, 0)}`)
}

main();
    