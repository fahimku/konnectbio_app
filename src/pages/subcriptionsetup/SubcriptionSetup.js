import React from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import { toast } from "react-toastify";

class SubcriptionSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageIndex: "",
    };
  }

  render() {
    return (
      <div className="profile-page account-setup">
        <div className="container-fluid">
          <div className="mt-4 row">
            <div className="col-md-12">
              <h4 className="page-title">Subcription Setup</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SubcriptionSetup;
