import { useParams } from "react-router-dom";
import CartItemComponent from "../component/cart/cartitem";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../ui/loader/Loader";
import cart from "../context/cart";

import PaymentPage from "./payment";

function Cart_p() {
    // const cartcont = cart;
    const { id } = useParams();
    const [CartItems, setCartItems] = useState([]);
    // const [cart, setcart] = useState([]);
    const [error, setError] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    // const UseParam = { id };

    //     },[]);
    //http://localhost:8080/accounts/login/?next=/cart/cart_detail/
    //http://localhost:8080/cart_api/carts/?format=json
    //http://127.0.0.1:8080/cart_api/cart-items/?format=json
    // useEffect(() => {
    //   axios
    //     .get("http://127.0.0.1:8000/api/cart-items/")
    //     .then((res) => {
    //       console.log("cart item", res.data);
    //       setcart(res.data);
    //     })
    //     .catch(() => {
    //       setError(true);
    //     });
    // }, []);
    // useEffect(() => {
    //     axios
    //         .get("http://127.0.0.1:8000/api/cart-items/")
    //         .then((res) => {
    //             console.log("cart item", res.data);
    //             setcart(res.data);
    //             const total = res.data.reduce((sum, item) => {
    //                 const price = parseFloat(item.price) || 0;
    //                 console.log("Item Price:", price);
    //                 return sum + price;
    //             }, 0);
    //             console.log("Calculated Total:", total);
    //             setTotalPrice(total);
    //         })
    //         .catch(() => {
    //             setError(true);
    //         });
    // }, []);
    // console.log("Total Price in render:", totalPrice);
    //     // =============================================================================
    const { carts, setCarts } = useContext(cart);
    const { slug } = useParams();
    const [product, setproduct] = useState(null);
    // const [error, setError] = useState(false);
    const [Recommend, setRecommend] = useState([]);

    useEffect(() => {
        try {
            axios
                .get(
                    `http://127.0.0.1:8000/api/v1/productapi/admin/detail/${slug}/`
                )
                .then((res) => {
                    console.log(res.data);
                    setproduct(res.data);
                    // console.log("API response:", res.data.products);
                });
        } catch (error) {
            console.log(`Error`);
        }
    }, [slug]);

    if (!product) return <Loader />;
    console.log(`----`, product);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="">
                <div>
                    <div
                        className=" container  m-5 g-5 d-flex justify-content-center align-items-center text-center"
                        style={{
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "3px",
                        }}
                    >
                        {/* {cart.map((item, index) => ( */}
                        <CartItemComponent product={product} />
                        {/*  ))} */}
                    </div>
                </div>
                <div className="" style={{ marginTop: "150px" }}>
                    <h3 className="fs-3 text-center">
                        Total Price: ${product?.price_per_unit}
                        {/* {typeof totalPrice === "number"
                            ? totalPrice.toFixed(2)
                            : "Invalid price"} */}
                    </h3>
                    <div className="w-75 m-5 ">
                        {/* <Button
                            variant="outline-warning"
                            className="rounded-5  w-100 text-dark bg-warning text-center  ml-5  fs-3 p-3"
                        >
                            <Link
                                onClick={() => {
                                    setCarts(0);
                                }}
                            >
                                Create order
                            </Link>
                        </Button> */}
                        
                        <PaymentPage pricePerItem={product?.price_per_unit} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart_p;
