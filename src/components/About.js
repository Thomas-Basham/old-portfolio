import React, { Component } from "react";
import { Icon } from "@iconify/react";
import reactIcon from "@iconify/icons-logos/react";
import pythonIcon from "@iconify/icons-logos/python";
import djangoIcon from "@iconify/icons-logos/django-icon";
import javascriptIcon from "@iconify/icons-logos/javascript";
import AboutMeDetailsModal from "./AboutMeDetailsModal";
import Collapse from "react-bootstrap/Collapse";
import ReactPlayer from "react-player";

class About extends Component {
  constructor(props) {
    // this.audioInstance = null
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
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }
    return (
      <section id="about">
        <div className="col-md-12">
          <h1 className="section-title">
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto padding-bottom-10">
            <div className="col-md-4 mb-5  center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <img
                    style={{ margin: "0 auto" }}
                    height="100px"
                    src={profilepic}
                    alt="Avatar placeholder"
                    onClick={this.detailsModalShow}
                  />
                  <a href="https://www.python.org/" target="blank_">
                    <Icon
                      icon={pythonIcon}
                      style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                    />
                  </a>
                  <a href="https://www.javascript.com/" target="blank_">
                    <Icon
                      icon={javascriptIcon}
                      style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                    />
                  </a>
                  <a href="https://www.djangoproject.com/" target="blank_">
                    <Icon
                      icon={djangoIcon}
                      style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                    />
                  </a>
                  <a href="https://reactjs.org/" target="blank_">
                    <Icon
                      icon={reactIcon}
                      style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                    />
                  </a>
                </span>
              </div>
            </div>
            {!this.state.exposeMusicPlayer ? (
              <div className="col-md-8 center rounded ">
                <div className="col-md-10 rounded">
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
                          fontSize: "150%",
                          lineHeight: "180%",
                          whiteSpace: "pre-line",
                          verticalAlign: "bottom",
                        }}
                        id="example-fade-text"
                      >
                        <br />
                        <span className="wave">{hello} </span>
                        <br />
                        <br />

                        {about}

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
