/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

// assests
import popular1 from "../../assets/images/popular/p-1.jpg";
import popular2 from "../../assets/images/popular/p-2.jpg";
import popular3 from "../../assets/images/popular/p-3.jpg";
import popular4 from "../../assets/images/popular/p-4.jpg";
import popular5 from "../../assets/images/popular/p-5.jpg";
import popular6 from "../../assets/images/popular/p-6.jpg";

function Popular() {
    return (
        <>
            <div className="popular" id="popular">
                <div className="container">
                    <h1 className="heading">
                        most
                        <span>popular</span>
                        foods
                    </h1>

                    <div className="box-container">
                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular1}`} alt="" />
                            <h3>tasty burger</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>

                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular2}`} alt="" />
                            <h3>tasty cakes</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>
                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular3}`} alt="" />
                            <h3>tasty sweets</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>
                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular4}`} alt="" />
                            <h3>tasty cupcakes</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>

                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular5}`} alt="" />
                            <h3>tasty drinks</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>

                        <div className="box">
                            <span className="price">$5 - $20</span>
                            <img src={`${popular6}`} alt="" />
                            <h3>tasty ic-cream</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <a href="#" className="btn">
                                order new
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Popular;
