import React, { useEffect, useState } from "react";
import axios from "axios";
// import { connect } from "react-redux";
// import { getCountries } from "../../../redux/actions/countriesActions";
import Country from "./Country";
import styled from "styled-components";
import Spinner from "../../Spinner/Spinner";

// - - - - - Styled components - - - - -
const CountriesCounteiner = styled.div`
  background: #143642;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  gap: 4rem;
  justify-content: center;
`;

const SearchCountry = styled.div`
  ${"" /* border: 1px solid black; */}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

// - - - - - Component - - - - -
function Countries() {
  const [state, setState] = useState([]);
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:3001/countries`);
      setTimeout(() => {
        setIsLoading(false);
        setState(res.data);
      }, 2000);
    };
    fetchCountries();
  }, []);

  function onSearch(country) {
    const fetchCountries = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:3001/countries/?name=${country}`
      );
      setTimeout(() => {
        setIsLoading(false);
        setState(res.data);
      }, 100);
    };
    fetchCountries();
  }

  const componente = isLoading ? (
    <Spinner />
  ) : (
    <CountriesCounteiner>
      {state.map((country) => {
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
    </CountriesCounteiner>
  );

  return (
    <div>
      <SearchCountry>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(country);
            setCountry([]);
          }}
        >
          <input
            type="search"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Buscar Países"
          />
          <button type="submit">Buscar</button>
        </form>
      </SearchCountry>
      {componente}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     countries: state.countries,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCountries: (countries) => {
//       dispatch(getCountries(countries));
//     },
//   };
// };

export default Countries;

// export default connect(mapStateToProps, mapDispatchToProps)(Countries);
