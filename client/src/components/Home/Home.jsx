import React from "react";
import Nav from "../Nav/Nav";
import Country from "./Country/Countries";
import styled from "styled-components";
// import styles from "./Home.module.css";

const HomePage = styled.div`
background: var(--prussian-blue);
width: 100%;
height: 100%;
min-height: 100vh;
`;

function Home() {
  
  return (
    <HomePage>
      <Nav />
      <Country />
    </HomePage>
  );
}

export default Home;
