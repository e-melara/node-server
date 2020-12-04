const { Schema, model } = require("mongoose");

const Event = new Schema({
 title: {
  type: String,
  required: true,
 },
 notes: {
  type: String,
 },
 start: {
  type: Date,
  required: true,
 },
 end: {
  type: Date,
  required: true,
 },
 user: {
  type: Schema.Types.ObjectId,
  ref: "user",
  required: true,
 },
});

Event.method("toJSON", function () {
 const { _id, __v, ...objects } = this.toObject();
 objects.id = _id;
 return objects;
});

module.exports = new model("Event", Event);
