var Tourns = require("../models/tourns.js");

exports.getAll = () => {
  return Tourns.find({}, (err, result) => {
    if (err) {
      return err;
    }

    console.log(result);

    return result;
  });
};

exports.getOne = (tourns1) => {
  return Tourns.findOne({ _id: tourns1 }, (err, result) => {
    if (err) {
      return err;
    }
    console.log(result);
    return result;
  });
};

exports.addOne = (
  casino1,
  name1,
  starting1,
  roundLength1,
  resultLength1,
  score1,
  buyin1,
  perDollar1,
  country1,
  region1,
  area1,
  city1
) => {
  return Tourns.create(
    {
      casino: casino1,
      name: name1,
      starting: starting1,
      roundLength: roundLength1,
      resultLength: resultLength1,
      score: score1,
      buyin: buyin1,
      perDollar: perDollar1,
      country: country1,
      region: region1,
      area: area1,
      city: city1,
    },
    (err, result) => {
      if (err) throw err;
      return result;
    }
  );
};

exports.killOne = (tourns1) => {
  return Tourns.findOne({ _id: tourns1 }, (err, result) => {
    if (err) throw err;

    result.remove(function (err) {
      if (err) throw err;
      //console.log(tourns1);
    });
  });
};
