//this is for adding a casino, add casino is for adding tournaments. you messed it up so that's on you self

const express = require("express");
var cors = require("cors");

const path = require("path");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
// var tournsMethods = require("./models/tournsMethods");
// var Tourns = require("./models/tourns");
var casinoMethods = require("./models/casinoMethods");
var Casinos = require("./models/casinos");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',express.static(path.join(__dirname, '/client/build',)))
// app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./client/public"));
// app.use(express.static(path.join(__dirname, "client/build")));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", function (req, res) {
  res.render("/client/index", {});
});
app.get("/api", (req, res, next) => {
  casinoMethods
    .getAll()
    .then((items) => {
      // res.sendFile("home", { wines: JSON.stringify(items) });
      res.send({ express: items });
    })
    .catch((err) => {
      return next(err);
    });
});

app.get("/api/get", (req, res, next) => {
  casinoMethods
    .getOne(req.query._id)
    .then((items) => {
      res.send({ express: items });
    })
    .catch((err) => {
      return next(err);
    });
});
app.get("/api/delete", (req, res, next) => {
  casinoMethods
    .killOne(req.query._id)
    .then((items) => {
      res.send({ express: items });
    })
    .catch((err) => {
      return next(err);
    });
});

app.post("/api/add", (req, res, next) => {
  if (!req.body._id) {
    let casino = new Casinos({
      name: req.body.name,

      country: req.body.country,
      region: req.body.region,
      area: req.body.area,
      city: req.body.city,
      address: req.body.address,
      zip: req.body.zip,
      phone: req.body.phone,
      website: req.body.website,
    });

    casino.save((err, newCasino) => {
      if (err) return next(err);
      return res.json({ updated: 0, _id: newCasino._id });
    });
  } else {
    Casinos.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,

        country: req.body.country,
        region: req.body.region,
        area: req.body.area,
        city: req.body.city,
        address: req.body.address,
        zip: req.body.zip,
        phone: req.body.phone,
        website: req.body.website,
      },
      (err, result) => {
        if (err) return next(err);
        res.json({ updated: result.nModified, _id: req.body._id });
      }
    );
  }
});
