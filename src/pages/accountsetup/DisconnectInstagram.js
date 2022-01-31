import React from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

export default function DisconnectInstagram(props) {
  async function disconnect() {
    props.loading(true);
    await axios
      .put(`/users/revise/disconnectinstagram/${props.userId}`)
      .then((response) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("fbToken");
        localStorage.removeItem("fbPage");
        props.modal(false);
        props.loading(false);
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.page_token = "";
        userInfo.fb_token = "";
        userInfo.access_token = "";
        userInfo.instagram_id = "";
        userInfo.username = "";
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        history.push("/connect");
        history.go(0);
      })
      .catch((err) => {
        props.loading(true);
      });
  }
  return (
    <>
      <div className="profile_box_main col-md-6">
        <div className="dash_block_profile">
          <div className="dash_content_profile">
            <h5>Instagram Connection</h5>
            <Row>
              <Col md={12}>
                <div className="dp_fields-setup mb-3">
                  <div className="category_count">Connection Status</div>
                </div>
                <div className="dp_fields-setup">
                  {props.username1 !== "" || props.username ? (
                    <>
                      <div className="connected-text text-left mb-2">
                        Connected: @
                        {props.username1 !== ""
                          ? props.username1
                          : props.username}
                      </div>
                      <Button
                        variant="primary"
                        className="btn-block cat-right-btn"
                        onClick={() => {
                          props.modal(true);
                        }}
                      >
                        Disconnect Instagram
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        window.location.replace(props.url);
                      }}
                      variant="primary"
                      className="btn-block cat-right-btn"
                    >
                      <i className="fa fa-instagram" />
                      &nbsp;&nbsp; Connect Instagram
                    </Button>
                  )}
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
          <Modal.Title>Disconnect Instagram</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          Are you sure you want to disconnect
          <span className="strong"> @{props.username1}</span> account from
          Konnect.bio? This will remove all your content from our platform.
          <p>This action is not reversible.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.modal(false);
            }}
          >
            Close
          </Button>
          <Button
            className="disconnect-btn"
            onClick={() => {
              disconnect();
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
