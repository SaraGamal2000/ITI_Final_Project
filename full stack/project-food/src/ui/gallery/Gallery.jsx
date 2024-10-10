/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

// assests
import gallery1 from "../../assets/images/gallery/g-1.jpg";
import gallery2 from "../../assets/images/gallery/g-2.jpg";
import gallery3 from "../../assets/images/gallery/g-3.jpg";
import gallery4 from "../../assets/images/gallery/g-4.jpg";
import gallery5 from "../../assets/images/gallery/g-5.jpg";
import gallery6 from "../../assets/images/gallery/g-6.jpg";
import gallery7 from "../../assets/images/gallery/g-7.jpg";
import gallery8 from "../../assets/images/gallery/g-8.jpg";
import gallery9 from "../../assets/images/gallery/g-9.jpg";

function Gallery() {
    return (
        <>
            <div className="gallery" id="gallery">
                <div className="container">
                    <h1 className="heading">
                        our food
                        <span>gallery</span>
                    </h1>

                    <div className="box-container">
                        <div className="box">
                            <img src={`${gallery1}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery2}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery3}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery4}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery5}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery6}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery7}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery8}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={`${gallery9}`} alt="" />
                            <div className="content">
                                <h3>tasty food</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsam, explicabo.
                                </p>
                                <a href="#" className="btn">
                                    order new
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Gallery;
