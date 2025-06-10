const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/user.routes");
 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Namaste Dunia!");
})

app.use("/users", UserRoutes);

module.exports = app;