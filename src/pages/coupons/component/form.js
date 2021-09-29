import React from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';

import s from '../../forms/elements/Elements.module.scss';

const CouponForm = ({categories,brands,countries}) => {

     const couponTypeOptions = [
        {  
            label : 'Discount %',
            value : 'discount'
        },
        {
            label : 'Cashback',
            value : 'cashback',
        }
    ]

    const discountTypeOptions = [
        {  
            label : 'Onsite',
            value : 'onsite'
        },
        {
            label : 'Online',
            value : 'online',
        },
        {
            label : 'Takeaway',
            value : 'takeaway',
        },
        {
            label : 'Delivery',
            value : 'delivery',
        }
    ]

    const onChangeInputImage = (e) => {
        const files = [];
        const reader = new FileReader();
        files.push(e.target.files[0]);
        reader.onloadend = () => {
          files[0].preview = reader.result;
          files[0].toUpload = true;
          this.setState({
            imageFiles: files,
          });
        };
        reader.readAsDataURL(e.target.files[0]);
      }

    const imageFiles = []  

    return (

        <Form className={s.root}>
            <FormGroup row>
                <Label md="4" className="text-md-right">
                Coupon Image
                </Label>
                <Col md="8">
                <input
                    accept="image/*" onChange={onChangeInputImage}
                    id="fileupload2"
                    type="file" name="file" className="display-none"
                />
                <div className="fileinput fileinput-new fileinput-fix">
                    <div className="fileinput-new thumbnail">
                    {imageFiles.length > 0 ? <div>
                        {imageFiles.map((file, idx) => (
                        <img alt="..." src={file.preview} key={`img-id-${idx.toString()}`} />))}
                    </div> : <img
                        alt="..."
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTEiIGhlaWdodD0iMTQxIj48cmVjdCB3aWR0aD0iMTkxIiBoZWlnaHQ9IjE0MSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijk1LjUiIHk9IjcwLjUiIHN0eWxlPSJmaWxsOiNhYWE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xOTF4MTQxPC90ZXh0Pjwvc3ZnPg=="
                    />}
                    </div>
                </div>
                <div>
                    <Button type="button" color="default">Select image</Button>
                </div>
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="coupon-code" md={4} className="text-md-right">
                Coupon Code
            </Label>
            <Col md={7}>
                <Input type="text" placeholder="Coupon Code" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="redirected-url" md={4} className="text-md-right" >
                Redirected URL
            </Label>
            <Col md={7}>
                <Input type="text" name="redirected_url" placeholder="Redirected URL" />
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label for="redirected-url" md={4} className="text-md-right">
                Brand
            </Label>
            <Col md={7}>
                <Select 
                      name="brands"
                      className="selectCustomization"
                      options={brands}
                      placeholder="Select Brand"
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
                      placeholder="Select Coupon Type" />
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
                      placeholder="Select Discount Type" />
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
                    />
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label for="city" md={4} className="text-md-right">
                City
            </Label>
            <Col md={7}>
                <Input type="text" name="City" placeholder="City"/>
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label for="zip-code" md={4} className="text-md-right">
                Zip code
            </Label>
            <Col md={7}>
                <Input type="text" name="zip_code" placeholder="Zip Code"/>
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label for="budget" md={4} className="text-md-right">
                Budget
            </Label>
            <Col md={7}>

                <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input id="budget-input" bsSize="16" type="text" name="budget" placeholder="Budget"/>
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
                    <Input id="commission-input" bsSize="16" type="text" name="commission" placeholder="Amount"/>
                    <InputGroupAddon addonType="append">Per</InputGroupAddon>
                    <Input id="clicks-input" bsSize="16" type="text" name="clicks" placeholder="Clicks"/>
                    <InputGroupAddon addonType="append">Clicks</InputGroupAddon>
                </InputGroup>
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label for="traffic" md={4} className="text-md-right">
                Traffic
            </Label>
            <Col md={7}>
                <Input type="text" name="traffic" placeholder="Traffic"/>
            </Col>
            </FormGroup>  

            <FormGroup row>
            <Label for="start-date" md={4} className="text-md-right">
                Start Date
            </Label>
            <Col md={7}>
                <Input type="text" name="start_date" placeholder="Start Date"/>
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label for="end-date" md={4} className="text-md-right">
                End Date
            </Label>
            <Col md={7}>
                <Input type="text" name="end_date" placeholder="End Date"/>
            </Col>
            </FormGroup>   

            <FormGroup row>
            <Label for="Policy" md={4} className="text-md-right">
                Policy
            </Label>
            <Col md={7}>
                <Input rows="4" type="textarea" name="policy" id="policy-textarea" placeholder="Policy"/>
            </Col>
            </FormGroup>              
            <FormGroup row>
            <Label md={4} />
            <Col md={7}>
                <Button color="primary" type="submit" className="mr-xs">Save Changes</Button>
                <Button color="inverse">Cancel</Button>
            </Col>
            </FormGroup>
        </Form>
    )
}


export default CouponForm