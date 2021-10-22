import React, { Component } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import CdnUpdateAction from "Redux/V1/Sites/Addons/Cdn/Put/CdnPutAction";
import InputUpdateField from "Components/Forms/Fields/InputUpdateField";
import PermissionHelper from "Helpers/PermissionHelper";

class CdnModal extends Component {
    state = {
        form: {
            include: this.props.cdnDetails.include,
            exclude: this.props.cdnDetails.exclude,
            disable_admin: this.props.cdnDetails.disable_admin,
        },
        identity: this.props.cdnDetails,
    };

    handleChange = (event) => {
        const target = event.target;
        const { form } = this.state;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            form: {
                ...form,
                [name]: value,
            },
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const updateDetails = {
            identity: this.props.identity,
            form: this.state.form,
        };
        this.props.dispatch(CdnUpdateAction.cdnPut(updateDetails));
    };

    render() {
        return (
            <Modal
                className="cardmodel responsive-cdn-modal"
                show={this.props.show}
                onHide={this.cdnToggleModal}
            >
                <Modal.Header>
                    <Modal.Title>CDN DETAILS</Modal.Title>
                </Modal.Header>
                <form method="POST" onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <div
                            className="form-container cdn-modal-main"
                            id="registration-form"
                        >
                            <Row>
                                <Col lg="12">
                                    <InputUpdateField
                                        type="text"
                                        name="include"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.form.include}
                                        placeholder="Enter Include"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <InputUpdateField
                                        type="text"
                                        name="exclude"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.form.exclude}
                                        placeholder="Enter Exclude"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12" className="mt-2">
                                    <Form.Group
                                        controlId="formBasicCheckbox"
                                        className="cdn-modal-form"
                                    >
                                        <Form.Check
                                            name="disable_admin"
                                            type="checkbox"
                                            checked={
                                                this.state.form.disable_admin
                                            }
                                            onChange={this.handleChange}
                                            value={
                                                this.state.form.disable_admin
                                            }
                                            label="Disable Admin"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="w-100 no-gutters">
                            <Col md={4}>
                                <Button
                                    className="close-btn"
                                    onClick={this.props.onHide}
                                >
                                    Close
                                </Button>
                            </Col>
                            <Col
                                md={8}
                                className="text-right responsive-column"
                            >
                                <Button
                                    type="submit"
                                    className={`payment-btn 
                                 responsive-update-cdn-btn
                                    bionic-btn  ${
                                        this.props.cdnUpdate.loading
                                            ? "loading"
                                            : ""
                                    }`}
                                    disabled={
                                        PermissionHelper.validate([
                                            "cdn_update",
                                            "access_all",
                                        ]) === true
                                            ? true
                                            : true
                                    }
                                >
                                    Update CDN
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default CdnModal;
