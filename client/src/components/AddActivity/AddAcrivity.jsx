import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { getCountryByName } from "../../redux/actions/countriesActions";
import { addActivityInCountries } from "../../redux/actions/activityActions";

// - - - - - STYLED COMPONENTS - - - - -
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

const Box = styled.div`
  width: 27rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Input = styled.input`
  width: 15rem;
  height: 2rem;
  margin: 0.5rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  width: 15rem;
  height: 2rem;
  margin: 0.5rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

//  - - - - - COMPONENTE - - - - -
function AddAcrivity() {
  const dispatch = useDispatch();
  const countryActivity = useSelector(state => state.countryActivity);
  // Estado del formulario
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

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch(addActivityInCountries(addActivity));
  }

  return (
    <Formulario onSubmit={handleSubmit}>
      <h3>Introduce los datos para la nueva actividad</h3>
      <div>
        <Inputs>
          {/* - - - - NOMBRE DE ACTIVIDAD - - - - */}
          <Box>
            <span>Nombre</span>
            <Input
              type="text"
              placeholder="Nombre de actividad"
              name="name"
              value={`${addActivity.name
                .charAt(0)
                .toUpperCase()}${addActivity.name.slice(1)}`}
              onChange={handleChange}
            />
          </Box>

          {/* - - - - - DIFICULTAD - - - - - */}
          <Box>
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
          </Box>

          {/* - - - - - DURACIÓN - - - - - */}
          <Box>
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
          </Box>

          {/* - - - - - TEMPORADA - - - - - */}
          <Box>
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
          </Box>

          {/* - - - - AGREGAR ACTIVIDAD A PAÍS - - - - */}
          <Box>
            <span>Agregar actividad a País</span>
            <datalist id="country">
              {nameCountry.map((country) => {
                return (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </datalist>
            <Input
              list="country"
              name="country"
              type="text"
              value={addActivity.country}
              onChange={handleChange}
            ></Input>
          </Box>

          {/*- - - - - - BUTTON SUBMIT - - - - - */}
          <button type="submit">Agregar</button>
        </Inputs>
      </div>
    </Formulario>
  );
}

export default AddAcrivity;
