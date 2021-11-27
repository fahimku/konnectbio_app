import React from "react";
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
import { connect } from "react-redux";
import * as postActions from "../../../../actions/posts";
// import { Country, State, City } from "country-state-city";
import VirtualizedSelect from "react-virtualized-select";

const { Option } = Select;
const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";

class AffiliateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      campaign_name: "",
      campaign_type: "",
      pay_per_hundred: "",
      budget: "",
      startDate: moment().format("YYYY-MM-DD HH:mm"),
      endDate: moment().add(30, "days").format("YYYY-MM-DD HH:mm"),
      inputList: [{ country: "", state: "", city: "", zip: "" }],
      loading: false,
      country: "",
      state: "",
      city: "",
      zip: "",
      cities: "",
      stateList: "",
      reach: "",
      submit: false,
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
  // changeCountry = (option, index) => {
  //   const list = [...this.state.inputList];
  //   list[index] = {
  //     country: option.value,
  //     // name: option.label,
  //     state: "",
  //     city: "",
  //     zip: "",
  //   };
  //   this.setState({ inputList: list }, () => {
  //     this.reachCampaign();
  //   });
  // };
  // changeState = (option, index) => {
  //   const list = [...this.state.inputList];
  //   list[index] = {
  //     ...list[index],
  //     state: option.value,
  //   };
  //   this.setState({ inputList: list }, () => {
  //     this.reachCampaign();
  //   });
  // };
  // changeCity = (option, index) => {
  //   const list = [...this.state.inputList];
  //   list[index] = {
  //     ...list[index],
  //     city: option.value,
  //   };
  //   this.setState({ inputList: list }, () => {
  //     this.reachCampaign();
  //   });
  // };
  changeCountry = (e, options, name, index) => {
    const list = [...this.state.inputList];
    list[index][name] = options.value;
    this.setState({ country: options, inputList: list });
    this.getState(options.value);
    this.reachCampaign();
  };
  changeState = (e, options, name, index) => {
    const list = [...this.state.inputList];
    list[index][name] = options.value;

    if (options.value !== "all") {
      this.getCities(options.countryCode, options.value);
    } else {
      list[index]["city"] = "all";
      const selectCities = [];
      let all = {};
      all.value = "all";
      all.label = "All";
      all.countryCode = this.state.country.value;
      selectCities.unshift(all);
      this.setState({ cities: selectCities });
    }
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
    this.setState({ submit: true });
    const place = this.state.inputList.reduce((acc, item) => {
      if (!item.country || !item.state || !item.city) {
        acc = false;
      }
      return acc;
    }, true);
    const {
      campaign_name,
      budget,
      pay_per_hundred,
      startDate,
      endDate,
      campaign_type,
    } = this.state;
    if (
      campaign_name &&
      budget &&
      pay_per_hundred &&
      startDate &&
      endDate &&
      campaign_type &&
      place
    ) {
      this.setState({ loading: true });
      await axios
        .post(`/campaigns/reserve`, {
          post_id: id,
          campaign_name: this.state.campaign_name,
          campaign_type: this.state.campaign_type,
          redirected_url: this.props.affData.redirected_url,
          media_url: this.props.affData.media_url,
          category_id:
            this.props.affData.categories.length !== 0
              ? this.props.affData.categories[0].category_id
              : "",
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
          // this.props.affCloseModal();
          this.props.toggleTabs();
        })
        .catch((err) => {
          this.setState({ loading: false });
          toast.error("Something went wrong");
        });
    }
  };
  // handle Zip input change
  handleZipChange = (e, index) => {
    if (e.target.value.length > 5) {
      e.preventDefault();
      return false;
    } else {
      const { name, value } = e.target;
      const list = [...this.state.inputList];
      list[index][name] = value;
      this.setState({ inputList: list });
    }
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = [...this.state.inputList];
    list.splice(index, 1);
    this.setState({ inputList: list }, () => {
      this.reachCampaign();
    });
    // setInputList(list);
  };

  // handle click event of the Add button
  handleAddClick = () => {
    this.reachCampaign();
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
        console.log(err);
        // toast.error("Something went wrong");
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
        (item) => item.value === x.country
      );

      return exit[0] ? exit[0] : { value: "", label: "Select Country" };
    };

    const renderStateValue = (x) => {
      const exit =
        this.state.stateList === ""
          ? []
          : this.state.stateList.filter((item) => item.value === x.state);

      return exit[0];
    };
    const renderCityValue = (x, i) => {
      if (this.state.state.value === "all") {
        return { value: "all", label: "All" };
      } else {
        const exit =
          this.state.cities === ""
            ? []
            : this.state.cities.filter((item) => item.value === x.city);
        return exit[0];
      }
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
              <div className="row">
                <div className="campaign-name col-md-6">
                  <label>Campaign Name</label>
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
                <div className="campaign-url col-md-6">
                  <label>URL</label>
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
              </div>
              <div className="row  mt-3">
                <div className="select-categories col-md-6">
                  <label>Category</label>
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

                <div className="date-range-aff col-md-6">
                  <label>Select Start Date / End Date</label>
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
              </div>

              <div className="row mt-4">
                <div className="camp-type-ift col-md-12">
                  <label className="n-camp-type pr-4">
                    <strong>Type of campaign:</strong>
                  </label>
                  {/* <div class="col1">
                    <input
                      type="radio"
                      name="platform"
                      id="impressions"
                      class="d-none imgbgchk"
                      value="impressions"
                      onChange={this.changeType}
                      checked={
                        this.state.campaign_type === "impressions"
                          ? true
                          : false
                      }
                    />
                    <label for="impressions">
                      <span className="imp-click">
                        <i class="fa fa-picture-o fa-2x" aria-hidden="true"></i>
                      </span>
                      <span className="imp-name">Impressions</span>
                      
                    </label>
                  </div> */}
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
                      <span className="imp-click">
                        <i
                          class="fa fa-hand-pointer-o fa-2x"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span className="imp-name">Clicks</span>
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
                      <span className="imp-click">
                        <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
                      </span>
                      <span className="imp-name">Sales</span>
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
          </div>

          {this.state.campaign_type !== "" ? (
            <>
              <div className="demographic-section">
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <label>Total Budget</label>
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
                  <div className="col-md-6 mt-3">
                    <label>Pay per 100 {this.state.campaign_type}</label>
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

                {/* <div className="country-select">
                  {this.state.inputList.map((x, i) => {
                    return (
                      <div className="c-con-select row">
                        <div className="col-md-3 mt-3">
                          <label>Country {i + 1}</label>
                          <Select2
                            key={i}
                            name="country"
                            value={
                              x.country
                                ? {
                                    value: Country.getCountryByCode(x.country)
                                      .isoCode,
                                    label: Country.getCountryByCode(x.country)
                                      .name,
                                  }
                                : { value: "", label: "Select Country" }
                            }
                            onChange={(options, e) =>
                              this.changeCountry(options, i)
                            }
                            placeholder="Select Country"
                            style={{ width: "100%" }}
                            options={Country.getAllCountries().map((item) => {
                              return { value: item.isoCode, label: item.name };
                            })}
                            // isDisabled={
                            //   this.state.inputList.length - 1 !== i
                            //     ? true
                            //     : false
                            // }
                          />
                          {this.state.submit && !x.country ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label>State {i + 1}</label>
                          <Select2
                            key={i}
                            name="state"
                            value={
                              x.state
                                ? x.state !== "all"
                                  ? {
                                      value: State.getStateByCodeAndCountry(
                                        x.state,
                                        x.country
                                      ).isoCode,
                                      label: State.getStateByCodeAndCountry(
                                        x.state,
                                        x.country
                                      ).name,
                                    }
                                  : { value: "all", label: "All" }
                                : { value: "", label: "Select State" }
                            }
                            onChange={(options, e) => {
                              this.changeState(options, i);
                            }}
                            placeholder="Select State"
                            style={{ width: "100%" }}
                            options={[
                              { isoCode: "all", name: "All" },
                              ...State.getStatesOfCountry(x.country),
                            ].map((item) => {
                              return { value: item.isoCode, label: item.name };
                            })}
                            isDisabled={x.country ? false : true}
                            // isDisabled={
                            //   // this.state.stateList === ""
                            //   this.state.inputList[i].country === "" ||
                            //   this.state.inputList.length - 1 !== i
                            //     ? true
                            //     : false
                            // }
                          />
                          {this.state.submit && !x.state ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label>City {i + 1}</label>
                          <VirtualizedSelect
                            className
                            key={i}
                            name="city"
                            value={
                              x.city
                                ? {
                                    value: x.city,
                                    label: x.city,
                                  }
                                : { value: "", label: "Select City" }
                            }
                            onChange={(options, e) =>
                              this.changeCity(options, i)
                            }
                            placeholder="Select City"
                            style={{ width: "100%" }}
                            options={
                              x.state !== "all"
                                ? [
                                    { value: "all", name: "All" },
                                    ...City.getCitiesOfState(
                                      x.country,
                                      x.state
                                    ),
                                  ].map((item) => {
                                    return {
                                      value: item.name,
                                      label: item.name,
                                    };
                                  })
                                : [
                                    { value: "all", name: "All" },
                                    ...City.getCitiesOfCountry(x.country),
                                  ].map((item) => {
                                    return {
                                      value: item.name,
                                      label: item.name,
                                    };
                                  })
                            }
                            clearable={false}
                            disabled={x.state ? false : true}
                            // isDisabled={
                            //   this.state.inputList[i].state === "" ||
                            //   this.state.inputList.length - 1 !== i
                            //     ? true
                            //     : false
                            // }
                          />
                          {this.state.submit && !x.city ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-2 mt-3">
                          <label>Zip {i + 1}</label>
                          <input
                            type="number"
                            className="form-control"
                            name="zip"
                            placeholder="Zip"
                            value={x.zip}
                            onChange={(e) => this.handleZipChange(e, i)}
                            autoComplete="off"
                            onKeyDown={(evt) =>
                              [("e", "E", "+", "-")].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            min="0"
                          />
                        </div>

                        <div className="add-del-btns col-md-1 pl-0">
                          {this.state.inputList.length !== 1 && (
                            <button
                              className="btn p-0 m-0"
                              onClick={() => this.handleRemoveClick(i)}
                            >
                              <span>
                                <i
                                  class="glyphicon glyphicon-trash fa-1x"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <strong>Remove</strong>
                            </button>
                          )}
                          {this.state.inputList.length - 1 === i && (
                            <button
                              className="btn p-0 m-0"
                              onClick={this.handleAddClick}
                              disabled={
                                this.state.inputList[i].country === "" ||
                                this.state.inputList[i].state === "" ||
                                this.state.inputList[i].city === ""
                                  ? true
                                  : false
                              }
                            >
                              <span>
                                <i
                                  class="fa fa-plus fa-1x"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <strong>Add</strong>
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
                </div> */}
                <div className="country-select">
                  {this.state.inputList.map((x, i) => {
                    return (
                      <div className="c-con-select row">
                        <div className="col-md-3 mt-3">
                          <label>Country {i + 1}</label>
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
                          {this.state.submit && !x.country ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label>State {i + 1}</label>
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
                          {this.state.submit && !x.state ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label>City {i + 1}</label>
                          {/* <VirtualizedSelect
                            key={i}
                            name="city"
                            value={renderCityValue(x, i)}
                            onChange={(options, e) =>
                              this.changeCity(e, options, "city", i)
                            }
                            placeholder="Select City"
                            style={{ width: "100%" }}
                            options={this.state.cities}
                            clearable={false}
                            disabled={
                              this.state.inputList[i].state === "" ||
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }
                          /> */}
                          <VirtualizedSelect
                            className
                            key={i}
                            name="city"
                            value={
                              x.city
                                ? {
                                    value: x.city,
                                    label: x.city === "all" ? "All" : x.city,
                                  }
                                : { value: "", label: "Select City" }
                            }
                            onChange={(options, e) =>
                              this.changeCity(e, options, "city", i)
                            }
                            placeholder="Select City"
                            style={{ width: "100%" }}
                            options={this.state.cities}
                            clearable={false}
                            disabled={
                              this.state.inputList[i].state === "" ||
                              this.state.inputList.length - 1 !== i
                                ? true
                                : false
                            }

                            // isDisabled={
                            //   this.state.inputList[i].state === "" ||
                            //   this.state.inputList.length - 1 !== i
                            //     ? true
                            //     : false
                            // }
                          />
                          {this.state.submit && !x.city ? (
                            <span className={"help-block text-danger"}>
                              This value is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="col-md-2 mt-3">
                          <label>Zip {i + 1}</label>
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

                        <div className="add-del-btns col-md-1 pl-0">
                          {this.state.inputList.length !== 1 && (
                            <button
                              className="btn p-0 m-0"
                              onClick={() => this.handleRemoveClick(i)}
                            >
                              <span>
                                <i
                                  class="glyphicon glyphicon-trash fa-1x"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <strong>Remove</strong>
                            </button>
                          )}
                          {this.state.inputList.length - 1 === i && (
                            <button
                              className="btn p-0 m-0"
                              onClick={this.handleAddClick}
                              disabled={
                                this.state.inputList[i].country === "" ||
                                this.state.inputList[i].state === "" ||
                                this.state.inputList[i].city === ""
                                  ? true
                                  : false
                              }
                            >
                              <span>
                                <i
                                  class="fa fa-plus fa-1x"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <strong>Add</strong>
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

              <div className="row mt-4">
                <div className="col-md-12">
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
              </div>
            </>
          ) : null}
        </Formsy.Form>
      </React.Fragment>
    );
  }
}
export default connect(null, postActions)(AffiliateForm);
