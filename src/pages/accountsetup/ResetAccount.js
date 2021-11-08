import React from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
export default function ResetAccount(props) {
  return (
    <>
      <div className="white-box">
        <Row>
          <Col md={12}>
            <h5 className="page-title line-heading">Reset Account</h5>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <div className="category_count">This will reset your account.</div>
          </Col>
          <Col md={3} className="text-right">
            <Button
              onClick={() => {
                props.resetModal(true);
              }}
              variant="primary"
              className="btn-block cat-right-btn"
            >
              Reset Account
            </Button>
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
          <Modal.Title>Reset Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          Are you sure you want to reset your Konnect.bio Account? This will
          remove all your data from our platform.This action is not reversible.
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.resetModal(true);
            }}
          >
            Close
          </Button>
          <Button
            className="disconnect-btn"
            onClick={props.resetAccount}
            disabled={props.disabled}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}