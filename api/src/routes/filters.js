const { Router } = require("express");
const { Country, Activity, CountryActivities } = require("../db");

const router = Router();
// - - - - RUTAS PARA FILTROS - - - -

// POR ALFABETO
router.get("/az", async (req, res) => {
  let az = await Country.findAll({
    order: [["name", "ASC"]],
  });
  return res.status(200).send(az);
});

router.get("/za", async (req, res) => {
  let za = await Country.findAll({
    order: [["name", "DESC"]],
  });
  res.status(200).send(za);
});

// POR POBLACIÓN
router.get("/lessPopulation", async (req, res) => {
  let population = await Country.findAll({
    order: [["population", "ASC"]],
  });
  res.status(200).send(population);
});

router.get("/morePopulation", async (req, res) => {
  let population = await Country.findAll({
    order: [["population", "DESC"]],
  });
  res.status(200).send(population);
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
    res.status(200).send(cont);
  } catch (error) {
    res.send(error);
  }
});

//  POR ACTIVIDAD
router.get("/activity", async (req, res) => {
  const activity = await Activity.findAll();
  res.status(200).send(activity);
});

router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await CountryActivities.findAll();
  res.status(200).send(activityByCountry);
});

router.get("/activityByCountry/:activityId", async (req, res) => {
  const { activityId } = req.params;
  const activityByCountry = await CountryActivities.findAll({
    where: { activityId: activityId },
  });
  res.status(200).send(activityByCountry);
});

module.exports = router;
