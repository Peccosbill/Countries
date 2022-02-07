import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Pagination.module.css";

export default function Pagination({
  countriesPerPage,
  totalCountries,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.numberPage}>
            <NavLink
              className={styles.pageLink}
              to="/home"
              onClick={() => paginate(number)}
            >
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
