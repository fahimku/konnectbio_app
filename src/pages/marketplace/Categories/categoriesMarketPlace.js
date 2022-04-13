import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import placeholder from "../../../../src/images/placeholder.svg" 
// import CustomCategory from "./component/CustomCategory";
import * as subActions from "../../../actions/subscribe";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import ModalCategories from "./modalCategories";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import BuySubscription from "../../subcriptionsetup/component/BuySubscription";
export const history = createBrowserHistory({
  forceRefresh: true,
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandData:"",
      modalComp:true,
      modalData:"",
      myCategory: "",
      myCustomCategory: "",
      user_id: "",
      category: [],
      defaultCategory: "",
      saveCategories: "",
      brandCategory: "",
      categoryError: "",
      loading: false,
      packages: "",
      package: userInfo.package.package_name,
      categoryAllow: userInfo.package.category_count,
      package_amount: userInfo.package.package_amount,
      sort: false,
      priceId: "",
      categoryLimit: "",
      showInterval: false,
      plan: "Yearly",
      config: [],
      unitAmount: "",
      catLoading: true,
    };
  }

  componentDidMount() {
    if (userInfo.package?.subscription_type !== "Trial") {
      var subType = JSON.parse(localStorage.getItem("userInfo")).package
        .recurring_payment_type;
      if (subType) {
        subType = subType.slice(0, subType.length - 2).toLocaleLowerCase();
        this.props.configSubs().then((res) => {
          const getPrice = res.message
            .filter((item) => item.product_name === "Category")
            .filter((subItem) => subItem.interval === subType)[0];
          this.setState({ priceId: getPrice.price_id });
          this.setState({ unitAmount: getPrice.unit_amount / 3 });
        });
      } else {
        this.setState({ showInterval: true });
        const planCut = this.state.plan
          .slice(0, this.state.plan.length - 2)
          .toLocaleLowerCase();
        this.props.configSubs().then((res) => {
          this.setState({ config: res.message });
          const getPrice = res.message
            .filter((item) => item.product_name === "Category")
            .filter((subItem) => subItem.interval === planCut)[0];
          this.setState({ priceId: getPrice.price_id });
          this.setState({ unitAmount: getPrice.unit_amount / 3 });
        });
      }
    }

    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ user_id: userInfo.user_id });
    this.fetchMyCategory();
    this.fetchSaveCategory();
    // this.getPackages();
    // this.fetchCustomCategory();
    // Connect Instagram Code
  }


  fetchMyCategory = async () => {
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
        this.setState({
          myCategory: selectCategories,
          categoryLimit: response.data.category_limit,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  brand = (value) => {
    console.log(value);
    this.setState({brandData:value})
    this.setState({modalComp:false})
  }
  changeFlag = () =>{
    
  }
  fetchSaveCategory = async () => {
    await axios
      .get(`/users/receive/categories?id=${userInfo.user_id}`)
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

        this.setState({
          // defaultCategory: myCategories,
          saveCategories: saveCategories,
          brandCategory: saveCategories,
        });

        {
          this.props.catTab &&
            this.setState({ catLoading: false }, () => {
              this.props.catTab(
                this.state.brandCategory,
                this.state.catLoading
              );
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    const SortableItem = SortableElement(({ value }) =>(
      <div key={value.value} className="cat-box col-sm-3 col-4">
      
        <img
          key={value.value}
          src={
            value.image === "" || value.image === undefined
              ? placeholder
              : value.image
          }
          alt="cat-logo"
          className="img-fluid "
         onClick={()=>this.brand(value)}
        />
        <div className="cat-lable">{value.label}</div>
      
          {/* <div className="action">
            <ModalCategories
              userID={this.state.myCustomCategory}
           
              catData={value}
            />
          </div>  */}
       
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
    if (this.props.page === "brand") {
      this.props.getCategory(this.state.brandCategory);
    }
    return (
      <React.Fragment>
        <div className="profile-page account-setup">
          <div className={this.props.page === "brand" ? "" : "container-fluid"}>
            {this.props.page === "brand" ? null : (
              <div
                className={`row ${
                  this.props.type === "marketcategory" ? "" : "mt-4"
                }`}
              >
                <div class="col-md-12">
                  <h4 class="page-title">
                    {this.props.type === "marketcategory"
                      ? "Category"
                      : "Category Setup"}
                  </h4>
                </div>
              </div>
            )}

            <div className="profile_container_main container">
              <div className="row">
              
                <div className="profile_box_main col-md-8">
                  <div className="dash_block_profile">
                    <div className="dash_content_profile">
                      {/* <form onSubmit={this.handleSubmit}> */}
                      <p
                        style={{
                          color: "gray",
                          borderBottom: "1px solid lightgray",
                          paddingBottom: 10,
                        }}
                      >
                      {this.state.modalComp ?
                       <>
                       My Categories
                       </>: <i class="fa fa-arrow-left" onClick={this.changeFlag()}></i>
                      }
                      </p>
                      <Row>
                        <Col md={12}>
                   
                          <span className="text-danger">
                            {this.state.categoryError}
                          </span>
                          {!this.state.modalComp ? <ModalCategories catData={this.state.brandData}
                                                                   /> :
                          <>
                          {this.state.saveCategories.length === 0 ? (
                               <Loader size="30" />
                            // <Row>
                            //   <span className="ml-4 mt-2 mb-2">
                            //     No Category Selected
                            //   </span>
                            // </Row>
                          ) : (
                                                 
                            <SortableList
                              items={this.state.saveCategories}
                              onSortEnd={this.onSortEnd}
                              axis="xy"
                              lockToContainerEdges={true}
                              lockOffset="0%"
                              distance={1}
                            />
                        
                          )}

                          </>
  }
                        </Col>
                      </Row>

                  
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(null, subActions)(Categories);
