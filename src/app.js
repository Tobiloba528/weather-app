const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5000

// Define path for handlebars config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tobiloba",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Tobiloba",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is some helpful text",
    name: "Tobiloba",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forcastData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404 ",
    text: "Help article not found",
    name: "Tobiloba",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404 ",
    text: "Page not found",
    name: "Tobiloba",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
