import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButtonAutho from "./LoginButtonAutho";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class ProjectDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // counter: 0,
    };
  }
  handleLikes = (e) => {
    e.preventDefault();
    let updatedProject = {
      // project: this.props.currentProject.project,
      likes: (this.props.currentProject.likes += 1),
      likedBy: this.props.auth0.user.name,
      _id: this.props.currentProject._id,
    };
    this.setState({
      counter: this.props.currentProject.likes,
      likedBy: this.props.currentProject.likedBy.push(updatedProject.likedBy),
    });
    this.props.updateProject(updatedProject);
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
    // this.setState({
    //   comments: this.props.comments,
    // });

    this.props.postComment(postedComment);
  };

  handleUpdateComment = (e) => {
    e.preventDefault();
    let postedComment = {
      project: this.props.commentData.project,
      user: this.props.commentData.user,
      userEmail: this.props.commentData.userEmail,
      text:  e.target.comment.value,
      updated: new Date(),
      _id: this.props.commentData._id,
      __V: this.props.commentData.__v ,
    };
    this.setState({
      comments: this.props.comments,
    });

    this.props.updateComment(postedComment);

    this.props.hideEditCommentForm()
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
          <Button onClick={this.handleLikes}>
            ❤️{this.props.currentProject.likes}
          </Button>
        );
      } else {
        return <p>❤️{this.props.currentProject.likes}</p>;
      }
    };

    let editCommentButton = (commentData) => {
      if (this.props.auth0.isAuthenticated) {
        console.log(commentData.user === this.props.auth0.user.name);
        if (
          commentData.user === this.props.auth0.user.name &&
          this.props.showCommentUpdateForm === false
        ) {
          return (
            <>
              <button
                onClick={() => this.props.showEditCommentForm(commentData)}
                style={{ padding: 0, border: "none", background: "none" }}
              >
                <img
                  alt="edit icon"
                  src="https://img.icons8.com/nolan/64/edit--v1.png"
                  width={20}
                />
              </button>
            </>
          );
        }
      }
    };

    let editCommentForm = (commentData) => {
      if (this.props.showCommentUpdateForm === true) {
        return (
          <form onSubmit={this.handleUpdateComment}>
            <input required placeholder={this.props.commentData.text} id="comment" type="text" className="w-100"></input>
            <Button  className="w-100" variant="outline-primary" type="submit">
              Comment
            </Button>
          </form>
        );
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
    const filteredComments = this.props.comments.filter(
      (comments) => this.props.currentProject.project === comments.project
    );

    let comments = filteredComments.map((commentData) => {
      if (this.props.showCommentUpdateForm === false){
        return (
          <div key={commentData._id}>
            <h2 className="font-weight-bold">{commentData.user}</h2>
            <p>{new Date(commentData.updated).toLocaleString()}</p>
            {editCommentButton(commentData)}
            <p>{commentData.text}</p>
          </div>
        );}
    });

    // const filteredResources = this.props.currentProject.likedBy.filter(resource => this.props.auth0.user == resource)

    console.log(
      "props.showCommentUpdateForm: ",
      this.props.showCommentUpdateForm
    );
    console.log("PROPS.CURRENTPROJECT: ", this.props.currentProject);
    // console.log("FILTEREDDD: ", filteredComments);

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
              <span
                className="iconify slider-iconfiy"
                data-icon="emojione:red-circle"
                data-inline="false"
                style={{ marginLeft: "5px" }}
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:yellow-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </div>
            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
            >
              {img}
            </AwesomeSlider>
          </div>
          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </a>
              ) : null}
            </h3>

            <p className="modal-description"> {description}</p>

            <div className="col-md-12 text-center">
              <form>{likeButton()}</form>
              {this.props.auth0.isAuthenticated ? (
                <form onSubmit={this.handleComments}>
                  <input
                    required
                    id="comment"
                    type="text"
                    className="w-100"
                  ></input>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                  >
                    Comment
                  </Button>
                </form>
              ) : (
                <LoginButtonAutho />
              )}
              <p>Comments:</p>
              {comments}
              {editCommentButton}
              {editCommentForm()}
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withAuth0(ProjectDetailsModal);
