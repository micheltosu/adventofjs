const { assert } = require("chai");
const { solve } = require("../task1");

describe("task1", () => {
    const input = ['1721', '979', '366', '299', '675', '1456'];

    it('should tell which two numbers sum up to 2020', () => {
        const actual = solve(input);
        assert.deepEqual(actual, { sum: 2020, first: 1721, second: 299 });
    });
});