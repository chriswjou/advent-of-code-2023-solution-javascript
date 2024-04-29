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
  const instructions = lines[0].split("").map((x) => (x == "L" ? 0 : 1));
  const nodes = {};
  const keys = lines
    .filter((_, index) => index > 1)
    .map((line) => {
      const key = line.split(" = ")[0];
      const value = line.split("(")[1].split(")")[0].split(", ");
      nodes[key] = value;
      return key;
    });
  return { instructions, nodes, keys };
}

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const { instructions, nodes } = lineParser(lines);
  let cursor = "AAA";
  let counter = 0;
  while (cursor != "ZZZ") {
    let step = instructions[counter % instructions.length];
    counter++;
    cursor = nodes[cursor][step];
  }
  console.log(counter);
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const { instructions, nodes, keys } = lineParser(lines);
  let cursorList = keys.filter((key) => key[2] == "A");
  const cycleList = cursorList.map((cursor) => {
    let counter = 0;
    let temp = cursor;
    while (temp[2] != "Z") {
      let step = instructions[counter % instructions.length];
      counter++;
      temp = nodes[temp][step];
    }
    return counter;
  });
  console.log(cycleList.reduce((a, b) => lcm(a, b)));
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
function gcd(a, b) {
  if (b == 0) return a;
  else return gcd(b, a % b);
}

partOne(input);
partTwo(input);
