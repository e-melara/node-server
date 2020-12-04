const { response, request } = require("express");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");

const User = require("../models/user");
const { generate } = require("../../config/jwt");

module.exports.login = async (req = request, res = response) => {
 const { email, password } = req.body;
 try {
  let user = await User.findOne({ email: email });
  if (!user) {
   return res.status(400).json({
    ok: false,
    message: `Las credeciales no son correctas`,
   });
  }

  const validEmailPassword = compareSync(password, user.password);
  if (!validEmailPassword) {
   return res.status(400).json({
    ok: false,
    message: "Password incorrecto",
   });
  }
  const token = await generate(user.id, user.name);

  return res.json({
   ok: true,
   uid: user.id,
   name: user.name,
   token,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   message: "Ponte en contacto con el adminstrador",
  });
 }
};
module.exports.createUser = async (req = request, res = response) => {
 const { email, password } = req.body;
 try {
  let user = await User.findOne({ email: email });
  if (user) {
   console.log(user);
   return res.status(400).json({
    ok: false,
    message: `El correo: ${email} ya existe en nuestra base de datos`,
   });
  }
  user = new User(req.body);

  const salt = genSaltSync();
  user.password = hashSync(password, salt);
  await user.save();
  const token = await generate(user.id, user.name);

  return res.status(201).json({
   ok: true,
   uid: (await user).id,
   name: (await user).name,
   token,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   message: "Ponte en contacto con el adminstrador",
  });
 }
};

module.exports.revalidToken = async (req = request, res = response) => {
 const { id, name } = req;
 const token = await generate(id, name);
 return res.json({
  ok: true,
  token,
 });
};
