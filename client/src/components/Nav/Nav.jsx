import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import logoFlags from "../../img/logoFlags.png";
import plus from "../../img/plus.png";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.nav}>
      <NavLink className={styles.logoAndTitle} to="/home">
        <img className={styles.logoFlag} src={logoFlags} alt="Logo" />
        <img className={styles.logo} src={logo} alt="Logo" />
      </NavLink>

      <NavLink className={styles.link} to="/addactivity">
        AÑADIR ACTIVIDAD
        <img className={styles.plus} src={plus} alt="Add" />
      </NavLink>
    </div>
  );
}

export default Nav;
