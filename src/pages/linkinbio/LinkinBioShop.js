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
import Header from "./component/Header";

class LinkinBioShop extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);

    this.error = this.error.bind(this);
    this.state = {
      media_id: "",
      instagramPosts: null,
      post_type: "",
      categories: [],
      category: [],
      subCategories: [],
      subCategory: [],
      singlePost: "",
      dbSinglePost: "",
      dbCategoryId: "",
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
    };
    this.props.addUserInfo("test");
    this.changeCategory = this.changeCategory.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
  }

  componentDidMount() {
    this.fetchInstagramPosts();
    this.fetchCategories();
  }

  //Second Request From User
  async fetchInstagramPosts() {
    await axios
      .get(`profile/${this.state.username}`)
      .then((response) => {
        this.setState({instagramPosts: response.data.message.result});
        if (response.data)
          this.setState({
            nextPageUrl: response.data.message.result.paging.next,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Next Page Instagram Posts Request From User
  // async nextPageInstagramPosts(url, username) {
  //   await axios
  //     .post(`/social/ig/nextMedia/${username}`, {
  //       url: url,
  //     })
  //     .then((response) => {
  //       let instagramPosts = [];
  //       let nextPageInstagramPosts = response.data;
  //       let PreviousInstagramPosts = this.state.instagramPosts;
  //       //Check Instagram has more posts
  //       if (nextPageInstagramPosts.paging.hasOwnProperty("next")) {
  //         this.setState({nextPageUrl: nextPageInstagramPosts.paging.next});
  //       } else {
  //         this.setState({nextPageUrl: ""});
  //       }
  //       instagramPosts.push(PreviousInstagramPosts);
  //       for (let i = 0; i < nextPageInstagramPosts.data.length; i++) {
  //         instagramPosts[0].data.push(nextPageInstagramPosts.data[i]);
  //       }
  //       this.setState({instagramPost: instagramPosts});
  //     })
  //     .catch((err) => {
  //       if (err.response.data.message.type) {
  //         localStorage.removeItem("access_token");
  //         this.setState({
  //           error: {
  //             type: "InstagramAuthFail",
  //             message:
  //               "Your Instagram connection is expired. pleased connect in again",
  //           },
  //         });
  //       }
  //     });
  // }
  // Fetch Single Post
  fetchSinglePost = async (media_id) => {
    await axios
      .get(`/posts/retrieve/${media_id}`)
      .then((response) => {
        this.setState({media_id: media_id});
        let category = response.data.message.categories[0].category_id;
        this.setState({category: category});
        let subCategory = [];
        let that = this;
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
      });
  };
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
            media_type: this.state.currentPost.media_type,
            timestamp: this.state.currentPost.timestamp,
            redirected_url: this.state.redirectedUrl,
            username: this.state.currentPost.username,
            categories: [this.state.category],
            sub_categories: this.state.subCategory,
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
          categories: [this.state.category],
          sub_categories: this.state.subCategory,
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
      let instagramPosts = JSON.parse(
        JSON.stringify(this.state.instagramPosts)
      );
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
    // if (bottom) {
    //   if (this.state.nextPageUrl) {
    //     this.nextPageInstagramPosts(
    //       this.state.nextPageUrl,
    //       this.state.username
    //     );
    //   }
    // }
  };

  selectPost = (state, postIndex) => {
    this.fetchCategories();
    if (postIndex !== "") {
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
    console.log("radio change");
    if (e.target.checked) {
      console.log(e.target.value);
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
        <Header username={this.state.username} placeholder={placeholder} />
        <Row className="main-container">
          <Col className="left-column" md="6" xs="12">
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
            md="6"
            xs="12"
          >
            <div
              className={`${!this.state.selectPost ? "show" : "hidden"}`}
              style={{height: "100%", width: "100%", paddingTop: ""}}
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
                  submitted={this.submitted}
                  isSelectPost={this.state.selectPost}
                  selectPost={this.selectPost}
                  singlePost={this.state.singlePost}
                  redirectedUrl={this.state.redirectedUrl}
                  categories={this.state.categories}
                  dbCategoryId={this.state.dbCategoryId}
                  changeCategory={this.changeCategory}
                  category={this.state.category}
                  subCategory={this.state.subCategory}
                  changeSubCategory={this.changeSubCategory}
                  changePostType={this.changePostType}
                  subCategories={this.state.subCategories}
                  savePost={this.savePost}
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
