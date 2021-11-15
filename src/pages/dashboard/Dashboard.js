import React, {useState, useEffect} from "react";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
// import {
//   Container,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";
// import {Link} from "react-router-dom";

export default function Dashboard(props) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userData = userInfo;
  const [username, setUserName] = useState(userInfo.username);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSummeryPerformance(username, "image");
  }, []);

  async function fetchSummeryPerformance(username, postType) {
    setLoading(true);
    await axios
      .post("analytics/receive/getSummarizeAnalyticsForDashboard", {
        instagram_username: username,
        post_type: postType,
      })
      .then((response) => {
        setData(response.data.message);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="dashboard_main_ift container">
        <div className="dsh-top dashboard_inr row">
          <div className="dashboard_col col-md-3">
            <div className="dash_block">
              <div className="dash_content clearfix">
                <span className="dash_icon-top">
                  <i className="fa fa-eye fa-3x" aria-hidden="true"></i>
                </span>
                <div className="imp-t text-right">
                  {loading ? (
                    <Loader className="dashboard-loader" />
                  ) : (
                    data.post_views
                  )}
                </div>
                <div className="imp-tx text-uppercase text-muted text-right">
                  Total Impression
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-3">
            <div className="dash_block">
              <div className="dash_content clearfix">
                <span className="dash_icon-top">
                  <i
                    className="fa fa-hand-pointer-o fa-3x"
                    aria-hidden="true"
                  ></i>
                </span>
                <div className="imp-t text-right">
                  {loading ? (
                    <Loader className="dashboard-loader" />
                  ) : (
                    data.post_clicks
                  )}
                </div>
                <div className="imp-tx text-uppercase text-muted text-right">
                  Total Clicks
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-3">
            <div className="dash_block">
              <div className="dash_content clearfix">
                <span className="dash_icon-top">
                  <i className="fa fa-handshake-o fa-3x" aria-hidden="true"></i>
                </span>
                <div className="imp-t text-right">
                  {loading ? (
                    <Loader className="dashboard-loader" />
                  ) : (
                    data.ctr + " %"
                  )}
                </div>
                <div className="imp-tx text-uppercase text-muted text-right">
                  Total Engagement
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-3">
            <div className="dash_block">
              <div className="dash_content clearfix">
                <span className="dash_icon-top">
                  <i className="fa fa-usd fa-3x" aria-hidden="true"></i>
                </span>
                <div className="imp-t text-right">$0.00</div>
                <div className="imp-tx text-uppercase text-muted text-right">
                  Total Revenue
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dsh-mid dashboard_inr row">
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                  </span>
                  <h4>Settings - Home Screen</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      onClick={() => {
                        props.history.push("/app/account/profile");
                      }}
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage Setting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i className="fa fa-th-list fa-3x" aria-hidden="true"></i>
                  </span>
                  <h4>All Posts</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage All Posts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i
                      className="fa fa-shopping-cart fa-3x"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <h4>Bio Shop</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage Bio Shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dah-mid2 dashboard_inr row">
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i
                      className="glyphicon glyphicon-link fa-3x"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <h4>Links</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage Links
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i className="fa fa-bar-chart fa-3x" aria-hidden="true"></i>
                  </span>
                  <h4>Analytics</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage Analytics
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-4">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_inr text-center">
                  <span className="dash_icon">
                    <i className="fa fa-list-alt fa-3x" aria-hidden="true"></i>
                  </span>
                  <h4>Category Setup</h4>
                  <div className="text-muted">kbiouser3</div>
                  <div className="pt-20">
                    <a
                      className="btn btn-rounded btn-primary"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-cog mr-1"></i> Manage Category Setup
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dsh-bottom dashboard_inr row">
          <div className="dashboard_col col-md-6">
            <div className="dash_block">
              <div className="dash_content">
                <i className="fa fa-list-alt fa-2x text-body-bg-dark"></i>
                <div className="row pb-3 pt-3">
                  <div className="col-6 text-right border-r">
                    <div className="imp-t text-right">132</div>
                    <div className="imp-tx text-uppercase text-muted text-right">
                      Total Posts
                    </div>
                  </div>
                  <div className="col-6 text-left">
                    <div className="imp-t">55</div>
                    <div className="imp-tx text-uppercase text-muted">
                      Linked Posts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard_col col-md-6">
            <div className="dash_block">
              <div className="dash_content">
                <div className="dash_c_pkg text-center">
                  <span className="dash_icon">
                    <i className="fa fa-check fa-3x" aria-hidden="true"></i>
                  </span>
                  <h4>{userData.package.package_description}</h4>
                  <div className="text-muted">
                    This is your current active plan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
