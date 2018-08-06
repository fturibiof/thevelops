const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const cars = require("./routes/api/cars");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Get db config
const db = require("./config/keys.js").mongoURI;

//connect to mongoDB
mongoose.connect(db)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log("Failed to connect to MongoDB"));

// app.use(passport.initialize());
// require('./config/passport')(passport);

//routes
app.use('/api/users', users);
app.use('/api/cars', cars);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
