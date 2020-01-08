import React from "react";
import { connect } from "react-redux";
import HeaderComponent from "../../Components/Header/Header.component";
import { Button } from "@material-ui/core";
import TextOutputField from "../../Components/TextOutputField/TextOutputField.component";
import FormInput from "../../Components/FormInput/FormInput.component";
import { selectUrlsList, selectUrlError } from "../../Redux/Url/url.selector";
import { createStructuredSelector } from "reselect";
import { getShortUrlFromServer } from "../../Redux/Url/url.action";
import UrlPieChart from "../../Components/UrlPieChart/UrlPieChart.component";
import ExpansionPanel from "../../Components/ExpansionPanel/ExpansionPanel.component";
import GridList from "../../Components/GridList/GridList.component";
import { Container, InputAdornment } from "@material-ui/core";
import "./Home.styles.scss";
class Home extends React.Component {
  state = {
    originalUrl: "",
    userDefinedShortenedUrl: "",
    showShortUrlInput: false,
    listOfShortUrls: undefined,
    listOfColor: undefined,
    listOfData: undefined
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
    function randomStr(len, arr) {
      var ans = "";
      for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      return ans;
    }

    //generating random colors
    const listOfColor = [],
      listOfShortUrls = [],
      listOfData = [];
    this.props.urls.forEach(url => {
      listOfColor.push(`#${randomStr(6, "123456789abcdef")}`);
      listOfData.push(url.hits);
      listOfShortUrls.push(url.shortenedUrl);
    });

    console.log(listOfColor, listOfData, listOfShortUrls);
    return (
      <div>
        <div className="header">
          <HeaderComponent />
        </div>
        <Container maxWidth="md">
          <div className="url">
            <div className="url-row">
              <span className="heading">Original Url</span>
              <FormInput
                id="original-url"
                name="URL"
                type="text"
                value={this.state.originalUrl}
                handleChange={this.handleChange("originalUrl")}
              />
            </div>
            <div className="url-row">
              <span className="heading" style={{ cursor: "pointer" }}>
                Create yours
              </span>
              <div className="url-row">
                <FormInput
                  id="userDefinedShortenedUrl"
                  name="Custom Url"
                  type="text"
                  value={this.state.userDefinedShortenedUrl}
                  handleChange={this.handleChange("userDefinedShortenedUrl")}
                  startAdornment={
                    <InputAdornment position="start">
                      http://goto.cf/s/
                    </InputAdornment>
                  }
                />
              </div>
            </div>
            <div className="url-row">
              <Button
                onClick={() => {
                  this.props.dispatch(
                    getShortUrlFromServer({
                      originalUrl: this.state.originalUrl,
                      suggestedShortUrl: this.state.userDefinedShortenedUrl
                    })
                  );
                }}
                style={{
                  backgroundColor: "#43A19E",
                  color: "white"
                }}
              >
                Short It!
              </Button>
              {/* </div> */}
              <TextOutputField
                value={`${this.getCurrentShortUrl()}`}
                className={this.getCurrentShortUrl() ? "heading" : ""}
              />
            </div>
            {this.props.urlError ? (
              <div>
                <span className="error">{this.props.urlError}</span>
              </div>
            ) : null}
          </div>

          <div className="user-url-list">
            <ExpansionPanel heading="See list of your Short Urls">
              <GridList data={this.props.urls} />
            </ExpansionPanel>
          </div>
          <div className="url-analytics">
            <div>
              <span
                style={{
                  fontSize: "34px",
                  margin: "20px 0",
                  backgroundColor: "rgb(67, 161, 158)",
                  borderRadius: "5px",
                  color: "white"
                }}
              >
                Url Analytics
              </span>
            </div>
            <div className="url-list">
              {this.props.urls && listOfData.length > 0 ? (
                <div>
                  <div>
                    <div className="list" style={{ width: "105%" }}>
                      <p>Url</p>
                      <p>Redirects</p>
                    </div>
                    {listOfShortUrls.map((url, index) => {
                      return (
                        <div className="list">
                          <TextOutputField
                            value={url}
                            style={{
                              backgroundColor: `${listOfColor[index]}`,
                              padding: "5px",
                              borderRadius: "5px"
                            }}
                          />
                          <div>{`${listOfData[index]}`}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <UrlPieChart data={listOfData} colors={listOfColor} />
                  </div>
                </div>
              ) : (
                <span>No Data Available!</span>
              )}
            </div>
          </div>
          <div className="footer"></div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  urls: selectUrlsList,
  urlError: selectUrlError
});

export default connect(mapStateToProps)(Home);
