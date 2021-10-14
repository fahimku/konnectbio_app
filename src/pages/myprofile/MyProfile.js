import React from "react";
import axios from "axios";
import { route } from "react-router";
import {} from "reactstrap";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.scss";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user_id: "",
    };
  }

  componentDidMount() {
    this.setState({ user_id: userInfo.user_id });
  }

  // toggle(id) {
  //   this.setState((prevState) => ({
  //     [id]: !prevState[id],
  //   }));
  // }

  // deleteAccount = async () => {
  //   await axios
  //     .put(`/users/revise/account/delete`, {
  //       user_id: this.state.user_id,
  //     })
  //     .then(() => {
  //       this.setState({ modal: false });
  //       this.props.history.push("/logout");
  //     })
  //     .catch((err) => {});
  // };

  render() {
    return (
      <div className="profile-page">
        <div className="container-fluid">
          <h3 className="page-title">Personal Profile</h3>
        </div>
      </div>
    );
  }
}
export default MyProfile;
