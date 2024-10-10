import React from "react";

import orderimage from "../../assets/images/order/order-img.jpg";

function Order() {
    return (
        <>
            <div className="order" id="order">
                <div className="container">
                    <h1 className="heading">
                        order
                        <span>now</span>
                    </h1>
                    <div className="row">
                        <div className="image">
                            <img src={`${orderimage}`} alt="order_now" />
                        </div>

                        <form action="#">
                            <div className="inputBox">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    required
                                    placeholder="neme"
                                />
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    required
                                    placeholder="email"
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    required
                                    placeholder="number"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    required
                                    placeholder="food name"
                                />
                            </div>
                            <textarea
                                placeholder="address"
                                name=""
                                id=""
                                cols={30}
                                rows={10}
                                required
                                defaultValue={""}
                            />
                            <input
                                type="submit"
                                defaultValue="order now"
                                className="btn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
