const { Router } = require("express");
const { Country, Activity, CountryActivities } = require("../db");

const router = Router();

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
  res.status(200).send("Actividad creada exitosamente");
});

module.exports = router;