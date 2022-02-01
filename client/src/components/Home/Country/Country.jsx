import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const Card = styled.div`
background: #0F8B8D;
display: flex;
justify-content: center;
flex-direction: column;
text-align: center;
border-radius: 1rem;
`;

const Flag = styled.img`
    width: 100%;
    height: 12rem;
    border-radius: 1rem 1rem 0 0;
`;

function Country({ id, flag, name, continent }) {
  return (
    <Card key={id}>
      <NavLink to={`/country/${id}`}>
        <Flag src={flag} alt={name} />
      </NavLink>
      <div>
        <p>{name}</p>
        <p>{continent}</p>
      </div>
    </Card>
  );
}

export default Country;
