require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { database } = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// conection db
database();

// App Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
 console.log(`Estamos corriendo en el puerto ${process.env.PORT}`);
});
