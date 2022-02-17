import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelpGetCountries } from "../../../helpers/HelpGetCountries";
import { getAllActivities } from "../../../redux/actions/activityActions";
import { getCountries } from "../../../redux/actions/countriesActions";
import styles from "./Filters.module.css";

function Filters({ setState, setCurrentPage }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);

  const [activity, setActivity] = useState("");
  const [activityByCountry, setActivityByCountry] = useState([]);

  const [continent, setContinent] = useState("");

  const [alphabet, setAlphabet] = useState("");

  const [population, setPopulation] = useState("");

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());

    // FILTRO POR ACTIVIDAD
    if (activityByCountry !== "") {
      HelpGetCountries("/activityByCountry").then((res) => {
        setActivityByCountry(res.data);
      });
    }

    if (activity !== "") {
      if (activity === "DEFAULT") {
        setActivity("");
        return setState(countries);
      }
      const activityFoundInCountry = activityByCountry.filter((a) => {
        return a.activityId === Number(activity);
      });
      // console.log(activityFoundInCountry);
      let countriesToShow = [];

      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < activityFoundInCountry.length; j++) {
          if (countries[i].id === activityFoundInCountry[j].countryId) {
            countriesToShow.push(countries[i]);
          }
        }
      }
      setCurrentPage(1);
      setState(countriesToShow);
    }

    // FILTRO POR ORDEN ALFABÉTICO
    if (alphabet !== "") {
      if (alphabet === "DEFAULT") {
        setAlphabet("");
        return setState(countries);
      }
      if (alphabet === "A-Z") {
        HelpGetCountries("/az").then((res) => {
          setCurrentPage(1);
          setState(res.data);
        });
      }
      if (alphabet === "Z-A") {
        HelpGetCountries("/za").then((res) => {
          setCurrentPage(1);
          setState(res.data);
        });
      }
    }
    // FILTRO POR CONTINENTE
    if (continent !== "") {
      if (continent === "DEFAULT") {
        setContinent("");
        return setState(countries);
      }
      const countryByContinent = countries.filter(
        (c) => c.continent === continent
      );
      setCurrentPage(1);
      setState(countryByContinent);
      // console.log(countryByContinent);
    }

    //  FILTRO POR POBLACIÓN
    if (population !== "") {
      if (population === "DEFAULT") {
        setPopulation("");
        return setState(countries);
      }
      if (population === "higher") {
        HelpGetCountries("/morePopulation").then((res) => {
          setCurrentPage(1);
          setState(res.data);
        });
      }
      if (population === "minor") {
        HelpGetCountries("/lessPopulation").then((res) => {
          setCurrentPage(1);
          setState(res.data);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, alphabet, continent, population]);

  return (
    <div className={styles.selectors}>
      {/* -< -< -< -<  ACTIVIDAD  >- >- >- >- */}
      <select
        className={styles.select}
        name="activity"
        onChange={(e) => setActivity(e.target.value)}
      >
        <option value="DEFAULT">Todas las Actividades</option>
        {activities?.map((a) => {
          return (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          );
        })}
      </select>
      {/* -< -< -< -<  ALFABETO  >- >- >- >- */}
      <select
        className={styles.select}
        name="alphabet"
        onChange={(e) => setAlphabet(e.target.value)}
      >
        <option value="DEFAULT">Orden Alfabético</option>
        <option value="A-Z">A - Z</option>
        <option value="Z-A">Z - A</option>
      </select>
      {/* -< -< -< -<  CONTINENTE  >- >- >- >- */}
      <select
        className={styles.select}
        name="continent"
        onChange={(e) => setContinent(e.target.value)}
      >
        <option value="DEFAULT">Continente</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Antarctic">Antartida</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
      </select>
      {/* -< -< -< -<  POBLACIÓN  >- >- >- >- */}
      <select
        className={styles.select}
        name="population"
        onChange={(e) => setPopulation(e.target.value)}
      >
        <option value="DEFAULT">Orden por población</option>
        <option value="higher">Mayor Población</option>
        <option value="minor">Menor Población</option>
      </select>
    </div>
  );
}

export default Filters;
