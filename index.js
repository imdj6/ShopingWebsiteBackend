const express = require("express");
const mongoose = require("./src/apis/db/mongoose");
const router = require("./src/apis/routes")

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
})