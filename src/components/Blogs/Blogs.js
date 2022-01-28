import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../../redux/slice";
import { Col, Container, Row } from "react-bootstrap";
import BlogCard from "../BlogCard/BlogCard";
import TopBlogsCard from "../TopBlogsCard/TopBlogsCard";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.allBlogs.blogs);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [category, setCategory] = useState("");

  const size = 10;

  useEffect(() => {
    fetch(
      `https://powerful-everglades-66107.herokuapp.com/blogs?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBlogs(data.blogs));
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [dispatch, page]);

  // filter data by category
  let filteredBlogs;
  if (category === "") {
    filteredBlogs = [...blogs];
  } else {
    filteredBlogs = blogs.filter((blog) => blog.category === category);
  }

  // eslint-disable-next-line eqeqeq
  const topRatingBlogs = blogs.filter((blog) => 5 == blog.rating);

  return (
    <div className="my-5">
      <Container>
        <Row>
          <Col xs={12} md={12} lg={3} className="mb-3">
            <h4 style={{ color: "#2C3E50", textAlign: "center" }} className="mb-3">Top Rated Blogs</h4>
            <Row className="g-5">
              {topRatingBlogs?.map((blog) => (
                <TopBlogsCard key={blog._id} blog={blog} />
              ))}
            </Row>
          </Col>
          <Col xs={12} md={12} lg={9}>
            <div className="mb-4 ms-3">
              <select
                name="laptops"
                id="laptop"
                className="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Family Tour">Family Tour</option>
                <option value="College Tour">College Tour</option>
                <option value="Office Tour">Office Tour</option>
              </select>
            </div>
            <Row className="g-5">
              {filteredBlogs?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </Row>
            <div className="pagination mt-5">
              {[...Array(pageCount).keys()].map((number) => (
                <button
                  className={number === page ? "selected" : ""}
                  key={number}
                  onClick={() => setPage(number)}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
