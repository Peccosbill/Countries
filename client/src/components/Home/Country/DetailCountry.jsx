import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountryId,
  resetCountry,
} from "../../../redux/actions/countriesActions";
import styles from "./css/DetailCountry.module.css";
import Spinner from "../../Spinner/Spinner";
import home from "../../../img/home.png";

function DetailCountry({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(getCountryId(id));
      setIsLoading(false);
      return () => {
        dispatch(resetCountry());
      };
    }, 1000);
  }, [dispatch, id]);

  const component = isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.detail}>
        <img className={styles.image} src={country.flag} alt={country.name} />
        <div className={styles.info}>
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
            {country.area} km2
          </p>
          <p>
            <span className={styles.span}>Población:</span> {country.population}
          </p>
        </div>
      </div>
      <div className={styles.info}>
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
