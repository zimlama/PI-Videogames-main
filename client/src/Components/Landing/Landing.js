import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

// - **Pagina inicial**: deben armar una landing page con
//     - [x]  Alguna imagen de fondo representativa al proyecto
//     - [x]  Botón para ingresar al home (`Ruta principal`)

function Landing() {
  return (
    <div className="main">
        <div className="title">
            <div>
                <h1>VIDEOGAMES</h1>
            </div>
            <div className="button_container">
                <div className="buttonSelect">
                    <h6>SELECT</h6>
                </div>
                <Link to="/home">
                <div className="buttonStart">
                    <h6>START</h6>
                </div>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Landing;