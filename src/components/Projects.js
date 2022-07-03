import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButtonAutho from "./LoginButtonAutho";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProjectLocal: {},
      projectDataMongo: [].reverse(),
      currentProjectMongo: {},
      comments: [],
      showCommentUpdateForm: false,
      showReplyForm: false,
      showIframe: false,
      showDetailsModal: false,
      fadeAbout: false,
    };
  }

  getProjects = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/project`;
      let projects = await axios.get(url);
      this.setState({
        projectDataMongo: projects.data.reverse(), // reversed so that when I add JSON data and mongodb data the indexes align
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

  postProject = async (newProject) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/project`;
      let request = await axios.post(url, newProject);
      this.setState({
        projectDataMongo: [...this.state.projectDataMongo, request.data],
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  updateProject = async (updatedProject) => {
    try {
      let id = updatedProject._id;
      let url = `${process.env.REACT_APP_SERVER}/project/${id}`;
      let request = await axios.put(url, updatedProject);
      let newProjects = this.state.project.map((element) => {
        return element._id === id ? request.data : element;
      });
      this.setState({
        projectDataMongo: newProjects,
      });
    } catch (error) {
      console.log("we have an error:", error);
    }
  };

  postComment = async (newComment) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/comment`;
      let request = await axios.post(url, newComment);
      this.setState({
        comments: [...this.state.comments, request.data],
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

  imageGalleryData = () => {
    return this.state.currentProjectLocal.images.map((image) => {
      return { original: image };
    });
  };
  render() {
    let fadeAbout = () => {
      this.setState({
        fadeAbout: !this.state.fadeAbout,
      });
    };
    let showAbout = () => {
      this.setState({
        fadeAbout: false,
      });
    };
    let showIframe = () => {
      this.setState({
        showIframe: !this.state.showIframe,
        fadeAbout: false,
      });
    };
    let showDetailsModal = (data, currentProjectMongo) => {
      this.setState({
        showDetailsModal: true,
        currentProjectLocal: data,
        currentProjectMongo: currentProjectMongo,

        showIframe: false,
      });
    };

    let detailsModalClose = () =>
      this.setState({
        showDetailsModal: false,
        showCommentUpdateForm: false,
        showReplyForm: false,
        fadeAbout: false,
      });

    let projectDataMongo = this.state.projectDataMongo;

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
                onClick={() => showDetailsModal(projects, projectDataMongo[i])}
              >
                <div>
                  <img
                    src={projects.images[0]}
                    alt="projectImages"
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
          <p
            id="welcome-message"
            className="text-white text-center display-4"
            style={{ fontSize: "1.3vmax" }}
          >
            Thanks for logging in, {this.props.auth0.user.given_name}
          </p>
        );
      }
    };

    let loginButton = () => {
      if (
        !this.props.auth0.isAuthenticated &&
        this.state.projectDataMongo.length > 3
      ) {
        return <LoginButtonAutho className="mt-5" style={{ paddingTop: 20 }} />;
      }
    };
    return (
      <section id="portfolio">
        {this.props.auth0.isAuthenticated && welcomeMessage()}
        <div className="col-md-12">
          <h1 className="section-title">
            <span>{sectionName}</span>
            <p
              id="welcome-message"
              className="text-white text-center display-4"
              style={{ fontSize: "1vmax", marginTop: "1vmax" }}
            >
              Click an image to view more details
            </p>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>

          {loginButton()}

          <ProjectDetailsModal
            show={this.state.showDetailsModal}
            onHide={detailsModalClose}
            showEditCommentForm={this.showEditCommentForm}
            showCommentUpdateForm={this.state.showCommentUpdateForm}
            currentProjectLocal={this.state.currentProjectLocal}
            currentProjectMongo={this.state.currentProjectMongo}
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
            fadeAbout={fadeAbout}
            fadeAboutState={this.state.fadeAbout}
            showAbout={showAbout}
            showIframe={showIframe}
            showIframeState={this.state.showIframe}
          />
        </div>
      </section>
    );
  }
}

export default withAuth0(Projects);
