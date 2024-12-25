const fs = require('fs/promises');
const fetcher = require('../../advent-of-code-fetcher');

(async () => {
    const [year, day] = process.argv.slice(2);
    if (!year || !day) {
        console.log(`Please call this method with arguments: year day`);
        process.exit(1);
    }

    const paddedDay = day.padStart(2, '0');
    const dayPath = `src/${year}/D${paddedDay}`;
    console.log(`Initializing ${year} - Day ${paddedDay}`);
    await fetcher.saveInputFile(await fetcher.fetchInput(year, paddedDay), dayPath);

    await fs.writeFile(`${dayPath}/task1.js`, `const {getInputForDay} = require('../../util/InputFetcher');

async function main() {
    const path = process.argv.at(-1) === "test" ? 'test.txt' : "input.txt";
    const input = (await getInputForDay('${year}','${paddedDay}', path)).split('\\n').map(val => Number(val));

}

main();
    `, { flag: 'wx+' });
})()