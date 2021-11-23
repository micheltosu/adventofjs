module.exports.solve = (strArr) => {
    console.log(strArr);
    const numbers = strArr.split('\n').map(str => Number(str));
    return pairs = numbers
        .flatMap(num => numbers
            .map(num2 => { return { sum: num + num2, first: num, second: num2 } }))
        .filter(res => res.sum === 2020)
        .shift();
};
