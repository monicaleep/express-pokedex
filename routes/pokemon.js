const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(arrayOfFaves=>{
    console.log(arrayOfFaves);
    res.render('pokemon/index',{faves:arrayOfFaves})
  })
});

// Show route - get info about a specific pokemon
router.get('/:id',(req,res)=>{
  const id = req.params.id.toLowerCase();
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use axios to call the API
  axios.get(pokemonUrl+id).then( function(apiResponse) {
    const pokemonData = apiResponse.data;
    res.render('pokemon/show', { pokemonData: pokemonData });
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // Get form data and add a new record to DB if not alreadt in DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  })
  .then(([pokemon,created])=>{
    res.redirect('/pokemon')
  })
});

module.exports = router;
