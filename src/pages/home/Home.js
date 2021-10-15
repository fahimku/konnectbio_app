import React from "react";
import axios from "axios";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {Link} from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
        <div className="row">
          <div
            onClick={() => {
              this.props.history.push("/app/account/profile");
            }}
            className="col-md-4"
          >
            <div className="card-counter primary">
              <i className="fa fa-user-circle-o"></i>
              <span className="count-numbers">My Profile</span>
              {/* <span className="count-name">Users</span> */}
            </div>
          </div>

          <div
            onClick={() => {
              this.props.history.push("/app/linkinbio");
            }}
            className="col-md-4"
          >
            <div className="card-counter primary">
              <i className="fa fa-ticket"></i>
              <span className="count-numbers">My Posts</span>
              {/* <span className="count-name">Instances</span> */}
            </div>
          </div>


          <div
            onClick={() => {
              this.props.history.push("/app/linkinbio-shop");
            }}
            className="col-md-4"
          >
            <div className="card-counter primary">
              <i className="glyphicon glyphicon-shopping-cart"></i>
              <span className="count-numbers">My Shop</span>
              {/* <span className="count-name">Flowz</span> */}
            </div>
          </div>

          

          <div
            onClick={() => {
              this.props.history.push("/app/my/links");
            }}
            className="col-md-4"
          >
            <div className="card-counter primary">
              <i className="glyphicon glyphicon-link"></i>
              <span className="count-numbers">My Links</span>
              {/* <span className="count-name">Data</span> */}
            </div>
          </div>

          



          <div
            onClick={() => {
              this.props.history.push("/app/analysis");
            }}
            className="col-md-4"
          >
            <div className="card-counter primary">
              <i className="fa fa-bar-chart-o"></i>
              <span className="count-numbers">Analytics</span>
              {/* <span className="count-name">Users</span> */}
            </div>
          </div>
       
        {/* <div className="col-md-4">
            <div className="card-counter primary">
              <i className="glyphicon glyphicon-picture"></i>
              <span className="count-numbers">Media Library</span>
            
            </div>
          </div>
         
        <div className="col-md-4">
            <div className="card-counter primary">
              <i className="glyphicon glyphicon-download-alt"></i>
              <span className="count-numbers">Collect Media</span>
            
            </div>
        </div> */}
        
          

          <div
            onClick={() => {
              this.props.history.push("/app/account/categories");
            }}
            className="col-md-4">
            <div className="card-counter primary">
              <i className="fa fa-users"></i>
              <span className="count-numbers">Categories</span>
              {/* <span className="count-name">Users</span> */}
            </div>
          </div>
        </div>
      
    );
  }
}
export default Home;