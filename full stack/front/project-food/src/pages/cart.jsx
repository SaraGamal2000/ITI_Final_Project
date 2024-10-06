import { useParams } from "react-router-dom";
import CartItemComponent from "../component/cart/cartitem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function Cart_p() {
  const { id } = useParams();
  const [CartItems, setCartItems] = useState([]);
  const [cart, setcart] = useState([]);
  const [error, setError] = useState(false);
  const UseParam = { id };
  // useEffect(()=>{
  //     axios.get(`http://localhost:8080/api/products/${id}/`)
  //         .then((res)=>{
  //             console.log(res.data.products)
  //            setCartItems(res.data.products)
  //     })
  //         .catch(() => {
  //         setError(true);
  //       })

  //     },[]);
  //http://localhost:8080/accounts/login/?next=/cart/cart_detail/
  //http://localhost:8080/cart_api/carts/?format=json
  //http://127.0.0.1:8080/cart_api/cart-items/?format=json
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/cart-items/")
      .then((res) => {
        console.log("cart item", res.data);
        setcart(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <div
        className=" container  m-5 g-5 d-flex justify-content-center align-items-center"
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "3px",
        }}
      >
        {cart.map((item, index) => (
          <CartItemComponent key={index} {...item} />
        ))}
      </div>
      <div className="w-75 m-5 ">
        <Button
          variant="outline-warning"
          className="rounded-5 m-2 w-100 text-dark bg-warning  "
          //   onClick={remove_Quantity}
          // onClick={onRemoveFromCart}
        >
          Confirm your order
        </Button>
      </div>
    </>
  );
}
export default Cart_p;
