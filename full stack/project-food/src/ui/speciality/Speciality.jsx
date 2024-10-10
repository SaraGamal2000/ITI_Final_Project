import React from "react";

// assests
import s1 from "../../assets/images/speciality/s-1.png";
import s2 from "../../assets/images/speciality/s-2.png";
import s3 from "../../assets/images/speciality/s-3.png";
import s4 from "../../assets/images/speciality/s-4.png";
import s5 from "../../assets/images/speciality/s-5.png";
import s6 from "../../assets/images/speciality/s-6.png";

import simage1 from "../../assets/images/speciality/s-img-1.jpg";
import simage2 from "../../assets/images/speciality/s-img-2.jpg";
import simage3 from "../../assets/images/speciality/s-img-3.jpg";
import simage4 from "../../assets/images/speciality/s-img-4.jpg";
import simage5 from "../../assets/images/speciality/s-img-5.jpg";
import simage6 from "../../assets/images/speciality/s-img-6.jpg";

function Speciality() {
    return (
        <>
            <div className="speciality" id="speciality">
                <div className="container">
                    <h1 className="heading">
                        our
                        <span>speciality</span>
                    </h1>

                    <div className="box-container">
                        <div className="box">
                            <div className="image">
                                <img src={`${simage1}`} alt="" />
                            </div>

                            <div className="content">
                                <img src={`${s1}`} alt="" />
                                <h3>tasty burger</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="image">
                                <img src={`${simage2}`} alt="" />
                            </div>
                            <div className="content">
                                <img src={`${s2}`} alt="" />
                                <h3>tasty pizza</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="image">
                                <img src={`${simage3}`} alt="" />
                            </div>
                            <div className="content">
                                <img src={`${s3}`} alt="" />
                                <h3>cold ice-cream</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="image">
                                <img src={`${simage4}`} alt="" />
                            </div>
                            <div className="content">
                                <img src={`${s4}`} alt="" />
                                <h3>cold drinks</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="image">
                                <img src={`${simage5}`} alt="" />
                            </div>
                            <div className="content">
                                <img src={`${s5}`} alt="" />
                                <h3>tasty sweets</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="image">
                                <img src={`${simage6}`} alt="" />
                            </div>
                            <div className="content">
                                <img src={`${s6}`} alt="" />
                                <h3>healt=""y breakfast</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Est repellat non qui
                                    delectus deserunt eius aut aspernatur
                                    cupiditate accusantium quidem!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Speciality;
