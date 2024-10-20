import React, { useContext, useState } from "react";
import Product_component from "../vendors/vendor";
import { Row, Button } from "react-bootstrap";
import formatCurrency from "../formatcurrency";
import { useDispatch, useSelector } from "react-redux";
import { CartQuantity } from "../../Redux/Reducer";
import {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
} from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { App_User } from "../../utils/constants";
import cart from "../../context/cart";

// export default function ProductDetailComponent({
//     id,
//     name,
//     description,
//     image,
//     price,
// }) {

function ProductDetailComponent({ product: productapi }) {
    // const dispatch = useDispatch();
    // const cartItems = useSelector((state) => state.CartQuantity);
    // const product = cartItems.find((item) => item.product_id === id);
    // console.log(`www`, cartItems);

    // const quantity = product ? product.quantity : 0;

    // const inc_Quantity = () => {
    //     if (product) {
    //         dispatch(updateCartItemQuantity(product.product_id, "increment"));
    //         console.log("product _id -success:", product.product_id);
    //         console.log("Quantity success:", quantity);
    //     } else {
    //         dispatch(addToCart({ id, name, price, image }));
    //         console.log("product s:", product);
    //         console.log("Quantity s:", quantity);
    //     }
    // };

    // const dec_Quantity = () => {
    //     if (quantity > 1) {
    //         dispatch(updateCartItemQuantity(product.product_id, "decrement"));
    //     } else if (quantity === 1) {
    //         console.log(product, quantity);
    //         dispatch(removeFromCart(product.id));
    //     } else {
    //         console.warn("Quantity is less than 1, cannot decrement.");
    //     }
    // };

    // =================================================================
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
    // =================================================================
    // console.log(`m`, product);
    const { carts, setCarts } = useContext(cart);

    const navigate = useNavigate();
    const {
        id,
        date,
        title,
        description,
        thumbnail,
        full_name,
        phone,
        price_per_unit,
        governorate,
        slug,
    } = productapi;
    // =================================================================
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.CartQuantity);
    // const product = cartItems.find((item) => item?.product_id === id);
    const cartite = cartItems;
    // console.log(`eeee`, cartite);
    const product = productapi;
    // console.log(`www`, cartItems);

    const quantity = product ? product.quantity : 0;
    // console.log(`444`, );

    const inc_Quantity = () => {
        if (product) {
            dispatch(updateCartItemQuantity(id, "increment"));
            console.log("product _id -success:", id);
            console.log("Quantity success:", quantity);
        } else {
            // dispatch(addToCart({ id, name, price, image }));
            console.log("product s:", product);
            console.log("Quantity s:", quantity);
        }
    };

    // const dec_Quantity = () => {
    //     if (quantity > 1) {
    //         dispatch(updateCartItemQuantity(product.product_id, "decrement"));
    //     } else if (quantity === 1) {
    //         console.log(product, quantity);
    //         dispatch(removeFromCart(product.id));
    //     } else {
    //         console.warn("Quantity is less than 1, cannot decrement.");
    //     }
    // };

    return (
        <>
            <div>ddd</div>
            <div className="d-flex m-5 bg-light">
                <div>
                    {thumbnail && (
                        <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                            <img
                                src={`${thumbnail}`}
                                alt={`${title}`}
                                // className="w-100 h-auto rounded"
                                // style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>
                <div className="m-5 d-flex flex-column">
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <div>
                        <p className="fs-5">{description}</p>
                    </div>
                    <div>
                        Price:
                        <span className="fs-5 text-danger">
                            {formatCurrency(price_per_unit)}
                        </span>
                    </div>
                    <div className="mt-auto">
                        {/* {quantity === 0 ? ( */}
                        <Button
                            variant="outline-warning"
                            className="rounded-5 m-2 w-100  text-dark fs-3"
                            // onClick={inc_Quantity}
                            onClick={() => {
                                // inc_Quantity();
                                navigate(`/${App_User}/cart/${slug}`);
                                setCarts(1);
                            }}
                            // onClick={onAddToCart}
                        >
                            Add to cart
                        </Button>
                        {/* ) : ( */}

                        {/* )} */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductDetailComponent;
