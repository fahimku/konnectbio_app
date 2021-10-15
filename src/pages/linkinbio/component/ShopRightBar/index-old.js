/* eslint-disable */
import React from "react";
import {
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import classnames from "classnames";
import s from "../../LinkinBio.module.scss";
import moment from "moment";


import SelectBox from "../../../../components/SelectBox";

import {Select} from "antd";

const ShopRightBar = ( props) => {

    return (
        <>
            <Nav className={`${s.coloredNav}`} tabs>
                <NavItem>
                <NavLink
                    className={classnames({
                    active: props.activeThirdTab === "tab31",
                    })}
                    onClick={() => {
                    props.toggleThirdTabs("tab31");
                    }}
                >
                    <span>Blocks</span>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({
                    active: props.activeThirdTab === "tab32",
                    })}
                    onClick={() => {
                    props.toggleThirdTabs("tab32");
                    }}
                >
                    <span>Settings</span>
                </NavLink>
                </NavItem>
            </Nav>

                            <TabContent
                  className="mb-lg"
                  activeTab={props.activeThirdTab}
                >
                  <TabPane tabId="tab31">
                    <div className={`image-edit-box ${ props.isSelectPost ? "show" : "hidden" }`} >
                      <div className="image-box-info">
                        <span
                          onClick={() => props.selectPost(false, "")}
                          className="glyphicon glyphicon-arrow-left"
                        ></span>
                        <h4> Post</h4>
                        <p>
                          Posted on{" "}
                          {moment(props.singlePost.timestamp).format(
                            "MMM Do YYYY"
                          )}
                        </p>
                      </div>
                      <div className="image-wrapper">
                        <div className="image-box">
                          {props.singlePost.media_type == "IMAGE" ? (
                            <img src={`${props.singlePost.media_url}`} />
                          ) : (
                            <video
                              oncontextmenu="return false;"
                              id="myVideo"
                              autoplay
                              controls
                              controlsList="nodownload"
                            >
                              <source
                                src={`${props.singlePost.media_url}`}
                                type="video/mp4"
                              ></source>
                            </video>
                          )}
                        </div>
                        <form onSubmit={props.submited}>
                          <div className="image-edit-links">
                            <span>Konnect.Bio</span>
                            <input
                              required
                              type="url"
                              value={props.redirectedUrl}
                              placeholder="Add a link to any web page"
                              className="form-control"
                              onChange={(evt) => {
                                props.setState({
                                  redirectedUrl: evt.target.value,
                                });
                              }}
                            />
                            <div className="select-categories mt-3">
                              <SelectBox
                                key={Date.now()}
                                data={props.categories}
                                selected={props.dbCategoryId}
                                callBack={(a) => {
                                  props.changeCategory(a);
                                }}
                              />

                            </div>
                            <div className="select-categories mt-3">
                              <Select
                                key={Date.now()}
                                mode="tags"
                                defaultValue={[]}
                                showSearch
                                style={{width: "100%"}}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={props.changeSubCategory}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {props.subCategories.map(
                                  ({value, label}, i) => (
                                    <Option value={value}>{label}</Option>
                                  )
                                )}
                              </Select>
                            </div>
                            <div className="pane-button">
                              {props.singlePost.linked ? (
                                <>
                                  <Button
                                    onClick={(ev) =>
                                      props.updatePost(
                                        props.singlePost.id,
                                        props.redirectedUrl
                                      )
                                    }
                                   
                                  >
                                    &nbsp;&nbsp;Update&nbsp;&nbsp;
                                  </Button>
                                  <div className="remove-link">
                                    <a
                                      href="javascript:void(0)"
                                      onClick={(param) =>
                                        props.deletePost(
                                          props.singlePost.id
                                        )
                                      }
                                    >
                                      <span className="glyphicon glyphicon-trash"></span>
                                      Remove Link
                                    </a>
                                  </div>
                                </>
                              ) : (
                                <Button
                                  onClick={(ev) => props.savePost(this)}
                                  className="save-btn btn btn-primary"
                                >
                                  &nbsp;&nbsp;Save&nbsp;&nbsp;
                                </Button>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className={`pane-wrapper ${
                        props.isSelectPost ? "hidden" : "show"
                      }`}
                    >
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Buttons</h4>
                          <p>
                            Drive traffic to your website, blog, online store,
                            or any other web pages.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Featured Media</h4>
                          <p>
                            Feature the latest post on your Konnect.bio page to
                            make it stand out.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                      <div className="pane">
                        <div className="pane-info">
                          <h4>Linked Instagram Posts</h4>
                          <p>
                            Select a post to add a link and direct your audience
                            to the right content.
                          </p>
                        </div>
                        <div className="pane-button">
                          <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="tab32">
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Buttons</h4>
                        <p>
                          Drive traffic to your website, blog, online store, or
                          any other web pages.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Featured Media</h4>
                        <p>
                          Feature the latest post on your Konnect.bio page to
                          make it stand out.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                    <div className="pane">
                      <div className="pane-info">
                        <h4>Linked Instagram Posts</h4>
                        <p>
                          Select a post to add a link and direct your audience
                          to the right content.
                        </p>
                      </div>
                      <div className="pane-button">
                        <Button color="">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>        
        </>
    )


}



export default ShopRightBar