/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import axios from "axios";
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationLink,
  PaginationItem,
  Badge,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import Header from "../../linkinbio/component/Header";
import placeholder from "../../../images/placeholder.png";
import s from "./Search.module.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    let country = userInfo.country;
    let city = userInfo.city;
    let zip = userInfo.zip;
    this.state = {
      username: username,
      country: country,
      city: city,
      zip: zip ? zip : [],
      brands: [],
    };
  }

  componentDidMount() {
    this.fetchBrands(this.state.country, this.state.city, this.state.zip);
  }

  async fetchBrands(country, city, zip) {
    await axios
      .post("brands/receive", {
        country: [],
        city: [],
        zip: [],
      })
      .then((res) => {
        this.setState({brands: res.data.message});
      });
  }

  render() {
    return (
      <div className={`${s.root}`}>
        {/* <Header username={this.state.username} placeholder={placeholder} /> */}
        <div className={s.brandPage}>
          <h1 className="page-title">
            Brands - <span className="fw-semi-bold">Results</span>
          </h1>
          <div className="btn-toolbar justify-content-between">
            <div className="d-inline-flex">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="default" caret>
                  Popular
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>All</DropdownItem>
                  <DropdownItem>Popular</DropdownItem>
                  <DropdownItem>Interesting</DropdownItem>
                  <DropdownItem>Latest</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className="ml-2">
                <DropdownToggle color="default" caret>
                  All Time
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Last 24h</DropdownItem>
                  <DropdownItem>Last Month</DropdownItem>
                  <DropdownItem>Last Year</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
          <Row className="mt-3 d-block">
            <Col xl={9} sm={12}>
              <p className={s.searchResultsCount}>
                About 94 700 000 (0.39 sec.) results
              </p>
              {this.state.brands.map((item, i) => (
                <section key={i} className={`${s.searchResultItem}`}>
                  <a
                    href={item.website}
                    target="_blank"
                    className={`link-primary ${s.imageLink}`}
                  >
                    <img className={s.image} src={item.logo_url} alt="" />
                  </a>
                  <div className={s.searchResultItemBody}>
                    <Row>
                      <Col md={9}>
                        <h4 className={s.searchResultItemHeading}>
                          <a
                            href={item.website}
                            target="_blank"
                            className="link-primary"
                          >
                            {item.brand_name}
                          </a>
                        </h4>
                        <p className={s.info}>
                          {item.country}, {item.city} {item.zip}
                        </p>
                        <p className={s.description}>{item.description}</p>
                      </Col>
                      <Col md={3} xs={12} className="text-center mt-5">
                        {/* <p className="value3 mt-sm hidden">$9, 700</p>
                        <p className="fs-mini text-muted hidden">COUPONS</p> */}
                        <Button color="info" size="sm">
                          ADD TO MY BRAND
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </section>
              ))}

              <div className="d-flex justify-content-center mt-3 hide">
                <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous href="#">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Search;
