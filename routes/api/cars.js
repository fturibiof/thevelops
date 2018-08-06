const express = require('express');
const router = express.Router();

const Car = require("../../models/Car");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

const validateInputCreate = require('../../validation/create');

router.put("/:carID", (req, res) => {
  const id = req.params.carId;
  Car.update({_id: id}, {$set: {
    brand: req.body.brand,
    model: req.body.model,
    color: req.body.color,
    year: req.body.year,
    price: req.body.price,
    image_url: req.body.image_url,
    user: req.body.user
  }})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error: err}));
});

router.delete("/:carId", (req, res) => {
  const id = req.params.carId;
  Car.remove({_id: id})
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;
