import { input } from './input.js';

const createLists = (input, sorted = false) => {
  const left = [];
  const right = [];

  input.forEach(([firstEl, secondEl]) => {
    left.push(firstEl);
    right.push(secondEl);
  });

  if (sorted) {
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
  }

  return [left, right];
};

const countDiff = (input) => {
  const [leftList, rightList] = createLists(input, true);
  let result = 0;
  while (leftList.length && rightList.length) {
    const leftMin = leftList.pop();
    const rightMin = rightList.pop();

    const diff = Math.abs(leftMin - rightMin);
    result += diff;
  }

  return result;
};

const countOccurances = (input) => {
  const [leftList, rightList] = createLists(input);

  let result = 0;

  const set = new Set(leftList);

  const map = new Map();
  for (const el of rightList) {
    if (map[el]) map[el]++;
    else map[el] = 1;
  }

  for (const el of set) {
    const occurances = map[el] || 0;
    result += el * occurances;
  }
  return result;
};

const result1 = countDiff(input);

const result2 = countOccurances(input);

console.log(result1, result2);
