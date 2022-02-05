import React from "react";
import { NavLink } from "react-router-dom";
import marker from "../../img/marker.png";
import plus from "../../img/plus.png";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.logoAndTitle}>
        <img className={styles.logo} src={marker} alt="Logo" />
        <h1>Countries</h1>
      </div>
      <NavLink className={styles.link} to="/addactivity">
        AÑADIR ACTIVIDAD
        <img className={styles.plus} src={plus} alt="Add" />
      </NavLink>
    </div>
  );
}

export default Nav;
