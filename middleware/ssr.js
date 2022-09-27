const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Вспомогательная функция для отправки HTML на основе React-компонента
function renderComponent(reactComponent, props = {}, options = { doctype: true }) {
  // Шаг 1. React компонент -> React элемент
  const reactElement = React.createElement(reactComponent, {
    ...this.app.locals, // передать app.locals
    ...this.locals, // передать res.locals
    ...props, // передать пропсы
  });

  // Шаг 2. React элемент -> HTML код (без доктайпа)
  const html = ReactDOMServer.renderToStaticMarkup(reactElement);

  // Шаг 3. Добавить doctype, если нужно
  if (options.doctype) {
    this.write('<!doctype html>');
  }

  // Шаг 4. Отправить HTML-документ на клиент
  this.end(html);
}

function ssr(req, res, next) {
  res.renderComponent = renderComponent;
  next();
}

module.exports = ssr;
