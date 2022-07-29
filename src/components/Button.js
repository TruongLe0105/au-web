import React from "react";

import BgBtn from "../assets/image/bg-button.png";
import buttonAu from "../assets/image/border-btn.svg";
import "./button.css";

function Button({ title, styleContainer }) {
  return (
    <div className={styleContainer}>
      <img src={buttonAu} alt="btn" />
      <div
        style={{
          position: "absolute",
          top: 2.5,
          left: 0,
          right: 0,
          width: "100%",
          height: "86%",
          borderTopColor: "#00FFFF",
          borderTopWidth: 1,
          borderBottomColor: "#39AAFF",
          borderBottomWidth: 1,
        }}
      >
        <img src={BgBtn} alt="btn" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="contentBtnExchange">{title}</div>
      <img src={buttonAu} alt="btn" className="buttonRight" />
    </div>
  );
}

export default Button;
