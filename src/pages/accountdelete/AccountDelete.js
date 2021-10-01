import React from "react";
import {Container, Form, FormGroup, Input, Button} from "reactstrap";
import {Link} from "react-router-dom";
import s from "./ErrorPage.module.scss";

class AccountDelete extends React.Component {
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
            <Form method="get">
              <Link to="app/extra/search">
                <Button className={s.errorBtn} type="submit" color="warning">
                 Yes Delete My Account{" "}
                  <i className="fa fa-trash text-white ml-xs" />
                </Button>
              </Link>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default AccountDelete;
