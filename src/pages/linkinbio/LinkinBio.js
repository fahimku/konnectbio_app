import axios from "axios";
import React from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from "react-toastify";
import placeholder from "../../images/placeholder.png";
import config from "../../config";
// import {connect} from "react-redux";
// import {addUserInfo} from "../../actions/user";
import TopBar from "../../components/Topbar";
import MobilePreview from "./component/MobilePreview";
import moment from "moment";
import ShopRightBar from "./component/ShopRightBar/index";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

class LinkinBio extends React.Component {
  constructor(props) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.username;
    const userId = userInfo.user_id;

    super(props);
    this.error = this.error.bind(this);
    this.state = {
      iframeKey: 0,
      deleteId: "",
      userId: userId,
      startDate: moment(),
      endDate: moment().add(30, "days"),
      media_id: "",
      modal: false,
      confirmModal: false,
      loading: false,
      instagramPosts: null,
      postType: "image",
      categories: [],
      category: [],
      subCategories: [],
      subCategory: [],
      singlePost: "",
      dbSinglePost: "",
      dbCategoryName: "",
      dbSubCategory: "",
      currentPost: "",
      url: config.visitorURL + "/",
      nextPageUrl: "",
      username: username,
      redirectedUrl: "",
      selectPost: false,
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      autoFocus: false,
      error: "",
    };
    this.changeCategory = this.changeCategory.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
    this.changePostType = this.changePostType.bind(this);
  }

  componentWillMount() {
    document.body.classList.add("body-my-post");
    // let accessToken = localStorage.getItem("access_token");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let savedAccessToken = userInfo.access_token;

    // if (this.props.match.params.code && !accessToken && !savedAccessToken) {
    //   let accessTokenCode = this.props.match.params.code.split("#")[0];
    // //  this.fetchInstagramPostsFirstTime(accessTokenCode);
    // } else {
    //   if (savedAccessToken) {
    //     accessToken = savedAccessToken;
    //   }
    this.fetchInstagramPosts(savedAccessToken);
    ///}
    this.fetchCategories();
  }

  componentWillUnmount() {
    document.body.classList.remove("body-my-post");
  }

  //First Request From User
  // async fetchInstagramPostsFirstTime(token) {
  //   const userInformation = localStorage.getItem("userInfo");
  //   const parseUserInformation = JSON.parse(userInformation);

  //   await axios
  //     .post(`/social/ig/data/${token}`, {
  //       email: parseUserInformation.email,
  //     })
  //     .then((response) => {
  //       //Set Access Token
  //       localStorage.setItem("access_token", response.data.access_token);
  //       let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //       // Retrieves the string and converts it to a JavaScript object
  //       // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
  //       parseUserInformation.username = response.data.username;
  //       //Store User Information
  //       const storeUserInformation = JSON.stringify(parseUserInformation);
  //       localStorage.setItem("userInfo", storeUserInformation);
  //       this.updateAccessToken(
  //         userInfo.user_id,
  //         response.data.username,
  //         response.data.access_token
  //       );
  //       this.setState({ instagramPosts: response.data });
  //       this.setState({ nextPageUrl: response.data.paging.next });
  //       this.setState({ username: response.data.username });
  //     })
  //     .catch((err) => {
  //       if (err.response.data.message) {
  //         this.setState({
  //           error: {
  //             type: "accountExist",
  //             message:
  //               "This account is already connected to another Konnect.Bio account. Please contact support for further assistance.",
  //           },
  //         });
  //       }
  //     });
  // }

  //First Request From User
  // async updateAccessToken(user_id, username, accessToken) {
  //   await axios.put(`/users/revise/ig/instagram`, {
  //     user_id: user_id,
  //     username: username,
  //     access_token: accessToken,
  //   });
  // }
  //Second Request From User
  async fetchInstagramPosts(token) {
    await axios
      .post(`/social/ig/media/${token}`, {
        username: this.state.username,
      })
      .then((response) => {
        this.setState({ instagramPosts: response.data });
        if (response.data)
          this.setState({ nextPageUrl: response.data.paging.next });
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);

        // if (err.response.data.message.type) {
        //   //  Retrieves the string and converts it to a JavaScript object
        //   const userInformation = localStorage.getItem("userInfo");
        //   const parseUserInformation = JSON.parse(userInformation);
        //   // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
        //   parseUserInformation.access_token = "";
        //   //Store User Information
        //   const storeUserInformation = JSON.stringify(parseUserInformation);
        //   localStorage.setItem("userInfo", storeUserInformation);
        //   localStorage.removeItem("access_token");
        //   this.setState({
        //     error: {
        //       type: "InstagramAuthFail",
        //       message:
        //         "Your Instagram connection is expired. pleased connect in again",
        //     },
        //   });
        // }
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
          this.setState({ nextPageUrl: nextPageInstagramPosts.paging.next });
        } else {
          this.setState({ nextPageUrl: "" });
        }
        instagramPosts.push(PreviousInstagramPosts);
        for (let i = 0; i < nextPageInstagramPosts.data.length; i++) {
          instagramPosts[0].data.push(nextPageInstagramPosts.data[i]);
        }
        this.setState({ instagramPost: instagramPosts });
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
  // Fetch Single Post
  fetchSinglePost = async (media_id) => {
    await axios
      .get(`/posts/retrieve/${media_id}`)
      .then((response) => {
        // let that = this;
        this.setState({ postType: response.data.message.post_type });
        this.setState({ media_id: media_id });
        let category = response.data.message.categories[0].category_id;
        this.setState({ category: category });

        // this.setState({ startDate: response.data.message.start_date });
        // this.setState({ endDate: response.data.message.end_date });

        this.changeDateRange(
          response.data.message.start_date,
          response.data.message.end_date
        );
        // let subCategory = [];
        // this.fetchSubCategories(category).then(function () {
        //   response.data.message.sub_categories.map((subCategoryId) => {
        //     return subCategory.push(subCategoryId.sub_category_id);
        //   });
        //   that.setState({subCategory: subCategory});
        // });
      })
      .catch((err) => {
        this.setState({
          category: [],
        });
        this.setState({ subCategory: [] });
        this.setState({ postType: "image" });
      });
  };

  //Fetch Categories
  fetchCategories = async () => {
    await axios
      .get(`/users/receive/categories?id=${this.state.userId}`)
      .then((response) => {
        const selectCategories = [];
        const categories = response.data.message;
        categories.map(({ category_id, category_name }) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
          });
        });
        this.setState({ categories: selectCategories });
      });
  };

  //Fetch Sub Categories
  async fetchSubCategories(category_id) {
    await axios
      .post(`/common/receive/subCategories`, { category_id: category_id })
      .then((response) => {
        const selectSubCategories = [];
        const subCategories = response.data.message;
        subCategories.map(({ sub_category_id, sub_category_name }) => {
          return selectSubCategories.push({
            value: sub_category_id,
            label: sub_category_name,
          });
        });
        this.setState({ subCategories: selectSubCategories });
      });
  }

  savePost = () => {
    let newRedirectedUrl;
    if (this.state.redirectedUrl.includes("http://")) {
      newRedirectedUrl = this.state.redirectedUrl;
    } else if (this.state.redirectedUrl.includes("https://")) {
      newRedirectedUrl = this.state.redirectedUrl;
    } else {
      newRedirectedUrl = "http://" + this.state.redirectedUrl;
    }
    if (this.state.redirectedUrl) {
      this.setState(
        (previousState) => ({
          currentPost: previousState.singlePost,
        }),
        async () => {
          this.setState({ loading: true });
          await axios
            .post(`/posts/reserve`, {
              id: this.state.currentPost.id,
              caption: this.state.currentPost.caption,
              media_url: this.state.currentPost.media_url,
              media_type: this.state.currentPost.media_type,
              timestamp: this.state.currentPost.timestamp,
              redirected_url: newRedirectedUrl,
              username: this.state.currentPost.username,
              categories: [this.state.category],
              sub_categories: this.state.subCategory,
              post_type: this.state.postType,
              start_date: this.state.startDate,
              end_date: this.state.endDate,
            })
            .then((response) => {
              this.setState({ loading: false });
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
              this.setState({ instagramPosts: instagramPosts }, () => {});
              toast.success("Your Post is Linked Successfully");
              this.selectPost(false, "");
              this.reload();
            })

            .catch((err) => {
              this.setState({ loading: false });
              toast.error(err);
            });
        }
      );
    }
  };

  updatePost = async (id, url) => {
    this.setState({ loading: true });
    await axios
      .put(`/posts/revise/${id}`, {
        redirected_url: url,
        categories: [this.state.category],
        sub_categories: this.state.subCategory,
        post_type: this.state.postType,
        start_date: this.state.startDate,
        end_date: this.state.endDate,
      })
      .then((response) => {
        this.setState({ loading: false });
        let singlePostIndex = this.state.instagramPosts.data.findIndex(
          (item) => item.id === id
        );
        let currentPost = this.state.singlePost;
        currentPost.redirected_url = url;
        let instagramPosts = JSON.parse(
          JSON.stringify(this.state.instagramPosts)
        );
        instagramPosts.data[singlePostIndex] = currentPost;
        this.setState({ instagramPosts: instagramPosts });
        toast.success("Your Post Link is Updated");
        this.selectPost(false, "");
      });
  };
  reload = () => {
    const current = this.props.location.pathname;
    this.props.history.replace(`/reload`);
    setTimeout(() => {
      this.props.history.replace(current);
    });
  };

  deletePost = async (id) => {
    this.setState({ loading: true });
    await axios.delete(`/posts/remove/${id}`).then((response) => {
      let singlePostIndex = this.state.instagramPosts.data.findIndex(
        (item) => item.id === id
      );
      let currentPost = this.state.singlePost;
      currentPost.linked = false;
      let instagramPosts = JSON.parse(
        JSON.stringify(this.state.instagramPosts)
      );
      instagramPosts.data[singlePostIndex] = currentPost;
      this.setState({ instagramPosts: instagramPosts });
      toast.success("Your Post is Unlinked Successfully");
      this.setState({ loading: false });
      this.setState({ confirmModal: false });
      this.selectPost(false, "");
      // window.location.reload();
      // history.push("/app/linkinbio/");
      this.reload();
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

  toggle(id) {
    this.setState((prevState) => ({
      [id]: !prevState[id],
    }));
  }

  selectPost = (state, postIndex) => {
    this.setState((prevState) => ({ autoFocus: !prevState.autoFocus }));
    this.fetchCategories();
    if (postIndex !== "") {
      //make border appear on post image
      let currentPost = this.state.instagramPosts.data[postIndex];
      let mediaId = currentPost.id;
      let lastPost = this.state.singlePost;

      this.fetchSinglePost(mediaId);

      if (lastPost) {
        lastPost.select = false;
      }

      currentPost.select = true;
      let instagramPosts = JSON.parse(
        JSON.stringify(this.state.instagramPosts)
      );

      instagramPosts.data[postIndex] = currentPost;
      this.setState({ instagramPosts: instagramPosts });
      //link current post
      this.setState(
        {
          singlePost: currentPost,
        },
        () => {
          if (currentPost.redirected_url)
            this.setState({ redirectedUrl: currentPost.redirected_url });
          else this.setState({ redirectedUrl: "" });
        }
      );
    }
    this.setState({ selectPost: state });
    this.setState({ modal: true });
    if (state === false && postIndex === "")
      this.setState({ iframeKey: this.state.iframeKey + 1 });
  };

  error(error) {
    this.setState({ error: error });
  }

  changeCategory = (category) => {
    if (category) {
      this.setState({ category: category });
      // this.fetchSubCategories(category);
    }
  };

  changeSubCategory = (subCategories) => {
    this.setState({ subCategory: subCategories });
  };

  changePostType = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
      this.setState({ postType: e.target.value });
    }
  };

  changeDateRange = (startDate, endDate) => {
    this.setState({ startDate: startDate });
    this.setState({ endDate: endDate });
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

  testUrl = (url) => {
    window.open(url, "_blank");
  };

  submitted = (e) => {
    e.preventDefault();
  };

  iframe_clicked(event) {
    alert("test");
  }

  shopRightBar = () => {
    return (
      <ShopRightBar
        closeModel={() => {
          this.setState({ modal: false });
        }}
        testUrl={this.testUrl}
        loading={this.state.loading}
        submitted={this.submitted}
        dateRange={(startDate, endDate) => {
          this.changeDateRange(startDate, endDate);
        }}
        autoFocus={this.state.autoFocus}
        isSelectPost={this.state.selectPost}
        selectPost={this.selectPost}
        singlePost={this.state.singlePost}
        redirectedUrl={this.state.redirectedUrl}
        categories={this.state.categories}
        changeCategory={this.changeCategory}
        category={this.state.category}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        subCategory={this.state.subCategory}
        changeSubCategory={this.changeSubCategory}
        subCategories={this.state.subCategories}
        changePostType={this.changePostType}
        postType={this.state.postType}
        savePost={this.savePost}
        updatePost={(val1, val2) => {
          this.updatePost(val1, val2);
        }}
        media_id={this.state.media_id}
        deletePost={(deleteId) => {
          this.setState({ deleteId: deleteId });
          this.setState({ confirmModal: true });
        }}
        callBack={(e) => {
          this.setState({ redirectedUrl: e.target.value });
        }}
      ></ShopRightBar>
    );
  };

  render() {
    return (
      <div className="linkin-bio">
        <Row className="main-container">
          <Col className="left-column" md="5" xs="12" xl="3">
            <TopBar
              username={this.state.username}
              url={this.state.url}
              copyToClipboard={this.copyToClipboard}
            />
            <MobilePreview
              pageName="My Posts"
              placeholder={placeholder}
              username={this.state.username}
              error={this.state.error}
              paneDidMount={this.paneDidMount}
              instagramPosts={this.state.instagramPosts}
              selectPost={this.selectPost}
            />
          </Col>
          <Col
            className={`right-bar bg-white ${
              !this.state.selectPost ? "no-padding" : ""
            } `}
            md="7"
            xl="9"
            xs="12"
          >
            <div
              className={`${!this.state.selectPost ? "show" : "hidden"}`}
              style={{ height: "100%", width: "100%", padding: "0px" }}
            >
              {this.state.username !== "" ? (
                <iframe
                  id="iframe"
                  key={this.state.iframeKey}
                  src={`${
                    this.state.url + this.state.username
                  }?coupon=no&brand=no&iframe=yes&mypost=hide`}
                  title="linkin"
                  className="myshop-iframe"
                ></iframe>
              ) : null}
            </div>

            <Row>
              <Col xs="12" className="p-5">
                {this.shopRightBar()}
              </Col>
            </Row>
          </Col>
        </Row>

        {window.innerWidth <= 760 && (
          <Modal
            size="sm"
            isOpen={this.state.modal}
            toggle={() => this.toggle("modal")}
          >
            <ModalHeader toggle={() => this.toggle("modal")}>
              Edit Post
            </ModalHeader>
            <ModalBody className="bg-white">{this.shopRightBar()}</ModalBody>
          </Modal>
        )}
        <Modal
          isOpen={this.state.confirmModal}
          toggle={() => this.toggle("confirmModal")}
        >
          <ModalHeader toggle={() => this.toggle("confirmModal")}>
            Delete Post
          </ModalHeader>
          <ModalBody className="bg-white">
            Are you sure you want to delete?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => this.toggle("confirmModal")}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => this.deletePost(this.state.deleteId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default LinkinBio;
