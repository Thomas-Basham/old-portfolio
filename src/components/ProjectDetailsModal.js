import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { withAuth0 } from "@auth0/auth0-react";
import LoginButtonAutho from "./LoginButtonAutho";
import LoginButtonAuthoRedIcon from "./LoginButtonAuthoRedIcon";
import Button from "react-bootstrap/Button";
import emailjs from "@emailjs/browser";

class ProjectDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLikes = (e) => {
    e.preventDefault();
    let updatedProject = {
      likes: (this.props.currentProject.likes += 1),
      likedBy: this.props.auth0.user.name,
      _id: this.props.currentProject._id,
    };
    this.setState({
      counter: this.props.currentProject.likes,
      likedBy: this.props.currentProject.likedBy.push(updatedProject.likedBy),
    });
    this.props.updateProject(updatedProject);
    this.sendNotificationEmail(e, "like");
  };

  serverID = process.env.REACT_APP_EMAIL_JS_SERVER_ID;
  commentTemplateID = process.env.REACT_APP_EMAIL_JS_COMMENT_TEMPLATE_ID;
  likeTemplateID = process.env.REACT_APP_EMAIL_JS_LIKE_TEMPLATE_ID;
  publicKey = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;
  sendNotificationEmail = (e, commentOrLike) => {
    let templateParams = {};
    let templateID = "";
    if (commentOrLike === "comment") {
      templateParams = {
        from_name: this.props.auth0.user.name,
        comment: e.target.comment.value,
        project: this.props.data.title,
      };
      templateID = this.commentTemplateID;
    }
    if (commentOrLike === "like") {
      templateParams = {
        from_name: this.props.auth0.user.name,
        project: this.props.data.title,
      };
      templateID = this.likeTemplateID;
    }

    emailjs
      .send(this.serverID, templateID, templateParams, this.publicKey)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  handleComments = (e) => {
    e.preventDefault();
    let postedComment = {
      project: this.props.currentProject.project,
      user: this.props.auth0.user.name,
      userEmail: this.props.auth0.user.email,
      text: e.target.comment.value,
      updated: new Date(),
    };
    this.props.postComment(postedComment);
    this.sendNotificationEmail(e, "comment");
  };

  handleUpdateComment = (e) => {
    e.preventDefault();

    let postedComment = {
      project: this.props.commentData.project,
      user: this.props.commentData.user,
      userEmail: this.props.commentData.userEmail,
      text: e.target.comment.value,
      updated: new Date(),
      _id: this.props.commentData._id,
      __V: this.props.commentData.__v,
    };
    this.setState({
      comments: this.props.comments,
    });

    this.props.updateComment(postedComment);

    this.props.hideEditCommentForm();
    
    // e.target.reset()

  };

  handleReplyComment = (e) => {
    e.preventDefault();
    let postedComment = {
      project:
        this.props.currentProject.project + "." + this.props.commentData._id,
      user: this.props.auth0.user.name,
      userEmail: this.props.auth0.user.email,
      text: e.target.comment.value,
      updated: new Date(),
    };
    this.props.postComment(postedComment);
    this.props.hideReplyForm();
    this.sendNotificationEmail(e, "comment");
    // e.target.reset()
  };

  componentDidMount() {
    this.setState({ counter: this.props.currentProject.likes });
    this.setState({ comments: this.props.comments });
    this.setState({ likedBy: this.props.currentProject.likedBy });
  }
  render() {
    let likeButton = () => {
      if (
        this.props.auth0.isAuthenticated &&
        this.props.currentProject.likedBy &&
        !this.props.currentProject.likedBy.includes(this.props.auth0.user.name)
      ) {
        return (
          <Button style={{ float: "left" }} onClick={this.handleLikes}>
            ❤️{this.props.currentProject.likes}
          </Button>
        );
      } else {
        return <p className="text-left">❤️{this.props.currentProject.likes}</p>;
      }
    };

    let commentFormOrLoginButton = () => {
      if (
        this.props.auth0.isAuthenticated &&
        this.props.showReplyFormState === false &&
        this.props.showCommentUpdateForm === false
      )
        return (
          <form onSubmit={this.handleComments}>
            <input required id="comment" type="text" className="w-100"></input>
            <Button className="w-100" variant="outline-primary" type="submit">
              Comment
            </Button>
          </form>
        );
      else if (!this.props.auth0.isAuthenticated) return <LoginButtonAutho />;
    };

    let editCommentButton = (commentData, alignLeft) => {
      if (this.props.auth0.isAuthenticated) {
        if (
          commentData.user === this.props.auth0.user.name &&
          this.props.showCommentUpdateForm === false
        ) {
          if (alignLeft === true) {
            return (
              <button
                onClick={() => this.props.showEditCommentForm(commentData)}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  float: "left",
                }}
              >
                <img
                  alt="edit icon"
                  src="https://img.icons8.com/nolan/64/edit--v1.png"
                  width={20}
                />
              </button>
            );
          } else
            return (
              <button
                onClick={() => this.props.showEditCommentForm(commentData)}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  textAlign: "right",
                  float: "right",
                }}
              >
                <img
                  alt="edit icon"
                  src="https://img.icons8.com/nolan/64/edit--v1.png"
                  width={20}
                />
              </button>
            );
        }
      }
    };

    let deleteCommentButton = (commentData, alignLeft) => {
      if (this.props.auth0.isAuthenticated) {
        if (commentData.user === this.props.auth0.user.name) {
          if (alignLeft === true) {
            return (
              <button
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  textAlign: "left",
                }}
                onClick={() => this.props.deleteComment(commentData._id)}
              >
                {" "}
                <svg
                  style={{ width: "5%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            );
          } else
            return (
              <button
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  textAlign: "right",
                }}
                onClick={() => this.props.deleteComment(commentData._id)}
              >
                {" "}
                <svg
                  style={{ width: "5%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            );
        }
      }
    };

    let editCommentForm = () => {
      if (this.props.showCommentUpdateForm === true) {
        return (
          <form onSubmit={this.handleUpdateComment}>
            <input
              required
              placeholder={this.props.commentData.text}
              defaultValue={this.props.commentData.text}
              id="comment"
              type="text"
              className="w-100"
            ></input>
            <Button className="w-100" variant="outline-primary" type="submit">
              Comment
            </Button>
          </form>
        );
      }
    };

    let replyCommentForm = (commentData) => {
      if (
        this.props.showReplyFormState === true &&
        this.props.commentData._id === commentData._id
      ) {
        return (
          <form className="mt-2 w-50" onSubmit={this.handleReplyComment}>
            <input required id="comment" type="text" className="w-100"></input>
            <Button className="w-100" variant="outline-primary" type="submit">
              Comment
            </Button>
          </form>
        );
      }
    };

    let replyButton = (commentData) => {
      if (
        this.props.showReplyFormState === false &&
        this.props.auth0.isAuthenticated
      )
        return (
          <Button onClick={() => this.props.showReplyForm(commentData)}>
            Reply
          </Button>
        );
    };

    const filteredComments = this.props.comments.filter(
      (comments) => this.props.currentProject.project === comments.project
    );
    console.log(this.props.currentProject)
    let filteredReplies = (commentData) => {
      if (commentData) {
        let replyID =
          this.props.currentProject.project + "." + commentData._id.toString();

        let filtered = this.props.comments.filter(
          (comments) => replyID === comments.project
        );

        return filtered.map((commentData) => {
          return (
            <div
              className="border-bottom w-50 text-right float-right"
              key={commentData._id}
              style={{
                padding: 10,
              }}
            >
              <h2 className="font-weight-bold m-0">{commentData.user}</h2>
              <p
                className="text-secondary"
                style={{ fontSize: "70%", marginTop: 0 }}
              >
                {new Date(commentData.updated).toLocaleString()}
              </p>
              <p className="mt-2 ">{commentData.text}</p>
              {editCommentButton(commentData, false)}
              {deleteCommentButton(commentData, false)}
            </div>
          );
        });
      }
    };
    let comments = () => {
      if (this.props.showCommentUpdateForm === false) {
        return filteredComments.map((commentData) => {
          return (
            <div
              id={commentData._id}
              style={{
                textAlign: "left",
                padding: 10,
              }}
              key={commentData._id}
            >
              <h2 className="font-weight-bold m-0">{commentData.user}</h2>
              <p
                className="text-secondary"
                style={{ fontSize: "70%", marginTop: 0 }}
              >
                {new Date(commentData.updated).toLocaleString()}
              </p>
              {deleteCommentButton(commentData, true)}
              {editCommentButton(commentData, true)}
              <p className="mt-2 w-50">{commentData.text}</p>
              {replyButton(commentData)}
              {replyCommentForm(commentData)}
              {filteredReplies(commentData)}
            </div>
          );
        });
      }
    };

    if (this.props.data) {
      const technologies = this.props.data.technologies;
      const images = this.props.data.images;
      var title = this.props.data.title;
      var description = this.props.data.description;
      var url = this.props.data.url;
      if (this.props.data.technologies) {
        var tech = technologies.map((icons, i) => {
          return (
            <li className="list-inline-item mx-3" key={i}>
              <span>
                <div className="text-center">
                  <i className={icons.class} style={{ fontSize: "300%" }}>
                    <p className="text-center" style={{ fontSize: "30%" }}>
                      {icons.name}
                    </p>
                  </i>
                </div>
              </span>
            </li>
          );
        });
        if (this.props.data.images) {
          var img = images.map((elem, i) => {
            return (
              <div
                style={{ marginInline: "auto", position: "relative" }}
                key={i}
                data-src={elem}
              />
            );
          });
        }
      }
    }
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div
            className="col-md-10 mx-auto"
            style={{ paddingBottom: "50px", textAlign: "center" }}
          >
            <div className="slider-tab">
              <button
                onClick={this.props.onHide}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  marginRight: 10,
                }}
              >
                <span
                  className="iconify slider-iconfiy"
                  data-icon="emojione:red-circle"
                  data-inline="false"
                  style={{ marginLeft: "5px" }}
                ></span>{" "}
              </button>
              &nbsp;{" "}
              <button
                onClick={this.props.onHide}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  marginRight: 10,
                }}
              >
                <span
                  className="iconify slider-iconfiy"
                  data-icon="twemoji:yellow-circle"
                  data-inline="false"
                ></span>{" "}
              </button>
              &nbsp; <LoginButtonAuthoRedIcon />
            </div>
            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
            >
              {img}
            </AwesomeSlider>
          </div>
          <div className="col-md-10 mx-auto ">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                 <p style={{fontSize: 11}}>{url}</p> 
                  {/* <i
                    className="fas fa-external-link-alt"
                    style={{ marginLeft: "10px" }}
                  ></i> */}
                </a>
              ) : null}
            </h3>

            <p className="modal-description"> {description}</p>
            <ul className="list-inline mx-auto">{tech}</ul>

            <div className="col-md-12 text-center">
              {likeButton()}
              {commentFormOrLoginButton()}
              {comments()}
              {editCommentButton}
              {editCommentForm()}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withAuth0(ProjectDetailsModal);
