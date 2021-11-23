const superagent = require('superagent');
const { open } = require('fs/promises');

module.exports.getInputForDay = async (year, day) => {
    const file = await open(`${year}/D${day}/input.txt`, 'r');
    const content = await file.readFile({encoding: "utf-8"});
    file.close();
    return content;
}

module.exports.fetchInput = function (year, day) {
    const inputUrl = "https://adventofcode.com/" + year + "/day/" + day + "/input";
    const authUrl = "https://adventofcode.com/auth/github";

    superagent
        .get(authUrl)
        .then(console.log);
}