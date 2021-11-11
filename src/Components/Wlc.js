import { useHistory } from "react-router-dom";
import React from "react";
import "./Index.css";
// import { Link } from "react-router-dom";

const Wlc = () => {
  const history = useHistory();
  return (
    <div className="main-div-bg-color">
      <div className="welcome-main-div">
        <h1 className="wlc">Welcome</h1>
        <br />
      </div>
      <div className="Btn-main-div">
        <button className="btn-1" onClick={() => history.push("/Home")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Wlc;
