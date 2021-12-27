import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import placeholder from "../../../src/images/placeholder.svg";
// import CustomCategory from "./component/CustomCategory";
import { createBrowserHistory } from "history";
import EditCustomCategory from "./component/EditCustomCategory";
import Swal from "sweetalert2";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import { connect } from "react-redux";
import * as catActions from "../../actions/category";

export const history = createBrowserHistory({
  forceRefresh: true,
});

function MyCategory(props) {
  const userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
  const [myCategory, setMyCategory] = useState("");
  // const [myCustomCategory, setMyCustomCategory] = useState("");
  // const [userid, setUserId] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [saveCategories, setSaveCategories] = useState("");
  // const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fetchMyCategory();
    // fetchSaveCategory();
    props.getUserCategories().then(
      function (res) {
        setSaveCategories(
          res.map((item) => {
            return {
              value: item.arent_id,
              label: item.category_name,
              image: item.image_url,
              editable: item.editable,
              category_id: item.category_id,
            };
          })
        );
      },
      function (error) {
        toast.error(error?.response?.data?.message);
      }
    );
  }, []);
  const fetchMyCategory = async () => {
    await axios
      .get("/usercategory/receive")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({ parent_id, category_name, image_url }) => {
          return selectCategories.push({
            value: parent_id,
            label: category_name,
            image: image_url,
          });
        });
        setMyCategory(selectCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchSaveCategory = async () => {
    await axios
      .get(`/users/receive/categories?id=${userInfo1.user_id}`)
      .then((response) => {
        const saveCategories = [];
        //const myCategories = response.data.message;
        const optionCategories = response.data.message;
        optionCategories.map(
          ({ parent_id, category_name, image_url, editable, category_id }) => {
            return saveCategories.push({
              value: parent_id,
              label: category_name,
              image: image_url,
              editable: editable,
              category_id: category_id,
            });
          }
        );
        setSaveCategories(saveCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let category =
      saveCategories === null
        ? []
        : saveCategories.map((category) => {
            return {
              category_name: category.label,
              category_id: category.editable
                ? category.category_id
                : category.value,
              image_url: category.image,
              editable: category.editable,
            };
          });
    setLoading(true);
    await axios
      .post(`/usercategory/reserve`, {
        categories: category,
        sort: sort,
      })
      .then((response) => {
        setLoading(false);
        setCategoryError("");
        setSort(false);
        let imageResponse = response.data;
        toast.success(imageResponse.message);
        fetchSaveCategory();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setCategoryError("");
      });
  };
  const handleSelect = (e, options) => {
    let difference = saveCategories.filter((x) => !options.includes(x));
    if (difference.length > 0) {
      Swal.fire({
        title: "Are you sure you want to delete this category?",
        text: "This will uncategorize all your post related to this category.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#010b40",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSaveCategories(options);
        } else {
          setSaveCategories(saveCategories);
        }
      });
    } else {
      options = options === null ? [] : options;
      if (options.length > userInfo1.package.category_count) {
        options.pop();
        setSaveCategories(options);
        setCategoryError(
          `You have only ${userInfo1.package.category_count} categories allowed in this plan`
        );
      } else {
        setSaveCategories(options === null ? [] : options);
        setCategoryError("");
      }
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSaveCategories(arrayMove(saveCategories, oldIndex, newIndex));
    setSort(true);
  };
  const SortableItem = SortableElement(({ value }) => (
    <div key={value.value} className="cat-box col-sm-3 col-4">
      <img
        key={value.value}
        src={
          value.image === "" || value.image === undefined
            ? placeholder
            : value.image
        }
        alt="cat-logo"
        className="img-fluid cat-image"
      />
      <div className="cat-lable">{value.label}</div>
      {value.editable ? (
        <div className="action">
          <EditCustomCategory
            userID={userInfo1.user_id}
            fetchMyCategory={fetchMyCategory}
            // fetchCustomCategory={this.fetchCustomCategory}
            fetchSaveCategory={fetchSaveCategory}
            catData={value}
          />
        </div>
      ) : null}
    </div>
  ));
  const SortableList = SortableContainer(({ items }) => (
    <Row>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index.toString()}`}
          index={index}
          value={value}
        />
      ))}
    </Row>
  ));
  // console.log(props.getUserCategories(), "props");
  return (
    <>
      <div className="profile-page account-setup">
        <div className={props.className ? props.className : "container-fluid"}>
          <div className="mt-4 row">
            <div class="col-md-12">
              <h4 class="page-title">Category Setup</h4>
            </div>
          </div>

          <div className="profile_container_main container">
            <div className="row-rev row">
              <div className="profile_box_main col-md-4">
                <div className="dash_block_profile">
                  <div className="dash_content_profile">
                    <h5>Plan Details</h5>
                    <div className="category-box">
                      <div className="category-count-row col-12">
                        <h4 className="category-count-title">Current Plan:</h4>
                        <h3 className="category-count-right">
                          {userInfo1.package
                            ? userInfo1.package.package_name
                            : ""}
                        </h3>
                      </div>
                    </div>

                    <div className="category-box">
                      <div className="category-count-row col-12">
                        <h4 className="category-count-title">
                          Categories Included:{" "}
                        </h4>
                        <h3 className="category-count-right">
                          {userInfo1.package
                            ? userInfo1.package.category_count
                            : ""}
                        </h3>
                      </div>
                    </div>

                    {userInfo1.package.package_name !== "Business Plus" ? (
                      <div className="category-box">
                        <div className="category-count-row col-12">
                          <h4 className="category-count-title">
                            Change plan to have more features:
                          </h4>
                        </div>
                        <div className="category-count-row col-12">
                          <Button
                            variant="primary"
                            className="btn-block mr-0"
                            onClick={() => history.push("/app/account/setup")}
                          >
                            Upgrade
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="profile_box_main col-md-8">
                <div className="dash_block_profile">
                  <div className="dash_content_profile">
                    <form onSubmit={handleSubmit}>
                      <h5>Select Categories</h5>
                      <Row>
                        <Col md={12}>
                          {saveCategories === "" ? null : (
                            <Select
                              isMulti={true}
                              name="category"
                              className="selectCustomization"
                              options={myCategory}
                              value={saveCategories}
                              placeholder="Select Category"
                              onChange={(options, e) =>
                                handleSelect(e, options)
                              }
                            />
                          )}
                          <span className="text-danger">{categoryError}</span>

                          {saveCategories.length === 0 ? (
                            <Row>
                              <span className="ml-4">No Category Selected</span>
                            </Row>
                          ) : (
                            <SortableList
                              items={saveCategories}
                              onSortEnd={onSortEnd}
                              axis="xy"
                              lockToContainerEdges={true}
                              lockOffset="0%"
                              distance={1}
                            />
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col md={5} xl={3}>
                          <Button
                            variant="primary"
                            type="submit"
                            className="category-btn btn-block"
                            disabled={
                              saveCategories.length && !loading ? false : true
                            }
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </form>
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
function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps, { ...catActions })(MyCategory);
