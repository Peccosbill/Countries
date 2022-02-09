import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';
import ingresar from "../../img/ingresar.png";

function LandingPage() {
  return (
  <div className={styles.LandingPage}>
    <NavLink className={styles.link} to='/home'>
    <img src={ingresar} alt="ingresar" width={300} />
    {/* <h2>Igresar</h2> */}
    </NavLink>
  </div>
  );
}

export default LandingPage;
