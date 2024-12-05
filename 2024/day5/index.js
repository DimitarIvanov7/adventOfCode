import { updateRules, pages } from './input.js';

const testUpdateRules = [
  '47|53',
  '97|13',
  '97|61',
  '97|47',
  '75|29',
  '61|13',
  '75|53',
  '29|13',
  '97|29',
  '53|29',
  '61|53',
  '97|53',
  '61|29',
  '47|13',
  '75|47',
  '97|75',
  '47|61',
  '75|61',
  '47|29',
  '75|13',
  '53|13',
];

const testPages = [
  '75,47,61,53,29', //  valid
  '97,61,53,29,13', // valid
  '75,29,13', // valid
  '75,97,47,61,53',
  '61,13,29',
  '97,13,75,29,47',
];

const parseInput = (updateRules, pages) => {
  return {
    pages: pages.map((row) => row.split(',').map((num) => +num)),
    updateRules: updateRules.map((rule) => rule.split('|').map((num) => +num)),
  };
};

const main = ({ updateRules, pages }) => {
  let result = 0;

  for (let i = 0; i < pages.length; i++) {
    const prevNext = {};

    const pageRow = pages[i];

    for (const page of pageRow) {
      prevNext[page] = {
        prev: [],
        next: [],
      };
    }

    for (const [first, second] of updateRules) {
      if (prevNext[first] && prevNext[second]) {
        prevNext[first].next.push(second);
        prevNext[second].prev.push(first);
      }
    }

    let valid = true;

    for (let k = 0; k < pageRow.length; k++) {
      for (let j = k + 1; j < pageRow.length - 1; j++) {
        if (prevNext[pageRow[k]].prev.includes(pageRow[j])) {
          valid = false;
          break;
        }
      }

      for (let m = k - 1; m >= 0; m--) {
        if (prevNext[pageRow[k]].next.includes(pageRow[m])) {
          valid = false;
          break;
        }
      }
    }

    if (!valid) {
      pageRow.sort((a, b) => prevNext[a].next.length - prevNext[b].next.length);

      const middleIndex = Math.floor(pageRow.length / 2);

      result += pageRow[middleIndex];
    }
  }

  return result;
};

const result = main(parseInput(updateRules, pages));

console.log(result);
