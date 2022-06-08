import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import axios from "axios";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      projectLikes: [],
      currentProject: {},
    };
  }

  getProjects = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/project`;
      let projects = await axios.get(url);
      this.setState({
        projectLikes: projects.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getProjects();
  }

  postProject = async (newProject) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/project`;
      let createdProject = await axios.post(url, newProject);
      this.setState({
        projectLikes: [...this.state.projects, createdProject.data],
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  updateProject = async (updatedProject) => {
    try {
      let id = updatedProject._id;
      let url = `${process.env.REACT_APP_SERVER}/project/${id}`;
      let rebornProject = await axios.put(url, updatedProject);
      let newProjects = this.state.project.map((element) => {
        return element._id === updatedProject._id
          ? rebornProject.data
          : element;
      });
      this.setState({
        projectLikes: newProjects,
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  render() {
    let detailsModalShow = (data, currentProject) => {
      this.setState({
        detailsModalShow: true,
        deps: data,
        currentProject: currentProject,
      });
    };
    const projectLikes = this.state.projectLikes;



    let detailsModalClose = () => this.setState({ detailsModalShow: false });
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
                onClick={() => detailsModalShow(projects, projectLikes[i])}
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

    console.log(JSON.stringify(projectLikes[0]));
    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
            currentProject={this.state.currentProject}
            updateProject={this.updateProject}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
