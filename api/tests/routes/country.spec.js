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
    it("should get 200", (done) => {
      agent
        .get("/countries")
        .set("Accept", "aplication/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET /countries/:id", () => {
    it("Devuelve 200 si le paso un id", (done) => {
      agent
        .get("/countries/BRA")
        .set("Accept", "aplication/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("Devuelve 404 si se le pasa un id incorrecto", function () {
        agent.get("/countries/hello").expect(404);
      });
  });

  describe("GET /countries?name=name", () => {
    it("Devuelve 200 si le paso un nombre correcto", function () {
        agent.get("/countries?name=qatar").expect(200);
      });
    it("Devuelve 404 si le paso un nombre incorrecto", function () {
        agent.get("/countries?name=asdfsadf").expect(404);
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
    beforeEach(async () => await Activity.sync({ force: true }));
    describe("name", () => {
      it("Deberia trabajar bien si le paso un nombre", () => {
        Activity.create({ name: "correr" });
      });
      it("Debería retornar error si le paso null como nombre", (done) => {
        Activity.create({
          name: null,
        })
          .then(() => {
            done(new Error("Error:It requires a name"));
          })
          .catch(() => done());
      });
    });
  });
});
