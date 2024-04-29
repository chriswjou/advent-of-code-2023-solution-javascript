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
  return lines.map((line) => {
    const [hands, bid] = line.split(" ");
    return {
      hands,
      bid,
      type: getHandsType(hands),
    };
  });
}

/**
 *
 * @param {string} hands
 */
function getHandsType(hands) {
  const map = new Map();
  hands.split("").forEach((card) => {
    map.set(card, (map.get(card) || 0) + 1);
  });
  switch (map.size) {
    case 1:
      return 6;
    case 2:
      let case2res = 4;
      map.forEach((value) => {
        if (value === 4) {
          case2res = 5;
        }
      });
      return case2res;
    case 3:
      let case3res = 2;
      map.forEach((value) => {
        if (value === 3) {
          case3res = 3;
        }
      });
      return case3res;
    case 4:
      return 1;
    case 5:
      return 0;
    default:
      return 0;
  }
}

const dict = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const dict2 = {
  J: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

/**
 *
 * @param {string[]} lines
 */
function partOne(lines) {
  const handsList = lineParser(lines);
  const sorted = handsList.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.hands.length; i++) {
        if (dict[a.hands[i]] > dict[b.hands[i]]) {
          return 1;
        } else if (dict[a.hands[i]] < dict[b.hands[i]]) {
          return -1;
        }
      }
    }
    return a.type - b.type;
  });
  const awardPrice = sorted.map((hands, index) => hands.bid * (index + 1));
  console.log(awardPrice.reduce((a, b) => a + b, 0));
}

/**
 *
 * @param {string} hands
 */
function getHandsTypeWithJoker(hands) {
  const jokerCount = (hands.match(/J/g) || []).length;
  const type = getHandsType(hands);
  switch (type) {
    // High Card
    case 0:
      if (jokerCount) return 1;
      return 0;
    // Pair
    case 1:
      if (jokerCount) return 3;
      return 1;
    // Two Pair
    case 2:
      if (jokerCount === 2) return 5;
      if (jokerCount === 1) return 4;
      return 2;
    // Three of a Kind
    case 3:
      if (jokerCount) return 5;
      return 3;
    // Full House
    case 4:
      if (jokerCount) return 6;
      return 4;
    // Four of a Kind
    case 5:
      if (jokerCount) return 6;
      return 5;
    // Five of a Kind
    case 6:
      return 6;
    default:
      return 0;
  }
}

/**
 *
 * @param {string[]} lines
 */
function partTwo(lines) {
  const handsList = lineParser(lines).map((hands) => {
    return {
      ...hands,
      type: getHandsTypeWithJoker(hands.hands),
    };
  });

  const sorted = handsList.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.hands.length; i++) {
        if (dict2[a.hands[i]] > dict2[b.hands[i]]) {
          return 1;
        } else if (dict2[a.hands[i]] < dict2[b.hands[i]]) {
          return -1;
        }
      }
    }
    return a.type - b.type;
  });
  const awardPrice = sorted.map((hands, index) => hands.bid * (index + 1));
  console.log(awardPrice.reduce((a, b) => a + b, 0));
}

partOne(input);
partTwo(input);
