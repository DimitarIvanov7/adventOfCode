import { input } from './input.js';

const testinput = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
];

const positions = {
  '^': '^',
  v: 'v',
  '<': '<',
  '>': '>',
};

const positionMapping = {
  '^': (y, x) => ({ y: y - 1, x }),
  v: (y, x) => ({ y: y + 1, x }),
  '<': (y, x) => ({ y: y, x: x - 1 }),
  '>': (y, x) => ({ y: y, x: x + 1 }),
};

const changeDirection = {
  '^': '>',
  v: '<',
  '<': '^',
  '>': 'v',
};

const inBounds = (input, x, y) => {
  return y >= 0 && y < input.length && x >= 0 && x < input[y].length;
};

const main = async (input) => {
  let result = 0;

  const set = new Set();
  let x, y;

  let direction;

  for (let i = 0; i < input.length; i++) {
    for (let k = 0; k < input[i].length; k++) {
      if (input[i][k] in positions) {
        y = i;
        x = k;

        direction = input[y][x];
      }
    }
  }

  while (inBounds(input, x, y)) {
    const next = positionMapping[direction](y, x);

    if (!inBounds(input, next.x, next.y)) {
      break;
    }

    if (input[next.y][next.x] === '#') {
      direction = changeDirection[direction];
      continue;
    }

    if (!set.has(`y${next.y}-x${next.x}`)) {
      const visited = new Map();

      let testX = x;
      let testY = y;

      visited.set(`y${testY}-x${testX}-dir${direction}`);

      const obstr = { x: next.x, y: next.y };

      let changedDirection = changeDirection[direction];

      while (
        inBounds(input, testX, testY) &&
        !(input[obstr.y][obstr.x] in positions)
      ) {
        const nextPos = positionMapping[changedDirection](testY, testX);

        if (!inBounds(input, nextPos.x, nextPos.y)) break;

        if (input[nextPos.y][nextPos.x] === '#') {
          changedDirection = changeDirection[changedDirection];
          continue;
        }

        if (visited.has(`y${testY}-x${testX}-dir${changedDirection}`)) {
          result++;
          set.add(`y${obstr.y}-x${obstr.x}`);

          break;
        } else {
          visited.set(`y${testY}-x${testX}-dir${changedDirection}`);

          const newPosition = positionMapping[changedDirection](testY, testX);
          testY = newPosition.y;
          testX = newPosition.x;
        }
      }
    }

    const newPosition = positionMapping[direction](y, x);

    y = newPosition.y;
    x = newPosition.x;
  }

  return result;
};

const result = await main(input);

console.log(result);
