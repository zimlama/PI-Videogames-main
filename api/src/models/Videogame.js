const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // version 4 de generar el uuid
      allowNull: false, //no permite que falte el dato
      primaryKey: true // sirve para considerar el campo de busqueda
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    rating: {
      type: DataTypes.DECIMAL,// ?ver si asi esta ok y si se pone limite de decimales
      allowNull: true
    },
    platforms: {
      type: DataTypes.JSON, // ? ver si corresponde o NO correspoonde .ARRAY x que es un array de varias plataformas
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
