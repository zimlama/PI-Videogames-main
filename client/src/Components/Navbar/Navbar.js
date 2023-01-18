import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../Searchbar/Searchbar";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({
  handleFilterGenre,
  handleFilterCreated,
  handleRating,
  handleSort,
}) {
  const allGenre = useSelector((state) => state.genres);
  return (
    <div>
      <Link to="/">
        <button className="button2">Back</button>
      </Link>

      <div>
        <div className="navbar_container">
          <SearchBar />
        </div>

        <div>
          <select className="select" onChange={(e) => handleSort(e)}>
            <option>Sort By Name</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>

          <select className="select" onChange={(e) => handleRating(e)}>
            <option>Sort by Rating</option>
            <option value="Top">Rating Top</option>
            <option value="Low">Rating Low</option>
          </select>

          <select className="select" onChange={(e) => handleFilterCreated(e)}>
            <option>Created in</option>
            <option value="All">All</option>
            <option value="Created">Data Base</option>
            <option value="Api">Api</option>
          </select>

          <select className="select" onChange={(e) => handleFilterGenre(e)}>
            <option>Sort by Genres</option>
            <option value="All">All</option>
                {
                    allGenre.map((g) =>{
                        return (
                            <option value={g} >
                                {g}
                            </option>
                        )
                    })
                }
          </select>
        </div>
      </div>
    </div>
  );
}