require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en variables de entorno");
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET
};