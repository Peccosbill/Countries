import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { getCountryByName } from "../../redux/actions/countriesActions";

const Formulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Inputs = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  height: 2rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

function AddAcrivity() {
  // const dispatch = useDispatch();
  // const activity = useSelector((state) => state.activity);
  const [addActivity, setAddActivity] = useState({
    name: "",
    dificult: "",
    duration: "",
    season: "",
    country: "",
  });
  const [nameCountry, setNameCountry] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await axios.get(
        `http://localhost:3001/countries?name=${addActivity.country}`
      );
      setNameCountry(result.data);
    };
    fetchCountries();
  }, [addActivity.country]);

  function handleChange(e) {
    setAddActivity({
      ...addActivity,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Formulario>
      <h3>Introduce los datos para la nueva actividad</h3>
      <div>
        <Inputs>
          {/* NOMBRE DE ACTIVIDAD */}
          <span>Nombre</span>
          <Input
            type="text"
            placeholder="Nombre de actividad"
            name="name"
            value={addActivity.name}
            onChange={handleChange}
          />

          {/* DIFICULTAD */}
          <span>Dificultad</span>
          <Select
            name="dificult"
            value={addActivity.dificult}
            onChange={handleChange}
          >
            <option value="DEFAULT">Seleccionar Dificultad </option>
            <option name="dificult" value="1">
              1
            </option>
            <option name="dificult" value="2">
              2
            </option>
            <option name="dificult" value="3">
              3
            </option>
            <option name="dificult" value="4">
              4
            </option>
            <option name="dificult" value="5">
              5
            </option>
          </Select>

          {/* DURACIÓN */}
          <span>Duración(Horas)</span>
          <Input
            type="number"
            min="1"
            max="24"
            step="1"
            placeholder="Horas"
            name="duration"
            value={addActivity.duration}
            onChange={handleChange}
          />

          {/* TEMPORADA */}
          <span>Temporada</span>
          <Select
            placeholder="Temporada"
            name="season"
            value={addActivity.season}
            onChange={handleChange}
          >
            <option value="DEFAULT">Seleccionar Temporada</option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
          </Select>

          {/* AGREGAR ACTIVIDAD A PAÍS */}
          <span>Agregar actividad a país</span>
          <input
            type="search"
            name="country"
            value={addActivity.country}
            onChange={handleChange}
          />
          {addActivity.country !== ""
            ? nameCountry.map((country) => {
                return <button key={country.id}>{country.name}</button>;
              })
            : null}

          {/* SUBMIT */}
          <button type="submit">Agregar</button>
        </Inputs>
      </div>
    </Formulario>
  );
}

export default AddAcrivity;
