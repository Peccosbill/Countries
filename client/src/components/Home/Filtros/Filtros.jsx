import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { HelpGetCountries } from "../../../helpers/HelpGetCountries";
// import { getAllActivities } from "../../../redux/actions/activityActions";

function Filtros() {
  // const activities = useSelector((state) => state.activities);
  // const dispatch = useDispatch();

  // const [countries, setCountries] = useState([]);
  
  // const [continent, setContinent] = useState("");
  
  // const [alphabet, setAlphabet] = useState("");

  // const [population, setPopulation] = useState("");

  // const [filterCountries, setFilterCountries] = useState([]);

  // const [activity, setActivity] = useState("");

  // const [activityByCountry, setActivityByCountry] = useState([]);

  // useEffect(() => {
  //   HelpGetCountries("http://localhost:3001/countries").then((res) => {
  //     setCountries(res.data);
  //   });

  //   dispatch(getAllActivities());
    
  //   if (continent !== "") {
  //     HelpGetCountries(`http://localhost:3001/continent/${continent}`).then(
  //       (res) => {
  //         setFilterCountries(res.data);
  //       }
  //     );
  //   }
    
  //   if (activityByCountry !== "") {
  //     HelpGetCountries("http://localhost:3001/activityByCountry").then(
  //       (res) => {
  //         setActivityByCountry(res.data);
  //       }
  //       );
  //     }
      
  //   if (activity !== "") {
  //     const activityFound = activityByCountry.filter((a) => {
  //       return a.activityId.toString() === activity;
  //     });
  //     // console.log("activityByCountry", activityByCountry);
  //     // console.log("activityFound", activityFound);
  //     let countriesToShow = [];
      
  //     for (let i = 0; i < countries.length; i++) {
  //       for (let j = 0; j < activityFound.length; j++) {
  //         if (countries[i].id === activityFound[j].countryId) {
  //           countriesToShow.push(countries[i]);
  //         }
  //       }
  //     }
  //     console.log("state", countries);
  //     setCountries(countriesToShow);
  //     console.log("countriesToShow",countriesToShow);
  //   }
  //   setActivity("");
  // }, [continent, activity]);
  // console.log("actividades", activities);
  return (
    <div>
      {/* CONTINENTE */}
      {/* <select name="continent" onChange={(e) => setContinent(e.target.value)}>
        <option value="DEFAULT">Continente</option>
        <option value="Afica">Africa</option>
        <option value="Americas">America</option>
        <option value="Antarctic">Antartica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
      </select>
      {/* ALFABETO */}
      {/* <select name="alphabet" onChange={(e) => setAlphabet(e.target.value)}>
        <option value="DEFAULT">Orden Alfabético</option>
        <option value="A-Z">A - Z</option>
        <option value="Z-A">Z - A</option>
      </select> */}
      {/* POBLACIÓN */}
      {/* <select name="population" onChange={(e) => setPopulation(e.target.value)}>
        <option value="DEFAULT">Orden por población</option>
        <option value="higher">Mayor Población</option>
        <option value="minor">Menor Población</option>
      </select>  */}
      {/* ACTIVIDAD */}
      {/* <select name="activity" onChange={(e) => setActivity(e.target.value)}>
        <option value="DEFAULT">Actividad</option>
        {activities.map((a) => {
          return (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          );
        })}
      </select> */}
    </div>
  );
}

export default Filtros;

// Botones/Opciones para filtrar por (continente) y por tipo de (actividad) turística
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden (alfabético) y por cantidad de (población)
// Americas
// Europe
// Asia
// Afica
// Oceania
// Antarctic
