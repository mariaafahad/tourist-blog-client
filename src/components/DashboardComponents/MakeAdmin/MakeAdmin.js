import React, { useState } from "react";
import "./MakeAdmin.css";
import { Container } from "react-bootstrap";
import swal from "sweetalert";

const MakeAdmin = () => {
  const [userEmail, setUserEmail] = useState("");

  const handleBlur = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/users/${userEmail}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Admin added successfully", "", "success");
          e.target.reset();
        }
      });
  };

  return (
    <div>
      <Container>
        <div className="admin-form">
          <h2
            className="text-center mb-4 fw-bold mt-3"
            style={{ color: "#FF6801" }}
          >
            Make an Admin
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onBlur={handleBlur}
              placeholder="Email"
              required
            />
            <div className="text-center">
              <button type="submit" className="signin mt-3">
                Make Admin
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default MakeAdmin;
