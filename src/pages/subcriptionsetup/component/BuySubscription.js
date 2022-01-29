import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";

export default function BuySubscription({ heading, name }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [buySelected, setBuySelected] = useState("");

  useEffect(() => {
    console.log(userInfo);
  }, []);

  const handleBuySelect = (e, options) => {
    setBuySelected(options);
  };

  const onsubmitBuy = async (e) => {
    e.preventDefault();
    alert(buySelected.value);
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
          </Col>
        </Row>

        <Row>
          <Col md={12} xl={12}>
            <Button
              variant="primary"
              type="submit"
              className="category-btn btn-block mt-2"
            >
              Upgrade {name}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
