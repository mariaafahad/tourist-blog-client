import React from "react";
import "./TopBlogsCard.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const TopBlogsCard = ({ blog }) => {
  const { _id, title, image, rating } = blog;

  return (
    <Col xs={12} md={12} lg={12}>
      <div className="w-75 mx-auto">
        <div xs={12} md={12} lg={6} className="blog-imgg">
          <img src={image} alt="" />
        </div>
        <div xs={12} md={12} lg={6} className="ms-0">
          <p className="m-0 mt-1 fw-bold" style={{ color: "#2C3E50" }}>
            {title}
          </p>
          <Rating
            style={{ color: "#FF9529", textAlign: "center" }}
            initialRating={rating}
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            readonly
          ></Rating>
          <Link to={`/blogs/${_id}`} style={{ textDecoration: "none", display: "block", marginTop: "5px" }}>
            <button className="signin authBtn">Read</button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default TopBlogsCard;
