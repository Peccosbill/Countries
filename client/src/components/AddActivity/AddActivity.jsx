import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
function AddActivity() {
  const dispatch = useDispatch();

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
    paisSelecionado: [],
  });

  // MODIFICAR EL ESTADO DE "searchCountry.paisEncontrado" SEGÚN LO QUE LE PASE POR EL "addActivity.country"
  const fetchCountries = async () => {
    await axios
      .get(`http://localhost:3001/countries?name=${addActivity.country}`)
      .then((res) =>
        setSearchCountry({
          ...searchCountry,
          paisEncontrado: res.data,
        })
      );
  };

  useEffect(() => {
    if (addActivity.country !== "") {
      fetchCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addActivity.country]);

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
  async function handleSubmit(e) {
    e.preventDefault();

    // Validación
    if (
      !addActivity.name ||
      !addActivity.duration ||
      !addActivity.dificult ||
      !addActivity.season
    ) {
      return alert("Todos los campos deben estar completos");
    }
    if (searchCountry.paisSelecionado.length === 0) {
      return alert("Debes seleccionar al menos un país");
    } else {
      const actividad = {
        name: addActivity.name,
        dificult: addActivity.dificult,
        duration: addActivity.duration,
        season: addActivity.season,
        country: searchCountry.paisSelecionado,
      };
      dispatch(addActivityInCountries(actividad));
      alert("Actividad creada");
    }
    setAddActivity({
      name: "",
      dificult: "",
      duration: "",
      season: "",
      country: "",
    });
    setSearchCountry({
      paisSelecionado: [],
    });
  }
  // AGREGAR PAÍS A LA ACTIVIDAD
  const addCountry = () => {
    if (addActivity.country === searchCountry.paisEncontrado[0]?.name) {
      if (searchCountry.paisSelecionado.indexOf(addActivity.country) === -1) {
        searchCountry.paisSelecionado.push(addActivity.country);
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
    let filterCountry = searchCountry.paisSelecionado.filter(
      (c) => c !== country
    );
    setSearchCountry({
      ...searchCountry,
      paisSelecionado: filterCountry,
    });
  };

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
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* - - - - - DIFICULTAD - - - - - */}
          <Box>
            <span>Dificultad</span>
            <Select
              name="dificult"
              value={addActivity.dificult}
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* - - - - - TEMPORADA - - - - - */}
          <Box>
            <span>Temporada</span>
            <Select
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
            </Select>
          </Box>

          {/* - - - - AGREGAR ACTIVIDAD A PAÍS - - - - */}
          <Box>
            <span>Agregar actividad a País</span>
            <datalist id="country">
              {searchCountry.paisEncontrado?.map((country) => {
                return <option key={country.id} value={country.name} />;
              })}
            </datalist>
            <Input
              list="country"
              name="country"
              type="text"
              value={addActivity.country}
              onChange={(e) => handleChange(e)}
              placeholder="País donde se realiza"
            ></Input>
            <input type="button" onClick={addCountry} value="Agregar País" />
          </Box>
          <Box>
            {searchCountry.paisSelecionado?.map((c) => {
              return (
                <div key={c}>
                  <p>{c}</p>
                  <input
                    type="button"
                    onClick={() => deleteCountry(c)}
                    value="X"
                  />
                </div>
              );
            })}
          </Box>

          {/*- - - - - - BUTTON SUBMIT - - - - - */}
          <button type="submit">Agregar Actividad</button>
        </Inputs>
      </div>
    </Formulario>
  );
}

export default AddActivity;
