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
 */
function lineParser(lines) {
  return lines.map((line) => line.split(" ").map(Number));
}

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const numbersList = lineParser(lines);
  const numbersListWithNextNumber = numbersList.map((numbers, index) => {
    let cursor = numbers;
    let temp = [];
    while (cursor.filter((x) => x !== 0).length) {
      temp.push(cursor);
      let nextLine = cursor
        .map((number, i) => {
          if (i === cursor.length - 1) return undefined;
          return cursor[i + 1] - number;
        })
        .filter((x) => x !== undefined);
      cursor = nextLine;
    }
    for (let i = temp.length - 1; i >= 0; i--) {
      if (i == temp.length - 1) {
        temp[i].push(temp[i][temp[i].length - 1]);
      } else {
        temp[i].push(
          temp[i][temp[i].length - 1] + temp[i + 1][temp[i + 1].length - 1]
        );
      }
    }
    return temp[0];
  });
  const targetList = numbersListWithNextNumber.map((x) => x[x.length - 1]);
  console.log(targetList.reduce((a, b) => a + b, 0));
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const numbersList = lineParser(lines);
  const numbersListWithPreNumber = numbersList.map((numbers, index) => {
    let cursor = numbers;
    let temp = [];
    while (cursor.filter((x) => x !== 0).length) {
      temp.push(cursor);
      let nextLine = cursor
        .map((number, i) => {
          if (i === cursor.length - 1) return undefined;
          return cursor[i + 1] - number;
        })
        .filter((x) => x !== undefined);
      cursor = nextLine;
    }
    for (let i = temp.length - 1; i >= 0; i--) {
      if (i == temp.length - 1) {
        temp[i] = [temp[i][temp[i].length - 1], ...temp[i]];
      } else {
        temp[i] = [temp[i][0] - temp[i + 1][0], ...temp[i]];
      }
    }
    return temp[0];
  });
  const targetList = numbersListWithPreNumber.map((x) => x[0]);
  console.log(targetList.reduce((a, b) => a + b, 0));
}

partOne(input);
partTwo(input);
