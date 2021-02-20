import React, { useState, useEffect, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import AddForm from "./components/AddForm";
import USAAreas from "./AreasApi";
let api = "/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allInfo: {},
      usaAreas: USAAreas,
      name: "",
      country: {},
      region: {},
      area: {},
      city: "",
      address: "",
      phone: "",
      website: "",
      zip: "",
    };
    this.setLocation = this.setLocation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => {
        const casinoData = res.express;
        casinoData.reverse();
        this.setState({ allInfo: casinoData });
      })

      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/api");
    console.log(response)
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  setLocation = (e, f) => {
    // console.log(e, f);
    if (f === "country") {
      this.setState({ country: e });
    } else if (f === "region") {
      this.setState({ region: e });
    } else if (f === "area") {
      this.setState({ area: e });
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let newItem = {
      name: this.state.name,
      country: this.state.country,
      region: this.state.region,
      area: this.state.area,
      city: this.state.city,
      address: this.state.address,
      phone: this.state.phone,
      website: this.state.website,
      zip: this.state.zip,
    };
    let name = this.state.name;

    fetch(`/api/add?=${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        if (res.ok) {
          console.log(newItem);
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then((json) => {
        this.setState((state) => {
          newItem._id = json._id;
          const allInfo = [newItem, ...state.allInfo];
          return {
            allInfo,
            newItem: "",
          };
        });
      })
      .catch((error) => {
        console.log("this be your error brah" + error);
      });
    this.setState({ name: "" });
    this.setState({ city: "" });
    this.setState({ address: "" });
    this.setState({ phone: "" });
    this.setState({ website: "" });
    this.setState({ zip: "" });
    e.target.reset();
  };
  handleDelete = (e) => {
    let id = e;
    // console.log(e);
    fetch(`/api/delete?_id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        const remainder = this.state.allInfo.filter((item) => {
          return item._id !== id;
        });
        this.setState({ allInfo: remainder, e: {} });
      });
  };
  render() {
    return this.state.allInfo == !null ? (
      <div className="App">
        <h1>Loading</h1>
      </div>
    ) : (
      <div className="App">
        <h1>yo</h1>
        <AddForm
          usaAreas={this.state.usaAreas}
          setLocation={this.setLocation}
          onChange={this.onChange}
          allInfo={this.state.allInfo}
          onSubmit={this.onSubmit}
          handleDelete={this.handleDelete}
          name={this.state.name}
          city={this.state.city}
          address={this.state.address}
          phone={this.state.phone}
          website={this.state.website}
          zip={this.state.zip}
        />
      </div>
    );
  }
}

export default App;
