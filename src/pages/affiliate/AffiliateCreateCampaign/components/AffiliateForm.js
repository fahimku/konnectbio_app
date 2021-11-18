import React from "react";
import { Col, Row } from "react-bootstrap";
import Formsy from "formsy-react";
import { Button } from "reactstrap";
import moment from "moment";
import { Select } from "antd";
import InputValidation from "../../../../components/InputValidation";
import { DatePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

class AffiliateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      campaign_name: "",
      campaignType: "",
      pay_per_hundred: "",
      budget: "",
      startDate: moment(),
      endDate: moment().add(30, "days"),
      inputList: [{ firstName: "", lastName: "" }],
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }
  titleChange = (value) => {
    this.setState({ campaign_name: value });
  };
  ppClick = (value) => {
    this.setState({ pay_per_hundred: value });
  };
  budget = (value) => {
    this.setState({ budget: value });
  };
  dateRangePickerChanger(value, dataString) {
    console.log(value, "value");
    console.log(dataString, "dataString");
    let startDate = dataString[0];
    let endDate = dataString[1];
    this.setState({ startDate: startDate });
    this.setState({ endDate: endDate });
  }

  changeType = (e) => {
    const { value } = e.target;

    this.setState({
      campaignType: value,
    });
  };
  changeCountry = (e, options) => {
    this.setState({ country: options });
  };
  saveCampaign = (id) => {
    console.log(this.state.campaign_name, "campaign_name ");
    console.log(this.state.campaignType, "campaignType ");
    console.log(this.state.budget, "budget ");
    console.log(this.state.pay_per_hundred, "pay_per_hundred ");
  };
  // handle input change
  handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.inputList];
    list[index][name] = value;
    this.setState({ inputList: list });
    // setInputList(list);
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = [...this.state.inputList];
    list.splice(index, 1);
    this.setState({ inputList: list });
    // setInputList(list);
  };

  // handle click event of the Add button
  handleAddClick = () => {
    this.setState({
      inputList: [...this.state.inputList, { firstName: "", lastName: "" }],
    });
    // setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  render() {
    const { affData } = this.props;
    let category = affData.categories ? affData.categories[0].category_id : [];
    console.log(this.props.countries, "countries");
    return (
      <React.Fragment>
        <Formsy.Form>
          <div className="image-wrapper">
            <div className="image-box">
              <img src={`${affData.media_url}`} alt="media_url" />
            </div>
            <div className="image-edit-links">
              <div className="">
                <span>Campaign Name</span>
                <InputValidation
                  className=""
                  type="text"
                  id="campaign_name"
                  name="campaign_name"
                  required
                  // value={affData.title}
                  placeholder="Campaign Name"
                  onChange={(evt) => {
                    this.titleChange(evt.target.value);
                  }}
                />
              </div>
              <div className="mt-3">
                <span>URL</span>
                <InputValidation
                  className=""
                  placeholder="Please Enter Website Address"
                  type="text"
                  id="website"
                  required
                  name="website"
                  value={affData.redirected_url}
                  disabled
                />
              </div>

              <div className="select-categories mt-3">
                <span>Category</span>
                <Select
                  key={Date.now()}
                  value={category}
                  style={{ width: "100%" }}
                  placeholder="Category"
                  disabled={true}
                >
                  {affData.categories
                    ? affData.categories.map(
                        ({ category_id, category_name }, i) => (
                          <Option value={category_id}>{category_name}</Option>
                        )
                      )
                    : []}
                </Select>
              </div>

              <div className="date-range mt-3">
                <span>Select Start Date / End Date</span>
                <RangePicker
                  key={1}
                  defaultValue={[
                    moment(this.state.startDate),
                    moment(this.state.endDate),
                  ]}
                  value={[
                    moment(this.state.startDate),
                    moment(this.state.endDate),
                  ]}
                  defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
                  allowClear={false}
                  ranges={{
                    Today: [moment(), moment()],

                    Tomorrow: [
                      moment().add(1, "days"),
                      moment().add(1, "days"),
                    ],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                  }}
                  style={{ width: "100%" }}
                  // format={dateFormat}
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  // onChange={this.dateRangePickerChanger}
                  onChange={this.dateRangePickerChanger.bind(this)}
                />
              </div>
              <div className="type-campaign mt-3">
                <span className="type-label">Type of campaign:</span>
                <div class="col1">
                  <input
                    type="radio"
                    name="platform"
                    id="impressions"
                    class="d-none imgbgchk"
                    value="impressions"
                    onChange={this.changeType}
                  />
                  <label for="impressions">
                    <img src="https://dummyimage.com/65/000/fff" alt="Image1" />
                    {/* <div class="tick_container">
                      <div class="tick">
                        <i class="fa fa-check"></i>
                      </div>
                    </div> */}
                  </label>
                </div>
                <div class="col1">
                  <input
                    type="radio"
                    name="platform"
                    id="clicks"
                    class="d-none imgbgchk"
                    value="clicks"
                    onChange={this.changeType}
                  />
                  <label for="clicks">
                    <img src="https://dummyimage.com/65/000/fff" alt="Image2" />
                    {/* <div class="tick_container">
                      <div class="tick">
                        <i class="fa fa-check"></i>
                      </div>
                    </div> */}
                  </label>
                </div>
                <div class="col1">
                  <input
                    type="radio"
                    name="platform"
                    id="sales"
                    class="d-none imgbgchk"
                    value="sales"
                    onChange={this.changeType}
                  />
                  <label for="sales">
                    <img src="https://dummyimage.com/65/000/fff" alt="Image3" />
                    {/* <div class="tick_container">
                      <div class="tick">
                        <i class="fa fa-check"></i>
                      </div>
                    </div> */}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="demographic-section">
            <div className="row">
              <div className="col-md-2">
                <span>Pay per 100 {this.state.campaignType}</span>
              </div>
              <div className="col-md-3">
                <div class="mb-2 input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    id="pay_per_hundred"
                    name="pay_per_hundred"
                    class="form-control"
                    onChange={(evt) => {
                      this.ppClick(evt.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <span>Budget</span>
              </div>
              <div className="col-md-3">
                <div class="mb-2 input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    class="form-control"
                    onChange={(evt) => {
                      this.budget(evt.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="">
              {this.state.inputList.map((x, i) => {
                return (
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <Select
                        className="form-control"
                        value={this.state.country}
                        onChange={(options, e) =>
                          this.changeCountry(e, options)
                        }
                        placeholder="Select Country"
                        style={{ width: "100%" }}
                        options={this.props.countries}
                      />
                    </div>
                    <div className="col-md-2">
                      <Select
                        className="form-control"
                        value={this.state.country}
                        onChange={(options, e) => this.changeGender(e, options)}
                        placeholder="Select state"
                        style={{ width: "100%" }}
                        // options={genderList}
                      />
                    </div>
                    <div className="col-md-2">
                      <Select
                        className="form-control"
                        value={this.state.country}
                        onChange={(options, e) => this.changeGender(e, options)}
                        placeholder="Select City"
                        style={{ width: "100%" }}
                        // options={genderList}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        className="form-control"
                        name="lastName"
                        placeholder="Zip"
                        value={x.lastName}
                        onChange={(e) => this.handleInputChange(e, i)}
                      />
                    </div>

                    {/* <input
                      name="firstName"
                      placeholder="Enter First Name"
                      value={x.firstName}
                      onChange={(e) => this.handleInputChange(e, i)}
                    />
                    <input
                      className="ml10"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={x.lastName}
                      onChange={(e) => this.handleInputChange(e, i)}
                    /> */}

                    <div className="col-md-4">
                      {this.state.inputList.length !== 1 && (
                        <button
                          className="btn btn-primary"
                          onClick={() => this.handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      )}
                      {this.state.inputList.length - 1 === i && (
                        <button
                          className="btn btn-primary ml-2"
                          onClick={this.handleAddClick}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div style={{ marginTop: 20 }}>
                {JSON.stringify(this.state.inputList)}
              </div> */}
            </div>
            {/* <div className="row">
              <div className="col-md-2">
                <span>Gender</span>
              </div>
              <div className="col-md-3">
                <Select
                  className="form-control"
                  value={this.state.gender}
                  onChange={(options, e) => this.changeGender(e, options)}
                  placeholder="Select Gender"
                  options={genderList}
                />
              </div>
              
            </div> */}
          </div>
          <div className="edit_button_main pane-button">
            <Button
              className="custom_btns_ift"
              color="primary"
              onClick={(ev) =>
                this.saveCampaign(affData.post_id, affData.redirected_url)
              }
            >
              &nbsp;Review&nbsp;
            </Button>

            <Button
              className="custom_btns_ift"
              color="primary"
              onClick={() => {
                this.selectPost(false, "");
                this.closeModel(true);
              }}
            >
              &nbsp;Cancel&nbsp;
            </Button>

            <Button
              className="custom_btns_ift"
              color="primary"
              onClick={() => this.deletePost(affData.media_id)}
            >
              &nbsp;Reset&nbsp;
            </Button>
          </div>
        </Formsy.Form>
      </React.Fragment>
    );
  }
}
export default AffiliateForm;
