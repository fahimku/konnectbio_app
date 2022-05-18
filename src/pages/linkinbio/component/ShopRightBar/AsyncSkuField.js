import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { toast } from "react-toastify";

class AsyncSkuField extends React.Component {
  state = {
    sku: {
      label: this.props.defaultValue ? this.props.defaultValue : "",
      value: this.props.defaultValue ? this.props.defaultValue : "",
    },
    allSku: "",
    // default_value: this.props.defaultValue,
  };

  loadOptions = async (input, callback) => {
    await this.smartSearchFilter(input);
    const result = this.state.sku.map((item) => {
      return {
        value: `${item.value}`,
        label: `${item.label}`,
      };
    });

    callback(result);
  };

  smartSearchFilter = async (value) => {
    if (value.length > 2 && value.trim()) {
      if (this.props.name === "sku") {
        await axios
          .post("campaigns/receive/searchsku", {
            sku: value.trim(),
          })
          .then((response) => {
            const loadSku = [];
            const sku = response.data.message;
            if (sku.length === 0) {
              toast.error("No Product Found");
            }

            this.setState({ allSku: sku });
            sku.map(({ _source }) => {
              return loadSku.push({
                value: _source?.variants[0]?.sku,
                label: _source?.variants[0]?.sku,
              });
            });
            this.setState({ sku: loadSku });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  handleMultiSelect = (e) => {
    const skuData = this.state.allSku.filter(function (item) {
      return item._source?.variants[0]?.sku === e.value;
    });
    this.props.getSku(e.value, skuData);
    
    this.setState({
      sku: e,
    });
  };

  handleOnPaste = async (e) => {
    const getData = e.clipboardData.getData("text");
    await this.smartSearchFilter(getData);
  };

  render() {
    return (
      <React.Fragment>
        <div onPaste={(e) => this.handleOnPaste(e)}>
          <AsyncSelect
            // className="form-control"
            // isMulti={this.props.isMulti === false ? false : true}
            // isMulti={false}
            cacheOptions
            defaultOptions
            delimiter=","
            loadOptions={this.loadOptions}
            placeholder={this.props.placeholder}
            name={this.props.name}
            defaultValue={this.state.sku}
            onChange={(e) => {
              this.handleMultiSelect(e);
            }}
            // value={this.props.defaultValue}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AsyncSkuField;
