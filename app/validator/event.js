const { check } = require("express-validator");
const { isDate } = require("../helpers/is-date");

const validator = {
 title: check("title", "El titulo es obligatorio").not().isEmpty(),
 start: check("start", "La fecha de inicio es obligatoria").custom(isDate),
 end: check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
 valid: require("../middlewares/valid"),
};

module.exports.createEvents = [
 validator.title,
 validator.start,
 validator.end,
 validator.valid,
];
