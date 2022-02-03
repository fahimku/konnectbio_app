import React, { useState } from "react";
import s from "./Affiliate.module.scss";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import "./selector.css";
import Tags from "./tabs/AllTags";
import CommentMention from "./tabs/CommentTags";

export default function Content() {
  const [next, setNext] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");

  function toggleTabs(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  function disableTab(con) {
    setNext(con);
  }

  return (
    <div className="analytics-page linkin-bio tab-wi-cus">
      <Row className="ml-0 mr-0 tab-section">
        <div className="affiliate_p_col">
          <Row className="ml-0 mr-0">
            <div className="affiliate_in_col marketing-tabs">
              <Nav tabs className={`${s.coloredNav}`}>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "brand",
                    })}
                    onClick={() => {
                      toggleTabs("brand");
                    }}
                  >
                    <span>Tags</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "marketplace",
                    })}
                    onClick={() => {
                      toggleTabs("marketplace");
                    }}
                    disabled={next}
                  >
                    <span>Mention Comments</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="affiliate_tab_ift" activeTab={activeTab}>
                <TabPane tabId="brand">
                  {activeTab === "brand" ? <Tags next={disableTab} /> : null}
                </TabPane>
                <TabPane tabId="marketplace">
                  {activeTab === "marketplace" ? <CommentMention /> : null}
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
}
