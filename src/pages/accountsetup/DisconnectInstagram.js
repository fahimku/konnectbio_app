import React from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import axios from "axios";
import {createBrowserHistory} from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

export default function DisconnectInstagram(props) {
  async function disconnect() {
    props.loading(true);
    await axios
      .put(`/users/revise/disconnectinstagram/${props.userId}`)
      .then((response) => {
        props.modal(false);
        props.loading(false);
        localStorage.removeItem("access_token");
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        history.push("/connect");
      })
      .catch((err) => {
        props.loading(true);
      });
  }
  return (
    <>
      <div className="white-box">
        <Row>
          <Col xl={12}>
            <h5 className="page-title line-heading">Instagram Connection</h5>
          </Col>
        </Row>
        <Row>
          <Col md={4} xl={2}>
            <div className="category_count">Connection Status</div>
          </Col>
          <Col md={4} xl={3} className="text-right">
            {props.username1 !== "" || props.username ? (
              <>
                <div className="connected-text text-left mb-2">
                  Connected: @
                  {props.username1 !== "" ? props.username1 : props.username}
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
          </Col>
        </Row>
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