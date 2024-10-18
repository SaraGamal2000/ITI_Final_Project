import React, { useState } from "react";
import Product_component from "../vendors/vendor";
import { Row, Button } from "react-bootstrap";
import formatCurrency from "../formatcurrency";
import { useDispatch, useSelector } from "react-redux";
import {CartQuantity} from '../../Redux/Reducer';
import {addToCart,removeFromCart,updateCartItemQuantity} from "../../Redux/Action";


export default function ProductDetailComponent({
  id,
  name,
  description,
  image,
  price,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.CartQuantity);
  const product = cartItems.find((item) => item.product_id === id);
  const quantity = product ? product.quantity : 0;

  const inc_Quantity = () => {
    if (product) {
      dispatch(updateCartItemQuantity(product.product_id, "increment"));
      console.log("product _id -success:", product.product_id);
      console.log("Quantity success:", quantity);
    } else {
      dispatch(addToCart({ id, name, price, image })); 
      console.log("product s:", product);
      console.log("Quantity s:", quantity);
    }
  };

  const dec_Quantity = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(product.product_id, "decrement"));
    } else if (quantity === 1) {
      console.log(product, quantity);
      dispatch(removeFromCart(product.id)); 
    }
    else {

      console.warn("Quantity is less than 1, cannot decrement.");
    }
  };
//   const quantity = useSelector((state) => state.quantity);
//   const update_quantity = useDispatch();
//   const [Quantity, setQuantity] = useState(1);

//   const inc_Quantity = (event) => {
//     // setQuantity(Quantity+1)
//     update_quantity(CartQuantity(quantity + 1));
//   };

//   const dec_Quantity = (event) => {
//     // setQuantity(Quantity - 1);
//     update_quantity(CartQuantity(quantity - 1));
//   };

//   const remove_Quantity = (event) => {
//     // setQuantity(Quantity+1)
//     update_quantity(CartQuantity(quantity * 0));
//   };

  return (
    <>
      <div className="d-flex m-5 bg-light">
        <div>
          {image && (
            <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                {console.log(image)}
              <img
                src={`http://localhost:8000${image}`}
                alt={name}
                // className="w-100 h-auto rounded"
                // style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="m-5">
          <div>
            <h2>{name}</h2>
          </div>
          <div>
            <p className="fs-5">{description}</p>
          </div>
          <div>
            Price:
            <span className="fs-5 text-danger">{formatCurrency(price)}</span>
          </div>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                variant="outline-warning"
                className="rounded-5 m-2 w-100  text-dark fs-3"
                onClick={inc_Quantity}
                // onClick={onAddToCart}
              >
                Add to cart
              </Button>
          ) : ( 
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-warning"
                    className="rounded-circle text-dark fs-3"
                    onClick={inc_Quantity}
                    // onClick={onAddToCart}
                  >
                    +
                  </Button>
                  <span className="m-4 "><div className=" w-50 m-5  bg-white h-50 text-dark  text-center fs-3 rounded-5"> {quantity} </div></span>
                  <Button
                    variant="outline-warning"
                    className="rounded-circle m-3 text-dark fs-3 "
                    onClick={dec_Quantity}
                    // onClick={onRemoveFromCart}
                  >
                    -
                  </Button>
                </div>
                <Button
                  variant="outline-warning"
                  className="rounded-5 m-2 w-100 text-dark fs-3 "
                  // onClick={remove_Quantity}
                  // onClick={onRemoveFromCart}
                >
                  Remove
                </Button>
              </div>
             )} 
          </div>
        </div>
      </div>
    </>
  );
}
