import React, {useEffect, useState} from "react";
import {Select} from "antd";
const {Option} = Select;

const SelectBox = (props) => {
  const [selection, setSelection] = useState([props.selected]);

  function categoryChange(val) {
    props.callBack(val);
    setSelection(val);
  }

  return (
    <>
      {props.selected ? (
        <Select
          value={selection}
          key={Date.now()}
          showSearch
          style={{width: "100%"}}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={categoryChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.data.map(function ({value, label}) {
            return <Option value={value}>{label}</Option>;
          })}
        </Select>
      ) : (
        <Select
          value={selection}
          key={Date.now()}
          showSearch
          style={{width: "100%"}}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={categoryChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.data.map(function ({value, label}) {
            return <Option value={value}>{label}</Option>;
          })}
        </Select>
      )}
    </>
  );
};
export default SelectBox;
