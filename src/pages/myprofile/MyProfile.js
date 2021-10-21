import React from "react";
import axios from "axios";
import { route } from "react-router";
import {} from "reactstrap";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.scss";
import { Row, Col, Button } from "react-bootstrap";
import InputValidation from "../../components/InputValidation";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

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
  };

  componentDidMount() {
    this.fetchUserInfo();
  }
  fetchUserInfo = async () => {
    await axios
      .get(`/users/receive/userinfo?user=${userInfo.username}`)
      .then((response) => {
        if (response.data.success) {
          const userInfo = response.data.message.data;
          this.setState({
            userData: userInfo,
          });
          this.setDefaultData();
        }
      })
      .catch((error) => {
        console.log(error.response.data.messagem, "error");
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
        this.fetchUserInfo();
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
        this.fetchUserInfo();
        this.setState({ imageFiles: [] });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ loadingImage: false });
        this.setState({ imageError: err.response.data.message });
      });
  };
  // clearImage = () => {
  //   console.log("sdsdsd");
  //   this.setState({
  //     imageFiles: [],
  //   });
  // };

  render() {
    const userData = this.state.userData;
    return (
      <div className="profile-page">
        <div className="container">
          <div className="justify-content-md-center">
            <Row className="mt-4">
              <Col md={12}>
                <h4 className="page-title">My Profile</h4>
              </Col>
            </Row>
            <div className="white-box">
              <form onSubmit={this.handleSubmit} className="white-box">
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
                        ) : (
                          <img
                            alt="..."
                            // src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg=="
                            src={
                              userData.profile_image_url === ""
                                ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg=="
                                : userData.profile_image_url
                            }
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
                    {/* <Button
                      onClick={this.clearImage}
                      className="select-image"
                      // disabled={this.state.imageFiles.length > 0 ? false : true}
                    >
                      Remove
                    </Button> */}

                    {this.state.loadingImage ? (
                      <Button className="d-block upload-btn">
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        onClick={this.uploadImage}
                        className="d-block upload-btn"
                        disabled={
                          this.state.imageFiles.length > 0 ? false : true
                        }
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
                      className="form-control comment-field"
                      // required
                      // maxlength="120"
                      defaultValue={userData.bio}
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
          </div>
        </div>
      </div>
    );
  }
}
export default MyProfile;
