import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="nav bg-primary text-light">
        <div className="container-fluid p-3 d-flex justify-content-between">
          <div className="brand-logo">
            <h1 className="navbar-brand fs-3 ps-4">Contact Manager</h1>
          </div>

          <div className="btn-menu">
            <Link to="/">
              <button className="btn btn-info text-dark p-2.3 fw-semibold me-2">
                Add Contact
              </button>
            </Link>
            <Link to="/list">
              <button className="btn btn-info text-dark p-2.3 fw-semibold">
                Contact List
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
