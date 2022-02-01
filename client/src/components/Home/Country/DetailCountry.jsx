import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryId } from "../../../redux/actions/countriesActions";

function DetailCountry({ id }) {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountryId(id));
  }, [dispatch, id]);

  return (
    <div>
      <img src={country.flag} alt={country.name} />
      <p>Código del País: {country.id}</p>
      <p>País: {country.name}</p>
      <p>Capital: {country.capital}</p>
      <p>Subregión: {country.subregion}</p>
      <p>Area: {country.area} km2</p>
      <p>Población: {country.population}</p>
      <h4>Actividades Turísticas</h4>
      {country.activities?.map((act) => {
        return (
          <div key={act.id}>
            <p>Actividad: {act.name}</p>
            <p>Dificultad: {act.dificult}</p>
            <p>Duración: {act.duration}</p>
            <p>Temporada: {act.season}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DetailCountry;
