const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const handlers = require("./lib/handlers");

const tours = [
  { id: 0, name: "Hood River", price: 99.99 },
  { id: 1, name: "Oregon Coast", price: 149.95 },
];
app.use(express.urlencoded({ extended: false }));

app.engine(
  ".hbs",
  expressHandlebars({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set("view engine", ".hbs");
app.use(express.static(__dirname + "/public"));
app.disable("x-powered-by");

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.get("/api/tours", (req, res) => res.json(tours));

app.get("/section-test", handlers.sectionTest);

app.post("/process-contact", (req, res) => {
  try {
    if (req.body.simulateError) throw new Error("error saving contact!");
    console.log(`received contact from ${req.body.name} <${req.body.email}>`);
    res.format({
      "text/html": () => res.redirect(303, "/thank-you"),
      "application/json": () => res.json({ success: true }),
    });
  } catch (err) {
    console.error(
      `error processing contact from ${req.body.name}` + `<${req.body.email}>`
    );
    res.format({
      "text/html": () => res.redirect(303, "/contact-error"),
      "application/json": () =>
        res.status(500).json({
          error: "error saving contact information",
        }),
    });
  }
});

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
