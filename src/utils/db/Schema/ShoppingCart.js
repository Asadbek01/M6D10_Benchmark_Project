import sequelize from "../connect.js";

import s from "sequelize";

const { DataTypes } = s;

const shoppingCart = sequelize.define(
  "cart",
  {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
  },
  
  }
);

export default shoppingCart;
