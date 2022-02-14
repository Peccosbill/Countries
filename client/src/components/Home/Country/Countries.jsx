import React, { useEffect, useState } from "react";
import { HelpGetCountries } from "../../../helpers/HelpGetCountries";
import Country from "./Country";
import Spinner from "../../Spinner/Spinner";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import search from "../../../img/search.png";
import styles from "./css/Countries.module.css";

function Countries() {
  const [state, setState] = useState([]);
  const [country, setCountry] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    HelpGetCountries(`/countries`).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        setState(res.data);
      }, 1000);
    });
  }, []);

  // -< -< -< -< PAGINACION >- >- >- >-
  // MOSTRAR LOS PAISES ACTUALES
  const indexOfLastCountries = currentPage * countriesPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
  const currentCountries = state.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );
  // CAMBIAR DE PÁGINA
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // -< -< -< -<  BUSCADOR >- >- >- >-
  function onSearch(country) {
    if (country !== "") {
      setIsLoading(true);
      HelpGetCountries(`/countries/?name=${country}`)
        .then((res) => {
          return setTimeout(() => {
            setIsLoading(false);
            setState(res.data);
          }, 1000);
        })
        .catch((err) => {
          HelpGetCountries("/countries").then((res) => {
            setIsLoading(false);
            setState(res.data);
          });
          alert((err = "No se encuentra el país buscado"));
        });
    }
  }

  return (
    <div>
      {/* -< -< -< -< BUSCADOR DE PAÍSES >- >- >- >- */}
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
      </form>
      {/* -< -< -< -< FILTROS >- >- >- >- */}
      <Filters setState={setState} />
      {/* -< -< -< -< PAÍSES >- >- >- >- */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.containerCountries}>
          {currentCountries?.map((country) => {
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
      )}
      {/* -< -< -< -< PAÍSES >- >- >- >- */}
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={state.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Countries;
