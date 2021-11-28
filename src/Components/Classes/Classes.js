import React from "react";
import { Link } from "react-router-dom";
import "./Classes.css";
const Classes = ({ classData }) => {
  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__content">
            <Link className="joined__title" to={`/home/${classData.id}`}>
              <h2>{classData.className}</h2>
            </Link>
            <p className="joined__owner">{classData.owner}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Classes;
