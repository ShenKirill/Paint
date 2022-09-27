const fs = require("fs");
const path = require("path");

const canvasPath = path.join(__dirname, "canvas.json");
let canvas;
function getCanvas() {
  if (canvas) return canvas;

  if (fs.existsSync(canvasPath)) {
    canvas = JSON.parse(fs.readFileSync(canvasPath, "utf-8"));
  } else {
    canvas = [];
    for (let i = 0; i < 28; i += 1) {
      const row = [];
      canvas.push(row);
      for (let j = 0; j < 18; j += 1) {
        row.push("white");
      }
    }
  }
  return canvas;
}

function changeCanvas(row, col, color) {
  const curCanvas = getCanvas();
  curCanvas[row][col] = color;
  fs.writeFileSync(canvasPath, JSON.stringify(curCanvas));
}

module.exports = { getCanvas, changeCanvas };
