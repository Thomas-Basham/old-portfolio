import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import GithubCorner from "react-github-corner";
import { Nav } from "react-bootstrap";
import {CircleMenu,CircleMenuItem,TooltipPlacement} from "react-circular-menu";

class Header extends Component {
  render() {
    return (
      <header id="home" style={{ display: "block" }}>
        <GithubCorner
          href="https://github.com/thomas-basham/thomas-basham"
          ariaLabel="View Project on Github"
          title="View Project on Github"
        />

        <Nav
          activeKey="/home"
          fill
          
          style={{ position: "absolute", top: 10, right: 50 }}
        >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/about#about">About</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link href="/#portfolio">Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/#skills">Skills</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/#resume">Experience</Nav.Link>
          </Nav.Item> */}
        </Nav>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {/* <img
            className="header-image"
            alt="logo"
            src={logo}
            width={"300px"}
          ></img> */}
          <CircleMenu
            className="circle-menu"
            startAngle={-90}
            rotationAngle={360}
            itemSize={15}
            radius={20}
            menuActive={true}
            menuToggleClassName={"menu-toggle"}
            // menuToggleElement={
            //   <img className="menu-logo" style={{cursor: "pointer"}} width={"300px"} alt="logo" src={logo}></img>
            // }
            /**
             * rotationAngleInclusive (default true)
             * Whether to include the ending angle in rotation because an
             * item at 360deg is the same as an item at 0deg if inclusive.
             * Leave this prop for angles other than 360deg unless otherwise desired.
             */
            rotationAngleInclusive={false}
          >
            <CircleMenuItem
              tooltip="Home"
              tooltipPlacement={TooltipPlacement.Bottom}
              className="menu-item"
              link="/"
            >
              <div className="small-hex">
                <i className="fa-sharp fa-solid fa-house"></i>
              </div>
            </CircleMenuItem>
            <CircleMenuItem
              tooltip="About"
              tooltipPlacement={TooltipPlacement.Left}
              className="menu-item"
              link="/about#about"
            >
              <div className="small-hex">ABOUT</div>
            </CircleMenuItem>
            <CircleMenuItem
              tooltip="Skills"
              tooltipPlacement={TooltipPlacement.Top}
              className="menu-item"
              link="/#skills"
            >
              <div className="small-hex">SKILLS</div>
            </CircleMenuItem>
            <CircleMenuItem
              tooltip="Experience"
              tooltipPlacement={TooltipPlacement.Top}
              className="menu-item"
              link="/#resume"
            >
              <div className="small-hex">EXPERIENCE</div>
            </CircleMenuItem>
            <CircleMenuItem
              tooltip="Projects"
              tooltipPlacement={TooltipPlacement.Right}
              className="menu-item"
              link="/#portfolio"
            >
              <div className="small-hex">PROJECTS</div>
            </CircleMenuItem>
          </CircleMenu>
        </div>
      </header>
    );
  }
}

export default Header;
