import "@testing-library/jest-dom";
import { NavLink } from "react-router-dom";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Nav from "../components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("Probamos el componente <Nav />", () => {
  // eslint-disable-next-line no-unused-vars
  let nav = shallow(<Nav />);

  beforeEach(() => {
    nav = shallow(<Nav />);
  });

  it("debería mostrar <Nav /> correctamente", () => {
    expect(nav).toMatchSnapshot();
  });

  it("Debería renderizar dos <NavLink to='' />", () => {
    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(2);
  });

  it("Debería tener un NavLink con el texto AÑADIR ACTIVIDAD que cambie a la ruta '/home'", () => {
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/home");
  });

  it("Debería tener un NavLink con el texto AÑADIR ACTIVIDAD que cambie a la ruta '/home/addactivity'", () => {
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/home/addactivity");
    expect(nav.find(NavLink).at(1).text()).toEqual("AÑADIR ACTIVIDAD");
  });
});
