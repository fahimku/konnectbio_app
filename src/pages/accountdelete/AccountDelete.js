import React from "react";
import axios from "axios";
import {route} from "react-router";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {Link} from "react-router-dom";
import s from "./ErrorPage.module.scss";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class AccountDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user_id: "",
    };
  }

  componentDidMount() {
    this.setState({user_id: userInfo.user_id});
  }

  toggle(id) {
    this.setState((prevState) => ({
      [id]: !prevState[id],
    }));
  }

  deleteAccount = async () => {
    await axios
      .put(`/users/revise/account/delete`, {
        user_id: this.state.user_id,
      })
      .then(() => {
        this.setState({modal: false});
        this.props.history.push('/logout')
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div className={s.errorPage}>
        <Container>
          <div className={`${s.errorContainer} mx-auto`}>
            <p className={s.errorInfo}>
              Are you sure you want delete your account?
            </p>
            <p className={[s.errorHelp, "mb-3"].join(" ")}>
              This action is not reversible and it will remove all your data
              from our servers.
            </p>
            <p className={[s.errorHelp, "mb-3"].join(" ")}>
              <i>For support please contact support@konnect.bio .</i>
            </p>

            <Link to="#">
              <Button
                className={s.errorBtn}
                onClick={() => {
                  this.setState({modal: true});
                }}
                type="submit"
                color="warning"
              >
                Yes Delete My Account{" "}
                <i className="fa fa-trash text-white ml-xs" />
              </Button>
            </Link>
          </div>

          <Modal
            size="sm"
            isOpen={this.state.modal}
            toggle={() => this.toggle("modal")}
          >
            <ModalHeader toggle={() => this.toggle("modal")}>
              Account Delete
            </ModalHeader>
            <ModalBody className="bg-white">
              Are you sure you want to delete ?
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={() => this.toggle("modal")}>
                Close
              </Button>
              <Button color="primary" onClick={this.deleteAccount}>
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}
export default AccountDelete;
