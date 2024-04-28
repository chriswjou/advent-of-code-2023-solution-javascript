const fs = require("fs");

const exampleLines1 = fs
  .readFileSync("./example1.txt", "utf-8")
  .trim()
  .split("\n");

const exampleLines2 = fs
  .readFileSync("./example2.txt", "utf-8")
  .trim()
  .split("\n");

const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

/**
 * @param {string[]} lines
 * @returns {number}
 */
function partOne(lines) {
  return lines
    .map((line) => line.replace(/[^\d]/g, ""))
    .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`))
    .reduce((acc, cur) => acc + cur, 0);
}

/**
 * @param {string[]} lines
 * @returns {number}
 */
function partTwo(lines) {
  const numberWordsMap = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
    zero: "z0o",
  };
  const modifiedLines = lines.map((line) => {
    let tempLine = line;
    Object.keys(numberWordsMap).forEach((key) => {
      const regExp = new RegExp(key, "g");
      tempLine = tempLine.replace(regExp, (match) => numberWordsMap[match]);
    });
    return tempLine;
  });
  return partOne(modifiedLines);
}

console.log("Part one: ", partOne(lines));
console.log("Part two: ", partTwo(lines));
