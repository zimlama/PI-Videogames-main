const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
   // no paso id porque lo da directamente sequalize y como no tengo un tema de 
   // colisiones, dejo que le de el id sql
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};