import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import { Form, Text } from "informed";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const AddForm = (props) => {
  const classes = useStyles();
  const [allLocation, setAllLocation] = React.useState({
    country: {},
    region: {},
    area: {},
    name: {},
  });
  const [formReset, setFormReset] = React.useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    website: "",
    zip: "",
  });

  const [jim, setJim] = React.useState({});
  const steve = (e, f) => {
    setAllLocation({ ...allLocation, [f]: e });
    props.setLocation(e, f);
  };
  let bob = [];
  const [deleteOne, setDeleteOne] = useState("");
  const setForDelete = (e) => {
    setDeleteOne(e);
    // console.log(e);
    console.log(deleteOne);
  };

  useEffect(() => {
    let hank = [];
    let all = props.allInfo;
    let aria = allLocation.area;
    for (let i = 0; i < all.length; i++) {
      if (all[i].area == aria) {
        hank.push(all[i]);
      }
    }
    setJim({ hank });
  }, [allLocation.area, props.allInfo]);
  //   console.log(props.allInfo);
  const focus = () => {
    var input = document.getElementById("name");
    input.focus();
  };
  useEffect(() => {
    focus();
  }, [jim]);
  const listItems = !jim.hank
    ? ""
    : jim.hank.map((tourn) => (
        <li key={tourn._id}>
          <br></br>
          Already entered:
          <br></br>Name:
          {tourn.name}
          <br></br>
          country:{tourn.country}
          <br></br>
          Region: {tourn.region}
          <br></br>
          Area: {tourn.area}
          <br></br>
          City: {tourn.city}
          <br></br>
          Address: {tourn.address}
          <br></br>
          Phone: {tourn.phone}
          <br></br>
          Zip: {tourn.zip}
          <br></br>
          Website: {tourn.website}
          <br></br>
          <br></br>
          <button onClick={() => props.handleDelete(tourn._id)}>delete</button>
          {/* {tourn._id == { deleteOne } ? (
            <button onClick={() => props.handleDelete(tourn._id)}>
              Are you sure
            </button>
          ) : (
            <button onClick={() => setForDelete(tourn._id)}>delete</button>
          )} */}
        </li>
      ));

  {
    props.usaAreas.map((item) => {
      if (item.state == allLocation.region) {
        bob = item.areas;
      }
    });
  }
  const onChange = props.onChange;
  const typing = (e) => {
    setAllLocation({ ...allLocation, [e.target.name]: e.target.value });
    onChange(e);
  };

  const onSubmit = props.onSubmit;

  // const butt = () => {
  //   focus();
  //   props.onSubmit;
  // };

  return (
    <div>
      <CountryDropdown
        value={allLocation.country}
        onChange={(e) => steve(e, "country")}
        priorityOptions={["US", "CA", "GB"]}
        tabindex="-1"
      />
      <RegionDropdown
        country={allLocation.country}
        value={allLocation.region}
        onChange={(e) => steve(e, "region")}
      />
      <select
        value={allLocation.area}
        initialValue={allLocation.area}
        onChange={(e) => steve(e.target.value, "area")}
      >
        <option>Select Area</option>
        {bob.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
      <br></br>
      <form onSubmit={onSubmit} id="formz">
        <label>
          name:
          <input
            type="text"
            id="name"
            onChange={(e) => typing(e)}
            name="name"
            // value={props.name}
          ></input>
        </label>
        <label>
          address:
          <input
            type="text"
            id="address"
            onChange={(e) => typing(e)}
            name="address"
            // value={props.name}
          ></input>
        </label>
        <label>
          city:
          <input
            type="text"
            id="city"
            onChange={(e) => typing(e)}
            name="city"
            // value={props.name}
          ></input>
        </label>
        <label>
          zip:
          <input
            type="number"
            id="zip"
            onChange={(e) => typing(e)}
            name="zip"
            // value={props.name}
          ></input>
        </label>
        <label>
          phone:
          <input
            type="number"
            id="phone"
            onChange={(e) => typing(e)}
            name="phone"
            // value={props.name}
          ></input>
        </label>
        <label>
          website:
          <input
            type="text"
            id="website"
            onChange={(e) => typing(e)}
            name="website"
            // value={props.name}
          ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* <TextField
        required
        id="name"
        label="Casino Name"
        name="name"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.name}
      />
      <TextField
        required
        id="address"
        label="address"
        name="address"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.address}
      />
      <TextField
        required
        id="city"
        label="City"
        name="city"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.city}
      />
      <TextField
        required
        id="zip"
        label="zip"
        name="zip"
        type="number"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.zip}
      />
      <TextField
        required
        id="phone"
        label="phone"
        name="phone"
        type="number"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.phone}
      />
      <TextField
        required
        id="website"
        label="Website"
        name="website"
        onChange={(e) => typing(e)}
        initialValue=""
        value={props.website}
      />
      <button onKeyDown={props.onSubmit}>TAB OVER ME TO ENTER</button> */}
      {listItems}
    </div>
  );
};
export default AddForm;
