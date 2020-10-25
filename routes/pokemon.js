const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(arrayOfFaves=>{
    console.log(arrayOfFaves);
    res.render('pokemon/index',{faves:arrayOfFaves})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  })
  .then(([pokemon,created])=>{
    res.redirect('/pokemon')
  })
});

module.exports = router;
