import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryId } from "../../../redux/actions/countriesActions";
import styled from "styled-components";
import Spinner from "../../Spinner/Spinner";

const Country = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  width: 90%;
  max-width: 50rem;
  height: 100%;
  background: #143642;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Detail = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  color: #fff;
`;

const Image = styled.img`
  margin-right: 2rem;
  width: 20rem;
  min-height: 12rem;
  border-radius: 1rem;
`;

const Span = styled.span`
  font-weight: bold;
`;

const BoxActivity = styled.div`
  color: #fff;
  margin-top: 1rem;
  display: flex;
`;

const Activity = styled.div`
  margin: 0.5rem;
  padding: 1rem;
  width: 12rem;
  background: #000;
  border-radius: 1rem;
`;

function DetailCountry({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

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
    <div>
      <Detail>
        <Image src={country.flag} alt={country.name} />
        <Info>
          <p>
            <Span>Código del País: </Span>
            {country.id}
          </p>
          <p>
            <Span>País: </Span>
            {country.name}
          </p>
          <p>
            <Span>Capital: </Span>
            {country.capital}
          </p>
          <p>
            <Span>Subregión: </Span>
            {country.subregion}
          </p>
          <p>
            <Span>Area: </Span>
            {country.area} km2
          </p>
          <p>
            <Span>Población:</Span> {country.population}
          </p>
        </Info>
      </Detail>
      <Info>
        <h4>Actividades Turísticas</h4>
        <BoxActivity>
          {country.activities?.map((act) => {
            return (
              <Activity key={act.id}>
                <p>
                  <Span>Actividad: </Span>
                  {act.name}
                </p>
                <p>
                  <Span>Dificultad: </Span>
                  {act.dificult}
                </p>
                <p>
                  <Span>Duración: </Span>
                  {act.duration} hs
                </p>
                <p>
                  <Span>Temporada: </Span>
                  {act.season}
                </p>
              </Activity>
            );
          })}
        </BoxActivity>
      </Info>
    </div>
  );

  return <Country>{component}</Country>;
}

export default DetailCountry;
