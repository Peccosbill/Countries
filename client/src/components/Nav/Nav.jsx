import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HandleSwitch from "../HandleSwitch/HandleSwitch";
import logo from "../../img/logo.png";
import logoFlags from "../../img/logoFlags.gif";
import plus from "../../img/plus.png";
import styles from "./Nav.module.css";

function Nav() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.nav}>
      <NavLink className={styles.logoAndTitle} to="/home">
        <img className={styles.logoFlag} src={logoFlags} alt="Logo" />
        <img className={styles.logo} src={logo} alt="Logo" />
      </NavLink>
      <div className={styles.activityAndSwitch}>
        <NavLink className={styles.link} to="/addactivity">
          AÑADIR ACTIVIDAD
          <img className={styles.plus} src={plus} alt="Add" />
        </NavLink>
        <HandleSwitch id="checkbox" checked={checked} onChange={setChecked} />
      </div>
    </div>
  );
}

export default Nav;
