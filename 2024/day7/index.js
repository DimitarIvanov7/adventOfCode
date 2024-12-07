import { input } from './input.js';

const testinput = [
  '190: 10 19',
  '3267: 81 40 27',
  '83: 17 5',
  '156: 15 6',
  '7290: 6 8 6 15',
  '161011: 16 10 13',
  '192: 17 8 14',
  '21037: 9 7 18 13',
  '292: 11 6 16 20',
];

const parseString = (input) => {
  return input
    .map((row) => row.split(': '))
    .reduce(
      (acc, [result, vals]) => [
        ...acc,
        [
          +result,
          ...vals
            .split(' ')
            .filter((el) => !!el)
            .map((strNum) => +strNum),
        ],
      ],
      []
    );
};

const splitByTwoChars = (str, char1, char2, char3) => {
  const regex = new RegExp(`[${char1}${char2}${char2}]`, 'g');
  return str.split(regex);
};

// const evaluateLeftToRight = (expr) => {
//   const operators = expr.match(/[+*]/g);
//   const numbers = expr.split(/[+*]/).map(Number);

//   let result = numbers[0];

//   for (let i = 0; i < operators.length; i++) {
//     const operator = operators[i];
//     const nextNumber = numbers[i + 1];

//     if (operator === '+') {
//       result += nextNumber;
//     } else if (operator === '*') {
//       result *= nextNumber;
//     }
//   }

//   return result;
// };

const main = (data) => {
  const test = [];

  let ans = 0;

  const seen = new Set();

  const dfs = (nums, result, curr = 0, index = 0, path = '') => {
    if (index > nums.length) return 0;
    if (curr > result) return 0;

    if (curr === result && index === nums.length) {
      if (!seen.has(result)) {
        ans += result;
        seen.add(result);

        // console.log(curr, result);
        test.push([result, path.slice(1), nums]);
      }

      return 1;
    }

    dfs(
      nums,
      result,
      curr > 0 ? curr * nums[index] : nums[index],
      index + 1,
      `${path}*${nums[index]}`
    );

    dfs(nums, result, curr + nums[index], index + 1, `${path}+${nums[index]}`);

    dfs(
      nums,
      result,
      curr > 0 ? parseInt(`${curr}${nums[index]}`) : nums[index],
      index + 1,
      `${path}||${nums[index]}`
    );
  };

  for (const [result, ...nums] of data) {
    dfs(nums, result);
  }

  // const testExpression = test.filter(([result, expression, numArr]) => {
  //   const nums = splitByTwoChars(expression, '*', '+', '||').map((num) => +num);
  //   const expressions = expression.split(/\d+/).filter((el) => !!el);

  //   // console.log(nums, expressions);

  //   let testRes = 0;

  //   testRes = evaluateLeftToRight(expression);

  //   if (testRes === result) {
  //     return true;
  //   }

  //   return false;
  // });

  // const testSet = [];

  // for (let index = 0; index < data.length; index++) {
  //   const [result, _] = data[index];

  //   if (!testSet.includes(result)) testSet.push(result);
  // }
  // // const checkSum = testExpression.reduce((acc, [result, _]) => acc + result, 0);

  // console.log(testExpression, data.length, testSet.length);

  return ans;
};

const result = main(parseString(input));

console.log(result);

// for (let i = index; i < nums.length; i++) {
//   dfs(
//     nums,
//     result,
//     curr > 0 ? curr * nums[i] : nums[i],
//     i + 1,
//     `${path}*${nums[i]}`
//   );
//   dfs(nums, result, curr + nums[i], i + 1, `${path}+${nums[i]}`);
// }
