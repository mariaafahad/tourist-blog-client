
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import swal from "sweetalert";
import useFirebase from "../../../hooks/useFirebase";

const AddBlog = () => {
  const { user } = useFirebase();
  const isAdmin = useSelector((state) => state.allBlogs.isAdmin);

  const today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const {
    register,
    handleSubmit,


  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (isAdmin) {
      data.status = "Approved";
    } else {
      data.status = "pending";
    }
    data.date = date;
    data.time = time;
    data.email = user.email;

    fetch("https://powerful-everglades-66107.herokuapp.com/addBlog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          swal("Blog Added Successfully", "", "success");
          e.target.reset();
        }
      });
  };

  return (
    <div>
      <Container>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <label htmlFor="title" className="fw-bold">
                Blog Title
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="title"
                {...register("title")}
                required
              />
              <label htmlFor="category" className="fw-bold">
                Blog Category
              </label>
              <select
                {...register("category")}
                name="category"
                className="w-100 my-2"
                id="category"
                style={{
                  border: "1px solid #bdc3c7",
                  padding: "7px",
                  borderRadius: "5px",
                }}
              >
                <option value="Family Tour">Family Tour</option>
                <option value="College Tour">College Tour</option>
                <option value="Office Tour">Office Tour</option>
              </select>
              <label htmlFor="name" className="fw-bold">
                Traveler Name
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="name"
                {...register("name")}
                required
              />
              <label htmlFor="address" className="fw-bold">
                Traveler Address
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="address"
                {...register("address")}
                required
              />
              <label htmlFor="image" className="fw-bold">
                Travel Image URL
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="image"
                {...register("image")}
                required
              />
              <br />
            </Col>
            <Col lg={6} md={6} xs={12}>
              <label htmlFor="location" className="fw-bold">
                Travel Location
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="location"
                {...register("location")}
                required
              />
              <label htmlFor="expense" className="fw-bold">
                Expense of doller
              </label>
              <input
                className="form-control my-2"
                type="number"
                id="expense"
                {...register("expense")}
                required
              />
              <label htmlFor="rating" className="fw-bold">
                Travel Rating
              </label>
              <input
                className="form-control my-2"
                type="text"
                id="rating"
                placeholder="You should given rating 1 to 5..."
                {...register("rating")}
                required
              />
              <label htmlFor="description" className="fw-bold">
                Describe Travel Experience
              </label>
              <textarea
                className="form-control my-2"
                id="description"
                {...register("description")}
                style={{ height: "150px", resize: "none" }}
                required
              />
              <div className="text-center">
                <button className="signin">Add Blog</button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default AddBlog;
