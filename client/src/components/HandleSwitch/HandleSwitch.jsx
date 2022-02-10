import React from "react";
import styles from "./HandleSwitch.module.css";
import sun from "../../img/sun.png";
import moon from "../../img/moon.png";

function HandleSwitch({ checked, onChange, id }) {
  if (checked) {
    document.body.classList.remove("is-dark-mode");
    document.body.classList.add("is-light-mode");
  } else {
    document.body.classList.remove("is-light-mode");
    document.body.classList.add("is-dark-mode");
  }
  return (
    <div className={styles.darkMode}>
      <input
        type="checkbox"
        className={styles.checkbox}
        name="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className={styles.switch} htmlFor={id}>
        Switch
      </label>
      <div className={styles.sunMoon}>
        {checked && (
          <img src={sun} height={30} className={styles.sun} alt="sun" />
        )}
        {!checked && (
          <img src={moon} height={30} className={styles.moon} alt="moon" />
        )}
      </div>
    </div>
  );
}

export default HandleSwitch;
