requrie('dotenv').config()

const express = requrie('express')
const morgan = require('morgan')
const helmet = require('helmet')
const movies = require('./movies.json')
const app = express()
const PORT = 8000

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())




console.log(process.env.API_TOKEN)

app.use(function validateBearerToken(req, res, next){
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if(!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({error: "Unauthorized request"})
    }

    next()

})

app.get('/movie', function getMovie(req,res){

    let response = movies

    if (req.query.name) {
        response = response.filter(movie =>
          // case insensitive searching
          movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
      }

      if (req.query.name) {
        response = response.filter(movie =>
          // case insensitive searching
          movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
      }
})

