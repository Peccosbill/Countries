/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const activity = {
  name: "Windsurf",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });

  describe("GET /countries/:id", () => {
    it("Devuelve 200 si le paso un id", (done) => {
      agent.get("/countries/BRA").then(() => done());
    });
    it("Devuelve 404 si se le pasa un id incorrecto", (done) => {
      agent.get("/countries/hello").then(() => done());
    });
  });
  describe("GET /countries?name=name", () => {
    it("Devuelve 200 si le paso un nombre correcto", (done) => {
      agent.get("/countries?name=qatar").then(() => done());
    });
    it("Devuelve 404 si le paso un nombre incorrecto", (done) => {
      agent.get("/countries?name=asdfsadf").then(() => done());
    });
  });

  //Tests de Models
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("nombre", () => {
      it("Deberia retornar error si le paso null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Deberia trabajar bien si le paso un nombre", () => {
        Country.create({ nombre: "Argentina" });
      });
    });
  });

  describe("Validators", () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe("name", () => {
      it("Deberia trabajar bien si le paso un nombre", () => {
        Activity.create({ name: "correr" });
      });
    });
  });
});
