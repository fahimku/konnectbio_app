import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Button, Modal } from "react-bootstrap";
import Loader from "../../../../components/Loader/Loader";
import { DatePicker } from "antd";
import moment from "moment";
import { Select } from "antd";
import numeral from "numeral";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function ImageShop({
  mediaUrl,
  selectPost,
  categoryList,
  promoList,
  promoLoading,
  Kbfee,
}) {
  const [circles, setCircles] = useState([]);
  const [addImageModal, setAddImageModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "years"));
  const [ProductName, setProductName] = useState("");
  const [ProductUrl, setProductUrl] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productPromoCodeDscs, setProductPromoCodeDscs] = useState();
  const [productPromoCodePromo, setproductPromoCodePromo] = useState();
  useEffect(() => {
    setCircles([]);
  }, [selectPost]);

  const getClickCoords = (event) => {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };

  const addCircle = (event) => {
    // get click coordinates
    setAddImageModal(true);

    let [x, y] = getClickCoords(event);

    let newCircle = (
      <>
        <circle
          key={circles.length + 1}
          cx={x}
          cy={y}
          r="14"
          // stroke="black"
          // strokeWidth="1"
          fill="white"
        />
        <text
          x={x}
          y={y}
          text-anchor="middle"
          stroke="black"
          // stroke-width="1px"
          alignment-baseline="middle"
        >
          {circles.length + 1}
        </text>
      </>
    );
    console.log(imageFiles, "imageFiles");
    let selectedCircle = { x: x, y: y };

    let allCircles = [...circles, newCircle];

    // update 'circles'
    setCircles(allCircles);
  };

  const clearCircle = () => {
    setCircles([]);
  };

  // let data = [];
  // circles.map(({ props }) => {
  //   return data.push(props.children);
  // });

  console.log(circles, "circles");

  const ClickableSVG = styled.svg`
    background-image: url(${mediaUrl});
    cursor: pointer;
    & * {
      pointer-events: none;
    }
  `;
  const changeCategory = (category) => {
    console.log(category, "category");
    setProductCategory(category.split());
  };
  const changePromoCode = (e, options, name, index) => {
    if (e === undefined) {
    } else {
      var values = e.value.split(" ");
      var discount = values[0];

      setProductPromoCodeDscs(discount);
      setproductPromoCodePromo(e.children);
    }
  };

  const onChangeInputImage = (e) => {
    const files = [];
    const reader = new FileReader();
    files.push(e.target.files[0]);
    reader.onloadend = () => {
      files[0].preview = reader.result;
      files[0].toUpload = true;
      setImageFiles(files);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmitting = (e) => {
    e.preventDefault();
    setAddImageModal(false);
    setImageFiles([]);
    setProductName("");
    setProductUrl("");
    setProductDesc("");
    setProductAmount("");
  };
  function dateRangePickerChanger(value, dataString) {
    let startDate = dataString[0];
    let endDate = dataString[1];
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const ImageModal = () => {
    return (
      <Modal
        show={addImageModal}
        // onHide={() => setAddImageModal(false)}
        centered
        className="add-image-modal"
        animation={false}
        backdrop={true}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Image</Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => {
              setAddImageModal(false);
              setImageFiles([]);
              setCircles(circles.slice(0, -1));
            }}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close</span>
          </button>
        </Modal.Header>
        <form onSubmit={onSubmitting}>
          <div className="mt-3 ml-4 mr-4">
            <div className=" row">
              <Col md={4} className="sku-image-box">
                <div className="fileinput file-profile">
                  <input
                    accept=".jpg, .jpeg, .png, .webp, .svg"
                    onChange={(e) => onChangeInputImage(e)}
                    id="fileupload2"
                    type="file"
                    name="file"
                    className="d-none"
                  />
                  <div className="fileinput-new mb-2">
                    {imageFiles.length > 0 ? (
                      <div className="">
                        {imageFiles.map((file, idx) => (
                          <img
                            alt="sku-image"
                            src={file.preview}
                            key={`img-id-${idx.toString()}`}
                            // style={{ width: "100px", height: "100px" }}
                            className="sku-image"
                          />
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Button
                    type="button"
                    className={`select-image ${
                      imageFiles.length > 0 ? "" : "image-space"
                    }`}
                  >
                    <label for="fileupload2">Choose Image</label>
                  </Button>
                </div>
              </Col>
              <Col md={8}>
                <div className="row mb-3">
                  <div className="col-md-4 ">
                    <label>Source</label>
                    <Select
                      value={"Ecommerce"}
                      style={{ width: "100%" }}
                      placeholder="Select Source"
                      // onChange={changeCategory}
                    >
                      <Option value="">Ecommerce</Option>
                    </Select>
                  </div>
                </div>
                <div className="date-range mb-3">
                  <label>Start Date / End Date</label>
                  <RangePicker
                    key={1}
                    // defaultValue={[moment(startDate), moment(endDate)]}
                    value={[moment(startDate), moment(endDate)]}
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
                    format={dateFormat}
                    onChange={dateRangePickerChanger}
                  />
                </div>
                <div className="mb-3">
                  <label>Enter SKU</label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Enter SKU"
                    // onInput={(e) => setProductName(e.target.value)}
                    // value={ProductName}
                    className="form-control"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label>Enter Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    placeholder="Enter Product Name"
                    onInput={(e) => setProductName(e.target.value)}
                    value={ProductName}
                    className="form-control"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 ">
                    <label>Amount</label>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter Amount"
                      onInput={(e) => setProductAmount(e.target.value)}
                      value={productAmount}
                      className="form-control"
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-8">
                    <label>Enter Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      onInput={(e) => setProductDesc(e.target.value)}
                      value={productDesc}
                      className="form-control"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Enter Url</label>
                  <input
                    type="text"
                    name="url"
                    placeholder="Enter Url"
                    onInput={(e) => setProductUrl(e.target.value)}
                    value={ProductUrl}
                    className="form-control"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label>Select Category</label>
                  <Select
                    key={Date.now()}
                    value={productCategory}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select Category"
                    optionFilterProp="children"
                    clearable={false}
                    searchable={false}
                    required
                    onChange={changeCategory}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {categoryList.map(({ value, label }, i) => (
                      <Option value={value}>{label}</Option>
                    ))}
                  </Select>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 mt-3">
                    <label>PromoCode</label>

                    <Select
                      size="small"
                      filterOption={(input, options) =>
                        options.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={productPromoCodePromo}
                      //disabled={!(formState === "add" || formState === "edit")}
                      placeholder="Select PromoCode"
                      //loading={this.state.promoCond}
                      optionFilterProp="children"
                      className="w-100"
                      // onSearch={onSearch}
                      onChange={(options, e) => changePromoCode(e, options)}
                      showSearch
                      allowClear={false}
                      loading={promoLoading ? true : false}
                      disabled={promoLoading ? true : false}
                    >
                      {promoList.map((customer, key) => {
                        return (
                          <Option key={customer.promo_percent + " " + key}>
                            {customer.promo}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="col-md-3 mt-3">
                    <label>Discount</label>
                    <div className="promo_discount form-control">
                      {productPromoCodeDscs}
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>KB Fee</label>
                    <div className="promo_discount form-control">
                      {numeral(Kbfee).format("0,0'")}%
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  {imageLoading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-block"
                      onClick={onSubmitting}
                      // disabled={this.state.imageFiles[0] === undefined ? true : false}
                    >
                      Add Image
                    </Button>
                  )}
                </div>
              </Col>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <>
      <ClickableSVG onClick={addCircle} className="maparea">
        {circles}
      </ClickableSVG>
      {circles.length !== 0 && (
        <span
          onClick={clearCircle}
          className="fa fa-trash clear_circle"
          title="Clear Images"
        ></span>
      )}
      {ImageModal()}
    </>
  );
}

export default ImageShop;

// import React, { useEffect, useState } from "react";
// // import ImageMapper from "react-img-mapper";

// function ImageShop({ mediaUrl }) {
//   const getCoord = (event) => {
//     let posX = 0,
//       posY = 0;
//     const element = document.getElementById("myDIV");
//     // console.log(element.offsetTop, "element");
//     // var x = event.pageX - element.offsetLeft;
//     // var y = event.pageY - element.offsetTop;
//     // alert("X Coordinate: " + x + " Y Coordinate: " + y);
//     // console.log(event.pageX, "x");
//     // console.log(event.pageY, "y");
//     console.log(element.offsetLeft, "x");
//   };

//   return (
//     <>
//       <img
//         src={`${mediaUrl}`}
//         alt="media_url"
//         usemap="#gfg_map"
//         onMouseDown={(event) => getCoord(event)}
//         id="myDIV"
//       />
//     </>
//   );
// }

// export default ImageShop;
// import React from "react";

// class ImageShop extends React.Component {
//   constructor(props) {
//     super(props);
//     this.img = React.createRef();
//   }

//   oldx = 0;
//   oldy = 0;

//   imageClick = (e) => {
//     var offset = this.img.current.getBoundingClientRect();
//     var x = Math.floor(((e.pageX - offset.left) / offset.width) * 10000) / 100;
//     var y = Math.floor(((e.pageY - offset.top) / offset.height) * 10000) / 100;
//     console.log(x, "x");
//     console.log(y, "y");
//     console.log(x - this.oldx, "oldx");
//     console.log(y - this.oldy, "oldy");
//     // console.log(x, y, x - this.oldx, y - this.oldy);
//     this.oldx = x;
//     this.oldy = y;
//   };

//   render() {
//     return (
//       <img
//         onClick={this.imageClick}
//         ref={this.img}
//         src={this.props.mediaUrl}
//         // style={{ margin: 0, height: "100vh", width: "auto" }}
//       ></img>
//     );
//   }
// }

// export default ImageShop;
