import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AvatarEditor from "./AvatarEditor";
import "./CSS/Onboarding.css";
import avatarPlaceholder from "../Assets/placeholder-avatar.svg";

function Onboarding() {
  const imageUploader = useRef();
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState({});

  useEffect(() => {
    if (!imagePath) {
      setImage("");
      return;
    }

    const urlObject = URL.createObjectURL(imagePath);

    //create urlObject with placeholder image to render to avatar editor
    const tempImage = new Image();
    tempImage.onload = () => {
      const ratio = tempImage.height / tempImage.width;
      if (tempImage.width < tempImage.height) {
        tempImage.width = 250;
        tempImage.height = ratio * 250;
      } else {
        tempImage.height = 250;
        tempImage.width = 250 / ratio;
      }
      setImage({
        urlObject: urlObject,
        width: tempImage.width,
        height: tempImage.height,
      });
    };
    tempImage.src = urlObject;

    return () => {
      URL.revokeObjectURL(urlObject);
    };
  }, [imagePath]);

  function selectImage() {
    imageUploader.current.click();
  }

  function handleImageSelection() {
    setImagePath(imageUploader.current.files[0]);
  }

  return (
    <div id="onboarding-page-container">
      {!image && (
        <>
          <div className="card" style={{ width: 300 }}>
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                Add a profile photo
              </h3>
              <img
                src={avatarPlaceholder}
                className="d-block mx-auto mb-4"
                style={{ height: 96, width: "auto" }}
              ></img>
              <button className="btn btn-primary w-100" onClick={selectImage}>
                Choose a photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={imageUploader}
                style={{ display: "none" }}
                onChange={handleImageSelection}
              ></input>
            </div>
          </div>
          <div className="w-100 text-center mt-3">
            <Link to="/">Skip for now</Link>
          </div>
        </>
      )}{" "}
      {image && <AvatarEditor image={image} setImage={setImage}></AvatarEditor>}
    </div>
  );
}

export default Onboarding;
