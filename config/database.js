const mongoose = require("mongoose");

module.exports.database = async () => {
 try {
  await mongoose.connect(process.env.DB_CONNECT, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false,
  });
 } catch (error) {
  console.log(error);
  throw new Error("error al iniciar la conexion con la DB");
 }
};
