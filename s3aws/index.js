const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const app = express()
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static('public'))

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})
console.log(process.env.AWS_ACCESS_KEY_ID)

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/files", (req, res) => {
    const s3 = new AWS.S3()

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
    }

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            console.log("Error fetching files", err, err.stack)
            return res.status(500).send(err)
        }
        const files = data.Contents.map((content) => {
            return {
                name: content.Key,
                url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${content.Key}`,
            }
        })
        res.json(files)
    })
})

app.post('/upload', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    const s3 = new AWS.S3()
    const uploadPromises = req.files.map(file => {
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
        }
        return s3.upload(uploadParams).promise()
    })

    Promise.all(uploadPromises)
        .then((data) => {
            data.forEach((uploadResults) => {
                console.log("file uploaded succesfully")
                res.redirect('/')
            });
        })
})
app.listen(5000, () => {
    console.log('Server listening on port 3000')
})
