import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";

import useFirebase from "../../hooks/useFirebase";

const Navigation = () => {
  let navigate = useNavigate();
  const handleSignin = () => {
    navigate("/signin");
  };

  const { user, logOut } = useFirebase();

  return (
    <div>
      <Navbar style={{ backgroundColor: "#fff" }} expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink to="/home">
              <img style={{ height: "80px" }} src="https://i.ibb.co/TqQBbzS/57f40ad71a19455e84cc6458e1462e49.png" alt="logo" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="nav-menu">
                <NavLink to="/home">Home</NavLink>
                {user?.email ? <NavLink to="/dashboard">Dashboard</NavLink> : ""}
                <>
                  {user?.email ? <button onClick={logOut} className="signin authBtn">
                    Sign Out
                  </button> : <button onClick={handleSignin} className="signin authBtn">
                    Sign In
                  </button>}
                  {user?.email ? <small className="displayName" style={{ color: "#2980b9", fontSize: "17px", fontWeight: "bold", marginLeft: "7px" }}>{user?.displayName}</small> : ""}
                </>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
