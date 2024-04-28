const fs = require("fs");

const exampleLines1 = fs
  .readFileSync("example1.txt", "utf-8")
  .trim()
  .split("\n");

const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

/**
 * @param {string[]} lines
 * @returns {number[][][]}
 */
function getRgbSets(lines) {
  return lines.map((line, index) => {
    const sets = line.replace(`Game ${index + 1}: `, "").split("; ");
    const rgbSets = sets.map((set) => {
      const red = set.match(/\d+(?= red)/g)?.[0] || 0;
      const green = set.match(/\d+(?= green)/g)?.[0] || 0;
      const blue = set.match(/\d+(?= blue)/g)?.[0] || 0;
      return [red, green, blue].map((x) => parseInt(x));
    });
    return rgbSets;
  });
}

/**
 * @param {string[]} lines
 */
function partOne(lines) {
  const rgbSets = getRgbSets(lines);
  const ans = rgbSets
    .map((rgbSet, index) => {
      if (
        rgbSet.filter((rgb) => rgb[0] <= 12 && rgb[1] <= 13 && rgb[2] <= 14)
          .length == rgbSet.length
      )
        return index + 1;
      return 0;
    })
    .reduce((a, b) => a + b, 0);
  console.log(ans);
}

function partTwo(lines) {
  const rgbSets = getRgbSets(lines);
  const maxRgbSets = rgbSets.map((rgbSet) => {
    const maxRgb = [0, 0, 0];
    rgbSet.forEach((rgb) => {
      maxRgb[0] = Math.max(maxRgb[0], rgb[0]);
      maxRgb[1] = Math.max(maxRgb[1], rgb[1]);
      maxRgb[2] = Math.max(maxRgb[2], rgb[2]);
    });
    return maxRgb.reduce((a, b) => a * b, 1);
  });
  const ans = maxRgbSets.reduce((a, b) => a + b, 0);
  console.log(ans);
  return ans;
}

partOne(input);
partTwo(input);
