import React from "react";
import Country from "./Country/Countries";
import styled from "styled-components";

const HomePage = styled.div`
  background: var(--prussian-blue);
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

function Home() {
  return (
    <HomePage>
      <Country />
    </HomePage>
  );
}

export default Home;
