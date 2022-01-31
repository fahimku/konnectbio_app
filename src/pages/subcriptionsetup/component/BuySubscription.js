import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";

export default function BuySubscription({ heading, name,subscribeServices }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [buySelected, setBuySelected] = useState("");
  const [loading,setLoading]=useState(false)
  const [submit,setSubmit]=useState(false)

  const handleBuySelect = (e, options) => {
    setBuySelected(options);
  };

  const onsubmitBuy = async (e) => {
    e.preventDefault();
    setSubmit(true)
    if(buySelected.value){
      setLoading(true)
    subscribeServices(buySelected.value).then((res)=>{
      window.open(res.message,"_self")
      setLoading(false)
    }).catch(err=>{
      toast.error(err.response.message)
      setLoading(false)
    })
    }
  };

  const buyItem = [
    {
      value: "3",
      label: "3",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "12",
      label: "12",
    },
  ];
  return (
    <>
      <form onSubmit={onsubmitBuy}>
        <p
          style={{
            color: "gray",
            borderBottom: "1px solid lightgray",
            paddingBottom: 10,
          }}
        >
          {heading}
        </p>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label>No. of {name}</label>
            </div>

            <Select
              name="category"
              className="selectCustomization"
              options={buyItem}
              value={buySelected}
              placeholder={`Select No. of ${name}`}
              onChange={(options, e) => handleBuySelect(e, options)}
            />
            {submit && !buySelected.value?<small class="help-block text-danger">Please select</small>:null}
          </Col>
        </Row>

        <Row>
          <Col md={12} xl={12}>
            {loading?(
              <Button
              variant="primary"
              className="category-btn btn-block mt-2"
            >
              <Loader/>
            </Button>
            ):(
              <Button
              variant="primary"
              type="submit"
              className="category-btn btn-block mt-2"
            >
              Upgrade {name}
            </Button>
            )}
          </Col>
        </Row>
      </form>
    </>
  );
}
