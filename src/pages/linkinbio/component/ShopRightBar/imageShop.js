import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Button, Modal } from "react-bootstrap";
import Loader from "../../../../components/Loader/Loader";
import ShopRightBar from "../ShopRightBar/index";
import { DatePicker } from "antd";
import moment from "moment";
import { Select } from "antd";
import numeral from "numeral";
import { toast } from "react-toastify";
// import $, { event } from "jquery";

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
  imgData,
  children
}) {
  const [circles, setCircles] = useState([]);
  const [addImageModal, setAddImageModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [multiImage, setMultiImage] = useState([]);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "years").format("YYYY-MM-DD")
  );
  const [ProductName, setProductName] = useState("");
  const [ProductSku, setProductSku] = useState("");
  const [ProductUrl, setProductUrl] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productPromoCodeDscs, setProductPromoCodeDscs] = useState();
  const [productPromoCodePromo, setproductPromoCodePromo] = useState();
  const [windowX, setWindowX] = useState(0);
  const [windowY, setWindowY] = useState(0);
  const [dmLeft, setDmleft] = useState(0);
  const [dmtop, setDmtop] = useState(0);
  const [submitData, setSubmitData] = useState([]);
  const [coordinates, setCoordinates] = useState("");
  const [source, setSource] = useState("other")


  useEffect(() => {
    setImageFiles([]);
  }, [selectPost]);

  useEffect(() => {
    if (circles?.length) {
    } else {
      //   UpdateaddCircle();
    }
  }, [flag]);


  useEffect(() => {
    if (children?.length) {
      childrenAttr();
    }
  }, [children]);
 
  const childrenAttr = () =>{
    children.map(function(val, index){
   
      UpdateaddCircle(val.coordinates.clientX,val.coordinates.clientY,val.coordinates.dimLeft,val.coordinates.dimTop);
      
  })
    setMultiImage(children)

  }
  /////////For Update
  const UpdategetClickCoords = (wx,wy,left,top) => {
    var x = wx - left;
    var y = wy - top;
    console.log(x,y,"check r")
    
    return [x, y];
    
  };

  const UpdateaddCircle = (wx,wy,left,top) => {
    let [x, y] = UpdategetClickCoords(wx,wy,left,top);
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
    let selectedCircle = { x: x, y: y };

    let allCircles = [...circles,newCircle];
    console.log(allCircles,"_+_+_+_+_+_+_+_+_")
    // update 'circles'
    setCircles(allCircles);
   
  };

  // console.log(circles, "plot value");

  ///////////////// For Add
  const getClickCoords = (event) => {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    setCoordinates({
      clientX: event.clientX,
      clientY: event.clientY,
      dimLeft: dim.left,
      dimTop: dim.top,
    });
    return [x, y];
  };


  const addCircle = (event) => {
    if (multiImage.length < 3) {
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
      let selectedCircle = { x: x, y: y };

      let allCircles = [...circles, newCircle];

      // update 'circles'
      setCircles(allCircles);
    } else {
      // setImageError("Only 3 image tag allowed")
      toast.error("Only 3 image tag allowed");
    }
  };

  const clearCircle = () => {
    setCircles([]);
    setImageFiles([]);
    setMultiImage([]);
    setCoordinates("");
  };

  // let data = [];
  // circles.map(({ props }) => {
  //   return data.push(props.children);
  // });

  const ClickableSVG = styled.svg`
    background-image: url(${mediaUrl});
    cursor: pointer;
    & * {
      pointer-events: none;
    }
  `;
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
    e.preventDefault();
    const files = multiImage;
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      files.push({
        file: file,
        media_url: reader.result,
      });
      setMultiImage(files);
      setImageFiles(files.reverse());
    };

    reader.readAsDataURL(file);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const onSubmitting = async(e) => {
    e.preventDefault();

    setAddImageModal(false);

    // setProductName("");
    // setProductUrl("");
    // setProductDesc("");
    // setProductAmount("");
    // let newData = [];
      // const formImage =  new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(imageFiles[0]?.file);
      //   reader.onload = () => resolve(reader.result?.toString().substr(reader.result?.toString().indexOf(',') + 1));
      //   reader.onerror = error => reject(error);
      // });

    
    var get_type = imageFiles[0]?.file.type;
    var split = get_type.split("/")
    var file_type = split[1]
    const formImage = await convertBase64(imageFiles[0]?.file)
     
     console.log(formImage,"check 64")

    
    let data = {
      file: formImage,
      startDate,
      endDate,
      ProductSku,
      ProductName,
      productAmount,
      productDesc,
      ProductUrl,
      productCategory,
      productPromoCodePromo,
      productPromoCodeDscs,
      coordinates,
      file_type
    };

    console.log(imageFiles,"iiiii");

    let allData = [...submitData, data];
    setSubmitData(allData);
    console.log(allData, "submit");
    imgData(allData);
    setImageFiles([]);
    setProductSku("");
    setProductName("");
    setProductCategory([]);
    setproductPromoCodePromo("");
    setProductPromoCodeDscs("");
    setProductUrl("");
    setProductAmount();
    setProductDesc("");
    setStartDate(moment().format("YYYY-MM-DD"))
    setEndDate(moment().format("YYYY-MM-DD"));

  };

  const shopRightBar = (allData) => {
    return <ShopRightBar imgData={allData}></ShopRightBar>;
  };
  function dateRangePickerChanger(value, dataString) {
    let startDate = dataString[0];
    let endDate = dataString[1];
    setStartDate(startDate);
    setEndDate(endDate);
  }
  const clearImage = () => {
    setImageFiles([]);
    setMultiImage(multiImage.slice(1));
  };

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
              setCoordinates("");
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
                        {/* {imageFiles.map((item) => ( */}
                        <img
                          alt="sku-image"
                          src={imageFiles[0].media_url}
                          // key={`img-id-${idx.toString()}`}
                          // style={{ width: "100px", height: "100px" }}
                          className="sku-image"
                        />
                        {/* ))} */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {imageFiles.length > 0 ? (
                    <Button
                      onClick={clearImage}
                      // className="fa fa-trash clear_circle"
                      title="Clear Images"
                    >
                      Clear Images
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className={`select-image ${
                        imageFiles.length > 0 ? "" : "image-space"
                      }`}
                    >
                      <label for="fileupload2">Choose Image</label>
                    </Button>
                  )}
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
                    onInput={(e) => setProductSku(e.target.value)}
                    value={ProductSku}
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
                    onChange={(category) =>
                      setProductCategory(category.split())
                    }
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
      {/* {circles.length !== 0 && (
        <span
          onClick={clearCircle}
          className="fa fa-trash clear_circle"
          title="Clear Images"
        ></span>
      )} */}
      <div className="row related-images">
        {multiImage.map((item, index) =>(
          
          <Col md={4}>
            <img
              alt="profile-icon"
              src={item.media_url}
              key={`img-id-${index.toString()}`}
              // style={{ width: "100px", height: "100px" }}
              className="profile-icon"
            />
          </Col>
        ))}
      </div>

      {ImageModal()}
    </>
  );
}

export default ImageShop;
