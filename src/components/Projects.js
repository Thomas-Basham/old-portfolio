import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButtonAutho from "./LoginButtonAutho";
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      projectData: [].reverse(),
      currentProject: {},
      comments: [],
      showCommentUpdateForm: false,
      showReplyForm: false,
    };
  }

  getProjects = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/project`;
      let projects = await axios.get(url);
      this.setState({
        projectData: projects.data.reverse(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  getComments = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/Comment`;
      let comments = await axios.get(url);
      this.setState({
        comments: comments.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getProjects();
    this.getComments();
  }

  postComment = async (newComment) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/comment`;
      let createdComment = await axios.post(url, newComment);
      this.setState({
        comments: [...this.state.comments, createdComment.data],
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  updateComment = async (updatedComment) => {
    try {
      let id = updatedComment._id;
      let url = `${process.env.REACT_APP_SERVER}/comment/${id}`;
      let request = await axios.put(url, updatedComment);
      let newComments = this.state.comments.map((element) => {
        return element._id === id ? request.data : element;
      });
      this.setState({
        comments: newComments,
      });
    } catch (error) {
      console.log("we have an error:", error);
    }
  };

  deleteComment = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/comment/${id}`;
      await axios.delete(url);
      let updatedComments = this.state.comments.filter(
        (comment) => comment._id !== id
      );
      this.setState({
        comments: updatedComments,
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  showEditCommentForm = (commentData) => {
    this.setState({ commentData: commentData });
    this.setState({ showCommentUpdateForm: true });
  };
  hideEditCommentForm = () => {
    this.setState({ showCommentUpdateForm: false });
  };

  showReplyForm = (commentData) => {
    this.setState({ commentData: commentData });
    this.setState({ showReplyForm: true });
  };

  hideReplyForm = () => {
    this.setState({ showReplyForm: false });
  };

  render() {

    let detailsModalShow = (data, currentProject) => {
      this.setState({
        detailsModalShow: true,
        deps: data,
        currentProject: currentProject,
      });
    };

    let detailsModalClose = () =>
      this.setState({
        detailsModalShow: false,
        showCommentUpdateForm: false,
        showReplyForm: false,
      });
    let projectData = this.state.projectData;

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects.map(function (projects, i) {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div
                className="foto"
                onClick={() => detailsModalShow(projects, projectData[i])}
              >
                <div>
                  <img
                    src={projects.images[0]}
                    alt="projectImages"
                    height="230"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      position: "relative",
                    }}
                  />
                  <span className="project-date">{projects.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {projects.title}
                  </p>
                </div>
              </div>
            </span>
          </div>
        );
      });
    }
    let welcomeMessage = () => {
      if (this.props.auth0.isAuthenticated) {
        return (
          <p id="welcome-message" className="text-white text-center display-4">
            Thanks for logging in, {this.props.auth0.user.given_name}
          </p>
        );
      }
    };
    return (
      <section id="portfolio">
        {this.props.auth0.isAuthenticated && welcomeMessage()}
        <div className="col-md-12">
          <h1 className="section-title">
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          {!this.props.auth0.isAuthenticated && (
            <LoginButtonAutho className="mt-5" style={{ paddingTop: 20 }} />
          )}

          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            showEditCommentForm={this.showEditCommentForm}
            showCommentUpdateForm={this.state.showCommentUpdateForm}
            data={this.state.deps}
            currentProject={this.state.currentProject}
            updateProject={this.updateProject}
            comments={this.state.comments}
            postComment={this.postComment}
            updateComment={this.updateComment}
            commentData={this.state.commentData}
            hideEditCommentForm={this.hideEditCommentForm}
            showReplyForm={this.showReplyForm}
            hideReplyForm={this.hideReplyForm}
            showReplyFormState={this.state.showReplyForm}
            deleteComment={this.deleteComment}
          />
        </div>
      </section>
    );
  }
}

export default withAuth0(Projects);
