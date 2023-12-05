import { open } from 'fs/promises';

export const getInputForDay = async (year, day, fileName) => {
    const file = await open(`src/${year}/D${day}/${fileName ?? 'input.txt'}`, 'r');
    const content = await file.readFile({encoding: "utf-8"});
    file.close();
    return content;
}