import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import ScrollButton from "./components/ScrollButton";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      resumeData: {},
      basicInfoAndSkills: {},
    };
  }

  componentDidMount = () => {
    this.loadResumeFromPath(`aboutMeAndProjects.json`);
    this.loadBasicInfoAndSkills();
  };

  loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  loadBasicInfoAndSkills = () => {
    $.ajax({
      url: `basicInfoAndSkills.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ basicInfoAndSkills: data });
        document.title = `${this.state.basicInfoAndSkills.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  render() {
    return (
      <Router>
        <Header sharedData={this.state.basicInfoAndSkills.basic_info} />

        <Switch>
          <Route exact path="/">
            <Home
              resumeData={this.state.resumeData}
              sharedData={this.state.basicInfoAndSkills}
            />
          </Route>

          <Route path="/about">
            <About
              resumeBasicInfo={this.state.resumeData.basic_info}
              sharedBasicInfo={this.state.basicInfoAndSkills.basic_info}
            />
          </Route>
        </Switch>

        <ScrollButton />

        <Footer sharedBasicInfo={this.state.basicInfoAndSkills.basic_info} />
      </Router>
    );
  }
}

export default withAuth0(App);
