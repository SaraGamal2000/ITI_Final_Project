import React from "react";

// import style
import "./NotComponent.css";

function NotComponent({ name = "NotComponent" }) {
    return (
        <>
            <div className="notcomponent">
                <div className="content">There are no {name} to display.🥲</div>
            </div>
        </>
    );
}

export default NotComponent;
