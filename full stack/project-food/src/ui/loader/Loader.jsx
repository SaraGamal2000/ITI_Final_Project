// import
import React from "react";

function Loader() {
    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    // background: { darkMode ? "text-bg-dark" : ""},
                    zIndex: "10000",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                className={``}
            >
                <div className="">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <h4>Loading ...</h4>
                </div>
            </div>
        </>
    );
}
export default Loader;
