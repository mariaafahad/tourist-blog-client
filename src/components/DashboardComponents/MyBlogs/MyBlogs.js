import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "./MyBlogs.css";
import swal from "sweetalert";

import useFirebase from "../../../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { setMyBlog } from "../../../redux/slice";

const MyOrders = () => {

  const { user } = useFirebase();

  const dispatch = useDispatch();
  const myBlog = useSelector((state) => state.allBlogs.myBlog);

  useEffect(() => {
    fetch(`http://localhost:5000/myBlogs/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setMyBlog(data))
      })
  }, [dispatch, myBlog, user?.email])

  const deleteBlog = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete for this Blog.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:5000/deleteBlog/${id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount > 0) {
                swal("Deleted!", "Deleted Successfully!", "success");
              }
            })
        } else {
          swal("Delete Canceled!");
        }
      });
  }

  return (
    <div className="py-3">
      <div className="container myOrder">
        <h2 className="text-center my-4">
          My <span style={{ color: "#FF6D00" }}>Blogs</span>
        </h2>
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Category</th>
              <th>Date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {myBlog?.map((blog, index) => (
              <>
                <tr>
                  <td>{blog?.title}</td>
                  <td>{blog?.location}</td>
                  <td>{blog?.category}</td>
                  <td>{blog?.date}</td>
                  {blog.status === "pending" ? (
                    <td className="text-danger fw-bold">{blog.status}</td>
                  ) : (
                    <td className="text-success fw-bold">{blog.status}</td>
                  )}
                  <td>
                    <button onClick={() => deleteBlog(blog._id)} className="signin btn-sm"><i className="fas fa-trash fs-5"></i></button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyOrders;
