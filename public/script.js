const socketClient = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

const colorPicker = document.getElementById("color-picker");

socketClient.addEventListener("message", (event) => {
  const { row, col, color } = JSON.parse(event.data);

  const cell = document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`
  );
  cell.style.backgroundColor = color;
});

document.querySelectorAll(".cell").forEach((button) => {
  button.addEventListener("mousemove", () => {
    const color = colorPicker.value;
    button.style.backgroundColor = color;

    socketClient.send(
      JSON.stringify({
        color,
        row: Number(button.dataset.row),
        col: Number(button.dataset.col),
      })
    );
  });
});
