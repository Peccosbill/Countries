import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
  <div className={styles.LandingPage}>
    <NavLink className={styles.link} to='/home'>Ingresar</NavLink>
  </div>
  );
}

export default LandingPage;
