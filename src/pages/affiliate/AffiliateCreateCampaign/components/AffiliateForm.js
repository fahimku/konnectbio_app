import React from "react";
import { Col, Row } from "react-bootstrap";
import Formsy from "formsy-react";
import { Button } from "reactstrap";
import moment from "moment";
import { Select } from "antd";
import Select2 from "react-select";
import { toast } from "react-toastify";
import InputValidation from "../../../../components/InputValidation";
import { DatePicker } from "antd";
import axios from "axios";
import Loader from "../../../../components/Loader/Loader";
import InputNumberValidation from "../../../../components/InputValidation/InputNumberValidation";
import click from "../../../../images/campaign/click.svg";
import sale from "../../../../images/campaign/sale.svg";
import impression from "../../../../images/campaign/impression.svg";
import { log } from "nvd3";
import { connect } from "react-redux";
import * as postActions from "../../../../actions/posts";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

class AffiliateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      campaign_name: "",
      campaign_type: "",
      pay_per_hundred: "",
      budget: "",
      startDate: moment(),
      endDate: moment().add(30, "days"),
      inputList: [{ country: "", state: "", city: "", zip: "" }],
      loading: false,
      country: "",
      state: "",
      city: "",
      zip: "",
      cities: "",
      stateList: "",
      reach: "",
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
      campaign_type: value,
    });
  };
  changeCountry = (e, options, name, index) => {
    const list = [...this.state.inputList];
    list[index][name] = options.value;
    this.setState({ country: options, inputList: list });
    this.getState(options.value);
    this.reachCampaign();
  };
  changeState = (e, options, name, index) => {
    const list = [...this.state.inputList];
    console.log(this.state.country.value, "country");
    list[index][name] = options.value;
    this.getCities(options.countryCode, options.value);
    this.setState({ state: options, inputList: list });

    this.reachCampaign();
  };
  changeCity = (e, options, name, index) => {
    const list = [...this.state.inputList];
    list[index][name] = options.value;
    this.setState({ city: options, inputList: list });
    this.reachCampaign();
  };
  getState = async (countryCode) => {
    await axios
      .post(`/common/receive/states`, { country_code: countryCode })
      .then((response) => {
        const selectState = [];
        const states = response.data.message;
        states.map(({ name, countryCode, isoCode }) => {
          return selectState.push({
            value: isoCode,
            label: name,
            countryCode: countryCode,
          });
        });
        let all = {};
        all.value = "all";
        all.label = "All";
        all.countryCode = this.state.country.value;
        selectState.unshift(all);
        this.setState({ stateList: selectState });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getCities = async (countryCode, stateCode) => {
    await axios
      .post(`/common/receive/cities`, {
        country_code: countryCode,
        state_code: stateCode,
      })
      .then((response) => {
        const selectCities = [];
        const cities = response.data.message;
        cities.map(({ name }) => {
          return selectCities.push({
            value: name,
            label: name,
          });
        });
        let all = {};
        all.value = "all";
        all.label = "All";
        all.countryCode = this.state.country.value;
        selectCities.unshift(all);
        this.setState({ cities: selectCities });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  saveCampaign = async (id) => {
    this.setState({ loading: true });
    await axios
      .post(`/campaigns/reserve`, {
        post_id: id,
        campaign_name: this.state.campaign_name,
        campaign_type: this.state.campaign_type,
        redirected_url: this.props.affData.redirected_url,
        media_url: this.props.affData.media_url,
        category_id: this.props.affData.categories[0].category_id,
        budget: parseInt(this.state.budget),
        pay_per_hundred: parseInt(this.state.pay_per_hundred),
        // traffic: 100,
        demographics:
          this.state.inputList[0].country === "" ? "" : this.state.inputList,
        start_date: this.state.startDate,
        end_date: this.state.endDate,
      })
      .then((response) => {
        toast.success("Your Campaign is Created Successfully");
        this.setState({ loading: false });
        // this.props.affCloseModal();
        // this.props.getPosts(1, null, this.props.clearPost);
        this.props.updatePost(id);
        this.props.affCloseModal();
      })
      .catch((err) => {
        this.setState({ loading: false });
        toast.error("Something went wrong");
      });
  };
  // handle Zip input change
  handleZipChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.inputList];
    list[index][name] = value;
    this.setState({ inputList: list });
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
    // this.reachCampaign();
    this.setState({
      inputList: [
        ...this.state.inputList,
        { country: "", state: "", city: "", zip: "" },
      ],
    });
  };
  reachCampaign = async () => {
    await axios
      .post(`/campaigns/reach`, {
        demographics: this.state.inputList,
      })
      .then((response) => {
        this.setState({ reach: response.data.message.influencers });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  reset = () => {
    this.setState({
      campaign_name: "",
      pay_per_hundred: "",
      budget: "",
      inputList: [{ country: "", state: "", city: "", zip: "" }],
      startDate: moment(),
      endDate: moment().add(30, "days"),
      country: "",
      state: "",
      city: "",
      zip: "",
      cities: "",
      stateList: "",
      campaign_type: "",
      reach: "",
    });
  };

  render() {
    const { affData } = this.props;
    let category =
      affData.categories.length !== 0 ? affData.categories[0].category_id : [];
    const renderConValue = (x) => {
      const exit = this.props.countries.filter(
        (item) => item.value == x.country
      );

      return exit[0] ? exit[0] : { value: "", label: "Select Country" };
    };
    console.log(this.state.inputList, "inputList");

    const renderStateValue = (x) => {
      const exit =
        this.state.stateList === ""
          ? []
          : this.state.stateList.filter((item) => item.value == x.state);

      return exit[0];
    };
    const renderCityValue = (x) => {
      const exit =
        this.state.cities === ""
          ? []
          : this.state.cities.filter((item) => item.value == x.city);

      return exit[0];
    };
    return (
      <React.Fragment>
        <Formsy.Form
          onValidSubmit={() =>
            this.saveCampaign(affData.post_id, affData.redirected_url)
          }
        >
          <div className="image-wrapper">
            <div className="image-box">
              <img src={`${affData.media_url}`} alt="media_url" />
            </div>
            <div className="image-edit-links">
              <div className="campaign-name">
                <span>Campaign Name</span>
                <InputValidation
                  className=""
                  type="text"
                  id="campaign_name"
                  name="campaign_name"
                  required
                  value={this.state.campaign_name}
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
                    checked={
                      this.state.campaign_type === "impressions" ? true : false
                    }
                  />
                  <label for="impressions">
                    <img src={impression} alt="Image1" />
                    <div>Impressions</div>
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
                    checked={
                      this.state.campaign_type === "clicks" ? true : false
                    }
                  />
                  <label for="clicks">
                    <img src={click} alt="Image2" />
                    <div>Clicks</div>
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
                    disabled
                  />
                  <label for="sales">
                    <img src={sale} alt="Image3" />
                    <div>Sales</div>
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
          {this.state.campaign_type !== "" ? (
            <>
              <div className="demographic-section">
                <div className="row">
                  <div className="col-md-2">
                    <span>Budget</span>
                  </div>
                  <div className="col-md-3">
                    <InputNumberValidation
                      type="number"
                      id="budget"
                      name="budget"
                      value={this.state.budget}
                      onChange={(evt) => {
                        this.budget(evt.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <span>Pay per 100 {this.state.campaign_type}</span>
                  </div>
                  <div className="col-md-3">
                    <InputNumberValidation
                      type="number"
                      id="pay_per_hundred"
                      name="pay_per_hundred"
                      value={this.state.pay_per_hundred}
                      onChange={(evt) => {
                        this.ppClick(evt.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="country-select">
                  {this.state.inputList.map((x, i) => {
                    return (
                      <div className="row mt-3">
                        <div className="col-md-2">
                          <span>Country {i + 1}</span>
                          <Select2
                            key={i}
                            name="country"
                            value={renderConValue(x)}
                            onChange={(options, e) =>
                              this.changeCountry(e, options, "country", i)
                            }
                            placeholder="Select Country"
                            style={{ width: "100%" }}
                            options={this.props.countries}
                            isDisabled={
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          <span>State {i + 1}</span>
                          <Select2
                            key={i}
                            name="state"
                            value={renderStateValue(x)}
                            onChange={(options, e) =>
                              this.changeState(e, options, "state", i)
                            }
                            placeholder="Select State"
                            style={{ width: "100%" }}
                            options={this.state.stateList}
                            isDisabled={
                              // this.state.stateList === ""
                              this.state.inputList[i].country === "" ||
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          <span>City {i + 1}</span>
                          <Select2
                            key={i}
                            name="city"
                            value={renderCityValue(x)}
                            onChange={(options, e) =>
                              this.changeCity(e, options, "city", i)
                            }
                            placeholder="Select City"
                            style={{ width: "100%" }}
                            options={this.state.cities}
                            isDisabled={
                              this.state.inputList[i].state === "" ||
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          <span>Zip {i + 1}</span>
                          <input
                            type="number"
                            className="form-control"
                            name="zip"
                            placeholder="Zip"
                            value={x.zip}
                            onChange={(e) => this.handleZipChange(e, i)}
                            autoComplete="off"
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            min="0"
                            disabled={
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }
                          />
                        </div>

                        <div className="col-md-4">
                          {this.state.inputList.length !== 1 && (
                            <button
                              className="btn btn-primary mt-3"
                              onClick={() => this.handleRemoveClick(i)}
                            >
                              Remove
                            </button>
                          )}
                          {this.state.inputList.length - 1 === i && (
                            <button
                              className="btn btn-primary ml-2 mt-3"
                              onClick={this.handleAddClick}
                              disabled={
                                this.state.inputList[i].country === "" ||
                                this.state.inputList[i].state === "" ||
                                this.state.inputList[i].city === ""
                                  ? true
                                  : false
                              }
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {this.state.reach === "" ? (
                    ""
                  ) : (
                    <h5 className="mt-4">
                      Influencer's Reach: {this.state.reach.toString()}
                    </h5>
                  )}
                </div>
              </div>

              <div className="edit_button_main pane-button">
                {this.state.loading ? (
                  <Button>
                    <Loader />
                  </Button>
                ) : (
                  <>
                    <Button
                      className="custom_btns_ift"
                      color="primary"
                      type="submit"
                      // onClick={(ev) =>
                      //   this.saveCampaign(
                      //     affData.post_id,
                      //     affData.redirected_url
                      //   )
                      // }
                    >
                      &nbsp;Save&nbsp;
                    </Button>

                    <Button
                      className="custom_btns_ift"
                      color="primary"
                      onClick={() => this.reset()}
                    >
                      &nbsp;Reset&nbsp;
                    </Button>

                    <Button
                      className="custom_btns_ift"
                      color="primary"
                      onClick={() => {
                        this.props.affCloseModal();
                      }}
                    >
                      &nbsp;Cancel&nbsp;
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : null}
        </Formsy.Form>
      </React.Fragment>
    );
  }
}
export default connect(null, postActions)(AffiliateForm);
