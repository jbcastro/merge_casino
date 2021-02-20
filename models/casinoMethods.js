var Casinos = require("../models/casinos.js");

exports.getAll = () => {
  return Casinos.find({}, (err, result) => {
    if (err) {
      return err;
    }

    console.log(result);

    return result;
  });
};

exports.getOne = (casinos1) => {
  return Casinos.findOne({ _id: casinos1 }, (err, result) => {
    if (err) {
      return err;
    }
    console.log(result);
    return result;
  });
};

exports.addOne = (
  name1,
  country1,
  region1,
  area1,
  city1,
  address1,
  zip1,
  phone1,
  website1
) => {
  return Casinos.create(
    {
      name: name1,
      country: country1,
      region: region1,
      area: area1,
      city: city1,
      address: address1,
      zip: zip1,
      phone: phone1,
      website: website1,
    },
    (err, result) => {
      if (err) throw err;
      return result;
    }
  );
};

exports.killOne = (casinos1) => {
  return Casinos.findOne({ _id: casinos1 }, (err, result) => {
    if (err) throw err;

    result.remove(function (err) {
      if (err) throw err;
      //console.log(casinos1);
    });
  });
};
