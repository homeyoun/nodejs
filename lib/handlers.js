const fortune = require("./fortune");

exports.home = (req, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render("404");

exports.sectionTest = (req, res) => res.render("section-test");
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.render("500");
};
/* eslint-enable no-unused-vars */
