import { input } from './input.js';

const findNumbers = (str) => {
  let number1 = '';
  let number2 = '';

  let idx = 0;

  while (str[idx] !== '(') {
    idx++;
  }

  idx++;

  while (str[idx] !== ',') {
    number1 += str[idx];
    idx++;
  }

  idx++;

  while (str[idx] !== ')') {
    number2 += str[idx];
    idx++;
  }

  return [number1, number2];
};

const checkCondition = (str) => {
  return str === 'do()' ? true : str === "don't()" ? false : undefined;
};

const main = (input) => {
  let go = true;

  return input.reduce((acc, curr) => {
    const condition = checkCondition(curr);

    if (condition === undefined) {
      if (!go) return acc;
      const [number1, number2] = findNumbers(curr);

      return acc + parseInt(number1) * parseInt(number2);
    } else {
      go = condition;
      return acc;
    }
  }, 0);
};

const result = main(input);

console.log(result);
