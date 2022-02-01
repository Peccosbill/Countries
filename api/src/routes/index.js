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
      });
      if (result.length === 0) {
        res.status(404).send("No existe el país buscado");
      } else {
        res.send(result);
      }
    } catch (error) {
      res.send(error);
    }
  } else {
    const results = await Country.findAll();
    if (results.length === 0) {
      await getApi();
      res.send(await Country.findAll());
    } else {
      res.send(results);
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
    res.send(country);
  } catch (error) {
    res.send(error);
  }
});

router.get("/activity", async (req, res) => {
  const activity = await Activity.findAll();
  res.send(activity);
});

router.post("/activity", async (req, res) => {
  const { name, dificult, duration, season, country } = req.body;
  const activity = await Activity.create({
    name: name,
    dificult: dificult,
    duration: duration,
    season: season,
  });

  const ActivityCountry = await Country.findAll({
    where: { name: country },
  });

  activity.addCountry(ActivityCountry);
  res.send("Actividad creada exitosamente");
});

module.exports = router;
