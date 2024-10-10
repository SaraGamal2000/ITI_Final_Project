import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatCurrency from "../formatcurrency";
import { useSelector } from "react-redux";
// import {CartQuantity}
import { CartQuantity } from "../../Redux/Action";

function CartIconComponent({ Quantity, id }) {
    // const quantity = useSelector((state) => state.quantity);
    // const quantity=useSelector((state)=>state.CartQuantity);
    // const update_quantity=useDispatch();

    const cartItems = useSelector((state) => state.CartQuantity || []); // Getting cart items from the Redux store
    // const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0);
    const totalQuantity = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
        : 0;
    // const dispatch = useDispatch();
    // const cartItems = useSelector((state) => state.CartQuantity);
    // const product = cartItems.find((item) => item.product_id === id);
    // const quantity = product ? product.quantity : 0;
    return (
        <div>
            <span className="badge badge-warning text-dark bg-warning rounded-5 fs-7">
                {totalQuantity}
            </span>
        </div>
    );
}
export default CartIconComponent;
