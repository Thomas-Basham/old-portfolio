import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class AboutMeDetailsModal extends Component {
  render() {
    return (
      <Modal {...this.props}>
        <div className="center w-100  w-100 h-100"

        >
          <div className="center  w-100 h-100">
            <div className="card w-100 h-100">
              <div className="card-header">
              <button
                  style={{
                    padding: "0",
                    margin: "0",
                    border: "none",
                    textDecoration: "none",
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
                    padding: "0",
                    margin: "0",
                    border: "none",
                    textDecoration: "none",
                  }}
                  onClick={this.props.onHide}
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
                    padding: "0",
                    margin: "0",
                    border: "none",
                    textDecoration: "none",
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
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AboutMeDetailsModal;
