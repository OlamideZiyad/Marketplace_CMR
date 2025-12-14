require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const db = require("./models");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully");

    await db.sequelize.sync(/* { alter: true }** */);
    console.log("Tables synchronized");

app.listen(PORT, () => {
  console.log(`Le serveur a demarer sur : http://localhost:${PORT}`);
});

} catch (error) {
    console.error(" Database connection failed:", error.message); 
  }
})();
