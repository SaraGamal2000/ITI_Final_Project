import React from 'react';
import Card from "react-bootstrap/Card";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Product_component({id,name,price,image})

{
    return (
         <Card
      className="pc mb-4 w-25 d-flex shadow bg-body-tertiary"

    >
      <Card.Body className="h-50 ">
       {image && (
                    <div className="mb-2 border rounded ">
                        <img src={image} alt={name} className="w-50 h-75 rounded" />
                    </div>
                    )}
      </Card.Body>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <Card.Text
          style={{ fontSize: "20px", fontWeight: "bolder", color: "red" }}
        >
          Price: ${price}
        </Card.Text>

        <Button className="bg-primary m-2 ">

          Add to cart
        </Button>

        <Button className="bg-primary pe-5">
          <Link className="nav-link  " to={`/detail/${id}`}>
            Details
          </Link>
        </Button>
      </Card.Header>
    </Card>

            );

}
export default Product_component;