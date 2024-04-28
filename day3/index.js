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

/**
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
function fillDotsAround(lines) {
  const dotLine = new Array(lines[0].length + 2).fill(".").join("");
  return [dotLine, ...lines.map((line) => `.${line}.`), dotLine];
}

function isCharNumber(char) {
  return /\d/.test(char);
}

function isDot(char) {
  return /\./.test(char);
}

function isGear(char) {
  return /\*/.test(char);
}

function getDir(x, y, [dx, dy]) {
  return [x + dx, y + dy];
}

const dirs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const extendedLines = fillDotsAround(lines);
  let sum = 0;
  for (let y = 0; y < extendedLines.length; y++) {
    const line = extendedLines[y];
    let currentNumber = "";
    let isCurNumber = false;
    let isChecked = false;

    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (isCurNumber && !isCharNumber(char)) {
        isChecked && (sum += parseInt(currentNumber));
        isCurNumber = false;
        isChecked = false;
        currentNumber = "";
      }

      if (isCharNumber(char)) {
        isCurNumber = true;
        currentNumber += char;
        dirs.forEach(([dx, dy]) => {
          const charOnDir =
            extendedLines[getDir(x, y, [dx, dy])[1]][getDir(x, y, [dx, dy])[0]];
          if (!isDot(charOnDir) && !isCharNumber(charOnDir)) {
            isChecked = true;
          }
        });
      }
    }
  }
  console.log(sum);
}

function findNumberRangeList(line) {
  let numberRangeList = [];
  let currentNumber = "";
  let isCurNumber = false;
  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    if (isCurNumber && !isCharNumber(char)) {
      numberRangeList.push([x - currentNumber.length, x]);
      isCurNumber = false;
      currentNumber = "";
    }

    if (isCharNumber(char)) {
      isCurNumber = true;
      currentNumber += char;
    }
  }
  return numberRangeList;
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const extendedLines = fillDotsAround(lines);
  let sum = 0;
  for (let y = 0; y < extendedLines.length; y++) {
    const line = extendedLines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (isGear(char)) {
        let numberCount = 0;
        let gearRatio = 1;
        [y - 1, y, y + 1].map((y) => {
          const numberRangeList = findNumberRangeList(extendedLines[y]);
          numberRangeList.forEach(([start, end]) => {
            if (!((end < x && start < x) || (end > x + 1 && start > x + 1))) {
              numberCount++;
              const number = parseInt(
                extendedLines[y].substring(start, end + 1)
              );
              gearRatio *= number;
            }
          });
        });
        if (numberCount === 2) {
          sum += gearRatio;
        }
      }
    }
  }
  console.log(sum);
}

partOne(input);
partTwo(input);
