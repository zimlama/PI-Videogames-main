import React from "react";
import "./Paging.css"

export default function Paging({ videogamesPerPage, allVideogames, page, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paging100">
        {pageNumbers.map((number) => {
          return (
            <button className={number === currentPage && 'active'} onClick={() => page(number)}>{number}</button>
          )
        })}
    </div>
  );
};