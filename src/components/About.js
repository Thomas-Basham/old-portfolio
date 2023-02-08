import React, { Component } from "react";
import { Icon } from "@iconify/react";
import reactIcon from "@iconify/icons-logos/react";
import pythonIcon from "@iconify/icons-logos/python";
import djangoIcon from "@iconify/icons-logos/django-icon";
import javascriptIcon from "@iconify/icons-logos/javascript";
import AboutMeDetailsModal from "./AboutMeDetailsModal";
import Collapse from "react-bootstrap/Collapse";
import ReactPlayer from "react-player";
// import logo from "./logo.png";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsModalShow: false,
      exposeMusicPlayer: false,
      fadeAbout: false,
    };
  }

  detailsModalShow = () => {
    this.setState({
      fadeAbout: false,
      detailsModalShow: true,
    });
  };

  detailsModalClose = () =>
    this.setState({
      detailsModalShow: false,
      showCommentUpdateForm: false,
      showReplyForm: false,
      fadeAbout: false,
    });

  exposeMusicPlayer = () => {
    this.setState({
      exposeMusicPlayer: true,
    });
  };

  fadeAbout = () => {
    this.setState({
      fadeAbout: !this.state.fadeAbout,
    });
  };

  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      // var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }
    return (
      <section id="about">
        <div className="col-md-12">
          {/* <h1 className="section-title">
            <span>{sectionName}</span>
          </h1> */}
          <br></br>
          <div
            id="about-row"
            className=" row center d-flex align-items-start padding-bottom-10"
          >
            {!this.state.exposeMusicPlayer ? (
              <div className="about-card col-6  rounded ">
                <div className="col-md-12 rounded">
                  <div
                    className="card rounded"
                    style={{
                      paddingBottom: "50px",
                      textAlign: "left",
                      maxWidth: "100%",
                      margin: "0 auto",
                      borderRadius: 5,
                    }}
                  >
                    <div
                      className="card-header modal-buttons  rounded"
                      style={{
                        paddingBottom: "10px",
                        textAlign: "left",
                        maxWidth: "100%",
                        backgroundColor: "#1f1f1f",
                      }}
                    >
                      <button
                        style={{
                          padding: 0,
                          border: "none",
                          background: "none",
                          marginRight: 10,
                        }}
                        onClick={this.exposeMusicPlayer}
                      >
                        <span
                          className="iconify"
                          data-icon="emojione:red-circle"
                          data-inline="false"
                          onClick={this.exposeMusicPlayer}
                        ></span>
                      </button>
                      &nbsp;{" "}
                      <button
                        style={{
                          padding: 0,
                          border: "none",
                          background: "none",
                        }}
                        onClick={this.fadeAbout}
                      >
                        <span
                          className="iconify"
                          data-icon="twemoji:yellow-circle"
                          data-inline="false"
                        ></span>{" "}
                      </button>
                      &nbsp;{" "}
                      <button
                        style={{
                          padding: 0,
                          border: "none",
                          background: "none",
                          marginLeft: 10,
                        }}
                        onClick={this.detailsModalShow}
                      >
                        <span
                          className="iconify"
                          data-icon="twemoji:green-circle"
                          data-inline="false"
                        ></span>
                      </button>
                    </div>
                    <Collapse in={!this.state.fadeAbout}>
                      <div
                        className="font-trebuchet  ml-3 mr-3 rounded"
                        style={{
                          height: "auto",
                          fontSize: "115%",
                          lineHeight: "130%",
                          whiteSpace: "pre-line",
                          verticalAlign: "bottom",
                        }}
                        id="example-fade-text"
                      >
                        <br></br>
                        <div className="container">
                          {/* https://www.bootdey.com/snippets/view/bs5-team-member-details */}
                          <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                              <div className="card border-0 shadow">
                                <img
                                  style={{ margin: "0 auto" }}
                                  width="75%"
                                  src={profilepic}
                                  alt="Avatar"
                                  onClick={this.detailsModalShow}
                                />

                                <div className="card-body p-1-9 p-xl-5">
                                  <div className="mb-4">
                                    <h3 className="h4 mb-0">Thomas Basham</h3>
                                    <span className="text-primary">
                                      Software Developer
                                    </span>
                                  </div>
                                  <ul className="list-unstyled mb-4">
                                    <li className="mb-3">
                                      <a href="mailto: bashamtg@gmail.com">
                                        <i className="far fa-envelope display-25 me-3 text-secondary"></i>
                                        bashamtg@gmail.com
                                      </a>
                                    </li>
                                    <li className="mb-3">
                                      <a href="tel:+02532582526">
                                        <i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>
                                        +253-258-2526
                                      </a>
                                    </li>
                                    <li>
                                      <a href="https://www.google.com/maps/place/Renton,+WA/@47.4814262,-122.2573102,12z/data=!3m1!4b1!4m5!3m4!1s0x549008cc03bb6f23:0xcd42b24716babb9f!8m2!3d47.4796927!4d-122.2079218">
                                        <i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>
                                        Renton, WA, USA
                                      </a>
                                    </li>
                                  </ul>
                                  <ul className="social-icon-style2 ps-0">
                                    <li>
                                      <a
                                        href="https://github.com/thomas-Basham"
                                        target={"_blank"}
                                        rel="noreferrer"
                                        className="rounded-3"
                                        title="Github"
                                      >
                                        <i className="fab fa-github"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.linkedin.com/in/thomas-basham"
                                        target={"_blank"}
                                        rel="noreferrer"
                                        className="rounded-3"
                                        title="LinkedIn"
                                      >
                                        <i className="fab fa-linkedin-in"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://leetcode.com/Thomas-Basham"
                                        target={"_blank"}
                                        rel="noreferrer"
                                        className="rounded-3"
                                        title="LeetCode"
                                      >
                                        <i className="fa-solid fa-code"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-8">
                              <div className="ps-lg-1-6 ps-xl-5">
                                <div className="mb-5 wow fadeIn">
                                  <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className=" mb-0 text-primary">
                                      #About Me
                                    </h2>
                                  </div>
                                  <p
                                    style={{
                                      height: "auto",
                                      // fontSize: "150%",
                                      lineHeight: "120%",
                                      whiteSpace: "pre-line",
                                      verticalAlign: "bottom",
                                    }}
                                  >
                                    Welcome to my portfolio. I`m a software
                                    developer based in the Seattle area.
                                    <br></br>
                                    <br></br>I enjoy making applications that
                                    help others and I'm passionate about the
                                    creative process.
                                    <br></br>
                                    <br></br>
                                    Before learning how to code I was in the
                                    Army, and when I wasn't a soldier, I was a
                                    carpenter.
                                    <br></br>
                                    <br></br>
                                    <h5 className="mb-0 text-primary">
                                      Hobbies:
                                    </h5>
                                    <ul>
                                      <li>Producing music</li>
                                      <li>
                                        Carpentry/Woodworking
                                        <a
                                          href="https://construction-portfolio.vercel.app"
                                          target={"_blank"}
                                          rel="noreferrer"
                                        >
                                          &nbsp;View Gallery
                                        </a>
                                      </li>
                                      <li>Growing plants</li>
                                      <li>Fishing</li>
                                      <li>Hiking</li>
                                      <li>Snowboarding</li>
                                    </ul>
                                  </p>
                                </div>
                                <div className="mb-5 wow fadeIn">
                                  <div className="text-start mb-1-6 wow fadeIn">
                                    {/* <h2 className="mb-0 text-primary">
                                      #Summary
                                    </h2> */}
                                  </div>
                                  <div className="row mt-n4">
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                      <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                          <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
                                          <h3 className="h5 mb-3">Education</h3>
                                          <p className="mb-0">
                                            Certificate in Software Development
                                            in Python and Javascript from Code
                                            Fellows
                                            <br></br>
                                            2022
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                      <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                          <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                                          <h3 className="h5 mb-3">Tools</h3>
                                          <p className="mb-0">
                                            <a
                                              href="https://www.python.org/"
                                              target="blank_"
                                            >
                                              <Icon
                                                icon={pythonIcon}
                                                style={{
                                                  fontSize: "400%",
                                                  margin: "9% 5% 0 5%",
                                                }}
                                              />
                                            </a>
                                            <a
                                              href="https://www.javascript.com/"
                                              target="blank_"
                                            >
                                              <Icon
                                                icon={javascriptIcon}
                                                style={{
                                                  fontSize: "400%",
                                                  margin: "9% 5% 0 5%",
                                                }}
                                              />
                                            </a>
                                            <a
                                              href="https://www.djangoproject.com/"
                                              target="blank_"
                                            >
                                              <Icon
                                                icon={djangoIcon}
                                                style={{
                                                  fontSize: "400%",
                                                  margin: "9% 5% 0 5%",
                                                }}
                                              />
                                            </a>
                                            <a
                                              href="https://reactjs.org/"
                                              target="blank_"
                                            >
                                              <Icon
                                                icon={reactIcon}
                                                style={{
                                                  fontSize: "400%",
                                                  margin: "9% 5% 0 5%",
                                                }}
                                              />
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                      <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                          <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                          <h3 className="h5 mb-3">
                                            Experience
                                          </h3>
                                          <p className="mb-0">
                                            4 years in the Army.
                                            <br></br>6 years working as a
                                            Carpenter.
                                            <br></br>1 year developing web
                                            applications
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="wow fadeIn">
                                  <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="mb-0 text-primary">
                                      #Skills &amp; Experience
                                    </h2>
                                  </div>
                                  <p>
                                    This summary was generated with AI by{" "}
                                    <a
                                      href="https://chat.openai.com/chat"
                                      target={"_blank"}
                                      rel="noreferrer"
                                    >
                                      ChatGPT
                                    </a>
                                    :
                                  </p>
                                  <p className="mb-4">
                                    Thomas Basham is a full-stack software
                                    developer with a strong background in Python
                                    and JavaScript development. He has
                                    experience with a range of frameworks and
                                    tools, including Django, Flask, React.js,
                                    Next.js, Pandas, Numpy, MongoDB, GitHub,
                                    Git, and more. He is passionate about user
                                    experience, data management, and writing
                                    clean, readable code.
                                    <br></br>
                                    <br></br>
                                    Thomas has completed a number of projects,
                                    including Collab Done, a social media web
                                    app used to help musicians connect and
                                    collaborate, and Trout Finder, an app that
                                    displays current statistics on the amount of
                                    trout fish in the various lakes in
                                    Washington State.
                                    <br></br>
                                    <br></br>
                                    Thomas has received a certificate in
                                    software development in Python and a
                                    certificate in software development in
                                    full-stack JavaScript from Code Fellows, and
                                    a certificate in music production from ICON
                                    Collective School of Music.
                                    <br></br>
                                    <br></br>
                                    In addition to his technical skills, Thomas
                                    has experience working as a lead carpenter
                                    for Westmark Construction, where he
                                    performed various carpentry tasks with a
                                    team of 1 to 3 carpenters on commercial
                                    buildings totaling more than $800,000 of
                                    work/repairs annually. He has also served as
                                    a sergeant in the US Army, where he trained
                                    and mentored a team of 6 to conduct field
                                    training on base and missions in
                                    Afghanistan, and was accountable for over
                                    $1m worth of government equipment stateside
                                    and overseas with zero losses.
                                  </p>
                                  {/* <div className="progress-style1">
                                    <div className="progress-text">
                                      <div className="row">
                                        <div className="col-6 fw-bold">
                                          Wind Turbines
                                        </div>
                                        <div className="col-6 text-end">70%</div>
                                      </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3 mb-4">
                                      <div
                                        className="animated custom-bar progress-bar slideInLeft"
                                        style={{ width: "70%" }}
                                        aria-valuemax="100"
                                        aria-valuemin="0"
                                        aria-valuenow="10"
                                        role="progressbar"
                                      ></div>
                                    </div>
                                    <div className="progress-text">
                                      <div className="row">
                                        <div className="col-6 fw-bold">
                                          Solar Panels
                                        </div>
                                        <div className="col-6 text-end">90%</div>
                                      </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3 mb-4">
                                      <div
                                        className="animated custom-bar progress-bar bg-secondary slideInLeft"
                                        style={{ width: "90%" }}
                                        aria-valuemax="100"
                                        aria-valuemin="0"
                                        aria-valuenow="70"
                                        role="progressbar"
                                      ></div>
                                    </div>
                                    <div className="progress-text">
                                      <div className="row">
                                        <div className="col-6 fw-bold">
                                          Hybrid Energy
                                        </div>
                                        <div className="col-6 text-end">80%</div>
                                      </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3">
                                      <div
                                        className="animated custom-bar progress-bar bg-dark slideInLeft"
                                        style={{ width: "80%" }}
                                        aria-valuemax="100"
                                        aria-valuemin="0"
                                        aria-valuenow="70"
                                        role="progressbar"
                                      ></div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            ) : (
              <ReactPlayer url="https://soundcloud.com/theheadandtheheart/lost-in-my-mind" />
            )}
          </div>
        </div>
        <AboutMeDetailsModal
          show={this.state.detailsModalShow}
          onHide={this.detailsModalClose}
          fadeAbout={this.fadeAbout}
          fadeAboutState={this.state.fadeAbout}
          about={about}
          hello={hello}
        />
      </section>
    );
  }
}

export default About;
