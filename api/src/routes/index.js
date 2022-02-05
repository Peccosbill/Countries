const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { URL_API } = require("../../constants.js");
const { Country, Activity, CountryActivities } = require("../db");

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
        include: {
          model: Activity,
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
    const results = await Country.findAll({
      include: {
        model: Activity,
      },
    });
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

// - - - - RUTAS PARA FILTROS - - - -

// POR ALFABETO
router.get("/az", async (req, res) => {
  let az = await Country.findAll({
    order: [["name", "ASC"]],
  });
  return res.send(az);
});

router.get("/za", async (req, res) => {
  let za = await Country.findAll({
    order: [["name", "DESC"]],
  });
  res.send(za);
});

// POR POBLACIÓN
router.get("/lessPopulation", async (req, res) => {
  let population = await Country.findAll({
    order: [["population", "ASC"]],
  });
  res.send(population);
});

router.get("/morePopulation", async (req, res) => {
  let population = await Country.findAll({
    order: [["population", "DESC"]],
  });
  res.send(population);
});

// POR CONTINENTE
router.get("/continent/:continent", async (req, res) => {
  const continent = `${req.params.continent
    .charAt(0)
    .toUpperCase()}${req.params.continent.slice(1)}`;
  try {
    let cont = await Country.findAll({
      where: {
        continent: continent,
      },
    });
    res.send(cont);
  } catch (error) {
    res.send(error);
  }
});

//  POR ACTIVIDAD
router.get("/activity", async (req, res) => {
  const activity = await Activity.findAll();
  res.send(activity);
});

router.get("/activityByCountry/:activityId", async (req, res) => {
  const { activityId } = req.params;
  const activityByCountry = await CountryActivities.findAll({
    where: { activityId: activityId },
  });
  res.send(activityByCountry);
});

router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await CountryActivities.findAll();
  res.send(activityByCountry);
});

// - - - - RUTAS DE ACTIVIDAD - - - -

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
