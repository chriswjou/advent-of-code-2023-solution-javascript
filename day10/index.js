const fs = require("fs");

const exampleLines1 = fs
  .readFileSync("example1.txt", "utf-8")
  .trim()
  .split("\n");

const exampleLines2 = fs
  .readFileSync("example2.txt", "utf-8")
  .trim()
  .split("\n");

const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const charDirectionMap = {
  "|": [
    [0, 1],
    [0, -1],
  ],
  "-": [
    [1, 0],
    [-1, 0],
  ],
  L: [
    [1, 0],
    [0, -1],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  7: [
    [-1, 0],
    [0, 1],
  ],
  F: [
    [1, 0],
    [0, 1],
  ],
  ".": [[0, 0]],
  S: [[0, 0]],
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/**
 *
 * @param {string[]} lines
 */
function parseLine(lines) {
  const l = lines.map((line) => [".", ...line.split(""), "."]);
  const dotLine = l[0].map(() => ".");
  return [dotLine, ...l, dotLine];
}

function isArrayEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val == b[index]);
}

function getNextDirection(grid, position, direction) {
  const [dx, dy] = direction;
  const reverseDir = [-dx, -dy];
  const newPosition = [position[0] + dx, position[1] + dy];
  const newPositionChar = grid[newPosition[1]][newPosition[0]];
  const newDir = charDirectionMap[newPositionChar];
  const canMove = newDir.some((d) => isArrayEqual(d, reverseDir));
  if (!canMove) return [0, 0];
  return newDir.filter((d) => !isArrayEqual(d, reverseDir))[0];
}

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const grid = parseLine(lines);
  const maskGrid = grid.map((line) => line.map((_) => 0));
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  let start;
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if (grid[j][i] == "S") {
        start = [i, j];
      }
    }
  }

  const canGo = directions.filter(
    (d) => !isArrayEqual(getNextDirection(grid, start, d), [0, 0])
  );
  let counter = 0;
  let dir = canGo[0];
  let current = start;
  do {
    let nextPos = [current[0] + dir[0], current[1] + dir[1]];
    let nextDir = getNextDirection(grid, current, dir);
    current = nextPos;
    dir = nextDir;
    counter++;
    maskGrid[current[1]][current[0]] = 1;
  } while (grid[current[1]][current[0]] != "S");
  console.log(counter / 2);
  return maskGrid;
}

/**
 *
 * @param {string[]} lines
 */
function parser2(lines) {
  const parsed = parseLine(lines);
  const mask = partOne(lines);
  const res = parsed
    .map((line, i) => line.map((c, j) => (mask[i][j] ? c : ".")))
    .map((line) =>
      line.map((c) => (c == "-" ? ["-", c, "-"] : [" ", c, " "])).flat()
    );
  const temp = new Array(res.length * 3)
    .fill(0)
    .map((_, i) =>
      i % 3 == 1
        ? res[Math.floor(i / 3)]
        : res[0].map((_, j) => (res[Math.floor(i / 3)][j] == "|" ? "|" : " "))
    );

  for (let y = 0; y < temp.length; y++) {
    for (let x = 0; x < temp[y].length; x++) {
      switch (temp[y][x]) {
        case "L":
          temp[y - 1][x] = "|";
          temp[y][x + 1] = "-";
          break;
        case "J":
          temp[y - 1][x] = "|";
          temp[y][x - 1] = "-";
          break;
        case "F":
          temp[y + 1][x] = "|";
          temp[y][x + 1] = "-";
          break;
        case "7":
          temp[y + 1][x] = "|";
          temp[y][x - 1] = "-";
          break;
      }
    }
  }

  for (let y = 0; y < temp.length; y++) {
    for (let x = 0; x < temp[y].length; x++) {
      if (temp[y][x] == "S") {
        temp[y][x + 1] = ["-", "7", "J"].includes(temp[y][x + 2]) ? "-" : " ";
        temp[y][x - 1] = ["-", "L", "F"].includes(temp[y][x - 2]) ? "-" : " ";
        temp[y - 1][x] = ["|", "F", "7"].includes(temp[y - 2][x]) ? "|" : " ";
        temp[y + 1][x] = ["|", "J", "L"].includes(temp[y + 2][x]) ? "|" : " ";
      }
    }
  }
  return temp;
}

function isCurrentCharDot(char) {
  return char == ".";
}

function getCrossCount(grid, position) {
  const [x, y] = position;
  const line = grid[y];
  const cross = ["F", "7", "J", "L"];
  let crossCount = 0;
  for (let i = 0; i < x; i++) {
    if (line[i] == "|") {
      crossCount++;
    }
  }
  return line.some((c) => cross.includes(c))
    ? getCrossCount(grid, [x, y + 1])
    : crossCount;
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const grid = parser2(lines);
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (isCurrentCharDot(grid[y][x])) {
        const crossCount = getCrossCount(grid, [x, y]);
        grid[y][x] = crossCount % 2 == 0 ? "O" : "I";
      }
    }
  }

  grid.map((line) => {
    console.log(line.join(""));
  });
  const ans = grid.map((line) => line.join("")).join("");
  console.log(ans.split("").filter((c) => c == "I").length);
}

partOne(input);
partTwo(exampleLines2);
