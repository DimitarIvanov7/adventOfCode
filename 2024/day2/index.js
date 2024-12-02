import { input } from './input.js';

const parseStrings = (input) => {
  return input.map((line) => line.split(' ').map((str) => parseInt(str)));
};

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

// return input.reduce((acc, level) => {
//     const isSafe = level.find((el, index, arr) => {
//       const diff = Math.abs(el - arr[index - 1]);

//       return diff > 1
//     });
//   }, 0);

const testInput = [
  '7 6 4 2 1',
  '1 2 7 8 9',
  '9 7 6 2 1',
  '1 3 2 4 5',
  '8 6 4 4 1',
  '1 3 6 7 9',
];

const checkMistake = (input, i, left, direction) => {
  const diff = input[i][left + 1] - input[i][left];

  if (Math.abs(diff) > 3 || Math.abs(diff) === 0) return true;

  if (direction == 'up' && diff < 0) {
    return true;
  }
  if (direction == 'down' && diff > 0) {
    return true;
  }

  return false;
};

const check = (input) => {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    let direction = undefined;
    let mistakes = 0;
    let left = 0;
    let right = 1;

    for (; left < input[i].length; left++) {
      //   if (direction === undefined) {
      //     const diff = input[i][left] - input[i][left + 1];
      //     direction = diff > 0 ? 'up' : 'down';
      //   }

      //   const hasMistake = checkMistake(input, i, left, right, direction);

      if (checkMistake(input, i, left, direction)) mistakes++;

      //   if (input[i][left] === null) {
      //     left++;
      //     right++;
      //     continue;
      //   }

      //   if (hasMistake) {
      //     if (mistake) break;
      //     else {
      //       input[i][left] = null;
      //       left--;
      //       mistake = true;
      //     }
      //   } else left++;
    }

    // console.log(right, right === input[i].length);

    if (mistakes < 2) result++;
  }

  return result;
};

const checkOrder = (input) => {
  for (const row of input) {
    const diffs = row.map((el, index, arr) => {
      if (index === arr.length - 1) return 0;
      const diff = arr[index + 1] - el;
      // return Math.abs(diff);
      return diff;
    });
    //   .filter((_el, idx, arr) => idx < arr.length - 1);

    const aggregateDiffs = [];

    for (let i = 0; i < diffs.length; i++) {
      aggregateDiffs[i] = i === 0 ? 0 : diffs[i - 1] + diffs[i];
    }
    console.log(row, diffs, aggregateDiffs);
  }
};

const result = checkOrder(parseStrings(testInput));

console.log(result);

// 7 6 4 2 1: Safe without removing any level.
// 1 2 7 8 9: Unsafe regardless of which level is removed.
// 9 7 6 2 1: Unsafe regardless of which level is removed.

// 1 3 2 4 5: Safe by removing the second level, 3.
// 8 6 4 4 1: Safe by removing the third level, 4.

// 1 3 6 7 9: Safe without removing any level.
