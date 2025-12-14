const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "cancelled"),
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { as: "buyer", foreignKey: "buyerId" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
  };

  return Order;
};
