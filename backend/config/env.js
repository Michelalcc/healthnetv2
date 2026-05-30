require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET no está definido en .env");
}

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET
};