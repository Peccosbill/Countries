import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 20rem;
  height: 15rem;
  background: #0f8b8d;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: 1rem;
  &:hover {
    tranform: scale(1.1);
  }
`;

const Flag = styled.img`
  width: 100%;
  height: 12rem;
  border-radius: 1rem 1rem 0 0;
`;

const Info = styled.div`
  cursor: pointer;
  text-decoration: none;
`;

function Country({ id, flag, name, continent }) {
  return (
    <Card key={id}>
      <NavLink to={`/country/${id}`}>
        <Flag src={flag} alt={name} />
      </NavLink>
      <Info>
        <p>{name}</p>
        <p>{continent}</p>
      </Info>
    </Card>
  );
}

export default Country;
