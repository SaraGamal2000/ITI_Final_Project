/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="waves">
                    <div className="wave" id="wave1" />
                    <div className="wave" id="wave2" />
                    <div className="wave" id="wave3" />
                    <div className="wave" id="wave4" />
                </div>

                <div className="container">
                    <div className="share">
                        <a href="#" className="btn">
                            facebook
                        </a>
                        <a href="#" className="btn">
                            twitter
                        </a>
                        <a href="#" className="btn">
                            instagram
                        </a>
                        <a href="#" className="btn">
                            pinterest
                        </a>
                        <a href="#" className="btn">
                            linkedin
                        </a>
                    </div>
                    <h1 className="credit">
                        created by
                        <span> Food </span>| all rights reserved!
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Footer;
