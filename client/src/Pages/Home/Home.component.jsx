import React from "react";
import { connect } from "react-redux";
import HeaderComponent from "../../Components/Header/Header.component";
import { Button } from "@material-ui/core";
import TextOutputField from "../../Components/TextOutputField/TextOutputField.component";
import FormInput from "../../Components/FormInput/FormInput.component";
import { selectUrlsList } from "../../Redux/Url/url.selector";
import { createStructuredSelector } from "reselect";
import { getShortUrlFromServer } from "../../Redux/Url/url.action";

class Home extends React.Component {
  state = {
    originalUrl: "",
    userDefinedShortenedUrl: "",
    showShortUrlInput: false
  };

  getCurrentShortUrl = () => {
    const url = this.props.urls.find(urlData => {
      if (urlData) {
        return urlData.originalUrl === this.state.originalUrl;
      }
    });
    if (url) return url.shortenedUrl;
    else return "";
  };

  handleChange = property => event => {
    this.setState({ [property]: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="header">
          <HeaderComponent />
        </div>
        <div className="url">
          <div className="url-row">
            <FormInput
              id="original-url"
              name="originalUrl"
              type="text"
              value={this.state.originalUrl}
              handleChange={this.handleChange("originalUrl")}
            />
            <Button
              onClick={() => {
                this.props.dispatch(
                  getShortUrlFromServer({
                    originalUrl: this.state.originalUrl
                  })
                );
              }}
            >
              Generate Random
            </Button>
          </div>
          <div>
            <span
              onClick={() =>
                this.setState({
                  showShortUrlInput: !this.state.showShortUrlInput
                })
              }
            >
              Make your Own
            </span>
          </div>
          {this.state.showShortUrlInput ? (
            <div className="url-row">
              <FormInput
                id="userDefinedShortenedUrl"
                name="userDefinedShortUrl"
                type="text"
                value={this.state.userDefinedShortenedUrl}
                handleChange={this.handleChange("userDefinedShortenedUrl")}
              />
              <Button
                onClick={() => {
                  this.props.dispatch(
                    getShortUrlFromServer({
                      originalUrl: this.state.originalUrl,
                      suggestedShortUrl: this.state.userDefinedShortenedUrl
                    })
                  );
                }}
              >
                Generate!
              </Button>
            </div>
          ) : null}
          {/* </div> */}
          <TextOutputField value={`${this.getCurrentShortUrl()}`} />
        </div>
        <div className="user-url-list">
          {this.props.urls.map(url => {
            return (
              <div>
                <TextOutputField value={url.originalUrl} />
                <TextOutputField value={url.shortenedUrl} />
              </div>
            );
          })}
        </div>
        <div className="url-analytics"></div>
        <div className="footer"></div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  urls: selectUrlsList
});

export default connect(mapStateToProps)(Home);
