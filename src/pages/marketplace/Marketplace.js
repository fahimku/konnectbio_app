import React from "react";
import s from "./Marketplace.module.scss";
import { Col, Row } from "react-bootstrap";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({
  forceRefresh: true,
});

class Marketplace extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);

    this.state = {
      username: username,
    };
  }

  render() {
    return (
      <div className="marketplace-page">
        <div className="container-fluid">
          <div className="mt-4 row">
            <div class="col-md-12">
              <h4 class="page-title">Marketplace</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Marketplace;
