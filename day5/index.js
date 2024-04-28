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
 * @returns
 */
function getSeeds(lines) {
  return lines[0].split(": ")[1].split(" ").map(Number);
}

/**
 *
 * @param {string[]} lines
 * @param {number} source
 * @param {string} startFlag
 */
function getMap(lines, source, startFlag, reverseFlag = false) {
  let isStart = false;
  let map = [];
  let result = source;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes(startFlag)) {
      isStart = true;
      continue;
    }
    if (isStart) {
      if (lines[i].trim() === "") {
        break;
      }
      map.push(lines[i].trim());
    }
  }
  map = map
    .map((line) => line.split(" ").map(Number))
    .map(([to, from, range]) =>
      !reverseFlag
        ? [
            [from, from + range - 1],
            [to, to + range - 1],
          ]
        : [
            [to, to + range - 1],
            [from, from + range - 1],
          ]
    );
  map.forEach(([fromRange, toRange]) => {
    if (!(source >= fromRange[0] && source <= fromRange[1])) return;
    result = toRange[0] + result - fromRange[0];
  });
  //   console.log(startFlag, "||", "source:", source, " -> result:", result);
  return result;
}

const startFlagList = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const seeds = getSeeds(lines);
  const locationList = seeds.map((seed) => {
    let location = seed;
    startFlagList.forEach((startFlag) => {
      location = getMap(lines, location, startFlag);
    });
    return location;
  });
  console.log(locationList.sort((a, b) => a - b)[0]);
}

/**
 *
 * @param {string[]} lines
 */
function getMoreSeeds(lines) {
  const seedsRange = lines[0].split(": ")[1].split(" ").map(Number);
  let result = [];
  for (let i = 0; i < seedsRange.length; i += 2) {
    [from, to] = [seedsRange[i], seedsRange[i] + seedsRange[i + 1] - 1];
    result.push([from, to]);
  }
  return result;
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const seedsRange = getMoreSeeds(lines);
  let guest = 1;
  let min = Infinity;
  const reverseFlagList = startFlagList.reverse();

  // Greedy
  let counter = 500;
  while (counter--) {
    let isValid = getIsValid(guest);
    if (isValid) {
      min = Math.min(min, guest);
      guest = Math.floor(guest / 7);
    } else {
      guest = guest * 2;
    }
  }

  const stepSize = [100000, 10000, 1000, 100, 10, 1];
  stepSize.forEach((step) => {
    counter = 50;
    guest = min;
    while (counter--) {
      let isValid = getIsValid(guest);
      if (isValid) {
        min = Math.min(min, guest);
      }
      guest = guest - step;
    }
  });

  console.log(min);

  function getIsValid(guest) {
    let isValid = false;
    let guestSeed = guest;
    reverseFlagList.forEach((startFlag) => {
      guestSeed = getMap(lines, guestSeed, startFlag, true);
    });
    seedsRange.forEach(([seedStart, seedEnd]) => {
      if (guestSeed >= seedStart && guestSeed <= seedEnd) {
        isValid = true;
      }
    });
    return isValid;
  }
}

partOne(input);
partTwo(input);
