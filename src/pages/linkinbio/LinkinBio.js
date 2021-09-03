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
import placeholder from "../../images/placeholder.png";
import classnames from "classnames";
import s from "./LinkinBio.module.scss";
// import {push} from "connected-react-router";

class LinkinBio extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);
    this.toggleThirdTabs = this.toggleThirdTabs.bind(this);
    this.error = this.error.bind(this);
    this.state = {
      instagramPosts: null,
      singlePost: "",
      nextPageUrl: "",
      username: "",
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
    let accessToken = localStorage.getItem("accessToken");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let savedAccessToken = userInfo.accessToken;
    if (
      this.props.match.params.code &&
      accessToken == null &&
      savedAccessToken == ""
    ) {
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
    await axios
      .get(`/social/data/${token}`)
      .then((response) => {
        //Set Access Token
        localStorage.setItem("accessToken", response.data.accessToken);
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.updateAccessToken(
          userInfo.id,
          response.data.username,
          response.data.accessToken
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
              message:"This account is already connected to another KonnectBio account. Please contact support for further assistance.",
            },
          });
        }
      });
  }

  //First Request From User
  async updateAccessToken(id, username, accessToken) {
    await axios.put(`/update/usersocial/instagram`, {
      id: id,
      username: username,
      accessToken: accessToken,
    });
  }
  //Second Request From User
  async fetchInstagramPosts(token) {
    //    token ="IGQVJYbFF2dlhKY3ktTVJodUFTc2FYMXBoNnVtbWtRUTNUVlBHa3ItdWZAkZAGkwS2JqS3pkLXRkdEZAWSXdwTEktenlxSjJJZAXBIem9KQUw3c0ZAxS2JkMVdLbElkczJGZAEdZAWDQxMUdfSURvT0R5NlZAyS3Flb1VyUjBJVzFz";
    await axios
      .get(`/social/media/${token}`)
      .then((response) => {
        this.setState({instagramPosts: response.data});
        if (response.data)
          this.setState({nextPageUrl: response.data.paging.next});
      })
      .catch((err) => {
        if (err.response.data.message.type) {
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
  async nextPageInstagramPosts(url) {
    await axios
      .get(url)
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

  async savePost(text) {
    await axios
      .post(`/create/posts`, {
        id: "17909693902793032",
        caption: " ⁣",
        media_url:
          "https://scontent.cdninstagram.com/v/t51.29350-15/200220013_859644918240771_5291876149984783041_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=oaiTkT4EMpcAX-lHbzA&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=a01cff2e96bb3b64dcb3823f6be021a4&oe=6137E4E0",
        timestamp: "2021-06-12T06:57:35+0000",
        redirectedUrl: "http:dl1961.com",
        username: "roidemo",
      })
      .then((response) => {});
  }

  async updatePost(text) {
    await axios
      .put(`/update/posts/17909693902793032`, {
        redirectedUrl: "http://dl1961.com",
      })
      .then((response) => {});
  }

  async deletePost(text) {
    await axios
      .delete(`/create/posts/17909693902793032`)
      .then((response) => {});
  }

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
        this.nextPageInstagramPosts(this.state.nextPageUrl);
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

  selectPost(state, postIndex) {
    if (postIndex !== "") {
      this.setState({
        singlePost: this.state.instagramPosts.data[postIndex],
      });
    }
    this.setState({selectPost: state});
  }

  error(error) {
    this.setState({error: error});
  }

  render() {
    const instagramPosts = [];
    if (this.state.instagramPosts) {
      for (let i = 0; i < this.state.instagramPosts.data.length; i++) {
        instagramPosts.push(
          <Col key={i} xs="4">
            <img
              key={i}
              id={i}
              onClick={(ev) => this.selectPost(true, i)}
              src={this.state.instagramPosts.data[i].media_url}
            />
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
                  <a href="#">https://konnect.bio/{this.state.username}</a>
                </div>
                <div className="item-b">Copy</div>
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
                  <a href="#">Connect Instagram</a>
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
                          onClick={() => this.selectPost()}
                          className="glyphicon glyphicon-arrow-left"
                        ></span>
                        <h4>Edit Links</h4>
                        <p>Posted on Aug 30, 2021</p>
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
                              placeholder="Add a link to any web page"
                              className="form-control"
                              onChange={(evt) => {
                                this.setState({link: evt.target.value});
                              }}
                            />
                            <div className="pane-button">
                              <Button
                                onClick={(ev) => this.savePost(this)}
                                //onClick={this.savePost}
                                color=""
                              >
                                &nbsp;&nbsp;Save&nbsp;&nbsp;
                              </Button>
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
