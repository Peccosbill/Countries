import React from "react";
import { NavLink } from "react-router-dom";
// import SearchBar from "./SearchBar";
import styled from "styled-components";
import styles from "./Nav.module.css";

const Navigator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Nav() {
  return (
    <Navigator>
      <h1>Countries</h1>
      {/* <SearchBar /> */}
      <NavLink className={styles.link} to="/addactivity">Agregar actividad</NavLink>
    </Navigator>
  );
}

export default Nav;
