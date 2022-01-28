import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navigation from "../../Shared/Navigation/Navigation";
import Rating from "react-rating";
import useFirebase from "../../hooks/useFirebase";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useFirebase();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState({});
  // const dispatch = useDispatch();
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetch(`https://powerful-everglades-66107.herokuapp.com/${id}`)
      .then((res) => res.json())
      .then((data) => setAllComments(data));
  }, [allComments, id]);

  useEffect(() => {
    fetch(`https://powerful-everglades-66107.herokuapp.com/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newComment = { ...comment };
    newComment[field] = value;
    newComment["blogId"] = id;
    newComment["commentAuthor"] = user.displayName;
    setComment(newComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://powerful-everglades-66107.herokuapp.com/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
        }
      });
  };

  // delete comment
  const handleDeleteComment = (id) => {
    fetch(`https://powerful-everglades-66107.herokuapp.com/${id}`, {
      method: "DELETE"
    })
  }

  return (
    <div>
      <Navigation />
      <Container>
        <div className="mb-3">
          <div className="text-center">
            <h2>{blog.title}</h2>
            <p className="fs-6">Author: {blog.name}</p>
            <img className="w-50 mb-3" src={blog.image} alt="" />
          </div>
          <h4>{blog.location}</h4>
          <h6 className="text-muted">
            {blog.time} UTC +0:06, {blog.date}
          </h6>
          <h6>Travel Expense: ${blog.expense}</h6>
          <Rating
            style={{ color: "#FF9529", textAlign: "center" }}
            initialRating={blog?.rating}
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            readonly
          ></Rating>
        </div>
        <div>
          <p style={{ fontSize: "18px", textAlign: "justify" }}>
            {blog.description}
          </p>
        </div>
        <hr />
        {!allComments.length ? (
          <p className="my-3 text-center fw-bold">No Comments</p>
        ) : (
          <div>
            {allComments?.map((comment) => (
              <div className="my-4">
                <h6 style={{ color: "#2C3E50", fontWeight: "700", margin: "0" }}>{comment?.commentAuthor}</h6>
                <p className="m-0">{comment?.comment}</p>
                <p onClick={() => handleDeleteComment(comment._id)} className="m-0" style={{ cursor: "pointer", color: "#0B5ED7" }}>Delete Comment</p>
              </div>
            ))}
          </div>
        )}
        <div className="my-4 mt-3">
          <form className="d-flex">
            <input
              type="text"
              name="comment"
              onBlur={handleChange}
              className="form-control w-100"
              style={{ border: "1px solid #FD5A01" }}
              placeholder="Write a Comment..."
            />
            <button
              onClick={handleSubmit}
              className="btn btn-sm btn-primary ms-2"
            >
              Submit
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
