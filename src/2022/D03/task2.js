const { getInputForDay } = require('../../util/InputFetcher');

async function task2() {
  const answer = (await getInputForDay('2022', '03')).split('\n')
    .map(chars => Array.from(new Set(chars).values()))
    .reduce((groups, elfPack) => {
      const last = groups.at(-1);
      if (last && last.length < 3) {
        last.push(elfPack)
      } else {
        groups.push([elfPack]);
      }
      return groups;
    }, [])
    .map(group => group.reduce((content, elf) => {
      Array.from(elf).forEach(item => {
        if (content.has(item)) {
          content.set(item, content.get(item) + 1);
        } else {
          content.set(item, 1);
        }
      });

      return content;
    }, new Map()))
    .reduce((filtered, countByItems) => {
      countByItems.forEach((value, key) => { if (value === 3) { filtered.push(key)} });
      return filtered;
    }, [])
    .map(authToken => toPriority(authToken))
    .reduce((acc, value) => acc + value, 0);


  console.log(`Total sum of auth token priorities: ${answer}`);
}

function toPriority(item) {
  if (item.match(/[a-z]/)) {
    return item.charCodeAt(0) - 96;
  } else if (item.match(/[A-Z]/)) {
    return item.charCodeAt(0) - 38;
  }
}

module.exports = { task2, toPriority };

