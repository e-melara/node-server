const { sign, verify } = require("jsonwebtoken");

class JsonWebToken {
 generate(uid, name) {
  return new Promise((resolve, reject) => {
   const payload = { name, uid };
   sign(
    payload,
    process.env.SECRET_JSON_WEB_TOKEN,
    {
     expiresIn: "2h",
    },
    (er, token) => {
     if (er) {
      console.log(er);
      reject("No se puede generar el token");
     }
     resolve(token);
    }
   );
  });
 }

 valid(token) {
  try {
   return verify(token, process.env.SECRET_JSON_WEB_TOKEN);
  } catch (error) {
   throw new Error(error);
  }
 }
}

const json = new JsonWebToken();
module.exports = Object.freeze(json);
