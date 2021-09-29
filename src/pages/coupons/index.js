//coupon collection
// {
//     user_id: body.user_id, (R)
//     coupon_code: body.coupon_code, (R)
//     redirected_url: body.redirected_url, (R)
//     brand: body.brand, (R)
//     coupon_type: body.coupon_type, => [Disount %, Cashback]
//     discount_type: body.discount_type, => [Onsite, Online, Takeaway, Delivery]
//     categories: body.categories, => [Array]
//     country: body.country, => [PK,US,]
//     city: body.city, => [NY]
//     zip: body.zip, => [111,222]
//     budget: body.budget,
//     commission: body.commission,
//     traffic: body.traffic,
//     policies: body.policies,
//     start_date: body.start_date,
//     end_date: body.end_date,
// }

import React, { useEffect, useState } from "react"
import axios from "axios";
import {Row, Col} from "reactstrap";
import {toast} from "react-toastify";
import placeholder from "../../images/placeholder.png";
import config from "../../config";
import s from './Static.modules.scss';
import Widget from '../../components/Widget';
import Header from "../linkinbio/component/Header";
import CouponForm from "./component/form";
import CouponGrid from "./component/grid";

const Coupons = () => {


    let userInfo = JSON.parse(localStorage.getItem("userInfo"));


    const [username,setUsername] = useState(userInfo.username)
    const [selectCoupon,setSelectCoupon] = useState(false)

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [countries,setCountries] = useState([])

    const [couponItems,setCouponItems] = useState([
        {
        id: 1,
        image: "https://demo.flatlogic.com/sing-app-react/static/media/1.png", 
        coupon_code: 'C11',
        coupon_type: 'Discount',
        discount_type : 'Onsite',
        start_date: new Date('September 14, 2021'),
        end_date: new Date('September 30, 2021'),
        status : 'Active'    
      },
      {
        id: 2,
        image: "https://demo.flatlogic.com/sing-app-react/static/media/1.png", 
        coupon_code: 'C121',
        coupon_type: 'Cashback',
        discount_type : 'Online',
        start_date: new Date('September 14, 2021'),
        end_date: new Date('September 30, 2021'),
        status : 'Active'
      }
    ])


    useEffect(async () => {
        const holdCategory = await FetchCategories();
        setCategories(holdCategory);
    
      }, []);


    useEffect(async () => {
       const holdBrand = await FetchBrands();
        setBrands(holdBrand);

    }, []);      


    useEffect(async () => {
        const holdCountries = await FetchCountries();
         setCountries(holdCountries); 
     }, []);      
    


    const FetchCategories = async () => {
        const holdCategory = [];
        await axios
          .post(config.endPoint.getAllCategories)
          .then((response) => {
            if (response.data.message.length > 0)
              response.data.message.map((category) => {
                holdCategory.push({
                  value: category.category_id,
                  label: category.category_name,
                });
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      
        return holdCategory  
      
    }    

    const FetchBrands = async () => {

        const holdBrands = [];
        await axios
          .get(config.endPoint.getAllBrands)
          .then((response) => {
            if (response.data.message.length > 0)
              response.data.message.map((brand) => {
                holdBrands.push({
                  value: brand.brand_id,
                  label: brand.brand_name,
                });
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      
        return holdBrands 
    }


    const FetchCountries = async () => {

        const holdCountries = [];
        await axios
          .post(config.endPoint.getAllCountries)
          .then((response) => {
            if (response.data.message.length > 0)
              response.data.message.map((country) => {
                holdCountries.push({
                  value: country.code1,
                  label: country.name,
                });
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      
        return holdCountries 
    }    

    return (
        <div className={s.root} >
        <Header username={username} placeholder={placeholder} />
        <Row className="main-container">
          <Col md="6" xs="12">
            <Widget title={<h5> Coupons </h5>} >
                <CouponGrid couponItems={couponItems}></CouponGrid>            
            </Widget>
          </Col>
          <Col md="5" xs="12">
            <Widget title={<h5> Add New Coupon </h5>} >
                <CouponForm 
                    categories={categories} 
                    brands={brands}
                    countries={countries}></CouponForm>
            </Widget>        
        </Col>
        </Row>        
      </div>
    )
}

export default Coupons