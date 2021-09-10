/* eslint-disable */
import axios from "axios";
import React from "react";
import {
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import placeholder from "../../images/placeholder.png";
import classnames from "classnames";
import s from "./LinkinBio.module.scss";
import moment from "moment";
import config from "../../config";
// import {push} from "connected-react-router";

class LinkinBio extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);
    this.toggleThirdTabs = this.toggleThirdTabs.bind(this);
    this.error = this.error.bind(this);
    this.state = {
      instagramPosts: null,
      singlePost: "",
      currentPost: "",
      url: config.visitorURL + "/",
      nextPageUrl: "",
      username: username,
      redirectedUrl: "",
      selectPost: false,
      activeFirstTab: "tab11",
      activeSecondTab: "tab22",
      activeThirdTab: "tab31",
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      error: "",
    };
  }

  componentWillMount() {
    let accessToken = localStorage.getItem("access_token");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let savedAccessToken = userInfo.access_token;
    if (this.props.match.params.code && !accessToken && !savedAccessToken) {
      let accessTokenCode = this.props.match.params.code.split("#")[0];
      this.fetchInstagramPostsFirstTime(accessTokenCode);
    } else {
      if (savedAccessToken) {
        accessToken = savedAccessToken;
      }
      this.fetchInstagramPosts(accessToken);
    }
  }

  //First Request From User
  async fetchInstagramPostsFirstTime(token) {
    const userInformation = localStorage.getItem("userInfo");
    const parseUserInformation = JSON.parse(userInformation);

    await axios
      .post(`/social/ig/data/${token}`, {
        email: parseUserInformation.email,
      })
      .then((response) => {
        //Set Access Token
        localStorage.setItem("access_token", response.data.access_token);
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // Retrieves the string and converts it to a JavaScript object
        // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
        parseUserInformation.username = response.data.username;
        //Store User Information
        const storeUserInformation = JSON.stringify(parseUserInformation);
        localStorage.setItem("userInfo", storeUserInformation);

        this.updateAccessToken(
          userInfo.user_id,
          response.data.username,
          response.data.access_token
        );
        this.setState({instagramPosts: response.data});
        this.setState({nextPageUrl: response.data.paging.next});
        this.setState({username: response.data.username});
      })
      .catch((err) => {
        if (err.response.data.message) {
          this.setState({
            error: {
              type: "accountExist",
              message:
                "This account is already connected to another Konnect.Bio account. Please contact support for further assistance.",
            },
          });
        }
      });
  }

  //First Request From User

  //First Request From User
  async updateAccessToken(user_id, username, accessToken) {
    await axios.put(`/users/revise/ig/instagram`, {
      user_id: user_id,
      username: username,
      access_token: accessToken,
    });
  }
  //Second Request From User
  async fetchInstagramPosts(token) {
    await axios
      .post(`/social/ig/media/${token}`, {
        username: this.state.username,
      })
      .then((response) => {
        this.setState({instagramPosts: response.data});
        if (response.data)
          this.setState({nextPageUrl: response.data.paging.next});
      })
      .catch((err) => {
        if (err.response.data.message.type) {
          //  Retrieves the string and converts it to a JavaScript object
          const userInformation = localStorage.getItem("userInfo");
          const parseUserInformation = JSON.parse(userInformation);
          // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
          parseUserInformation.access_token = "";
          //Store User Information
          const storeUserInformation = JSON.stringify(parseUserInformation);
          localStorage.setItem("userInfo", storeUserInformation);
          localStorage.removeItem("access_token");
          this.setState({
            error: {
              type: "InstagramAuthFail",
              message:
                "Your Instagram connection is expired. pleased connect in again",
            },
          });
        }
      });
  }

  //Next Page Instagram Posts Request From User
  async nextPageInstagramPosts(url, username) {
    await axios
      .post(`/social/ig/nextMedia/${username}`, {
        url: url,
      })
      .then((response) => {
        let instagramPosts = [];
        let nextPageInstagramPosts = response.data;
        let PreviousInstagramPosts = this.state.instagramPosts;
        //Check Instagram has more posts
        if (nextPageInstagramPosts.paging.hasOwnProperty("next")) {
          this.setState({nextPageUrl: nextPageInstagramPosts.paging.next});
        } else {
          this.setState({nextPageUrl: ""});
        }
        instagramPosts.push(PreviousInstagramPosts);
        for (let i = 0; i < nextPageInstagramPosts.data.length; i++) {
          instagramPosts[0].data.push(nextPageInstagramPosts.data[i]);
        }
        this.setState({instagramPost: instagramPosts});
      })
      .catch((err) => {
        if (err.response.data.message.type) {
          localStorage.removeItem("access_token");
          this.setState({
            error: {
              type: "InstagramAuthFail",
              message:
                "Your Instagram connection is expired. pleased connect in again",
            },
          });
        }
      });
  }

  savePost = () => {
    this.setState(
      (previousState) => ({
        currentPost: previousState.singlePost,
      }),
      async () => {
        await axios
          .post(`/posts/reserve`, {
            id: this.state.currentPost.id,
            caption: this.state.currentPost.caption,
            media_url: this.state.currentPost.media_url,
            timestamp: this.state.currentPost.timestamp,
            redirected_url: this.state.redirectedUrl,
            username: this.state.currentPost.username,
          })
          .then((response) => {
            let singlePostIndex = this.state.instagramPosts.data.findIndex(
              (item) => item.id === this.state.currentPost.id
            );

            let currentPost = this.state.currentPost;
            currentPost.redirected_url = this.state.redirectedUrl;
            currentPost.linked = true;
            let instagramPosts = JSON.parse(
              JSON.stringify(this.state.instagramPosts)
            );
            instagramPosts.data[singlePostIndex] = currentPost;
            this.setState({instagramPosts: instagramPosts}, () => {});
            toast.success("Your Post is Linked Successfully");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    );
  };

  updatePost = async (id, url) => {
    if (url == "") this.deletePost(id);
    else
      await axios
        .put(`/posts/revise/${id}`, {
          redirected_url: url,
        })
        .then((response) => {
          let singlePostIndex = this.state.instagramPosts.data.findIndex(
            (item) => item.id === id
          );
          let currentPost = this.state.singlePost;
          currentPost.redirected_url = url;
          let instagramPosts = JSON.parse(
            JSON.stringify(this.state.instagramPosts)
          );
          instagramPosts.data[singlePostIndex] = currentPost;
          this.setState({instagramPosts: instagramPosts});
          toast.success("Your Post Link is Updated");
        });
  };

  deletePost = async (id) => {
    await axios.delete(`/posts/remove/${id}`).then((response) => {
      let singlePostIndex = this.state.instagramPosts.data.findIndex(
        (item) => item.id === id
      );
      let currentPost = this.state.singlePost;
      currentPost.linked = false;
      let instagramPosts = JSON.parse(JSON.stringify(this.state.instagramPosts));
      instagramPosts.data[singlePostIndex] = currentPost;
      this.setState({instagramPosts: instagramPosts});
      toast.success("Your Post is Unlinked Successfully");
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
        this.nextPageInstagramPosts(
          this.state.nextPageUrl,
          this.state.username
        );
      }
    }
  };

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }

  toggleSecondTabs(tab) {
    if (this.state.activeSecondTab !== tab) {
      this.setState({
        activeSecondTab: tab,
      });
    }
  }

  toggleThirdTabs(tab) {
    if (this.state.activeThirdTab !== tab) {
      this.setState({
        activeThirdTab: tab,
      });
    }
  }

  selectPost = (state, postIndex) => {
    if (postIndex !== "") {
      //make border appear on post image
      let currentPost = this.state.instagramPosts.data[postIndex];
      let lastPost = this.state.singlePost;
      //unlinked last selected post
      if (lastPost) {
        lastPost.select = false;
      }
      //link current post
      currentPost.select = true;
      let instagramPosts = JSON.parse(
        JSON.stringify(this.state.instagramPosts)
      );
      instagramPosts.data[postIndex] = currentPost;
      this.setState({instagramPosts: instagramPosts});
      //link current post
      this.setState(
        {
          singlePost: currentPost,
        },
        () => {
          if (currentPost.redirected_url)
            this.setState({redirectedUrl: currentPost.redirected_url});
          else this.setState({redirectedUrl: ""});
        }
      );
    }
    this.setState({selectPost: state});
  };

  error(error) {
    this.setState({error: error});
  }

  copyToClipboard = (e) => {
    let textField = document.createElement("textarea");
    textField.innerText = this.state.url + this.state.username;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied to Clipboard!");
  };

  render() {
    const instagramPosts = [];
    if (this.state.instagramPosts) {
      for (let i = 0; i < this.state.instagramPosts.data.length; i++) {
        instagramPosts.push(
          <Col key={i} xs="4">
            <img
              className={
                this.state.instagramPosts.data[i].linked ||
                this.state.instagramPosts.data[i].select
                  ? "linked"
                  : ""
              }
              key={i}
              id={"img" + i}
              onClick={(ev) => this.selectPost(true, i)}
              src={this.state.instagramPosts.data[i].media_url}
            />
            {this.state.instagramPosts.data[i].linked ? (
              <span>LINKED</span>
            ) : (
              ""
            )}
          </Col>
        );
      }
    }
    return (
      <div className="linkin-bio">
        <div className="header">
          <div className="linkin-text">Konnect.Bio</div>
          <div className="profile">
            <div className="placeholder">
              <img src={placeholder} />
            </div>
            <div className="instagram-account">
              <div className="instagram-username">@{this.state.username}</div>
              <div className="instagram-label">Instagram</div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <Row>
          <Col md="6" xs="12">
            <div className="left-top-bar">
              <div className="your-copy-link">
                <div className="item-a">
                  Your Link:{" "}
                  <a
                    target="_blank"
                    href={this.state.url + this.state.username}
                  >
                    {this.state.url + this.state.username}
                  </a>
                </div>
                <div onClick={this.copyToClipboard} className="item-b">
                  Copy
                </div>
              </div>

              <div className="instagram-bio">
                <button>Add to Instagram Bio</button>
              </div>
            </div>
            <div className="mobile-preview">
              <div className="mobile-header">
                <img className="place-holder-image" src={placeholder} />
                <span className="place-holder-name">{this.state.username}</span>
              </div>
              {this.state.error ? (
                <div className="error">
                  {this.state.error.message}
                  <br></br>
                  <Link to="/connect">Connect Instagram</Link>
                </div>
              ) : (
                <div>
                  <div className="visit-website">Visit Website</div>
                  <div ref={this.paneDidMount} className="mobile-gallery">
                    <Row>{instagramPosts}</Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col className="right-bar" md="6" xs="12">
            <Row>
              <Col xs="12">
                <Nav className={`${s.coloredNav}`} tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeThirdTab === "tab31",
                      })}
                      onClick={() => {
                        this.toggleThirdTabs("tab31");
                      }}
                    >
                      <span>Blocks</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeThirdTab === "tab32",
                      })}
                      onClick={() => {
                        this.toggleThirdTabs("tab32");
                      }}
                    >
                      <span>Settings</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent
                  className="mb-lg"
                  activeTab={this.state.activeThirdTab}
                >
                  <TabPane tabId="tab31">
                    <div
                      className={`image-edit-box ${
                        this.state.selectPost ? "show" : "hidden"
                      }`}
                    >
                      <div className="image-box-info">
                        <span
                          onClick={() => this.selectPost(false, "")}
                          className="glyphicon glyphicon-arrow-left"
                        ></span>
                        <h4>Edit Links</h4>
                        <p>
                          Posted on{" "}
                          {moment(this.state.singlePost.timestamp).format(
                            "MMM Do YYYY"
                          )}
                        </p>
                      </div>
                      <div className="image-wrapper">
                        <div className="image-box">
                          <img src={`${this.state.singlePost.media_url}`} />
                        </div>
                        <form onSubmit={this.submited}>
                          <div className="image-edit-links">
                            <span>Konnect.Bio</span>
                            <input
                              required
                              type="url"
                              value={this.state.redirectedUrl}
                              placeholder="Add a link to any web page"
                              className="form-control"
                              onChange={(evt) => {
                                this.setState({
                                  redirectedUrl: evt.target.value,
                                });
                              }}
                            />
                            <div className="pane-button">
                              {this.state.singlePost.linked ? (
                                <>
                                  <Button
                                    onClick={(ev) =>
                                      this.updatePost(
                                        this.state.singlePost.id,
                                        this.state.redirectedUrl
                                      )
                                    }
                                    color=""
                                  >
                                    &nbsp;&nbsp;Update&nbsp;&nbsp;
                                  </Button>
                                  <div className="remove-link">
                                    <a
                                      href="javascript:void(0)"
                                      onClick={(param) =>
                                        this.deletePost(
                                          this.state.singlePost.id
                                        )
                                      }
                                    >
                                      <span className="glyphicon glyphicon-trash"></span>
                                      Remove Link
                                    </a>
                                  </div>
                                </>
                              ) : (
                                <Button
                                  onClick={(ev) => this.savePost(this)}
                                  color=""
                                >
                                  &nbsp;&nbsp;Save&nbsp;&nbsp;
                                </Button>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className={`pane-wrapper ${
                        this.state.selectPost ? "hidden" : "show"
                      }`}
                    >
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Buttons</h4>
                          <p>
                            Drive traffic to your website, blog, online store,
                            or any other web pages.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Featured Media</h4>
                          <p>
                            Feature the latest post on your Konnect.bio page to
                            make it stand out.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Linked Instagram Posts</h4>
                          <p>
                            Select a post to add a link and direct your audience
                            to the right content.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="tab32">
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Buttons</h4>
                        <p>
                          Drive traffic to your website, blog, online store, or
                          any other web pages.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Featured Media</h4>
                        <p>
                          Feature the latest post on your Konnect.bio page to
                          make it stand out.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Linked Instagram Posts</h4>
                        <p>
                          Select a post to add a link and direct your audience
                          to the right content.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default LinkinBio;
