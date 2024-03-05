const express = require("express");
const mongoose = require("./src/apis/db/mongoose");
const router = require("./src/apis/routes")

const app = express();
require("dotenv").config();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
})