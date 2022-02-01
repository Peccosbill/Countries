import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../../redux/actions/countriesActions";
import Country from "./Country";
import styled from "styled-components";

const Contenedor = styled.div`
background: #143642;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  gap: 4rem;
  justify-content: center;
`;

function Countries({ countries, getCountries }) {
  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <Contenedor>
      {countries.map((country) => {
        return (
          <Country
            key={country.id}
            id={country.id}
            flag={country.flag}
            name={country.name}
            continent={country.continent}
          />
        );
      })}
    </Contenedor>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: (countries) => {
      dispatch(getCountries(countries));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
