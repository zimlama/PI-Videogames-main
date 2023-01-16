import React from "react";

export default function Paging({ videogamesPerPage, allVideogames, page }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paging100">
      <ul>
        {pageNumbers.map((number) => {
          return <button onClick={() => page(number)}>{number}</button>;
        })}
      </ul>
    </div>
  );
};