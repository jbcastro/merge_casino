var mongoose = require("mongoose");
var connec = require("./connection");

var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

var connectionString = connec.connectionString2;
mongoose.connect(connectionString, { useNewUrlParser: true });

var mySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: Number, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("casinodemo", mySchema);
