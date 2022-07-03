import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.png";
import GithubCorner from "react-github-corner";
class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    return (
      <header id="home" style={{ display: "block" }}>
        <GithubCorner
          href="https://github.com/bashamtg/Portfolio"
          ariaLabel="View Project on Github"
        />

        <Nav
          activeKey="/home"
          fill
          style={{ position: "absolute", top: 10, right: 50 }}
        >
          <Nav.Item>
            <LinkContainer to="/">
              <Nav.Link href="/">Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/about">
              <Nav.Link eventKey="about">About</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>

        <img className="header-image" alt="logo" src={logo}></img>
      </header>
    );
  }
}

export default Header;
