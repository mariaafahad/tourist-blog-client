import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { setAllBlogs } from "../../../redux/slice";

const ManageBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.allBlogs.allBlogs);

  useEffect(() => {
    fetch('http://localhost:5000/Allblog')
      .then(res => res.json())
      .then(data => dispatch(setAllBlogs(data)))
  }, [blogs, dispatch])

  const approvedBlog = (id) => {
    fetch(`http://localhost:5000/blog/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Blog Approved Successfully!", "", "success");
        }
      });
  };

  const deleteBlog = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete for this Blog.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/deleteBlog/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              swal("Deleted!", "Deleted Successfully!", "success");
            }
          });
      } else {
        swal("Delete Canceled!");
      }
    });
  };

  return (
    <div>
      <div className="py-3">
        <div className="container myOrder">
          <Table striped bordered hover size="sm" responsive="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Location</th>
                <th>Category</th>
                <th>Date</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog) => (
                <>
                  <tr>
                    <td>{blog?.title}</td>
                    <td>{blog?.name}</td>
                    <td>{blog?.location}</td>
                    <td>{blog?.category}</td>
                    <td>{blog?.date}</td>
                    {blog.status === "pending" ? (
                      <td className="text-danger fw-bold">{blog.status}</td>
                    ) : (
                      <td className="text-success fw-bold">{blog.status}</td>
                    )}
                    <td>
                      <button
                        onClick={() => approvedBlog(blog._id)}
                        className="signin btn-sm"
                      >
                        <i className="fas fa-check-circle fs-5"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="signin btn-sm"
                      >
                        <i className="fas fa-trash fs-5"></i>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
