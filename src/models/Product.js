const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  //associations
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      as: "seller",
      foreignKey: "sellerId",
    });

    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "categoryId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return Product;
};
