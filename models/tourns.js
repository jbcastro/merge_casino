var mongoose = require("mongoose");
var connec = require("./connection");

var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

var connectionString = connec.connectionString2;
mongoose.connect(connectionString, { useNewUrlParser: true });

var mySchema = mongoose.Schema(
  {
    name: { type: String },
    casino: { type: String },
    starting: { type: Number },
    roundLength: { type: Number },
    resultLength: { type: Number },
    score: { type: String },
    buyin: { type: Number },
    perDollar: { type: Number },
    country: { type: String },
    region: { type: String },
    area: { type: String },
    city: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("tourns", mySchema);
