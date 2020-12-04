const { response, request } = require("express");
const { valid } = require("../../config/jwt");

module.exports = (req = request, res = response, next) => {
 const token = req.headers.authorization;

 if (!token) {
  return res.status(401).json({
   ok: false,
   message: "No hay token en la peticion",
  });
 }

 try {
  const { uid, name } = valid(token);
  req.id = uid;
  req.name = name;
  next();
 } catch (error) {
  return res.status(401).json({
   ok: false,
   message: "Token invalido",
  });
 }
};
