import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Country from "./Country";
import styled from "styled-components";
import Spinner from "../../Spinner/Spinner";
import Filtros from "../Filtros/Filtros";
import { getAllActivities } from "../../../redux/actions/activityActions";
import { HelpGetCountries } from "../../../helpers/HelpGetCountries";
import {
  getCountries,
  getCountryByContinent,
  // getCountryByContinent,
} from "../../../redux/actions/countriesActions";

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

// - - - - - Component - - - - -
function Countries() {
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);
  // const countriesByContinent = useSelector(
  //   (state) => state.countriesByContinent
  // );
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState("");
  const [activityByCountry, setActivityByCountry] = useState([]);
  const [continent, setContinent] = useState("");
  // const [countryByContinent, setCountryByContinent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    HelpGetCountries(`http://localhost:3001/countries`).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        setState(res.data);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());

    // CONTINENTE
    // if (countryByContinent !== "") {
    //   // dispatch(getCountryByContinent(continent));
    //   HelpGetCountries(`http://localhost:3001/continent/${continent}`).then(
    //     (res) => {
    //       setCountryByContinent(res.data);
    //     }
    //   );
    // }

    // if (continent !== "") {
    //   const countryByContinent = countries.filter(
    //     (c) => c.continent === continent
    //   );
    //   setState(countryByContinent);
    //   console.log(countryByContinent);
    // }

    if (activityByCountry !== "") {
      HelpGetCountries("http://localhost:3001/activityByCountry").then(
        (res) => {
          setActivityByCountry(res.data);
        }
      );
    }
    // ACTIVIDAD
    if (activity !== "") {
      if (activity === "DEFAULT") {
        return setState(countries);
      }
      const activityFound = activityByCountry.filter((a) => {
        return a.activityId.toString() === activity;
      });

      let countriesToShow = [];

      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < activityFound.length; j++) {
          if (countries[i].id === activityFound[j].countryId) {
            countriesToShow.push(countries[i]);
          }
        }
      }

      setState(countriesToShow);
      console.log("countriesToShow", countriesToShow);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  function onSearch(country) {
    if (country !== "") {
      setIsLoading(true);
      HelpGetCountries(`http://localhost:3001/countries/?name=${country}`).then(
        (res) => {
          setTimeout(() => {
            setIsLoading(false);
            setState(res.data);
          }, 1000);
        }
      );
    }
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
        {/* ACTIVIDAD */}
        <select name="activity" onChange={(e) => setActivity(e.target.value)}>
          <option value="DEFAULT">Actividad</option>
          {activities?.map((a) => {
            return (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            );
          })}
        </select>
        {/* CONTINENTE */}
        <select name="continent" onChange={(e) => setContinent(e.target.value)}>
          <option value="DEFAULT">Continente</option>
          <option value="Afica">Africa</option>
          <option value="Americas">America</option>
          <option value="Antarctic">Antartica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
        <Filtros />
      </SearchCountry>
      {componente}
    </div>
  );
}

export default Countries;
