import React from "react";

// assests
import pic1 from "../../assets/images/review/pic1.png";
import pic2 from "../../assets/images/review/pic2.png";
import pic3 from "../../assets/images/review/pic3.png";

function Review() {
    return (
        <>
            <div className="review" id="review">
                <div className="container">
                    <h1 className="heading">
                        our customers
                        <span>review</span>
                    </h1>
                    <div className="box-container">
                        <div className="box">
                            <img src={`${pic1}`} alt="" />
                            <h3>john deo</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem suscipit
                                necessitatibus officia id unde repellendus
                                assumenda officiis velit atque expedita.
                            </p>
                        </div>

                        <div className="box">
                            <img src={`${pic2}`} alt="" />
                            <h3>john deo</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem suscipit
                                necessitatibus officia id unde repellendus
                                assumenda officiis velit atque expedita.
                            </p>
                        </div>

                        <div className="box">
                            <img src={`${pic3}`} alt="" />
                            <h3>john deo</h3>
                            <div className="stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem suscipit
                                necessitatibus officia id unde repellendus
                                assumenda officiis velit atque expedita.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Review;
