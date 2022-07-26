import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

class ProjectDetailsModal extends Component {


  handleProjectUpdate = (e) => {
    e.preventDefault();
    let updatedProject = {
      project: e.target.project.value,
      _id: this.props.currentProjectMongo._id,
    }
    this.props.updateProject(updatedProject);
    this.props.onHide()
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
          <form className="mt-2 w-50" onSubmit={this.handleProjectUpdate}>
            <input id="project" type="text" placeholder={this.props.currentProjectMongo ? this.props.currentProjectMongo.project : 'undefined'} className="w-100"></input>
            <Button className="w-100" variant="outline-primary" type="submit">
              Update
            </Button>
          </form>
      <p>{this.props.currentProjectLocal.title}</p>
      </Modal>
    );
  }
}

export default withAuth0(ProjectDetailsModal);
