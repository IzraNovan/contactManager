import React from "react";
import user from "../images/user.png";
import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const { name, email } = location.state.contact;

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={user} className="card-img-top" alt="user" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{email}</p>
        </div>
      </div>

      <Link to="/list">
        <button className="btn btn-primary mt-2">Back</button>
      </Link>
    </>
  );
};

export default ContactDetail;
