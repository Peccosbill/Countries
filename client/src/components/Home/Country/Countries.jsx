import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../../redux/actions/activityActions";
import { HelpGetCountries } from "../../../helpers/HelpGetCountries";
import { getCountries } from "../../../redux/actions/countriesActions";
import Country from "./Country";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../Pagination/Pagination";
import search from "../../../img/search.png";
import styles from "./css/Countries.module.css";

// - - - - - Component - - - - -
function Countries() {
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [state, setState] = useState([]);
  const [country, setCountry] = useState("");

  const [activity, setActivity] = useState("");
  const [activityByCountry, setActivityByCountry] = useState([]);

  const [continent, setContinent] = useState("");

  const [alphabet, setAlphabet] = useState("");

  const [population, setPopulation] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    HelpGetCountries(`http://localhost:3001/countries`).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        setState(res.data);
      }, 1000);
    });
  }, []);
  
  // - - - - - - -> PAGINACION <- - - - - - -
  // MOSTRAR LOS PAISES ACTUALES
  const indexOfLastCountries = currentPage * countriesPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
  const currentCountries = state.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

  // CAMBIAR DE PÁGINA
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // - - - - - - -> FILTROS <- - - - - - -
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());

    // FILTRO POR ACTIVIDAD
    if (activityByCountry !== "") {
      HelpGetCountries("http://localhost:3001/activityByCountry").then(
        (res) => {
          setActivityByCountry(res.data);
        }
      );
    }

    if (activity !== "") {
      if (activity === "DEFAULT") {
        setActivity("");
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
    }

    // FILTRO POR ORDEN ALFABÉTICO
    if (alphabet !== "") {
      if (alphabet === "DEFAULT") {
        setAlphabet("");
        return setState(countries);
      }
      if (alphabet === "A-Z") {
        HelpGetCountries("http://localhost:3001/az").then((res) => {
          setState(res.data);
        });
      }
      if (alphabet === "Z-A") {
        HelpGetCountries("http://localhost:3001/za").then((res) => {
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

      setState(countryByContinent);
      console.log(countryByContinent);
    }

    //  FILTRO POR POBLACIÓN
    if (population !== "") {
      if (population === "DEFAULT") {
        setPopulation("");
        return setState(countries);
      }
      if (population === "higher") {
        HelpGetCountries("http://localhost:3001/morePopulation").then((res) => {
          setState(res.data);
        });
      }
      if (population === "minor") {
        HelpGetCountries("http://localhost:3001/lessPopulation").then((res) => {
          setState(res.data);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, alphabet, continent, population]);

  function onSearch(country) {
    if (country !== "") {
      setIsLoading(true);
      HelpGetCountries(`http://localhost:3001/countries/?name=${country}`)
        .then((res) => {
          return setTimeout(() => {
            setIsLoading(false);
            setState(res.data);
          }, 1000);
        })
        .catch((err) => {
          HelpGetCountries("http://localhost:3001/countries").then((res) => {
            setIsLoading(false);
            setState(res.data);
          });
          alert((err = "No se encuentra el país buscado"));
        });
    }
  }

  const componente = isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className={styles.containerCountries}>
        {currentCountries.map((country) => {
          return (
            <Country
              key={country.id}
              id={country.id}
              flag={country.flag}
              name={country.name}
              capital={country.capital}
              continent={country.continent}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <form
          className={styles.searchAndFilters}
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(country);
            setCountry([]);
          }}
        >
          <div className={styles.searchCountry}>
            <input
              className={styles.searchInput}
              type="search"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Buscar Países"
            />
            <button className={styles.searchButton} type="submit">
              <img className={styles.imgSearch} src={search} alt="Search" />
            </button>
          </div>
          <div className={styles.selectors}>
            {/* <<<<<<<   ACTIVIDAD  >>>>>>*/}
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
            {/* <<<<<<<<<    ALFABETO    >>>>>>> */}
            <select
              className={styles.select}
              name="alphabet"
              onChange={(e) => setAlphabet(e.target.value)}
            >
              <option value="DEFAULT">Orden Alfabético</option>
              <option value="A-Z">A - Z</option>
              <option value="Z-A">Z - A</option>
            </select>
            {/* <<<<<<<    CONTINENTE    >>>>>> */}
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
            {/* <<<<<<<<   POBLACIÓN   >>>>>>> */}
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
        </form>
      </div>
      {componente}
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={state.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Countries;
