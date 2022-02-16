import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountryId } from "../../../redux/actions/countriesActions";
import styles from "./css/DetailCountry.module.css";
import Spinner from "../../Spinner/Spinner";
import home from "../../../img/home.png";

function DetailCountry({ id }) {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(getCountryId(id));
      setIsLoading(false);
    }, 1000);
  }, [dispatch, id]);

  const component = isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.detail}>
        <img className={styles.image} src={country.flag} alt={country.name} />
        <div className={styles.info}>
          <h3>Información del País</h3>
          <p>
            <span className={styles.span}>Código del País: </span>
            {country.id}
          </p>
          <p>
            <span className={styles.span}>País: </span>
            {country.name}
          </p>
          <p>
            <span className={styles.span}>Capital: </span>
            {country.capital}
          </p>
          <p>
            <span className={styles.span}>Subregión: </span>
            {country.subregion ? country.subregion : "No tiene subregion"}
          </p>
          <p>
            <span className={styles.span}>Area: </span>
            {new Intl.NumberFormat("es-MX").format(country.area)} km2
          </p>
          <p>
            <span className={styles.span}>Población:</span>{" "}
            {new Intl.NumberFormat("es-MX").format(country.population)}
          </p>
          <p>
            <span className={styles.span}>Ver ubicación:</span>
            <a href={country.map} target="_blank" rel="noreferrer">
              Ir a Google Maps
            </a>
          </p>
        </div>
      </div>
      <div className={styles.infoActivity}>
        <h4>Actividades Turísticas</h4>
        <div className={styles.boxActivity}>
          {country.activities?.map((act) => {
            return (
              <div className={styles.activity} key={act.id}>
                <p>
                  <span className={styles.span}>Actividad: </span>
                  {act.name}
                </p>
                <p>
                  <span className={styles.span}>Dificultad: </span>
                  {act.dificult}
                </p>
                <p>
                  <span className={styles.span}>Duración: </span>
                  {act.duration}
                </p>
                <p>
                  <span className={styles.span}>Temporada: </span>
                  {act.season}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Link className={styles.toHome} to="/home">
        <img src={home} alt="Home" />
        <h6>Home</h6>
      </Link>
    </div>
  );

  return <div className={styles.country}>{component}</div>;
}

export default DetailCountry;
