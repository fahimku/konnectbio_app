import axios from "axios";
import React, { useState } from "react";
import s from "./Affiliate.module.scss";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useHistory } from "react-router-dom";
import "./selector.css";
// import Loader from "../../components/Loader/Loader";
// import Box from "./Box";
import Create from "./tabs/Create";
import Gallery from "./tabs/Gallery";
import PendingGallery from "./tabs/PendingGallery";
import GalleryDashboard from "./tabs/GalleryDashboard/GalleryDashboard";

export default function Content({ insta, accessToken }) {
  const history = useHistory();
  const [text, setText] = useState("");
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [brandCon, setBrandCon] = useState({
    brandTab: "",
    brandLoading: true,
  });

  function toggleTabs(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  function brandTab(brand, brandLoading) {
    setBrandCon({ brandtab: brand, brandLoading: brandLoading });
  }
  function onSearch(type) {
    if (text) {
      setLoading(true);
      fetch(`
        https://graph.facebook.com/v12.0/ig_hashtag_search?user_id=${insta}&q=${text}&access_token=${accessToken}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data) {
            fetch(
              `https://graph.facebook.com/${json.data[0].id}/${type}?user_id=${insta}&fields=id,caption,media_type,comments_count,like_count,media_url,children,permalink&access_token=${accessToken}`
            )
              .then((res2) => res2.json())
              .then((json2) => {
                const oembedPromises = json2.data.map((item) => {
                  return axios.get(
                    `https://graph.facebook.com/v12.0/instagram_oembed?url=${item.permalink}&access_token=${accessToken}`
                  );
                });
                Promise.all(oembedPromises).then((res) => {
                  const insightspromises = res.map((item2) => {
                    return axios.get(
                      `https://graph.facebook.com/${insta}?fields=business_discovery.username(${item2.data.author_name}){followers_count,media_count}&access_token=${accessToken}`
                    );
                  });
                  Promise.allSettled(insightspromises).then((res3) => {
                    const updatedData = res3.map((item3, i) => {
                      if (item3 != "rejected") {
                        return {
                          business_discovery: { followers_count: 0 },
                          ...item3.value?.data,
                        };
                      } else {
                        return {
                          business_discovery: {},
                        };
                      }
                    });
                    const dataUpdate = json2.data
                      .map((item, i) => {
                        return {
                          ...item,
                          userInfo: updatedData[i],
                          username: res[i].data?.author_name,
                        };
                      })
                      .sort(
                        (a, b) =>
                          b.userInfo.business_discovery.followers_count -
                          a.userInfo.business_discovery.followers_count
                      );
                    setData(dataUpdate);
                    setLoading(false);
                  });
                });
              });
          } else {
            setData([]);
            setLoading(false);
          }
        });
    }
  }

  function disableTab(con) {
    setNext(con);
  }
  function renderMedia(item) {
    // || item.media_type=="CAROUSEL_ALBUM"
    if (item.media_type == "IMAGE") {
      return <img src={item.media_url} class="card-img-top" alt="..." />;
    }
    if (item.media_type == "VIDEO") {
      return (
        <video class="card-img-top" controls autoPlay src={item.media_url} />
      );
    }
    return null;
  }
  return (
    <div className="analytics-page affiliate-page linkin-bio">
      <Row className="ml-0 mr-0 tab-section">
        <div className="affiliate_p_col">
          <Row className="ml-0 mr-0">
            <div className="affiliate_in_col marketing-tabs">
              <Nav tabs className={`${s.coloredNav}`}>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "dashboard",
                    })}
                    onClick={() => {
                      toggleTabs("dashboard");
                    }}
                  >
                    <span>Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "brand",
                    })}
                    onClick={() => {
                      toggleTabs("brand");
                    }}
                  >
                    <span>Create Gallery</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "active",
                    })}
                    onClick={() => {
                      toggleTabs("active");
                    }}
                    disabled={next}
                  >
                    <span>Active</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "pending",
                    })}
                    onClick={() => {
                      toggleTabs("pending");
                    }}
                    disabled={next}
                  >
                    <span>Pending</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="affiliate_tab_ift" activeTab={activeTab}>
                <TabPane tabId="dashboard">
                  {/* {activeTab === "dashboard"
                    ? "dashboard"
                    : // <Dashboard title="Dashboard" />
                      null} */}
                  {activeTab === "dashboard" ? (
                    <GalleryDashboard title="Create Media" />
                  ) : null}
                </TabPane>
                <TabPane tabId="brand">
                  {activeTab === "brand" ? (
                    <Create title="Create Media" />
                  ) : null}
                </TabPane>
                <TabPane tabId="active">
                  {activeTab === "active" ? (
                    <Gallery title="Active Gallery" />
                  ) : null}
                </TabPane>
                <TabPane tabId="pending">
                  {activeTab === "pending" ? (
                    <PendingGallery title="Pending Gallery" />
                  ) : null}
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
}
