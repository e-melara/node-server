const { Router } = require("express");

const AuthJWT = require("../app/middlewares/jwt");
const AuthValidator = require("../app/validator/auth");
const AuthController = require("../app/controllers/auth");

module.exports = Router()
 .get("/", AuthValidator.login, AuthController.login)
 .post("/renew", AuthJWT, AuthController.revalidToken)
 .post("/new", AuthValidator.createUser, AuthController.createUser);
