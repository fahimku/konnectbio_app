import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import ChangePassword from "./component/ChangePassword";
import Placeholder from "../../images/placeholder.svg";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class MyProfile extends React.Component {
  state = {
    form: {
      name: "",
      bio: "",
    },
    imageFiles: [],
    user_id: "",
    imageError: "",
    loadingImage: false,
    loading: false,
    userData: "",
    userImage: "",
    userInfo2: "",
  };

  componentDidMount() {
    const userInfo2 = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({
      userInfo2: userInfo2,
    });
    this.fetchUserInfo(userInfo2);
  }
  fetchUserInfo = async (userInfo2) => {
    await axios
      .get(`/users/receive/userinfo?user=${userInfo2.username}`)
      .then((response) => {
        if (response.data.success) {
          const userInfo = response.data.message.data;
          this.setState({
            userData: userInfo,
            userImage: userInfo.profile_image_url,
          });
          this.setDefaultData();
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  setDefaultData = () => {
    const { form } = this.state;
    setTimeout(() => {
      form.name = this.state.userData.name;
      form.bio = this.state.userData.bio;

      this.setState({
        form,
      });
    }, 100);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    await axios
      .put(`/users/revise/profilefields/${userInfo.user_id}`, this.state.form)
      .then((response) => {
        this.setState({ loading: false });
        let imageResponse = response.data;
        toast.success(imageResponse.message);
        this.fetchUserInfo(this.state.userInfo2);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
        this.setState({ loading: false });
      });
  };

  handleChange = (e) => {
    let { form } = this.state;
    form[e.target.name] = e.target.value;

    this.setState({
      form,
    });
  };
  onChangeInputImage = (e) => {
    const files = [];
    const reader = new FileReader();
    files.push(e.target.files[0]);
    reader.onloadend = () => {
      files[0].preview = reader.result;
      files[0].toUpload = true;
      this.setState({
        imageFiles: files,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  uploadImage = async () => {
    var formData = new FormData();
    formData.append("image", this.state.imageFiles[0]);
    formData.append("instagram_username", userInfo.username);
    this.setState({ loadingImage: true });
    await axios
      .put(`/users/revise/profileimage/${userInfo.user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.setState({ loadingImage: false });
        let imageResponse = response.data;
        toast.success(imageResponse.message);
        this.fetchUserInfo(this.state.userInfo2);
        this.setState({ imageFiles: [] });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ loadingImage: false });
        this.setState({ imageError: err.response.data.message });
      });
  };
  clearImage = () => {
    this.setState({
      imageFiles: [],
      userImage: "",
    });
  };

  render() {
    const userData = this.state.userData;
    return (
      <div className="profile-page">
        <div className="container">
          <Row className="mt-4">
            <Col md={12}>
              <h4 className="page-title">My Profile</h4>
            </Col>
          </Row>
          <div className="white-box">
            <form onSubmit={this.handleSubmit}>
              <Row className="mb-3">
                <Col md={12} className="text-center">
                  <div className="fileinput file-profile">
                    <input
                      accept="image/*"
                      onChange={(e) => this.onChangeInputImage(e)}
                      id="fileupload2"
                      type="file"
                      name="file"
                      className="d-none"
                    />
                    <div className="fileinput-new thumbnail">
                      {this.state.imageFiles.length > 0 ? (
                        <div>
                          {this.state.imageFiles.map((file, idx) => (
                            <img
                              alt="..."
                              src={file.preview}
                              key={`img-id-${idx.toString()}`}
                              style={{ width: "150px", height: "150px" }}
                              className="circle profile-icon"
                            />
                          ))}
                        </div>
                      ) : this.state.userImage === "" ||
                        this.state.userImage === undefined ? (
                        <img
                          alt="profile-icon"
                          src={
                            Placeholder
                            // "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg=="
                          }
                          style={{ width: "150px", height: "150px" }}
                          className="circle profile-icon"
                        />
                      ) : (
                        <img
                          alt="profile-icon"
                          src={this.state.userImage}
                          style={{ width: "150px", height: "150px" }}
                          className="circle profile-icon"
                        />
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    color="default"
                    className="select-image"
                  >
                    <label for="fileupload2">Choose Image</label>
                  </Button>
                  <Button
                    onClick={this.clearImage}
                    className="select-image"
                    // disabled={this.state.imageFiles.length > 0 ? false : true}
                  >
                    Clear
                  </Button>

                  {this.state.loadingImage ? (
                    <Button className="d-block upload-btn">
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      onClick={this.uploadImage}
                      className="d-block upload-btn"
                      disabled={this.state.imageFiles.length > 0 ? false : true}
                    >
                      Upload Image
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <label>Enter Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onInput={this.handleChange}
                    className="form-control comment-field"
                    required
                    defaultValue={userData.name}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <label>Enter Bio</label>

                  <textarea
                    name="bio"
                    placeholder="Enter Bio"
                    onInput={this.handleChange}
                    className="form-control comment-field pt-2"
                    // required
                    // maxlength="120"
                    defaultValue={userData.bio}
                    rows="4"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} className="update-col">
                  {this.state.loading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="category-btn btn-block "
                    >
                      Update Profile
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </div>
          <Row className="">
            <Col md={12}>
              <h4 className="page-title">Change Password</h4>
            </Col>
          </Row>
          <ChangePassword userID={userInfo.user_id} />
        </div>
      </div>
    );
  }
}
export default MyProfile;
