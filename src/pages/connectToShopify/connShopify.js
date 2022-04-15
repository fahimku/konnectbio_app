import React from "react";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

function connectShopify() {
 
  return (
    <div className="container-fluid">
      <div class="coming_iner">
        <h2>Connect To Shopify</h2>
        {/* <p className="text-muted">
          {userInfo?.package?.package_id === "61c02d43f40bec74fac2c9a0"
            ? "This option is only available for Influencer Plus."
            : "This option is only available for Brand."}
        </p> */}
        <button
          class="btn btn-primary"
          onClick={() => history.push("/app/account/shopify")}
        >
          Shopify Setup
        </button>
      </div>
    </div>
  );
}

export default connectShopify