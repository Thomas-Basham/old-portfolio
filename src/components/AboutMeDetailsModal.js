import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

class AboutMeDetailsModal extends Component {
  closeModalAndFade = () => {
    this.props.onHide();
    this.props.fadeAbout();
  };

  render() {
    return (
      <Modal {...this.props}>
        <div className="card w-100 h-100 rounded ">
          <div
            className="card-header modal-buttons"
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
              onClick={this.props.onHide}
            >
              <span
                className="iconify"
                data-icon="emojione:red-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
            </button>
            <button
              style={{
                padding: 0,
                border: "none",
                background: "none",
              }}
              onClick={this.props.fadeAbout}
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
              onClick={this.props.detailsModalShow}
            >
              <span
                className="iconify"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </button>
          </div>

          <Collapse in={!this.props.fadeAboutState}>
            <div
              className="card-text font-trebuchet  ml-3 mr-3"
              style={{
                height: "auto",
                fontSize: "150%",
                lineHeight: "230%",
              }}
            >
              <br />
              <span className="wave">{this.props.hello} </span>
              <br />
              <br />
              {this.props.about}
              <br />
            </div>
          </Collapse>
        </div>
      </Modal>
    );
  }
}

export default AboutMeDetailsModal;
