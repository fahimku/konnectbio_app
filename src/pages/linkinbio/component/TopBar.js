import React from "react";
import placeholder from "../../../images/placeholder.png";

const TopBar = ({ username, copyToClipboard, url }) => {
  return (
    <div className="left-top-bar">
      <div className="profile">
        <div className="placeholder">
          <img src={placeholder} />
        </div>
        <div className="instagram-account">
          <div className="instagram-username">@{username}</div>
          <div className="instagram-label">Instagram</div>
        </div>
      </div>

      {/* <div className="your-copy-link">
        <div className="item-a">
          Your Link:{" "}
          <a target="_blank" href={url + username}>
            {url + username}
          </a>
        </div>
        <div onClick={copyToClipboard} className="item-b">
          Copy
        </div>
      </div> */}

      {/* <div className="instagram-bio">
        <button>Add to Instagram Bio</button>
      </div> */}
    </div>
  );
};

export default TopBar;
