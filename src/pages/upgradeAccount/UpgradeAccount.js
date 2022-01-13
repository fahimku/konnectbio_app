import React from "react";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

export default function upgradeAccount() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="container-fluid">
      <div class="coming_iner">
        <h2>Upgrade Account</h2>
        <p className="text-muted">
          {userInfo?.package?.package_name === "Basic"
            ? "This option is only available for premium and premium plus plan."
            : "This option is only available for premium plus plan."}
        </p>
        <button
          class="btn btn-primary"
          onClick={() => history.push("/app/account/setup")}
        >
          Upgrade Subscription
        </button>
      </div>
    </div>
  );
}
