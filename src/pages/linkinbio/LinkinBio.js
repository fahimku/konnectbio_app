import axios from "axios";
import React from "react";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import placeholder from "../../images/placeholder.png";
import config from "../../config";
import TopBar from "../../components/Topbar";
import MobilePreview from "./component/MobilePreview";
import moment from "moment";
import ShopRightBar from "./component/ShopRightBar/index";

class LinkinBio extends React.Component {
  constructor(props) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.username;
    const userId = userInfo.user_id;
    super(props);
    this.error = this.error.bind(this);
    this.state = {
      postLoading: false,
      showInstagramButton: false,
      iframeKey: 0,
      nextPageCount: 0,
      deleteId: "",
      userId: userId,
      startDate: moment(),
      // endDate: moment().add(30, "days"),
      endDate: moment().add(1, "years"),
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
      updatedAt: "",
      fetchUserPost: [],
    };
    this.changeCategory = this.changeCategory.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
    this.changePostType = this.changePostType.bind(this);
  }

  componentWillMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let savedAccessToken = userInfo.access_token;
    this.fetchInstagramPosts(savedAccessToken);
    this.fetchCategories();
  }

  async fetchInstagramPosts(token) {
    this.setState({ postLoading: true });
    await axios
      .post(`/social/ig/media/${token}`, {
        username: this.state.username,
      })
      .then((response) => {
        this.setState({ postLoading: false });
        this.setState({ instagramPosts: response.data });
        if (response.data)
          this.setState({ nextPageUrl: response?.data?.paging?.next });
      })
      .catch((err) => {
        this.setState({ postLoading: false });
        if (err?.response?.data?.code === 190) {
          const parseUserInformation = JSON.parse(
            localStorage.getItem("userInfo")
          );
          parseUserInformation.access_token = "";
          parseUserInformation.username = "";
          const storeUserInformation = JSON.stringify(parseUserInformation);
          localStorage.setItem("userInfo", storeUserInformation);
          this.setState({
            error: "Connect Your Instagram Account to Continue",
          });
          this.setState({ showInstagramButton: true });
          this.props.history.push("/connect");
          window.history.go(0);
        }
        this.props.history.push("/connect");
        window.history.go(0);
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
        if (err?.response?.data?.code === 190) {
          const parseUserInformation = JSON.parse(
            localStorage.getItem("userInfo")
          );
          parseUserInformation.access_token = "";
          parseUserInformation.username = "";
          const storeUserInformation = JSON.stringify(parseUserInformation);
          localStorage.setItem("userInfo", storeUserInformation);
          this.setState({
            error: "Connect Your Instagram Account to Continue",
          });
          this.setState({ showInstagramButton: true });
          this.props.history.push("/connect");
        }
      });
  }
  // Fetch Single Post
  fetchSinglePost = async (media_id) => {
    await axios
      .get(`/posts/retrieve/${media_id}`)
      .then((response) => {
        // let that = this;
        this.setState({ fetchUserPost: response.data.message });
        this.setState({ postType: response.data.message.post_type });
        this.setState({ updatedAt: response.data.message.updated_at });
        this.setState({ media_id: media_id });
        let category = response.data.message.categories[0].category_id;
        this.setState({ category: category });
        this.changeDateRange(
          response.data.message.start_date,
          response.data.message.end_date
        );
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
        categories.map(({ parent_id, category_name, category_id }) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
            parentId: parent_id,
          });
        });
        this.setState({ categories: selectCategories });
      });
  };

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
              categories: this.state.category,
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
    // console.log(this.state.category, "sdsdsd");
    let newCategory;
    let oldCategory = this.state.category;
    if (
      typeof this.state.category === "string" ||
      this.state.category instanceof String
    ) {
      newCategory = oldCategory.split();
    } else {
      newCategory = oldCategory;
    }

    this.setState({ loading: true });
    await axios
      .put(`/posts/revise/${id}`, {
        redirected_url: url,
        categories: newCategory,
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
    const bottom =
      parseInt(node.scrollHeight + 1 - node.scrollTop) ===
        parseInt(node.clientHeight) ||
      parseInt(node.scrollHeight - node.scrollTop) ===
        parseInt(node.clientHeight);

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
      // console.log(currentPost, "currentPost");
      let mediaId = currentPost.post_id;
      let lastPost = this.state.singlePost;

      if (currentPost.linked) {
        this.fetchSinglePost(mediaId);
      } else {
        this.setState({
          category: [],
          startDate: moment(),
          endDate: moment().add(1, "years"),
        });
      }

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
      this.setState({ category: category.split() });
    }
  };

  changeSubCategory = (subCategories) => {
    this.setState({ subCategory: subCategories });
  };

  changePostType = (e) => {
    if (e.target.checked) {
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
    let newUrl;
    if (url.includes("http://")) {
      newUrl = url;
    } else if (url.includes("https://")) {
      newUrl = url;
    } else {
      newUrl = "https://" + url;
    }
    window.open(newUrl, "_blank");
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
        fetchUserPost={this.state.fetchUserPost}
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
        updatedDate={this.state.updatedAt}
      ></ShopRightBar>
    );
  };

  render() {
    return (
      <div className="linkin-bio">
        <Row className="app_main_cont_ift main-container">
          <Col className="left-column" md="5" xs="12" xl="3">
            <TopBar
              username={this.state.username}
              url={this.state.url}
              copyToClipboard={this.copyToClipboard}
            />
            <MobilePreview
              postLoading={this.state.postLoading}
              showInstagramButton={this.state.showInstagramButton}
              pageName={`My Post`}
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
              className={`${
                !this.state.selectPost ? "show_ift_iframe show" : "hidden"
              }`}
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
            <Row className="linked_edit_box">
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
            centered
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
            <Button
              color="primary"
              className="btn btn-primary"
              onClick={() => this.toggle("confirmModal")}
            >
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
