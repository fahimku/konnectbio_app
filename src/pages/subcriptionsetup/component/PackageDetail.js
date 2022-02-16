import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import { Label, Input } from "reactstrap";

export default function PackageDetail({ packageToggleModal, singlePackage }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <div className="profile_box_main col-md-4">
        <div className="card analytic-box">
          <h4 className="page-title">Package Detail</h4>
          {/* <span onClick={packageToggleModal} className="fa fa-times"></span> */}
          <h3 className="count">{singlePackage.category_count}</h3>
          <h3 className="count">{singlePackage.link_count}</h3>
          <h3 className="count">{singlePackage.hashtag_limit}</h3>
          <h3 className="count">{singlePackage.profile_limit}</h3>
        </div>
      </div>
    </>
  );
}
