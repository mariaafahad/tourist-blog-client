import React from "react";
import { Card, ListGroup, ListGroupItem, } from "react-bootstrap";
import "./BlogCard.css";
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const { _id, title, category, image } = blog;

  return (


    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {title}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Category: {category}</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
          <button style={{ color: "#00008B", backgroundColor: "#00FFFF" }} className="signin authBtn">Read</button>
        </Link>
      </Card.Body>
    </Card>

  );
};

export default BlogCard;

