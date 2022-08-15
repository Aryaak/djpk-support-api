const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const workPackageRoutes = require('./routes/workPackageRoutes.js');
const cors = require('cors');
require('dotenv').config();
const fileupload = require('express-fileupload');

const app = express();
app.use(fileupload());
app.use(bodyParser.json());
// app.use(cors);

app.get('/', (req, res) => {
    res.status(200).send('DJPK server is running');
})
app.use('/user',userRoutes);
app.use('/workpackage',workPackageRoutes);
 
app.listen(process.env.APP_PORT,()=> console.log(`DJPK server running at http://${process.env.APP_URL}:${process.env.APP_PORT}`));