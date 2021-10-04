import axios from "axios";
import React from "react";
import {Row, Col} from "reactstrap";
import {toast} from "react-toastify";
import placeholder from "../../images/placeholder.png";
import config from "../../config";
import TopBar from "./component/TopBar";
import MobilePreview from "./component/MobilePreview";
import AddNewLink from "./component/AddNewLink/index";
import style from "./MyLinks.module.scss";

class MyLinks extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.error = this.error.bind(this);
    this.state = {
      loading: false,
      updatePage: false,
      myLinks: [],
      title: "",
      redirectedUrl: "",
      timestamp: "2021-10-2",
      singlePost: "",
      url: config.visitorURL + "/",
      nextPageUrl: "",
      username: username,
      preview: false,
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      autoFocus: false,
      error: "",
    };
    this.addNewLink = this.addNewLink.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.redirectedUrlChange = this.redirectedUrlChange.bind(this);
  }

  componentWillMount() {
    this.fetchMyLinks(this.state.username);
  }

  fetchMyLinks = async (username) => {
    await axios
      .get(`/links/receive?user=${username}`)
      .then((response) => {
        this.setState({myLinks: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  titleChange = (value) => {
    this.setState({title: value});
  };

  redirectedUrlChange = (value) => {
    this.setState({redirectedUrl: value});
  };

  fetchSingleLink = async (linkId) => {
    await axios
      .get(`links/retrieve?id=${linkId}`)
      .then((res) => {
        this.setState({preview: true});
        this.setState({title: res.data.data[0].title});
        this.setState({redirectedUrl: res.data.data[0].redirected_url});
        this.setState({updatePage: true});
        this.setState({linkId: linkId});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveLink = async () => {
    this.setState({loading: true});
    await axios
      .post("links/reserve", {
        title: this.state.title,
        redirected_url: this.state.redirectedUrl,
        username: this.state.username,
        timestamp: this.state.timestamp,
      })
      .then(() => {
        this.fetchMyLinks(this.state.username);
        toast.success("New Link Added");
        
        this.addNewLink();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateLink = async (id, title, redirectedUrl) => {
    this.setState({loading: true});
    await axios
      .put(`links/revise/${id}`, {
        id: id,
        title: title,
        redirected_url: redirectedUrl,
      })
      .then(() => {
        this.fetchMyLinks(this.state.username);
        toast.success("Link Updated");
        this.setState({loading: false});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteLink = async (id) => {
    this.setState({loading: true});
    await axios
      .delete(`links/remove/${id}`)
      .then(() => {
        this.fetchMyLinks(this.state.username);
        toast.success("Link removed successfully.");
        this.setState({ loading: false });
        this.addNewLink();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  paneDidMount = (node) => {
    if (node) {
      node.addEventListener("scroll", this.handleScroll.bind(this));
    }
  };

  handleScroll = (event) => {
    let node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      if (this.state.nextPageUrl) {
        //    this.nextPagemyLinks(this.state.nextPageUrl, this.state.username);
      }
    }
  };

  preview = (state, postIndex) => {
    this.setState({ preview: false });
  };

  error(error) {
    this.setState({error: error});
  }

  addNewLink = () => {
    this.setState({title: ""});
    this.setState({redirectedUrl: ""});
    this.setState({preview: true});
    this.setState({updatePage: false});
    this.setState({loading: false});
  };

  copyToClipboard = (e) => {
    let textField = document.createElement("textarea");
    textField.innerText = this.state.url + this.state.username;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied to Clipboard!");
  };

  submitted = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="linkin-bio">
        <Row className="main-container">
          <Col className="left-column" md="4" xs="12">
            <TopBar
              username={this.state.username}
              url={this.state.url}
              copyToClipboard={this.copyToClipboard}
            />
            <MobilePreview
              style={style}
              addNewLink={this.addNewLink}
              placeholder={placeholder}
              username={this.state.username}
              error={this.state.error}
              paneDidMount={this.paneDidMount}
              myLinks={this.state.myLinks}
              fetchSingleLink={this.fetchSingleLink}
        
            />
          </Col>
          <Col
            className={`right-bar bg-white ${
              !this.state.preview ? "no-padding" : ""
            } `}
            md="8"
            xs="12"
          >
            <div
              className={`${!this.state.preview ? "show" : "hidden"}`}
              style={{height: "100%", width: "100%", padding: "0px"}}
            >
              <iframe
                src={`${
                  this.state.url + this.state.username
                }?coupon=no&brand=no&iframe=yes&mypost=hide`}
                title=""
                className="myshop-iframe"
              ></iframe>
            </div>
            <Row>
              <Col xs="12" className="p-3">
                <AddNewLink
                  loading={this.state.loading}
                  titleChange={this.titleChange}
                  redirectedUrlChange={this.redirectedUrlChange}
                  title={this.state.title}
                  redirectedUrl={this.state.redirectedUrl}
                  submitted={this.submitted}
                  autoFocus={this.state.autoFocus}
                  isPreview={this.state.preview}
                  preview={this.preview}
                  singlePost={this.state.singlePost}
                  saveLink={this.saveLink}
                  updatePage={this.state.updatePage}
                  updateLink={() => {
                    this.updateLink(
                      this.state.linkId,
                      this.state.title,
                      this.state.redirectedUrl
                    );
                  }}
                  deleteLink={() => {
                    this.deleteLink(this.state.linkId);
                  }}
                ></AddNewLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MyLinks;