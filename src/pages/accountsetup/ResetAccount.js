import React from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory({
  forceRefresh: true,
});

export default function ResetAccount(props) {
  async function resetAccount() {
    props.loading(true);
    await axios
      .put(`/users/revise/resetaccount/${props.userId}`)
      .then((response) => {
        props.resetModal(false);
        props.loading(false);
        localStorage.removeItem("access_token");
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        toast.error(response.data.message);
        history.push("/connect");
      })
      .catch((err) => {
        props.loading(false);
        console.log(err, "err");
      });
  }
  return (
    <>
      <div className="profile_box_main col-md-4">
        <div className="dash_block_profile">
          <div className="dash_content_profile">
            <h5>Reset Account</h5>
            <Row>
              <Col md={12}>
                <div className="dp_fields-setup mb-3">
                  <div className="category_count">
                    This will reset your account.
                  </div>
                </div>
                <div className="dp_fields-setup">
                <div class="text-left mb-2">Warning: This action is not reversible.</div>
                  <Button
                    onClick={() => {
                      props.resetModal(true);
                    }}
                    variant="primary"
                    className="btn-block cat-right-btn"
                  >
                    Reset Account
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal
        show={props.show}
        onHide={props.onHide}
        className="change-password"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          Are you sure you want to reset your Konnect.bio Account? This will
          remove all your data from our platform. This action is not reversible.
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.resetModal(false);
            }}
          >
            Close
          </Button>
          <Button
            className="disconnect-btn"
            onClick={() => {
              resetAccount();
            }}
            disabled={props.disabled}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
