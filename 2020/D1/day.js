const { getInputForDay } = require("../../util/InputFetcher");
const { solve } = require("./task1");

(async () => {
    const input = await getInputForDay(2020, 1);
    const solution = solve(input);
    console.log(`Solution for task one on day 1 is: ${solution.first * solution.second}`);

})();

