const Event = require("../models/event");
const { response, request } = require("express");
const event = require("../models/event");

module.exports.getEventos = async (_, res = response) => {
 try {
  const results = await Event.find().populate("user", "name");
  return res.json({
   ok: true,
   events: results,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   ok: false,
   message: "Comunicate con el adminstrador",
  });
 }
};

module.exports.createEvents = async (req = request, res = response) => {
 try {
  const event = new Event(req.body);
  event.user = req.id;
  const eventsDB = await event.save();

  return res.json({
   ok: true,
   message: "Hemos guardado con exito al estudiante",
   data: eventsDB,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   ok: false,
   message: "Comunicate con el adminstrador",
  });
 }
};

module.exports.updateEvents = async (req = request, res = response) => {
 const uid = req.id;
 const eventId = req.params.id;
 try {
  const evento = await Event.findById(eventId);
  if (!evento) {
   return res.status(404).json({
    ok: false,
    message: "Evento on existe por ese id",
   });
  }
  if (evento.user.toString() !== uid) {
   return res.status(401).json({
    ok: false,
    message: "No tienes privilegios de editar este evento",
   });
  }

  const nuevoEvento = {
   ...req.body,
   user: uid,
  };

  const eventUpdate = await Event.findByIdAndUpdate(eventId, nuevoEvento, {
   new: true,
  });
  return res.json({
   ok: false,
   evento: eventUpdate,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   ok: false,
   message: "Comunicate con el adminstrador",
  });
 }
};

module.exports.deleteEvents = async (req = request, res = response) => {
 try {
  const uid = req.id;
  const { id } = req.params;
  const evento = await Event.findById(id);

  if (!evento) {
   return res.status(404).json({
    ok: false,
    message: "Evento on existe por ese id",
   });
  }

  console.log(evento.user, uid);

  if (evento.user.toString() !== uid) {
   return res.status(401).json({
    ok: false,
    message: "No tienes los privilegios para este evento",
   });
  }

  const eventDelete = await Event.findByIdAndDelete(id);
  return res.json({
   ok: true,
   message: "Hemos eliminado el evento",
   event: eventDelete,
  });
 } catch (error) {}
};
