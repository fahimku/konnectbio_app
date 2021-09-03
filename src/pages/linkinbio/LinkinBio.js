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

class LinkinBio extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);
    this.toggleThirdTabs = this.toggleThirdTabs.bind(this);
    this.toggleAccordionFirst = this.toggleAccordionFirst.bind(this);
    this.state = {
      instagramPosts: null,
      nextPageUrl: "",
      // accessToken: localStorage.getItem('accessToken'),
      // username: localStorage.getItem('username'),
      activeFirstTab: "tab11",
      activeSecondTab: "tab22",
      activeThirdTab: "tab31",
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
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
      // let id = userInfo.id;
      // let username = localStorage.getItem("username");
      let accessTokenCode = this.props.match.params.code.split("#")[0];
      this.fetchInstagramPostsFirstTime(accessTokenCode);
      // this.updateAccessToken(id, username, accessToken);
    } else {
      if (savedAccessToken) {
        accessToken = savedAccessToken;
        console.log("Saved Access Token" + accessToken);
      }

      this.fetchInstagramPosts(accessToken);
    }
  }

  //First Request From User
  async fetchInstagramPostsFirstTime(token) {
    await axios.get(`/social/data/${token}`).then((response) => {
      //Set Access Token
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("nextPageUrl", response.data.paging.next);
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.updateAccessToken(
        userInfo.id,
        response.data.username,
        response.data.accessToken
      );
      this.setState({instagramPosts: response.data});
      this.setState({nextPageUrl: response.data.paging.next});
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
    await axios.get(`/social/media/${token}`).then((response) => {
      //    localStorage.removeItem("nextPageUrl");
      //  localStorage.setItem("nextPageUrl", response.data.paging.next);
      this.setState({instagramPosts: response.data});
      this.setState({nextPageUrl: response.data.paging.next});
    });
  }

  //Next Page Instagram Posts Request From User
  async nextPageInstagramPosts(url) {
    await axios.get(url).then((response) => {
      let post = [];
      let nextPageInstagramPosts = response.data;
      let PreviousInstagramPosts = this.state.instagramPosts;

      //Check Instagram has more posts
      if (nextPageInstagramPosts.paging.hasOwnProperty("next")) {
        this.setState({nextPageUrl: nextPageInstagramPosts.paging.next});
      } else {
        this.setState({nextPageUrl: ""});
      }
      post.push(PreviousInstagramPosts);
      for (let i = 0; i < nextPageInstagramPosts.data.length; i++) {
        post[0].data.push(nextPageInstagramPosts.data[i]);
      }
      this.setState({instagramPost: post});
    });
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

  toggleAccordionFirst(id) {
    const arr = [];
    arr.length = this.state.accordionFirst.length;
    arr.fill(false);
    arr[id] = !this.state.accordionFirst[id];
    this.setState({
      accordionFirst: arr,
    });
  }

  toggleAccordionSecond(id) {
    const arr = [];
    arr.length = this.state.accordionSecond.length;
    arr.fill(false);
    arr[id] = !this.state.accordionSecond[id];
    this.setState({
      accordionSecond: arr,
    });
  }

  render() {
    const instagramPosts = [];
    if (this.state.instagramPosts) {
      for (let i = 0; i < this.state.instagramPosts.data.length; i++) {
        instagramPosts.push(
          <Col key={i} xs="4">
            <img src={this.state.instagramPosts.data[i].media_url} />
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
              <div className="instagram-username">@roidemo</div>
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
                  Your Link: <a href="#">https://konnect.bio/roidemo</a>
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
                <span className="place-holder-name">KONNECT BIO</span>
              </div>
              <div className="visit-website">Visit Website</div>
              <div ref={this.paneDidMount} className="mobile-gallery">
                <Row>{instagramPosts}</Row>
              </div>
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
