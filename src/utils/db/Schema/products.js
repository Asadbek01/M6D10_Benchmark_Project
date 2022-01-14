import mongoose from mongoose
const Products = sequelize.define(
  "product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
  }

);

export default Products;