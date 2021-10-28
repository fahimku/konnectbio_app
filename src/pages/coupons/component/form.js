import React from "react";
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Select from "react-select";
import InputValidation from "../../../components/InputValidation";
import Formsy from "formsy-react";
import s from "../../forms/elements/Elements.module.scss";

const CouponForm = ({
  categories,
  brands,
  countries,
  onChangeInputImage,
  imageFiles,
  handleInput,
  Submit,
}) => {
  const couponTypeOptions = [
    {
      label: "Discount %",
      value: "discount",
    },
    {
      label: "Cashback",
      value: "cashback",
    },
  ];

  const discountTypeOptions = [
    {
      label: "Onsite",
      value: "onsite",
    },
    {
      label: "Online",
      value: "online",
    },
    {
      label: "Takeaway",
      value: "takeaway",
    },
    {
      label: "Delivery",
      value: "delivery",
    },
  ];

  return (
    <Formsy.Form className={s.root} onValidSubmit={(e) => Submit(e)}>
      <FormGroup row>
        <Label md="4" className="text-md-right">
          Coupon Image
        </Label>
        <Col md="8">
          <input
            accept="image/*"
            onChange={(e) => onChangeInputImage(e)}
            id="fileupload2"
            type="file"
            name="file"
            className="display-none"
          />
          <div className="fileinput fileinput-new fileinput-fix">
            <div className="fileinput-new thumbnail">
              {imageFiles.length > 0 ? (
                <div>
                  {imageFiles.map((file, idx) => (
                    <img
                      alt="..."
                      src={file.preview}
                      key={`img-id-${idx.toString()}`}
                      style={{ width: "200px", height: "150px" }}
                    />
                  ))}
                </div>
              ) : (
                <img
                  alt="..."
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg=="
                  style={{ width: "200px", height: "150px" }}
                />
              )}
            </div>
          </div>
          <div>
            <Button type="button" color="default">
              <label for="fileupload2" className="">
                Select image
              </label>
            </Button>
          </div>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="coupon-code" md={4} className="text-md-right">
          Coupon Code
        </Label>
        <Col md={7}>
          <InputValidation
            type="text"
            name="coupon_code"
            placeholder="Coupon Code"
            id="coupon_code"
            onChange={(e) => handleInput(e)}
            validationError="Coupon Code is required"
            required
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="redirected-url" md={4} className="text-md-right">
          Redirected URL
        </Label>
        <Col md={7}>
          <InputValidation
            type="text"
            name="redirected_url"
            placeholder="Redirected URL"
            id="redirected_url"
            onChange={(e) => handleInput(e)}
            validations="isUrl"
            required
            validationError={{
              isUrl: "This value should be a valid url.",
            }}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="brand" md={4} className="text-md-right">
          Brand
        </Label>
        <Col md={7}>
          <Select
            name="brands"
            className="selectCustomization"
            options={brands}
            placeholder="Select Brand"
            id="brands"
            onChange={(e) => handleInput(e, "brands")}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="coupon-type" md={4} className="text-md-right">
          Coupon Type
        </Label>
        <Col md={7}>
          <Select
            name="coupon_type"
            className="selectCustomization"
            options={couponTypeOptions}
            placeholder="Select Coupon Type"
            id="coupon_type"
            onChange={(e) => handleInput(e, "coupon_type")}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="discount-type" md={4} className="text-md-right">
          Discount Type
        </Label>
        <Col md={7}>
          <Select
            name="discount_type"
            className="selectCustomization"
            options={discountTypeOptions}
            placeholder="Select Discount Type"
            id="discount_type"
            onChange={(e) => handleInput(e, "discount_type")}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="categories" md={4} className="text-md-right">
          Categories
        </Label>
        <Col md={7}>
          <Select
            name="categories"
            className="selectCustomization"
            options={categories}
            placeholder="Select Category"
            id="categories"
            onChange={(e) => handleInput(e, "categories")}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="country" md={4} className="text-md-right">
          Country
        </Label>
        <Col md={7}>
          <Select
            name="country"
            className="selectCustomization"
            options={countries}
            placeholder="Select Country"
            id="country"
            onChange={(e) => handleInput(e, "country")}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="city" md={4} className="text-md-right">
          City
        </Label>
        <Col md={7}>
          <Input
            type="text"
            name="City"
            placeholder="City"
            id="city"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="zip-code" md={4} className="text-md-right">
          Zip code
        </Label>
        <Col md={7}>
          <Input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            id="zip_code"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="budget" md={4} className="text-md-right">
          Budget
        </Label>
        <Col md={7}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input
              bsSize="16"
              type="text"
              name="budget"
              placeholder="Budget"
              id="budget"
              onChange={(e) => handleInput(e)}
            />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="commission" md={4} className="text-md-right">
          Commission
        </Label>
        <Col md={7}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input
              bsSize="16"
              type="text"
              name="commission"
              placeholder="Amount"
              id="commission"
              onChange={(e) => handleInput(e)}
            />
            <InputGroupAddon addonType="append">Per</InputGroupAddon>
            <Input
              bsSize="16"
              type="text"
              name="clicks"
              placeholder="Clicks"
              id="clicks"
              onChange={(e) => handleInput(e)}
            />
            <InputGroupAddon addonType="append">Clicks</InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="traffic" md={4} className="text-md-right">
          Traffic
        </Label>
        <Col md={7}>
          <Input
            type="text"
            name="traffic"
            placeholder="Traffic"
            id="traffic"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="start-date" md={4} className="text-md-right">
          Start Date
        </Label>
        <Col md={7}>
          <Input
            type="text"
            name="start_date"
            placeholder="Start Date"
            id="start_date"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="end-date" md={4} className="text-md-right">
          End Date
        </Label>
        <Col md={7}>
          <Input
            type="text"
            name="end_date"
            placeholder="End Date"
            id="end_date"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="Policy" md={4} className="text-md-right">
          Policy
        </Label>
        <Col md={7}>
          <Input
            rows="4"
            type="textarea"
            name="policy"
            placeholder="Policy"
            id="policy"
            onChange={(e) => handleInput(e)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label md={4} />
        <Col md={7}>
          <Button
            color="primary"
            type="submit"
            className="btn-rounded btn btn-primary mr-2"
          >
            Save Changes
          </Button>
          <Button color="inverse" className="btn-rounded btn btn-default">
            Cancel
          </Button>
        </Col>
      </FormGroup>
    </Formsy.Form>
  );
};

export default CouponForm;
