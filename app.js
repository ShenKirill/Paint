require("@babel/register");
const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { getCanvas } = require("./canvas");
const ssr = require("./middleware/ssr");
const Main = require("./views/Main");
const createSocketServer = require("./socket");

const server = createServer();
const app = express();

app.use(ssr);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.renderComponent(Main, { canvas: getCanvas() });
});

// app.post("/api/paint", (req, res) => {
//   res.json({ success: true });
//   changeCanvas(req.body.row, req.body.col, req.body.color)
// });

server.on("request", app);
server.listen(process.env.PORT ?? 3000, () => console.log("server started"));
createSocketServer(server);
