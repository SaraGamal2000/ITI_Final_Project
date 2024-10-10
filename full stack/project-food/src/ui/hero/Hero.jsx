/* eslint-disable jsx-a11y/alt-text */
import React from "react";

// assests
import HeroImage from "../../assets/images/home/home-img.png";

function Hero() {
    return (
        <>
            <div className="home" id="home">
                <div className="container">
                    <div className="content">
                        <h3>food made with love</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nobis quia id explicabo quasi accusantium
                            omnis accusamus ipsam necessitatibus totam
                            dignissimos?
                        </p>
                        <a href="#order" className="btn">
                            order new
                        </a>
                    </div>

                    <div className="image">
                        <img src={`${HeroImage}`} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
