const express = require('express')
const uploader = require('express-fileupload')
const { check, validationResult } = require('express-validator');
const MongoClient = require('mongodb').MongoClient
const { devURI, PORT } = require('./config')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(uploader({
  createParentPath: true
}))

let db
MongoClient.connect(devURI, (err, client) => {
  if (err) {
    return console.error(`Cannot start the server: ${err}`)
  }
  db = client.db('employees')
  app.listen(PORT,  () => {
    console.log(`API running on ${PORT}...`)
  })
})


// Default endpoint with default response
app.get('/', (req, res) => {
  res.sendStatus(200)
})


// Validate and save applicant details
app.post('/hire',[
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    db.collection('hiring').save(req.body, (err, result) => {
      if (err) {
        throw err
        return
      }
      console.log('Success! Data saved for candidate.')
      res.send('Your application was submitted!')
    })
  }
  catch (err) {
    res.send(`Exception: ${err}`)
  }
})
