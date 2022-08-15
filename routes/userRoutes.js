const express = require('express')
const { uploadWithExcel } = require("../controllers/userController.js");
 
const userRoutes = express.Router();
 
userRoutes.post('/upload-with-excel', uploadWithExcel);

module.exports = userRoutes