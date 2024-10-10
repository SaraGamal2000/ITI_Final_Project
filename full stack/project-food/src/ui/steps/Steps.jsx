import React from "react";

// assests
import step1 from "../../assets/images/steps/step-1.jpg";
import step2 from "../../assets/images/steps/step-2.jpg";
import step3 from "../../assets/images/steps/step-3.jpg";
import step4 from "../../assets/images/steps/step-4.jpg";

function Steps() {
    return (
        <>
            <div className="steps">
                <div className="container">
                    <div className="box">
                        <img src={`${step1}`} alt="" />
                        <h3>choose your favorite food</h3>
                    </div>

                    <div className="box">
                        <img src={`${step2}`} alt="" />
                        <h3>free and fast delivery</h3>
                    </div>

                    <div className="box">
                        <img src={`${step3}`} alt="" />
                        <h3>easy payments methods</h3>
                    </div>

                    <div className="box">
                        <img src={`${step4}`} alt="" />
                        <h3>and finally, anjoy your food</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Steps;
