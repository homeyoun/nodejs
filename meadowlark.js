const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const handlers = require("./lib/handlers");

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `Express started on http://localhost:${port} \n` +
        `press Ctrl-C to terninate.`
    )
  );
} else {
  module.exports = app;
}
