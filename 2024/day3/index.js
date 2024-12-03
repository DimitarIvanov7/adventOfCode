import { input } from './input.js';

const findDigits = (str) => {
  let digit1 = '';
  let digit2 = '';

  let idx = 0;

  while (str[idx] !== '(') {
    idx++;
  }

  idx++;
  //   console.log(str[idx]);

  while (str[idx] !== ',') {
    digit1 += str[idx];
    idx++;
  }

  idx++;

  //   console.log('secoND', str[idx]);

  while (str[idx] !== ')') {
    digit2 += str[idx];
    idx++;
  }

  //   console.log(digit1, ', ', digit2);

  return [digit1, digit2];
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
      const [digit1, digit2] = findDigits(curr);

      return acc + parseInt(digit1) * parseInt(digit2);
    } else {
      go = condition;
      return acc;
    }
  }, 0);
};

const result = main(input);

console.log(result);
