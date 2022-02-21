import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoading(true);
    HelpGetCountries(`/countries`).then((res) => {
      setIsLoading(false);
      setState(res.data);
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
  function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  }

  // -< -< -< -<  BUSCADOR >- >- >- >-
  function onSearch(country) {
    if (country !== "") {
      setIsLoading(true);
      HelpGetCountries(`/countries/?name=${country}`)
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(1);
          setState(res.data);
        })
        .catch(async () => {
          MySwal.fire({
            title: `No se encuentra el País buscado`,
            icon: "error",
            confirmButtonText: "OK",
            backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
            `,
          });
          await HelpGetCountries("http://localhost:3001/countries").then(
            (res) => {
              setIsLoading(false);
              setCurrentPage(1);
              setState(res.data);
            }
          );
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
          setCountry("");
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
      <Filters setState={setState} setCurrentPage={setCurrentPage} />
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
      {/* -< -< -< -< PAGINADO >- >- >- >- */}
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={state.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Countries;
