import superagent = require('superagent');
import { open } from 'fs/promises';

export const getInputForDay = async (year, day) => {
    const file = await open(`src/${year}/D${day}/input.txt`, 'r');
    const content = await file.readFile({encoding: "utf-8"});
    file.close();
    return content;
}

export const fetchInput = function (year, day) {
    const inputUrl = "https://adventofcode.com/" + year + "/day/" + day + "/input";
    const authUrl = "https://adventofcode.com/auth/github";

    superagent
        .get(authUrl)
        .then(console.log);
}