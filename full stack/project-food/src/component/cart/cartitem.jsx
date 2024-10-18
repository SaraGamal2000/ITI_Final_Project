import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {CartQuantity} from '../../Redux/Reducer';
import {addToCart,removeFromCart,updateCartItemQuantity} from "../../Redux/Action";
// import formatCurrency from "../formatcurrency"

function CartItemComponent({
  Product_image,
  quantity,
  price,
  product_id,
  product_name,
}) {



  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.CartQuantity);
  const product = cartItems.find((item) => item.product_id === product_id);
  const quantity1 = product ? product.quantity : 0;

  const inc_Quantity = () => {
    if (product) {
      dispatch(updateCartItemQuantity(product.product_id, "increment"));
      console.log("product _id -success:", product);
      console.log("Quantity success:", quantity1);
    } 
    // else {
    //   dispatch(addToCart({ id, name, price, image })); 
    //   console.log("product s:", product);
    //   console.log("Quantity s:", quantity1);
    // }
  };

  const dec_Quantity = () => {
    if (product) {
      if (quantity1 > 1) {
        dispatch(updateCartItemQuantity(product.product_id, "decrement"));
      } else if (quantity1 === 1) {
        dispatch(removeFromCart(product.product_id));
        console.log("Product removed:", product.product_id);
      }
    } else {
     
      console.warn("Product not found in cart, cannot decrement.");
    }
  };

  // const dec_Quantity = () => {
  //   if (quantity1 > 1) {
  //     dispatch(updateCartItemQuantity(product.product_id, "decrement"));
  //   } else if (quantity === 1) {
  //     console.log(product, quantity);
  //     dispatch(removeFromCart(product.product_id)); 
  //   }
  //   else {

  //     console.warn("Quantity is less than 1, cannot decrement.");
  //   }
  // };


  return (
    <>
    {/* {quantity1 !== 0 ? ( */}
    <div variant="outline-warning" className="m-5 g-5 d-flex bg-light h-100 w-100 fs-4 border border-warning border-2 shadow rounded-5">
      <Button variant="outline-warning" className="rounded-5 text-dark m-5 fs-3"   onClick={inc_Quantity}>
        +
      </Button>
      <div className="m-5">
        {Product_image
 && (
          <div className="mb-2 border rounded w-100 h-100 ">
            <img
              src={`http://localhost:8000${Product_image
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

      <Button variant="outline-warning" className="rounded-5 text-dark m-5 fs-3"   onClick={dec_Quantity}>
        -
      </Button>
    </div>
    {/* ):( */}
    <div></div>
    {/* )} */}
</>  
);
}
export default CartItemComponent;

