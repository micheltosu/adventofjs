const fetcher = require('../advent-of-code-fetcher');

(async () => {
    const [year, day] = process.argv.slice(2);
    if (!year || !day) {
        console.log(`Please call this method with arguments: year day`);
        process.exit(1);
    }

    const paddedDay = day.padStart(2, '0');
    const dayPath = `${year}/D${paddedDay}`;
    console.log(`Initializing ${year} - Day ${paddedDay}`);
    fetcher.saveInputFile(await fetcher.fetchInput(year, paddedDay), dayPath);

    
})()