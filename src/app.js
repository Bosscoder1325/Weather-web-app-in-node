const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Serving the contents
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sachin Dabgar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sachin Dabgar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Hey, How can I help you?",
    title: "Help",
    name: "Sachin Dabgar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(req.query.address, (error, response) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(response.latitude, response.logitude, (err, resp) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      res.send({
        forecast: resp,
        location: response.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    error: "Help article not found",
    title: "404",
    name: "Sachin",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    error: "Page not found",
    title: "404",
    name: "Sachin",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
