const express = require('express')
const uploader = require('express-fileupload')
const { check, validationResult } = require('express-validator');
const MongoClient = require('mongodb').MongoClient
const crypto = require('crypto')
const { devURI, PORT, dbName } = require('./config')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(uploader({
  createParentPath: true
}))

let db
MongoClient.connect(devURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
  if (err) {
    return console.error(`Cannot start the server: ${err}`)
  }
  db = client.db(dbName)
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
    // Upload resume file if there's one
    if (req.files) {
      console.log('FILE FOUND!')
      let resume = req.files.resumeFile

      // Add a unique slug for distinct files
      const uidSlug = crypto.randomBytes(3).toString("hex");
      let newFilename = `${uidSlug}--${resume.name}`
      req.body.resumeFile = newFilename

      // Save file with a unique name
      resume.mv(`./uploads/${newFilename}`)
    }

    db.collection('hiring').insertOne(req.body, (err, result) => {
      if (err) {
        throw err
      }
      console.log('Success! Data saved for candidate.')
      res.send('Your application was submitted!')
    })
  }
  catch (err) {
    res.send(`Exception: ${err}`)
  }
})
