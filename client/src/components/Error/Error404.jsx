import React from "react";
import error404 from "../../img/error-404.png";
import { Link } from "react-router-dom";
import styles from "./Error404.module.css"

export default function Error404() {
  return (
    <div className={styles.error404}>
      <img src={error404} alt="error" />
      <Link className={styles.returnHome} to={"/home"}>Volver al inicio</Link>
    </div>
  );
}
