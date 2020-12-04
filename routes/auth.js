const { Router } = require("express");

const AuthJWT = require("../app/middlewares/jwt");
const AuthValidator = require("../app/validator/auth");
const AuthController = require("../app/controllers/auth");

module.exports = Router()
 .post("/", AuthValidator.login, AuthController.login)
 .get("/renew", AuthJWT, AuthController.revalidToken)
 .post("/new", AuthValidator.createUser, AuthController.createUser);
