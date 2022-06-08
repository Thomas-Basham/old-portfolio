import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

class ProjectDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: null
    };
  }
  handleSubmit = (e) => {
    // e.preventDefault()
    let updatedProject = {
      project: this.props.currentProject.project ,
      likes: this.props.currentProject.likes + 1,
      likedBy: this.props.currentProject.likedBy,
      comments: this.props.currentProject.comments ,
      _id: this.props.currentProject._id,
      __v: this.props.currentProject.__v
    }
    this.setState({
      counter: this.props.currentProject.likes + 1
    })
    this.props.updateProject(updatedProject);
  }
  componentDidMount() {
    this.setState(
      {counter: this.props.currentProject.likes}
    )
  }  
  render() {
    console.log(this.props.currentProject.likes);
    console.log(this.state.counter);
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
        // var prjcts = this.props.currentProject.map((elem) => {
        //   // console.log(`ELEMENT: {elem}`)
        //   return (
        //     <>
        //       <div>Likes: {elem.likes}</div>
        //     </>
        //   );
        // });
      }
    }
    console.log(this.state.counter)
    console.log(this.props.currentProject)
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

            {/* TODO: Add crud for user likes */}

            <p className="modal-description"> {description}</p>
            <div className="col-md-12 text-center">
              <form>
            <button onClick={this.handleSubmit}>❤️{this.props.currentProject.likes}</button>
            </form>
            <p>Comments: {this.props.currentProject.comments}</p>
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;
