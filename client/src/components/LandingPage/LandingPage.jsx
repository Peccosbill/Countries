import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";
import animation from "../../img/animation.gif";

function LandingPage() {
  return (
    <div className={styles.LandingPage}>
      <NavLink className={styles.link} to="/home">
        <img src={animation} alt="animation" width={200} />
        <h2>Igresar</h2>
      </NavLink>
    </div>
  );
}

export default LandingPage;
