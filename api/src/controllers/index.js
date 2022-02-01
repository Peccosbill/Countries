// const axios = require('axios');
// const { URL_API } = require('../constants');

// class ModelCrud {
//   constructor(model) {
//     this.model = model;
//   }
//   getAll = (req, res, next) => {
//     const result = this.model.findAll();
//     if (result.length === 0) {
//        const countries = axios.get(URL_API);
//        const result = countries.map((c) => {
//           return this.model.create({
//               id = c.cca3,
//               name = c.name,
//               flag = c.flags[1],
//               continent = c.continent,
//               capital = c.capital,
//               subregion = c.subregion,
//               area = c.area,
//               population = c.population,
//           })
//        });
//        result = this.model.findAll()
//        .then((r) => res.set(r))
//        .catch((err) => res.set(err))
//     }
//   };
//   //https:localhost:3001/contries/:id
//   getById = (req, res, next) => {
//     const id = req.params.id;
//     return this.model
//       .findByPk(id)
//       .then((results) => res.send(results))
//       .catch((err) => next(err));
//   };

//   add = (req, res, next) => {
//     const { name, dificult, duration, season } = req.body;
//     return this.model
//       .create({
//         name: name,
//         dificult: dificult,
//         duration: duration,
//         season: season,
//       })
//       .then((results) => res.send(results))
//       .catch((err) => next(err));
//   };

//   update = (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body;
//     return this.model.update(body, {
//       where: {
//         id: id,
//       },
//     });
//   };
// }
