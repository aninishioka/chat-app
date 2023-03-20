import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/AvatarEditor.css";

function AvatarEditor(props) {
  const { curUser } = useAuth();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [initDragPos, setInitPos] = useState({});
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const canvasSize = 250;

  const resizeRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    renderImage();
  }, []);

  function handleResize() {
    setZoom(resizeRef.current.value);
    renderImage();
  }

  function unsetImage() {
    props.setImage(null);
  }

  function renderImage() {
    const tempImage = new Image();

    tempImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.height = canvasSize;
      canvas.width = canvasSize;
      const context = canvas.getContext("2d");
      const height = (props.image.height * resizeRef.current.value) / 100;
      const width = (props.image.width * resizeRef.current.value) / 100;

      context.save();

      context.beginPath();
      context.arc(
        canvasSize * 0.5,
        canvasSize * 0.5,
        canvasSize * 0.5,
        0,
        2 * Math.PI
      );
      context.closePath();
      context.clip();

      context.drawImage(tempImage, imagePos.x, imagePos.y, width, height);

      const dataURL = canvas.toDataURL("image/jpeg", 0.7);
      previewRef.current.src = dataURL;
    };

    tempImage.src = props.image.urlObject;
  }

  function startDrag(e) {
    setIsDragging(true);
    setInitPos({ x: e.clientX, y: e.clientY });
  }

  function stopDrag() {
    setIsDragging(false);
  }

  function handleMouseMove(e) {
    if (isDragging) {
      const xOffset = (e.clientX - initDragPos.x) * 0.8;
      const yOffset = (e.clientY - initDragPos.y) * 0.8;
      const imageWidth = (props.image.width * resizeRef.current.value) / 100;
      const imageHeight = (props.image.height * resizeRef.current.value) / 100;

      const newX = Math.max(
        canvasSize - imageWidth,
        Math.min(0, imagePos.x + xOffset)
      );
      const newY = Math.max(
        canvasSize - imageHeight,
        Math.min(0, imagePos.y + yOffset)
      );

      setImagePos({
        x: newX,
        y: newY,
      });
      renderImage();
    }
  }

  function saveImage() {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch("/users/avatar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AuthToken: token,
          },
          body: JSON.stringify({
            uid: curUser.uid,
            image: previewRef.current.src,
          }),
        });
      })
      .then((res) => {
        if (res.ok) navigate("../");
        else throw res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      id="editor-container"
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
    >
      <div className="card" style={{ width: 600, height: 400 }}>
        <div className="cardBody">
          <h3 className="card-title text-center p-1">Edit Thumbnail</h3>
        </div>
        <div id="image-container" className="">
          <img
            id="avatar-preview"
            className="mx-auto d-block rounded-circle"
            src=""
            ref={previewRef}
            onMouseDown={startDrag}
            draggable={false}
          ></img>
        </div>
        <div className="toolbar">
          <input
            type="range"
            id="zoom"
            min="100"
            max="200"
            value={zoom}
            ref={resizeRef}
            onChange={handleResize}
          />
        </div>
      </div>
      <div className="mt-1">
        <button
          className="btn btn-outline-primary"
          style={{ width: 290 }}
          onClick={unsetImage}
        >
          Choose another photo
        </button>
        <button
          className="btn btn-primary"
          style={{ width: 290 }}
          onClick={saveImage}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AvatarEditor;
