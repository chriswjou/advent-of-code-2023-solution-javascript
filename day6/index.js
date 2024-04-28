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
function linesParser(lines) {
  const time = lines[0]
    .split("Time:")[1]
    .trim()
    .replace(/ +/g, " ")
    .split(" ")
    .map(Number);
  const distance = lines[1]
    .split("Distance:")[1]
    .trim()
    .replace(/ +/g, " ")
    .split(" ")
    .map(Number);
  return time.map((t, i) => ({ time: t, distance: distance[i] }));
}

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const games = linesParser(lines);
  const timeOptionsList = [];
  games.map((game) => {
    let counter = 0;
    const { time: timeLimit, distance: targetDistance } = game;
    for (let accelerateTime = 0; accelerateTime < timeLimit; accelerateTime++) {
      let currentDistance = (timeLimit - accelerateTime) * (accelerateTime * 1);
      if (currentDistance > targetDistance) {
        counter++;
      }
    }
    timeOptionsList.push(counter);
  });
  console.log(timeOptionsList.reduce((a, b) => a * b, 1));
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const games = linesParser(lines);
  const newGame = games.reduce(
    (acc, cur) => {
      const { time, distance } = cur;
      return {
        time: acc.time + `${time}`,
        distance: acc.distance + `${distance}`,
      };
    },
    { time: "", distance: "" }
  );
  newGame.time = parseInt(newGame.time);
  newGame.distance = parseInt(newGame.distance);
  let counter = 0;
  for (
    let accelerateTime = 0;
    accelerateTime < newGame.time;
    accelerateTime++
  ) {
    let currentDistance =
      (newGame.time - accelerateTime) * (accelerateTime * 1);
    if (currentDistance > newGame.distance) counter++;
  }
  console.log(counter);
}

partOne(input);
partTwo(input);
