import React from 'react'
import "./Loader.css";
import loading from "../images/loading.gif";

function Loader() {
    return (
        <div className="main">
            <div className="button_container">
                <div>
                    <h1>Loading...</h1>
                </div>
                <div>
                    <img src={loading} alt="loading" />
                </div>
            </div>
        </div>
    )
}

export default Loader