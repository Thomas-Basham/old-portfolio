import React, { Component } from "react";
import GitHubCalendar from 'react-github-calendar';
class Footer extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class} title={network.name}></i>
            </a>
          </span>
        );
      });
    }

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col social-links">{networks}</div>
            <div className="col">
              <div
                onClick={() =>
                  this.props.applyPickedLanguage(
                    window.$primaryLanguage,
                    window.$secondaryLanguageIconId
                  )
                }
                style={{ display: "inline" }}
              >
                <span
                  className="iconify language-icon mr-5"
                  data-inline="false"
                  id={window.$primaryLanguageIconId}
                ></span>
              </div>
              <div
                onClick={() =>
                  this.props.applyPickedLanguage(
                    window.$secondaryLanguage,
                    window.$primaryLanguageIconId
                  )
                }
                style={{ display: "inline" }}
              >
                <span
                  className="iconify language-icon"
                  data-inline="false"
                  id={window.$secondaryLanguageIconId}
                ></span>
                <GitHubCalendar username="thomas-basham" />
              </div>
            </div>
            <div className="col">
              <div className="copyright py-4 text-center">
                <div className="container">
                  <small>
                    Copyright &copy;{" "}
                    {this.props.sharedBasicInfo
                      ? this.props.sharedBasicInfo.name
                      : "???"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
