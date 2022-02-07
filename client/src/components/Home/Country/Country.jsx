import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./css/Country.module.css";

function Country({ id, flag, name, capital, continent }) {
  return (
    <div className={styles.card} key={id}>
      <NavLink className={styles.link}to={`/country/${id}`}>
        <img className={styles.flag} src={flag} alt={name} />
        <div className={styles.info}>
          <h3>
            <b>{name}</b>
          </h3>
          <p>
            <b>Capital: </b>
            {capital}
          </p>
          <p>
            <b>Continente: </b>
            {continent}
          </p>
        </div>
      </NavLink>
    </div>
  );
}

export default Country;
