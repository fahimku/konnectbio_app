/* eslint-disable */
import axios from "axios";
import React from "react";
import {Row, Col} from "reactstrap";
import {toast} from "react-toastify";
import placeholder from "../../images/placeholder.png";
import config from "../../config";
import {connect} from "react-redux";
import {addUserInfo} from "../../actions/user";
import TopBar from "./component/TopBar";
import MobilePreview from "./component/MobilePreview";
import ShopRightBar from "./component/ShopRightBar/index";

class LinkinBioShop extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.error = this.error.bind(this);
    this.state = {
      loading: false,
      media_id: "",
      instagramPosts: null,
      postType: "image",
      page: 1,
      limit: 12,
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
      error: "",
      autoFocus: false,
    };
    this.props.addUserInfo("test");
    this.changeCategory = this.changeCategory.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
    this.changePostType = this.changePostType.bind(this);
  }

  componentDidMount() {
    this.fetchInstagramPosts(
      this.state.username,
      this.state.limit,
      this.state.page
    );
    this.fetchCategories();
  }

  //Second Request From User
  async fetchInstagramPosts(username, limit, page) {
    await axios
      .get(`profile/posts/${username}?limit=${limit}&page=${page}&post_type=image`)
      .then((response) => {
        this.setState({instagramPosts: response.data.message.result});
        if (response.data.message.result.hasOwnProperty("next")) {
          this.setState({page: response.data.message.result.next.page});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //nextPageInstagramPosts
  async nextPageInstagramPosts(username, limit, page) {
    await axios
      .get(`profile/posts/${username}?limit=${limit}&page=${page}&post_type=link`)
      .then((response) => {
        // console.log(response.data.message.result);
        if (response.data.message.result.hasOwnProperty("next")) {
          this.setState({page: response.data.message.result.next.page});
        } else {
          this.setState({page: 0});
        }
        let instagramPosts = [];
        let nextPageInstagramPosts = response.data.message.result.data;
        let PreviousInstagramPosts = this.state.instagramPosts;
        instagramPosts.push(PreviousInstagramPosts);
        for (let i = 0; i < nextPageInstagramPosts.length; i++) {
          instagramPosts[0].data.push(nextPageInstagramPosts[i]);
        }
        this.setState({instagramPosts: instagramPosts[0]});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Fetch Categories
  fetchCategories = async () => {
    await axios.post(`/common/receive/categories`).then((response) => {
      const selectCategories = [];
      const categories = response.data.message;
      categories.map(({category_id, category_name}) => {
        selectCategories.push({value: category_id, label: category_name});
      });
      this.setState({categories: selectCategories});
    });
  };

  //Fetch Sub Categories
  async fetchSubCategories(category_id) {
    await axios
      .post(`/common/receive/subCategories`, {category_id: category_id})
      .then((response) => {
        const selectSubCategories = [];
        const subCategories = response.data.message;
        subCategories.map(({sub_category_id, sub_category_name}) => {
          selectSubCategories.push({
            value: sub_category_id,
            label: sub_category_name,
          });
        });
        this.setState({subCategories: selectSubCategories});
      });
  }

  savePost = () => {
    if (this.state.redirectedUrl) {
      this.setState(
        (previousState) => ({
          currentPost: previousState.singlePost,
        }),
        async () => {
          this.setState({loading: true});
          await axios
            .post(`/posts/reserve`, {
              id: this.state.currentPost.id,
              caption: this.state.currentPost.caption,
              media_url: this.state.currentPost.media_url,
              media_type: this.state.currentPost.media_type,
              timestamp: this.state.currentPost.timestamp,
              redirected_url: this.state.redirectedUrl,
              username: this.state.currentPost.username,
              categories: [this.state.category],
              sub_categories: this.state.subCategory,
              post_type: this.state.postType,
            })
            .then((response) => {
              this.setState({loading: false});
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
              this.setState({loading: false});
              toast.error(err);
            });
        }
      );
    }
  };

  updatePost = async (id, url) => {
    this.setState({loading: true});
    await axios
      .put(`/posts/revise/${id}`, {
        redirected_url: url,
        categories: [this.state.category],
        sub_categories: this.state.subCategory,
        post_type: this.state.postType,
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
        this.setState({loading: false});
      });
  };

  deletePost = async (id) => {
    this.setState({loading: true});
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
      this.setState({instagramPosts: instagramPosts});
      toast.success("Your Post is Unlinked Successfully");
      this.setState({loading: false});
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
      if (this.state.page) {
        this.nextPageInstagramPosts(
          this.state.username,
          this.state.limit,
          this.state.page
        );
      }
    }
  };

  // Fetch Single Post
  fetchSinglePost = async (media_id) => {
    await axios
      .get(`/posts/retrieve/${media_id}`)
      .then((response) => {
        let that = this;
        this.setState({postType: response.data.message.post_type});
        this.setState({media_id: media_id});
        let category = response.data.message.categories[0].category_id;
        this.setState({category: category});
        let subCategory = [];
        this.fetchSubCategories(category).then(function () {
          response.data.message.sub_categories.map((subCategoryId) => {
            return subCategory.push(subCategoryId.sub_category_id);
          });
          that.setState({subCategory: subCategory});
        });
      })
      .catch((err) => {
        this.setState({
          category: [],
        });
        this.setState({subCategory: []});
        this.setState({postType: "image"});
      });
  };

  selectPost = (state, postIndex) => {
    this.fetchCategories();
    if (postIndex !== "") {
      this.setState((prevState) => ({
        autoFocus: !prevState.autoFocus,
      }));
      //make border appear on post image
      let currentPost = this.state.instagramPosts.data[postIndex];
      let mediaId = currentPost.media_id;
      let lastPost = this.state.singlePost;

      this.fetchSinglePost(mediaId);
      //unlinked last selected post
      if (lastPost) {
        lastPost.select = false;
      }
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

  changeCategory = (category) => {
    if (category) {
      this.setState({category: category});
      this.fetchSubCategories(category);
    }
  };

  changeSubCategory = (subCategories) => {
    this.setState({subCategory: subCategories});
  };

  changePostType = (e) => {
    if (e.target.checked) {
      this.setState({postType: e.target.value});
    }
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
            md="8"
            xs="12"
          >
            <div
              className={`${!this.state.selectPost ? "show" : "hidden"}`}
              style={{height: "100%", width: "100%", padding: "0px"}}
            >
              <iframe
                src={`${this.state.url + this.state.username}?iframe=yes`}
                title=""
                className="myshop-iframe"
              ></iframe>
            </div>

            <Row>
              <Col xs="12" className="p-5">
                <ShopRightBar
                  loading={this.state.loading}
                  autoFocus={this.state.autoFocus}
                  submitted={this.submitted}
                  isSelectPost={this.state.selectPost}
                  selectPost={this.selectPost}
                  singlePost={this.state.singlePost}
                  redirectedUrl={this.state.redirectedUrl}
                  categories={this.state.categories}
                  changeCategory={this.changeCategory}
                  category={this.state.category}
                  subCategory={this.state.subCategory}
                  changeSubCategory={this.changeSubCategory}
                  subCategories={this.state.subCategories}
                  changePostType={this.changePostType}
                  postType={this.state.postType}
                  //  savePost={this.savePost}
                  updatePost={(val1, val2) => {
                    this.updatePost(val1, val2);
                  }}
                  media_id={this.state.media_id}
                  deletePost={this.deletePost}
                  callBack={(value) => {
                    this.setState({redirectedUrl: value});
                  }}
                ></ShopRightBar>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addUserInfo: (text) => dispatch(addUserInfo(text)),
  };
};
export default connect(null, mapDispatchToProps)(LinkinBioShop);