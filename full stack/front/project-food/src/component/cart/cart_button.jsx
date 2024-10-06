
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatCurrency from "../formatcurrency";
import { useDispatch, useSelector } from "react-redux";
import { CartQuantity } from "../../Redux/Action";
export default function CartButtonCompo({ id }) {

  const quantity = useSelector((state) => state.quantity);
  const update_quantity = useDispatch();
//   const [Quantity, setQuantity] = useState(1);

 
  const inc_Quantity = (event) => {
    update_quantity(CartQuantity(quantity + 1));
  };

  const dec_Quantity = (event) => {
    update_quantity(CartQuantity(quantity - 1));
  };

  const remove_Quantity = (event) => {
    update_quantity(CartQuantity(quantity * 0));
  };
  return (<></>)
}