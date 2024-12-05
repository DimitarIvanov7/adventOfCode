import { input } from './input.js';

const testInput = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

const checkString = (str) => {
  const test = 'MAS'.split('');

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== test[i]) {
      return false;
    }
  }

  return true;
};

const directionValues = [
  'left',
  'right',
  'top',
  'down',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
];

const partTwoDirectionValues = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
];

const main = (input) => {
  let result = 0;

  const checked = new Set();

  const dfs = (i, k, direction, str = '', path = '') => {
    if (i >= input.length || i < 0) return 0;
    if (k >= input[i].length || k < 0) return 0;

    let currEl = input[i][k];
    const newStr = str + currEl;

    if (newStr.length > 4 || !checkString(newStr)) return 0;

    const currPath = path + `[${i}-${k}]`;

    if (newStr === 'MAS' && !checked.has(currPath)) {
      checked.add(currPath);
      return 1;
    }

    return directions[direction](i, k, direction, newStr, currPath);
  };

  const directions = {
    left: (i, k, direction, newStr, currPath) =>
      dfs(i, k - 1, direction, newStr, currPath),
    right: (i, k, direction, newStr, currPath) =>
      dfs(i, k + 1, direction, newStr, currPath),
    top: (i, k, direction, newStr, currPath) =>
      dfs(i - 1, k, direction, newStr, currPath),
    down: (i, k, direction, newStr, currPath) =>
      dfs(i + 1, k, direction, newStr, currPath),

    topLeft: (i, k, direction, newStr, currPath) =>
      dfs(i - 1, k - 1, direction, newStr, currPath),

    topRight: (i, k, direction, newStr, currPath) =>
      dfs(i - 1, k + 1, direction, newStr, currPath),

    bottomLeft: (i, k, direction, newStr, currPath) =>
      dfs(i + 1, k - 1, direction, newStr, currPath),

    bottomRight: (i, k, direction, newStr, currPath) =>
      dfs(i + 1, k + 1, direction, newStr, currPath),
  };

  for (let i = 0; i < input.length; i++) {
    for (let k = 0; k < input.length; k++) {
      if (input[i][k] === 'M') {
        for (const direction of partTwoDirectionValues) {
          dfs(i, k, direction);
        }
      }
    }
  }

  const mapFinal = {};

  for (const element of checked) {
    let middleElement = '';

    let parentCount = 0;

    let i = 0;

    while (parentCount < 3) {
      if (element[i] === '[' || element[i] === ']') parentCount++;
      i++;
    }

    while (true) {
      if (element[i] === '[' || element[i] === ']') break;
      middleElement += element[i];
      i++;
    }

    if (mapFinal[middleElement]) mapFinal[middleElement]++;
    else mapFinal[middleElement] = 1;
  }

  return Object.values(mapFinal).reduce(
    (acc, curr) => (curr === 2 ? acc + 1 : acc),
    0
  );
};

const result = main(input);

console.log(result);
