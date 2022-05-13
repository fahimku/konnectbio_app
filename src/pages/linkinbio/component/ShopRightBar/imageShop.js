import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Col, Button, Modal } from "react-bootstrap";
import Loader from "../../../../components/Loader/Loader";
// import { DatePicker } from "antd";
// import moment from "moment";
import { Select } from "antd";
import numeral from "numeral";
import { toast } from "react-toastify";
import AsyncSkuField from "./AsyncSkuField";
// import InputNumberValidation from "../../../../components/InputValidation/InputNumberValidation";
// import $, { event } from "jquery";

const { Option } = Select;
// const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";

function ImageShop({
  mediaUrl,
  selectPost,
  categoryList,
  promoList,
  promoLoading,
  Kbfee,
  imgData,
  children,
  // setSource,
  source,
}) {
  const [circles, setCircles] = useState([]);
  const [addImageModal, setAddImageModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [multiImage, setMultiImage] = useState([]);
  // const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  // const [endDate, setEndDate] = useState(
  //   moment().add(1, "years").format("YYYY-MM-DD")
  // );
  const [ProductName, setProductName] = useState("");
  // const [source, setSource] = useState("");
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
  const [coordinates, setCoordinates] = useState([]);
  const [skuData, setSkuData] = useState("");


  const parentRef = useRef();
  const imgRef = useRef();
  const [arrData, setArrData] = useState([]);

  useEffect(() => {
    setImageFiles([]);
    setMultiImage([]);
    setCircles([]);
    setSkuData("");
    setCoordinates("");
    setProductSku("");
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

  const childrenAttr = () => {
    children.map((item) =>{
        setCircles(item.coordinates)
    })
  
    setMultiImage(children);
  };
  /////////For Update
  // const UpdategetClickCoords = (wx, wy, left, top) => {
  //   var x = wx - left;
  //   var y = wy - top;

  //   return [x, y];
  // };
  // const UpdateaddCircle = (wx, wy, left, top) => {
  //   let [x, y] = UpdategetClickCoords(wx, wy, left, top);

  //   let newCircle = (
  //     <>
  //       <circle
  //         key={circles.length + 1}
  //         cx={x}
  //         cy={y}
  //         r="14"
  //         // stroke="black"
  //         // strokeWidth="1"
  //         fill="white"
  //       />
  //       <text
  //         x={x}
  //         y={y}
  //         text-anchor="middle"
  //         stroke="black"
  //         // stroke-width="1px"
  //         alignment-baseline="middle"
  //       >
  //         {circles.length + 1}
  //       </text>
  //     </>
  //   );


  //   // let allCircles = [...circles, newCircle];
  //   // // update 'circles'
  //   // allCircles.map(function (val, index) {
  //   //   console.log(circles, "AJH");
  //   //   setCircles(val);
  //   // });
  //   let allCircles = [...circles, newCircle];
  //   // // update 'circles'
  //   setCircles(allCircles);
  // };

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

  // const addCircle = (event) => {
  //   if (multiImage.length < 3) {
  //     if (source) {
  //       // get click coordinates
  //       setAddImageModal(true);

  //       let [x, y] = getClickCoords(event);

  //       let newCircle = (
  //         <>
  //           <circle
  //             key={circles.length + 1}
  //             cx={x}
  //             cy={y}
  //             r="14"
  //             // stroke="black"
  //             // strokeWidth="1"
  //             fill="white"
  //           />
  //           <text
  //             x={x}
  //             y={y}
  //             text-anchor="middle"
  //             stroke="black"
  //             // stroke-width="1px"
  //             alignment-baseline="middle"
  //           >
  //             {circles.length + 1}
  //           </text>
  //         </>
  //       );
  //       // let selectedCircle = { x: x, y: y };

  //       let allCircles = [...circles, newCircle];

  //       // update 'circles'
  //       setCircles(allCircles);
  //     } else {
  //       toast.error("Please select source to add image");
  //     }
  //   } else {
  //     // setImageError("Only 3 image tag allowed")
  //     toast.error("Only 3 images allowed");
  //   }
  // };

  // const clearCircle = () => {
  //   setCircles([]);
  //   setImageFiles([]);
  //   setMultiImage([]);
  //   setCoordinates("");
  // };


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
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmitting = async (e) => {
    e.preventDefault();
    setAddImageModal(false);

    if (source === "other") {
      var get_type = imageFiles[0]?.file.type;
      var split = get_type.split("/");
      var file_type = split[1];
      var formImage = await convertBase64(imageFiles[0]?.file);
    } else {
      var media_url = imageFiles;
      let files = multiImage;
      files.push({
        media_url: skuData?.image?.src,
      });
      setMultiImage(files);
    }

    let data = {
      file: formImage,
      ProductSku,
      ProductName,
      productAmount,
      productDesc,
      ProductUrl,
      productCategory,
      productPromoCodePromo,
      productPromoCodeDscs,
      coordinates,
      file_type,
      media_url,
    };

    let allData = [...submitData, data];
    setSubmitData(allData);

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
    setSkuData("");
  };

  // function dateRangePickerChanger(value, dataString) {
  //   let startDate = dataString[0];
  //   let endDate = dataString[1];
  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // }
  const clearImage = () => {
    setImageFiles([]);
    setMultiImage(multiImage.slice(1));
  };
  const getSku = (sku, skuData) => {
    setProductSku(sku);
    setSkuData(skuData[0]._source);
    const productUrl =
      "https://" +
      skuData[0]._source?.domain +
      "/products/" +
      skuData[0]._source?.handle;
    setProductName(skuData[0]._source?.title);
    setProductAmount(skuData[0]._source?.variants[0]?.price);
    setProductUrl(productUrl);
    setProductDesc(skuData[0]._source?.body_html);
    setImageFiles(skuData[0]._source?.image?.src);
  };
  const copyToClipboard = (url) => {
    let textField = document.createElement("textarea");
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied to Clipboard!");
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
              // setSource("");

              setCircles(circles.slice(0, -1));
              setProductName("");
              setProductAmount("");
              setProductUrl("");
              setProductDesc("");
              setProductSku("");
              setSkuData("");
            }}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close</span>
          </button>
        </Modal.Header>
        <form onSubmit={onSubmitting}>
          <div className="mt-3 ml-4 mr-4">
            <div className=" row">
              {source &&
                (source === "other" ? (
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
                ) : (
                  <Col md={4} className="sku-image-box">
                    <div className="fileinput file-profile">
                      <div className="fileinput-new mb-2">
                        {skuData?.image?.src && (
                          <img
                            alt="sku-image"
                            src={skuData?.image?.src}
                            // key={`img-id-${idx.toString()}`}
                            // style={{ width: "100px", height: "100px" }}
                            className="sku-image"
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                ))}

              <Col md={source ? 8 : 12}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Source</label>
                    <Select
                      key={Date.now()}
                      value={source}
                      style={{ width: "100%" }}
                      placeholder="Select Source"
                      className="product_source"
                      dropdownClassName={"product_source_dropdown"}
                      // onChange={(value) => setSource(value)}
                    >
                      {/* <Option value="ecommerce">Ecommerce</Option>
                      <Option value="other">Others</Option> */}
                    </Select>
                  </div>
                </div>
                {source && (
                  <>
                    {source === "ecommerce" ? (
                      <div className="mb-3">
                        <label>Enter Product SKU</label>
                        <AsyncSkuField
                          name="sku"
                          placeholder="Enter Product SKU"
                          getSku={getSku}
                        />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label>Enter Product SKU</label>
                        <input
                          type="text"
                          name="sku"
                          placeholder="Enter Product SKU"
                          onInput={(e) => setProductSku(e.target.value)}
                          value={ProductSku}
                          className="form-control"
                          required
                          autoComplete="off"
                        />
                      </div>
                    )}

                    {source === "other" ? (
                      <>
                        <div className="row mb-3">
                          <div className="col-md-6 ">
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
                          <div className="col-md-6 ">
                            <label>Enter Product Url</label>
                            <input
                              type="text"
                              name="url"
                              placeholder="Enter Product Url"
                              onInput={(e) => setProductUrl(e.target.value)}
                              value={ProductUrl}
                              className="form-control"
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6 ">
                            <label>Amount</label>
                            <div className="d-flex flex-row hashtag-box">
                              <span className="input-group-text">$</span>
                              <input
                                type="number"
                                name="amount"
                                placeholder="Enter Amount"
                                onInput={(e) =>
                                  setProductAmount(e.target.value)
                                }
                                value={productAmount}
                                className="form-control"
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
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
                        {/* <div className="row mb-3">
                          <div className="col-md-4">
                            <label>PromoCode</label>

                            <Select
                              size="small"
                              filterOption={(input, options) =>
                                options.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              value={
                                productPromoCodePromo
                                  ? productPromoCodePromo
                                  : "Select PromoCode"
                              }
                              //disabled={!(formState === "add" || formState === "edit")}
                              placeholder="Select PromoCode"
                              //loading={this.state.promoCond}
                              optionFilterProp="children"
                              className="w-100"
                              // onSearch={onSearch}
                              onChange={(options, e) =>
                                changePromoCode(e, options)
                              }
                              showSearch
                              allowClear={false}
                              loading={promoLoading ? true : false}
                              disabled={promoLoading ? true : false}
                            >
                              {promoList.map((customer, key) => {
                                return (
                                  <Option
                                    key={customer.promo_percent + " " + key}
                                  >
                                    {customer.promo}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>
                          <div className="col-md-4">
                            <label>Discount</label>
                            <div className="promo_discount form-control">
                              {productPromoCodeDscs}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label>KB Fee</label>
                            <div className="promo_discount form-control">
                              {numeral(Kbfee).format("0,0'")}%
                            </div>
                          </div>
                        </div> */}
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
                      </>
                    ) : (
                      <>
                        {ProductSku && (
                          <>
                            <div className="row mb-3">
                              <div className="col-md-6 ">
                                <label>Enter Product Name</label>
                                <input
                                  type="text"
                                  name="product_name"
                                  placeholder="Enter Product Name"
                                  // onInput={(e) => setProductName(e.target.value)}
                                  value={ProductName}
                                  className="form-control"
                                  required
                                  autoComplete="off"
                                  disabled
                                />
                              </div>
                              <div className="col-md-6 ">
                                <label>Product Url</label>
                                {/* <input
                                  type="text"
                                  name="url"
                                  placeholder="Enter Product Url"
                                  // onInput={(e) => setProductUrl(e.target.value)}
                                  value={ProductUrl}
                                  className="form-control"
                                  required
                                  autoComplete="off"
                                  disabled
                                /> */}
                                <div className="url-copy sku-copy">
                                  <div className="your-copy-link">
                                    <div className="item-a">
                                      <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={ProductUrl}
                                      >
                                        {ProductUrl}
                                      </a>
                                    </div>
                                    <div
                                      onClick={() =>
                                        copyToClipboard(ProductUrl)
                                      }
                                      className="item-b"
                                    >
                                      Copy
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label>Amount</label>
                                {/* <input
                                  type="number"
                                  name="amount"
                                  placeholder="Enter Amount"
                                  // onInput={(e) => setProductAmount(e.target.value)}
                                  value={productAmount}
                                  className="form-control"
                                  autoComplete="off"
                                  disabled
                                /> */}
                                <div className="d-flex flex-row hashtag-box">
                                  <span className="input-group-text">$</span>
                                  <input
                                    type="text"
                                    name="amount"
                                    placeholder="Enter Amount"
                                    className="form-control comment-field"
                                    required=""
                                    value={productAmount}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label>Enter Description</label>
                                <textarea
                                  rows="1"
                                  cols="50"
                                  className="form-control"
                                  value={productDesc}
                                  disabled
                                ></textarea>
                              </div>
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
                              <div className="col-md-4">
                                <label>PromoCode</label>

                                <Select
                                  size="small"
                                  filterOption={(input, options) =>
                                    options.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                  value={
                                    productPromoCodePromo
                                      ? productPromoCodePromo
                                      : "Select PromoCode"
                                  }
                                  //disabled={!(formState === "add" || formState === "edit")}
                                  placeholder="Select PromoCode"
                                  //loading={this.state.promoCond}
                                  optionFilterProp="children"
                                  className="w-100"
                                  // onSearch={onSearch}
                                  onChange={(options, e) =>
                                    changePromoCode(e, options)
                                  }
                                  showSearch
                                  allowClear={false}
                                  loading={promoLoading ? true : false}
                                  disabled={promoLoading ? true : false}
                                >
                                  {promoList.map((customer, key) => {
                                    return (
                                      <Option
                                        key={customer.promo_percent + " " + key}
                                      >
                                        {customer.promo}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              </div>
                              <div className="col-md-4">
                                <label>Discount</label>
                                <div className="promo_discount form-control">
                                  {productPromoCodeDscs}
                                </div>
                              </div>
                              <div className="col-md-4">
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
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Col>
            </div>
          </div>
        </form>
      </Modal>
    );
  };
  const style = {
    tagAreaMain: {
      width: "290px",
      height: "338px",
      position: "relative",
      maxWidth: "100%",
      // backgroundColor: "lightblue",
    },
  };
  const addCircle = (e) => {
    if (multiImage.length < 3) {
      if (source) {
        // get click coordinates
        setAddImageModal(true);

        var pos_x = e.offsetX
          ? e.offsetX
          : e.pageX - imgRef.current.offsetLeft - 770;
        var pos_y = e.offsetY
          ? e.offsetY
          : e.pageY - imgRef.current.offsetTop - 190;

        let pos_x_percent =
          (pos_x / parseInt(parentRef.current.style.width, 10)) * 100;
        let pos_y_percent =
          (pos_y / parseInt(parentRef.current.style.height, 10)) * 100;
         
          setCoordinates([
            ...coordinates,
            { x: `${pos_x_percent}%`, y: `${pos_y_percent}%` },
          ]);
  
        setCircles([
          ...circles,
          { x: `${pos_x_percent}%`, y: `${pos_y_percent}%` },
        ]);

      } else {
        toast.error("Please select source to add image");
      }
    } else {
      // setImageError("Only 3 image tag allowed")
      toast.error("Only 3 images allowed");
    }
  };

  // const myTag = (event) => {
  //   var e = event.target;
  //   var dim = e.getBoundingClientRect();
  //   console.log(imgRef.offsetWidth, "imgRef");
  // };

  return (
    <>
      {/* <ClickableSVG onClick={addCircle} className="maparea">
        {circles}
      </ClickableSVG> */}

      <div
        className="tag-area-main"
        style={style.tagAreaMain}
        ref={parentRef}
        id="tagImg"
      >
       
        <img
          onClick={(e) => addCircle(e)}
          ref={imgRef}
          src={mediaUrl}
          alt="media-image"
          style={{ width: "100%", height: "100%" }}
       />
        {circles && circles.map((item, i) => (
          // <Tag key={i} pixels={item} />
          <div
            key={i}
            className="tag-div-main"
            style={{ top: item.y, left: item.x, backgroundColor: "white" }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* {circles.length !== 0 && (
        <span
          onClick={clearCircle}
          className="fa fa-trash clear_circle"
          title="Clear Images"
        ></span>
      )} */}
      <div className="row related-images">
        {multiImage.map((item, index) => (
          <Col md={4}>
            <div className="inner-image-box">
              <img
                alt="profile-icon"
                src={item.media_url}
                key={index}
                className="profile-icon"
              />
              {/* <span className="close">
                <span aria-hidden="true">×</span>
              </span> */}
            </div>
          </Col>
        ))}
      </div>

      {ImageModal()}
    </>
  );
}

export default ImageShop;
