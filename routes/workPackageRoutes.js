const express = require('express')
const { remove, format } = require("../controllers/workPackageController.js");
 
const workPackageRoutes = express.Router();
 
workPackageRoutes.delete('/remove/:id', remove);
workPackageRoutes.delete('/format', format);

module.exports = workPackageRoutes