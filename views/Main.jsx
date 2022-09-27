const React = require("react");
const Layout = require("./Layout");

const colors = [
  "#000000",
  "#C0C0C0",
  "#808080",
  "#FFFFFF",
  "#800000",
  "#FF0000",
  "#800080",
  "#FF00FF",
  "#008000",
  "#00FF00",
  "#808000",
  "#FFFF00",
  "#000080",
  "#0000FF",
  "#008080",
  "#00FFFF",
];

function Main({canvas}) {
  const color = colors[Math.floor(Math.random() * colors.length)] ?? "black";

  return (
    <Layout>
      <div className="container">
        <div className="header">
          <h1>Paint</h1>
          <input type="color" id="color-picker" defaultValue={color} />
        </div>
        <div className="canvas">
          {canvas.map((row, i) => (
            <div key={i} className="row">
              {row.map((cell, j) => (
                <button
                  key={j}
                  className="cell"
                  style={{ backgroundColor: cell }}
                  type="button"
                  data-row={i}
                  data-col={j}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

module.exports = Main;
