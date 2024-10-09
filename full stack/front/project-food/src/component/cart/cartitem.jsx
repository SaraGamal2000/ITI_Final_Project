import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import formatCurrency from "../formatcurrency"

function CartItemComponent({
  Product_image,
  quantity,
  price,
  product_id,
  product_name,
}) {
  return (
    <>
    <div variant="outline-warning" className="m-5 g-5 d-flex bg-light h-100 w-100 fs-4 border border-warning border-2 shadow rounded-5">
      <Button variant="outline-warning" className="rounded-5 text-dark m-5 fs-3">
        +
      </Button>
      <div className="m-5">
        {Product_image
 && (
          <div className="mb-2 border rounded w-100 h-100 ">
            <img
              src={`http://localhost:8080${Product_image
              }`}
              alt={product_name}
              className="w-100 h-100 rounded"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
      <div className="m-5">
        <span className="rounded-5 text-dark m-5 fs-5"> {product_name}</span>
      </div>

      <div className="m-5">
        <span className="rounded-5 text-dark m-5 fs-5"> {quantity}</span>
      </div>
      <div className="m-5 ">
        <span className="rounded-5 text-dark m-5 fs-5">  ${price}</span>
      </div>

      <Button variant="outline-warning" className="rounded-5 text-dark m-5 fs-3">
        -
      </Button>
    </div>
    
</>  
);
}
export default CartItemComponent;
