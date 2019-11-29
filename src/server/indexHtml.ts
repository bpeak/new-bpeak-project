export const indexHtml = (markup: string) => {
  return `
    <!doctype html>
    <html lang="en">
      <head></head>
      <body>
        <div id="root">${markup}</div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

export default indexHtml;
