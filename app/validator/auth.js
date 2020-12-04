const { check } = require("express-validator");

const validator = {
 name: check("name", "El nombre es obligatorio").not().isEmpty(),
 email: check("email", "Debe ser un correo electronico valido").isEmail(),
 password: check(
  "password",
  "El password debe tener por lo menos 6 caracteres"
 ).isLength({ min: 6 }),
 valid: require("../middlewares/valid"),
};

module.exports.createUser = () => {
 return [validator.name, validator.email, validator.password, validator.valid];
};

module.exports.login = () => {
 return [validator.email, validator.password, validator.valid];
};
