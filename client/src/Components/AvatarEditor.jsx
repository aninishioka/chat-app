import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/AvatarEditor.css";

function AvatarEditor(props) {
  const { curUser } = useAuth();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const isDragging = useRef(false);
  const initDragPos = useRef({});
  const imagePos = useRef({ x: 0, y: 0 });
  const canvasSize = 250;
  const tempImage = useRef(new Image());
  const resizeRef = useRef();
  const canvasRef = useRef();
  const contextRef = useRef();

  //when component first renders, get canvas context and render chose avatar image to editor
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");
    tempImage.current.onload = () => {
      renderImage();
    };
    tempImage.current.src = props.image.urlObject;
  }, []);

  function handleResize() {
    setZoom(resizeRef.current.value);
    renderImage();
  }

  function unsetImage() {
    props.setImage(null);
  }

  function renderImage() {
    const height = (props.image.height * resizeRef.current.value) / 100;
    const width = (props.image.width * resizeRef.current.value) / 100;

    contextRef.current.save();

    //draw circle to use as clipping mask for avatar image.
    contextRef.current.beginPath();
    contextRef.current.arc(
      canvasSize * 0.5,
      canvasSize * 0.5,
      canvasSize * 0.5,
      0,
      2 * Math.PI
    );
    contextRef.current.closePath();
    contextRef.current.clip();

    //clear canvas and draw image with updated sizing and placement parameters
    contextRef.current.beginPath();
    contextRef.current.clearRect(0, 0, canvasSize, canvasSize);
    contextRef.current.drawImage(
      tempImage.current,
      imagePos.current.x,
      imagePos.current.y,
      width,
      height
    );
  }

  function startDrag(e) {
    e.preventDefault();
    isDragging.current = true;
    initDragPos.current = { x: e.clientX, y: e.clientY };
  }

  function stopDrag() {
    isDragging.current = false;
  }

  function handleMouseMove(e) {
    if (isDragging.current) {
      const xOffset = e.clientX - initDragPos.current.x;
      const yOffset = e.clientY - initDragPos.current.y;
      const imageWidth = (props.image.width * resizeRef.current.value) / 100;
      const imageHeight = (props.image.height * resizeRef.current.value) / 100;

      //restrict image movement so image always fills editor.
      const newX = Math.max(
        canvasSize - imageWidth,
        Math.min(0, imagePos.current.x + xOffset)
      );
      const newY = Math.max(
        canvasSize - imageHeight,
        Math.min(0, imagePos.current.y + yOffset)
      );

      imagePos.current.x = newX;
      imagePos.current.y = newY;

      renderImage();
    }
  }

  //upload avatar image to database
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
            image: canvasRef.current.toDataURL("image/jpeg", 0.7),
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
      <div className="card" style={{ width: 600 }}>
        <div className="cardBody">
          <h3 className="card-title text-center p-1">Edit Thumbnail</h3>
        </div>
        <canvas
          id="canvas"
          className="mx-auto"
          ref={canvasRef}
          height={250}
          width={250}
          onMouseDown={startDrag}
        ></canvas>
        <div className="toolbar d-flex justify-content-center py-2">
          <span className="zoom-indicator">-</span>
          <input
            type="range"
            id="zoom"
            min="100"
            max="200"
            className="mx-2"
            value={zoom}
            ref={resizeRef}
            onChange={handleResize}
          />
          <span className="zoom-indicator">+</span>
        </div>
      </div>
      <div
        className="d-flex justify-content-between mt-2"
        style={{ width: 580 }}
      >
        <button
          className="btn btn-outline-primary"
          style={{ width: 280 }}
          onClick={unsetImage}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          style={{ width: 280 }}
          onClick={saveImage}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AvatarEditor;
