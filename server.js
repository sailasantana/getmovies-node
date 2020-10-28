require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const movies = require('./movies.json')
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors')


app.use(morgan(morganSetting))
app.use(cors())
app.use(helmet())

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'





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
          movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
      }

      if (req.query.avg_vote) {
        response = response.filter(movie =>
          movie.avg_vote >= req.query.avg_vote
        )
      }
     
      return res.json(response)
  })
  

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})

