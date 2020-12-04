const { Router } = require("express");

const AuthJWT = require("../app/middlewares/jwt");
const EventsValidator = require("../app/validator/event");
const EventsController = require("../app/controllers/events");

module.exports = Router()
 .get("/", AuthJWT, EventsController.getEventos)
 .post(
  "/",
  AuthJWT,
  EventsValidator.createEvents,
  EventsController.createEvents
 )
 .put("/:id", AuthJWT, EventsController.updateEvents)
 .delete("/:id", AuthJWT, EventsController.deleteEvents);
