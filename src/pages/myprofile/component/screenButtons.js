import {Button} from "react-bootstrap";
import avatar from "../../../images/avatar15.jpg";
import React, {useState, useEffect} from "react";

function ScreenButtons() {
  const [imageFiles, setImageFiles] = useState([]);

  const onChangeInputImage = (e) => {
    alert("test");
    const files = [];
    const reader = new FileReader();
    files.push(e.target.files[0]);
    reader.onloadend = () => {
      files[0].preview = reader.result;
      files[0].toUpload = true;
      setImageFiles(files);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {});

  return (
    <div className="dp_cont mb-4">
      <span>
        <img src={avatar} alt="Profile" />
      </span>
      <div className="dp_buttons">
        <Button
          accept="image/*"
          onClick={(e) => {
            alert('test')
            //onChangeInputImage(e);
          }}
          type="file"
          color="default"
          className="select-image"
        >
          <label htmlFor="fileupload2">Change Image</label>
        </Button>

        <Button type="button" color="default" className="select-image">
          <label htmlFor="fileupload2">Save</label>
        </Button>
        <Button type="button" color="default" className="select-image">
          <label htmlFor="fileupload2">Cancel</label>
        </Button>
      </div>
    </div>
  );
}

export default ScreenButtons;
