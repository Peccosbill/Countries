import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addActivityInCountries,
  getAllActivities,
} from "../../redux/actions/activityActions";
import styles from "./AddActivity.module.css";
import home from "../../img/home.png";

const dificults = [1, 2, 3, 4, 5];

//  - - - - - COMPONENTE - - - - -
function AddActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  // Estado del formulario
  const [addActivity, setAddActivity] = useState({
    name: "",
    dificult: "",
    duration: "",
    season: "",
    country: "",
  });
  const [searchCountry, setSearchCountry] = useState({
    paisEncontrado: [],
    paisSeleccionado: [],
  });

  // MODIFICAR EL ESTADO DE "searchCountry.paisEncontrado" SEGÚN LO QUE LE PASE POR EL "addActivity.country"
  const fetchCountries = async () => {
    await axios.get(`/countries?name=${addActivity.country}`).then((res) =>
      setSearchCountry({
        ...searchCountry,
        paisEncontrado: res.data,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllActivities());
    if (addActivity.country !== "") {
      fetchCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addActivity.country, dispatch]);

  // ESCUCHAR CAMBIOS EN EL FORMULARIO
  function handleChange(e) {
    setAddActivity(() => {
      return {
        ...addActivity,
        [e.target.name]: e.target.value,
      };
    });
  }

  // POST DE LA INFO DEL FORMULARIO
  function handleSubmit(e) {
    e.preventDefault();

    // Validar que se hayan completado todos los campos
    if (
      !addActivity.name ||
      !addActivity.duration ||
      !addActivity.dificult ||
      !addActivity.season
    ) {
      return alert("Todos los campos deben estar completos");
    }

    //Validar que la actividad no exista ya
    const existentActivity = activities.find(
      (a) => a.name === addActivity.name
    );
    if (existentActivity) {
      return alert("Esa actividad ya existe");
    }

    //Validar que haya al menos un país agregado
    if (searchCountry.paisSeleccionado.length === 0) {
      return alert("Debes seleccionar al menos un país");
    } else {
      const actividad = {
        name: addActivity.name,
        dificult: addActivity.dificult,
        duration: addActivity.duration,
        season: addActivity.season,
        country: searchCountry.paisSeleccionado,
      };
      //EJECUTO LA (ACTION POST)
      dispatch(addActivityInCountries(actividad));
      alert("Actividad creada");
    }

    //RESETEO EL FORMULARIO
    setAddActivity({
      name: "",
      dificult: "",
      duration: "",
      season: "",
      country: "",
    });
    setSearchCountry({
      paisSeleccionado: [],
    });
  }

  // AGREGAR PAÍS A LA ACTIVIDAD
  const addCountry = () => {
    // VERIFICAR QUE EL PAÍS NO ESTE DENTRO DEL ARREGLO DE (paisSeleccionado)
    if (addActivity.country === searchCountry.paisEncontrado[0]?.name) {
      if (searchCountry.paisSeleccionado.indexOf(addActivity.country) === -1) {
        searchCountry.paisSeleccionado.push(addActivity.country);
        setAddActivity({
          ...addActivity,
          country: "",
        });
      } else {
        alert("País ya agregado");
      }
    }
  };

  // BORRAR PAÍS DE LA ACTIVIDAD
  const deleteCountry = (country) => {
    let filterCountry = searchCountry.paisSeleccionado.filter(
      (c) => c !== country
    );
    setSearchCountry({
      ...searchCountry,
      paisSeleccionado: filterCountry,
    });
  };

  return (
    <div className={styles.contenedor}>
      <h3>Introduce los datos para la nueva actividad</h3>
      <div>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          {/* - - - - NOMBRE DE ACTIVIDAD - - - - */}
          <div className={styles.box}>
            <span>Nombre</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Introduce actividad"
              name="name"
              value={`${addActivity.name
                .charAt(0)
                .toUpperCase()}${addActivity.name.slice(1)}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* - - - - - DIFICULTAD - - - - - */}
          <div className={styles.box}>
            <span>Dificultad</span>
            <select
              className={styles.select}
              name="dificult"
              value={addActivity.dificult}
              onChange={(e) => handleChange(e)}
            >
              <option value="DEFAULT">Seleccionar Dificultad </option>
              {dificults.map((d) => (
                <option name="dificult" value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* - - - - - DURACIÓN - - - - - */}
          <div className={styles.box}>
            <span>Duración(Horas)</span>
            <select
              className={styles.select}
              placeholder="Duración de la actividad"
              name="duration"
              value={addActivity.duration}
              onChange={(e) => handleChange(e)}
            >
              <option value="DEFAULT">Duración de la actividad</option>
              <option value="1 Hora">1 Hora</option>
              <option value="2 Horas">2 Horas</option>
              <option value="3 Horas">3 Horas</option>
              <option value="Más de 5 Horas">Más de 5 Horas</option>
            </select>
          </div>

          {/* - - - - - TEMPORADA - - - - - */}
          <div className={styles.box}>
            <span>Temporada</span>
            <select
              className={styles.select}
              placeholder="Temporada"
              name="season"
              value={addActivity.season}
              onChange={(e) => handleChange(e)}
            >
              <option value="DEFAULT">Seleccionar Temporada</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
            </select>
          </div>

          {/* - - - - AGREGAR ACTIVIDAD A PAÍS - - - - */}
          <div className={styles.box}>
            <span>Agregar actividad a País</span>
            <datalist id="country">
              {searchCountry.paisEncontrado?.map((country) => {
                return <option key={country.id} value={country.name} />;
              })}
            </datalist>
            <div className={styles.boxCountry}>
              <input
                className={styles.inputCountry}
                list="country"
                name="country"
                type="search"
                value={addActivity.country}
                onChange={(e) => handleChange(e)}
                placeholder="Agregar país"
              ></input>
              <input
                className={styles.add}
                type="button"
                onClick={addCountry}
                value="+"
              />
            </div>
          </div>
          <div className={styles.containerCountries}>
            {searchCountry.paisSeleccionado?.map((c) => {
              return (
                <div className={styles.countrySelect} key={c}>
                  <p>{c}</p>
                  <input
                    type="button"
                    onClick={() => deleteCountry(c)}
                    value="X"
                  />
                </div>
              );
            })}
          </div>

          {/*- - - - - - BUTTON SUBMIT - - - - - */}
          <button type="submit">Agregar Actividad</button>
        </form>
      </div>
      <Link className={styles.toHome} to="/home">
        <img src={home} alt="Home" />
        <h6>Home</h6>
      </Link>
    </div>
  );
}

export default AddActivity;
