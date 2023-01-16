import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { videogameCreate, getGenres } from "../../Redux/Actions/index";
//import "./VideogameCreate.css";
// import './VideogameCreate2.css';

function validation(input) {
  let errors = {};
  if (!input.name.trim()) {
    //trim elimina espacios en blanco que dejen cuando escriben
    errors.name = "Please write a name!";
  }
  if (!input.description.trim()) {
    errors.description = "Please write a description!";
  }
  if (!input.platforms.length) {
    errors.platforms = "Please write a platform!";
  }
  return errors;
}

function VideogameCreate() {
  const dispatch = useDispatch();
  const genre = useSelector((store) => store.genres);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    background_image: "",
    genre: [],
  });
  console.log(genre);

  const platformsList = [
    "PC",
    "iOS",
    "Android",
    "macOS",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Linux",
    "Apple",
    "Atari",
    "Genesis",
    "SEGA",
  ];

  function handleChange(e) {
    if (e.target.name === "genre" || e.target.name === "platforms") {
      const arr = input[e.target.name];
      setInput({
        ...input,
        [e.target.name]: arr.concat(e.target.value),
      });
    }
    if (e.target.name !== "genres" && e.target.name !== "platforms") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    } else {
      // name es cada casillero que debe llenar
      // el value son los inputs de arriba que van a ir cambiando a medida que se ingresa la info
      setErrors(
        validation({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleSelectGenre(e) {
    setInput({
      ...input,
      genre: [...input.genre, e.target.value],
    });
  }

  const obj = {
    name: input.name,
    description: input.description,
    background_image: input.background_image,
    released: input.released,
    rating: input.rating,
    genre: input.genre,
    platforms: input.platforms,
  };
  console.log("este es el :", obj);

  function handleSubmit(e) {
    e.preventDefault();

    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    if (Object.keys(errors).length === 0) {
      dispatch(videogameCreate(obj));
      alert("Videogame created 👌");
      //e.target.reset();

      setInput({
        //seteo todo mi input en cero
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        background_image: "",
        genre: [],
      });
    } else {
      alert("ERROR: videogame not created ");
      return;
    }
  }

  function handleDeleteGenre(e) {
    setInput({
      ...input,
      genre: input.genre.filter((g) => g !== e), //filtro por todo lo que no sea ese elemento
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="containerForm">
      <Link className="home" to="/home">
        HOME
      </Link>
      <div>
      <h1 className="tittle">Create your Videogame</h1>
      </div>
      <div clasName='boxgrid'>
      <form className="formCreate" onSubmit={(e) => handleSubmit(e)}>
        <div>
         <input
            className="inputsss"
            placeholder="Videogame name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        <input
            className="inputsss"
            placeholder="Description"
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>{/*ojo aca*/}
        <div className="released_container">
        <label className="released">Released </label>
          <input
            className="inputsss"
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
        </div>
       
          <label className="rating">Rating: 0 to 5</label>
          <input
            className="input"
            type="decimal"
            value={input.rating}
            min={0}
            max={5}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        
        <div className="platforms_container">
          <label className="rating"> Platforms </label>
          <select
            className="inputss"
            onChange={(e) => handleSelectPlatforms(e)}
          >
            {platformsList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
            {/*{platformsList.map((p) => (
              <div key={p}>
                <input
                  className="platforms_input"
                  type="checkbox"
                  value={p}
                  name="platforms"
                  onChange={(e) => handleSelectPlatforms(e)}
                ></input>
                <label name={p}>{p}</label>
              </div>
            ))}*/}
        
        
          <input
            className="inputsss"
            placeholder="Image"
            type="text"
            value={input.background_image}
            name="background_image"
            alt="not found"
            onChange={(e) => handleChange(e)}
          />
        <div className="genres_container">
          <label className="rating">Genres </label>

          <select
            className="inputss"
            onChange={(e) => handleSelectGenre(e)}
          >
            {genre.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="buttonCrear" type="submit">
            CREATE
          </button>
        </div>
      </form>
      {input.genre.map((g) => (
        <div className="x_genre_container">
          <label className="genreX">{g}</label>
          <button
            className="butonX"
            onClick={() => handleDeleteGenre(g)}
          >
            X
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default VideogameCreate;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { videogameCreate, getGenres } from "../../Redux/Actions/index";
// import "./VideogameCreate.css";

// function validation(input) {
//   let errors = {};
//   if (!input.name.trim()) {
//     //trim elimina espacios en blanco que dejen cuando escriben
//     errors.name = "Please write a name!";
//   }
//   if (!input.description.trim()) {
//     errors.description = "Please write a description!";
//   }
//   if (!input.platforms.length) {
//     errors.platforms = "Please write a platform!";
//   }
//   return errors;
// }

// function VideogameCreate() {
//   const dispatch = useDispatch();
//   const genre = useSelector((store) => store.genres);
//   const [errors, setErrors] = useState({});
//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     released: "",
//     rating: 0,
//     platforms: [],
//     background_image: "",
//     genre: [],
//   });
//   console.log(genre);

//   const platformsList = [
//     "PC",
//     "iOS",
//     "Android",
//     "macOS",
//     "PlayStation",
//     "Xbox",
//     "Nintendo",
//     "Linux",
//     "Apple",
//     "Atari",
//     "Genesis",
//     "SEGA",
//   ];

//   function handleChange(e) {
//     if (e.target.name === "genre" || e.target.name === "platforms") {
//       const arr = input[e.target.name];
//       setInput({
//         ...input,
//         [e.target.name]: arr.concat(e.target.value),
//       });
//     }
//     if (e.target.name !== "genres" && e.target.name !== "platforms") {
//       setInput({
//         ...input,
//         [e.target.name]: e.target.value,
//       });
//     } else {
//       // name es cada casillero que debe llenar
//       // el value son los inputs de arriba que van a ir cambiando a medida que se ingresa la info
//       setErrors(
//         validation({
//           ...input,
//           [e.target.name]: e.target.value,
//         })
//       );
//     }
//   }

//   /*function handleSelectPlatforms(e) {
//     setInput({
//       ...input,
//       platforms: [...input.platforms, e.target.value],
//     });
//   }*/

//   function handleSelectGenre(e) {
//     setInput({
//       ...input,
//       genre: [...input.genre, e.target.value],
//     });
//   }

//   const obj = {
//     name: input.name,
//     description: input.description,
//     background_image: input.background_image,
//     released: input.released,
//     rating: input.rating,
//     genre: input.genre,
//     platforms: input.platforms,
//   };
//   console.log("este es el :", obj);

//   function handleSubmit(e) {
//     e.preventDefault();

//     setErrors(
//       validation({
//         ...input,
//         [e.target.name]: e.target.value,
//       })
//     );

//     if (Object.keys(errors).length === 0) {
//       dispatch(videogameCreate(obj));
//       alert("Videogame created 👌");
//       //e.target.reset();

//       setInput({
//         //seteo todo mi input en cero
//         name: "",
//         description: "",
//         released: "",
//         rating: 0,
//         platforms: [],
//         background_image: "",
//         genre: [],
//       });
//     } else {
//       alert("ERROR: videogame not created ");
//       return;
//     }
//   }

//   /*function handleDeleteGenre(e) {
//     setInput({
//       ...input,
//       genre: input.genre.filter((g) => g !== e), //filtro por todo lo que no sea ese elemento
//     });
//   }*/

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   return (
//     <div className="home_container">
//       <Link className="home" to="/home">
//         HOME
//       </Link>
//       <h1 className="lets_go">Create your Videogame</h1>
//       <form className="form" onSubmit={(e) => handleSubmit(e)}>
//         <div>
//           <label>Name</label>
//           <input
//             className="input"
//             placeholder="Videogame name"
//             type="text"
//             value={input.name}
//             name="name"
//             onChange={(e) => handleChange(e)}
//           />
//           {errors.name && <p className="error">{errors.name}</p>}
//         </div>
//         <div>
//           <label>Description</label>
//           <input
//             className="input"
//             placeholder="Description"
//             type="text"
//             value={input.description}
//             name="description"
//             onChange={(e) => handleChange(e)}
//           />
//           {errors.description && <p className="error">{errors.description}</p>}
//         </div>
//         <div className="released_container">
//           <label className="released"> Released </label>
//           <input
//             className="released_input"
//             type="date"
//             value={input.released}
//             name="released"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div>
//           <label className="rating">Rating </label>
//           <input
//             className="rating_input"
//             placeholder="0 to 5"
//             type="decimal"
//             value={input.rating}
//             min={0}
//             max={5}
//             name="rating"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div className="platforms_container">
//           <label className="platforms"> Platforms </label>
//           <div>
//             {platformsList.map((p) => (
//               <div key={p}>
//                 <input
//                   className="platforms_input"
//                   type="checkbox"
//                   value={p}
//                   name="platforms"
//                   onChange={(e) => handleChange(e)}
//                 ></input>
//                 <label name={p}>{p}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <label>Image</label>
//           <input
//             className="input"
//             placeholder="Image"
//             type="text"
//             value={input.background_image}
//             name="background_image"
//             alt="not found"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div className="genres_container">
//           <label className="genres">Genres </label>

//           <select
//             className="genres_input"
//             onChange={(e) => handleSelectGenre(e)}
//           >
//             {genre.map((g) => (
//               <option key={g} value={g}>
//                 {g}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <button className="create" type="submit">
//             CREATE
//           </button>
//         </div>
//       </form>
//       {/*input.genres.map((g) => (
//         <div className="x_genre_container">
//           <label className="x_genre">{g}</label>
//           <button
//             className="x_genre_buttom"
//             onClick={() => handleDeleteGenre(g)}
//           >
//             X
//           </button>
//         </div>
//       ))*/}
//     </div>
//   );
// }

// export default VideogameCreate;