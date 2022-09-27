const WebSocket = require("ws");
const { changeCanvas } = require("./canvas");

module.exports = function createSocketServer(server) {
  const socketServer = new WebSocket.Server({ server });

  socketServer.on("connection", (socketClient) => {
    socketClient.on("message", (message) => {
      const { row, col, color } = JSON.parse(message);
      changeCanvas(row, col, color);

      for (const client of socketServer.clients) {
        if (client !== socketClient) {
          client.send(JSON.stringify({ row, col, color }));
        }
      }
    });
  });
};
