const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./configs/config.js')
const bodyParser = require('body-parser')
const { isHttpError } = require('http-errors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { Upload } = require('@aws-sdk/lib-storage')
const { S3Client } = require('@aws-sdk/client-s3')
const fs = require('fs')
const createHttpError = require('http-errors')

app.use(cors({ origin: config.whitelist, credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const s3Client = new S3Client({
  region: config.AWS_BUCKET_REGION,
  credentials: { accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY },
})

app.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (req.file == null) {
      return createHttpError[400]('You must choose a file')
    }
    var file = req.file

    const target = {
      Bucket: config.AWS_BUCKET_NAME,
      region: config.DOMAIN_NAME,
      Key: req.file.originalname,
      Body: fs.createReadStream(file.path),
    }
    const parallelUploads3 = new Upload({
      client: s3Client,
      queueSize: 4,
      leavePartsOnError: false,
      params: target,
    })

    const response = await parallelUploads3.done()

    return res.status(201).json(response)
    // return res.status(201).json({
    //   link: `${config.DOMAIN_NAME}data`,
    // })
  } catch (error) {
    next(error)
  }
})

app.post('/data/:name', (req, res) => {
  const name = req.params.name
  res.redirect(config.AWS_CLOUDFRONT_DOMAIN + name)
})

app.use((err, req, res, next) => {
  if (isHttpError(err) && err.statusCode < 500) {
    return res.status(err.statusCode).json({
      msg: err.message,
    })
  }

  if (err.kind === 'ObjectId') {
    return res.status(400).json({
      msg: 'Invalid id',
    })
  }

  console.log(err)
  res.status(500).json({
    msg: 'Internal server error',
  })
})

app.listen(config.PORT, () => {
  console.log(new Date(), 'listening on port:', config.PORT)
})
