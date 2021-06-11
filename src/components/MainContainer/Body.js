import React from "react";
import { NavLink } from "react-router-dom";


const Body = () => {

  return (
    <div className="body-container">
      <div className="body-content_container">
        <h3>If you have any problem with </h3>
        <NavLink to="/report">
          <button className="btn btn-mes" >Message</button>
        </NavLink>
        
      </div>
    </div>
  );
};
export default Body;
