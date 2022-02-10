const { Router } = require("express");

const CountriesRoutes = require("./countries");
const ActivitiesRoutes = require("./activities");
const FiltersRoutes = require("./filters");

const router = Router();

router.use("/", CountriesRoutes);
router.use("/", ActivitiesRoutes);
router.use("/", FiltersRoutes);

module.exports = router;
