import { input } from './input.js';

const testInput = [
  //   '1 2 7 8 9',
  '7 6 4 2 1',
  '1 2 7 8 9',
  '9 7 6 2 1',
  '1 3 2 4 5',
  '8 6 4 4 1',
  '1 3 6 7 9',
];

const parseStrings = (input) => {
  return input.map((line) => line.split(' ').map((str) => parseInt(str)));
};

const checkMistake = (input, i, left, right, direction) => {
  const diff = input[i][right] - input[i][left];

  if (Math.abs(diff) > 3 || Math.abs(diff) === 0) return true;

  if (direction == 'asc' && diff < 0) {
    return true;
  }
  if (direction == 'desc' && diff > 0) {
    return true;
  }

  return false;
};

const getOrdering = (input) => {
  let asc = 0;
  let desc = 0;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] > input[i]) asc++;
    if (input[i + 1] < input[i]) desc++;
  }

  return asc > desc ? 'asc' : 'desc';
};

const main = (input) => {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    let direction = getOrdering(input[i]);
    let mistakes = 0;
    let left = 0;
    let right = 1;

    while (right < input[i].length) {
      if (!checkMistake(input, i, left, right, direction)) {
        left++;
        right++;
      } else {
        if (right === input[i].length - 1) {
          mistakes++;
          break;
        }
        mistakes++;

        const cantSkipRight = checkMistake(
          input,
          i,
          left,
          right + 1,
          direction
        );

        if (cantSkipRight) {
          const cantSkipLeft = checkMistake(
            input,
            i,
            left + 1,
            right + 1,
            direction
          );

          if (
            cantSkipLeft ||
            (left !== 0 && checkMistake(input, i, left - 1, right, direction))
          ) {
            mistakes++;
            break;
          }
        }

        right++;
        left = right;
        right++;
      }
    }

    if (mistakes < 2) result++;
  }

  return result;
};

const result = main(parseStrings(input));

console.log(result);
