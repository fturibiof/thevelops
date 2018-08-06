const express = require('express');
const router = express.Router();

const User = require("../../models/User");
const Car = require("../../models/Car");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

const validateInputCreate = require('../../validation/create');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: err}));
});

router.get('/:userId', (req,res) => {
  const id = req.params.userId;
  User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({
      msg: "User not found",
      error: err})
    );
});


router.post('/', (req,res) => {
  //Validation
  const {errors, isValid} = validateInputCreate(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Check if email has been used before
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: "email already exists"});
      }
      else {
        const newUser = new User({
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          personal_phone: req.body.personal_phone,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => res.status(201).json(user))
            .catch(err => console.log(err));

          })
        })

      }
    });
});


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
      .then(user => {
        if(!user) return res.status(404).json({email: "Email not found"});
        bcrypt.compare(password, user.password) //compare password input with user password
            .then(match => {
              if (match) {
                //Access granted
                const payload = {id: user.id, first_name: user.first_name, last_name: user.last_name};
                jwt.sign(payload, keys.secret, {expiresIn: 600}, (err, token) => {
                  res.json({
                    access: true,
                    token: 'Bearer '+token,
                    id: user.id
                  });
                });
              }
              else {
                return res.status(400).json({password: 'password incorrect'});
              }
            })
      })
});

router.delete("/:userId", (req, res) => {
  const id = req.params.userId;
  User.remove({_id: id})
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({error: err}));
});

router.put("/:userID", (req, res) => {
  const id = req.params.userId;
  User.update({_id: id}, {$set: {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    personal_phone: req.body.personal_phone,
    password: req.body.password
  }})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error: err}));
});

router.get("/:userId/cars", (req, res) => {
  const userId = req.params.userId;
  Car.find({user: userId})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({
      msg: "Not found",
      error: err})
    );
});

router.post("/:userId/cars", (req, res) => {
  const userId = req.params.userId;
  Car.find({user: userId})
    .then(user => {
      if(!user){
        return res.status(404).json({user: 'user not found'});
      }
      else{
        const newCar = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        price: req.body.price,
        image_url: req.body.image_url,
        user: userId
        })
        newCar.save()
        .then(car => res.status(201).json(car))
        .catch(err => console.log(err));
      }

    });
});

module.exports = router;
