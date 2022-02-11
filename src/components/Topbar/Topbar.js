import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

const TopBar = ({
  username,
  copyToClipboard,
  url,
  text,
  changeDropdown,
  dropdown,
}) => {
  return (
    <div className="left-top-bar">
      {/* <div className="profile">
        <div className="placeholder">
          <img src={placeholder} />
        </div>
        <div className="instagram-account">
          <div className="instagram-username">@{username}</div>
          <div className="instagram-label">Instagram</div>
        </div> */}
      <DropdownButton
        id="dropdown-basic-button"
        className="source-button"
        title={
          text
            ? "Instagram"
            : `Source: ${
                dropdown == "instagram"
                  ? `Instagram @${username}`
                  : "Active Media Gallery"
              }`
        }
      >
        <Dropdown.Item
          active={dropdown == "instagram" ? true : false}
          onClick={() => changeDropdown("instagram")}
        >
          Instagram
        </Dropdown.Item>
        <Dropdown.Item
          active={dropdown == "gallery" ? true : false}
          onClick={() => changeDropdown("gallery")}
        >
          Active Media Gallery
        </Dropdown.Item>
      </DropdownButton>

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
