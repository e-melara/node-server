const moment = require("moment");

module.exports.isDate = (value, _) => {
 if (!value) {
  return false;
 }
 return moment(value).isValid();
};
