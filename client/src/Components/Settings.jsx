import React from "react";
import "./CSS/Settings.css";

function Settings() {
  return (
    <div id="settings-container">
      <div hidden className="card">
        <div className="card-body"></div>
      </div>
      <button className="btn">
        <span id="settings-button" className="material-symbols-outlined">
          settings
        </span>
      </button>
    </div>
  );
}

export default Settings;
