const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { URL_API } = require("../../constants.js");
const { Country, Activity } = require("../db");

const router = Router();

const getApi = async () => {
  try {
    const { data } = await axios.get(URL_API);

    const dataApi = data.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[1],
        continent: c.region,
        capital: c.capital ? c.capital[0] : "No tiene capital",
        subregion: c.subregion,
        area: c.area,
        population: c.population,
        map: c.maps.googleMaps,
      };
    });
    await Country.bulkCreate(dataApi);
  } catch (error) {
    console.log(error);
  }
};

router.get("/countries", async (req, res, next) => {
  const { name } = req.query;

  if (name) {
    try {
      const result = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Activity,
        },
      });
      if (result.length === 0) {
        res.status(404).send("No existe el país buscado");
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    const results = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (results.length === 0) {
      getApi();
      res.json(Country.findAll());
    } else {
      res.json(results);
    }
  }
});

router.get("/countries/:id", async (req, res) => {
  const id = req.params.id.toUpperCase();
  try {
    let country = await Country.findByPk(id, {
      include: {
        model: Activity,
      },
    });
    res.json(country);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
