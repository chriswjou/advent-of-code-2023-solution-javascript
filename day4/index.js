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
function partOne(lines) {
  let sum = 0;
  for (let cardNo = 0; cardNo < lines.length; cardNo++) {
    const line = lines[cardNo];
    const count = getSameNumberCount(line);
    count && (sum += Math.pow(2, count - 1));
  }
  console.log(sum);
}

/**
 *
 * @param {string} line
 * @returns
 */
function getSameNumberCount(line) {
  const content = line.split(": ")[1];
  const [targetNumString, myNumString] = content.split(" | ");
  const targetNumbers = targetNumString
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));
  const myNumbers = myNumString
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));
  const count = targetNumbers.filter((n) => myNumbers.includes(n)).length;
  return count;
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const execTimes = new Array(lines.length).fill(1);
  for (let cardNo = 0; cardNo < lines.length; cardNo++) {
    const line = lines[cardNo];
    const count = getSameNumberCount(line);
    for (let time = 0; time < execTimes[cardNo]; time++) {
      for (let i = 0; i < count; i++) {
        execTimes[cardNo + i + 1]++;
      }
    }
  }
  console.log(execTimes);
  const sum = execTimes.reduce((a, b) => a + b);
  console.log(sum);
}

partOne(input);
partTwo(input);
