import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatCurrency from "../formatcurrency";
import { useDispatch, useSelector } from "react-redux";
// import { CartQuantity } from "../../Redux/Action";
// import { addToCart } from "../../Redux/Action";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../../Redux/Action";

function Product_component({ id, name, price, image }) {
  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.CartQuantity);
  // const product = cartItems.find((item) => item.product_id === id);
  // const quantity = product ? product.quantity : 0;

  // const inc_Quantity = () => {
  //   dispatch(addToCart({ id, name, price, image }));
  // };

  // const dec_Quantity = () => {
  //   if (quantity > 0) {
  //     dispatch(removeFromCart(id));
  //   }
  // };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.CartQuantity);
  const product = cartItems.find((item) => item.product === id);
  const quantity = product ? product.quantity : 0;
  // console.log("Quantity:", quantity);
  // console.log("product:", product);

  const inc_Quantity = () => {
    if (product) {
      dispatch(updateCartItemQuantity(product.id, "increment")); // Increment if product exists
    } else {
      dispatch(addToCart({ id, name, price, image })); // Add to cart if it doesn't exist
    }
  };

  const dec_Quantity = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(product.id, "decrement")); // Decrement if quantity > 1
    } else if (quantity === 1) {
      dispatch(removeFromCart(product.id)); // Remove from cart if quantity is 1
    }
  };

  return (
    <Card className="pc mb-4  shadow bg-body-tertiary">
      <Card.Body className="">
        {image && (
          // <div className="mb-2 border rounded ">
          <img
            src={`http://localhost:8080${image}`}
            alt={name}
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
          />
          // </div>
        )}
      </Card.Body>
      <Card.Header>
        <Card.Title className="text-dark">{name}</Card.Title>
        <Card.Text
          className="text-dark"
          style={{ fontSize: "20px", fontWeight: "bolder", color: "red" }}
        >
          {formatCurrency(price)}
        </Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <>
            <Button
              variant="outline-warning"
              className="rounded-5 m-2 w-100  text-dark"
              onClick={inc_Quantity}
              // onClick={onAddToCart}
            >
              Add to cart
            </Button>
            {/* <Button
                  variant="outline-warning"
                  className="rounded-circle text-dark"
                  onClick={dec_Quantity}
                  // onClick={onRemoveFromCart}
                >
                  -
                </Button> */}
            </>
          ) : (
          
            <div>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="outline-warning"
                  className="rounded-circle text-dark"
                  onClick={inc_Quantity}
                  // onClick={onAddToCart}
                >
                  +
                </Button>
                <span>{quantity} </span>
                <Button
                  variant="outline-warning"
                  className="rounded-circle text-dark"
                  onClick={dec_Quantity}
                  // onClick={onRemoveFromCart}
                >
                  -
                </Button>
              </div>
              <Button
                variant="outline-warning"
                className="rounded-5 m-2 w-100 text-dark"
                onClick={dec_Quantity}
                // onClick={onRemoveFromCart}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <Button
          variant="outline-warning"
          className="rounded-5 m-2 w-100 text-dark"
        >
          <Link className="nav-link  " to={`/detail/${id}`}>
            Details
          </Link>
        </Button>
      </Card.Header>
    </Card>
  );
}
export default Product_component;
