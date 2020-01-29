const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));

app.use(cors());

const img_time = [];
// const connection = require('./cre_db');


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true }, (error) =>{
mongoose.connect('mongodb+srv://admin:admin@classmonitor-eoevj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (error) =>{
    if(error){
        console.log('error');
    }
    else{
        console.log('created successfully');
    }
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://taiwo:taiwo@classmonitor-eoevj.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
// //   console.log("not connected");
//   // perform actions on the collection object
//   //client.close();
// });

var dataSchema = new mongoose.Schema({
    url :{
        type :String,
        required: "Required"
    },
    id :{
        type :String,
        required: "Required"
    },
    noise :{
        type :String,
        required: "Required"
    },
    datetime :{
        type :Number,
        required: "Required"
    },
    power :{
        type :String,
        required: "Required"
    },    
});

var Data = mongoose.model("ClassFeed", dataSchema);






cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'skryptor',
    api_key: process.env.API_KEY || "144111297658495",
    api_secret: process.env.API_SECRET || '0IQEPeHDcD36_PdeKOx4zn97IC0'
    });
    const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    const parser = multer({ storage: storage });

app.post('/api/images', parser.single("image"), (req, res) => {
    console.log(req.file) // to see what is returned to you
    // const image = {};
    var image = new Data();
    image.url = req.file.url;
    image.id = req.file.public_id;
    image.datetime = Date.now();
    image.power = req.body.power;
    image.noise = req.body.noise;
    console.log(req.body);
    image.save()
        .then(item => {
            console.log("Name saved to database");
            return res.send(image);
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send("Unable to save to database");
        });

    });

app.get('/', (req, res) => {
    res.send(`I am up and running on port ${port}`);
});

app.get('/api/images/:datetime', (req, res) => {
    const img = img_time.find(c => c.datetime === parseInt(req.params.datetime));
    if(!img) return res.status(404).send('The img with the datetime is not found');
    res.send(`You have uploaded this image: <hr/><img src="${img.url}" width="500"> The noise was ${img.noise} and the status of power was ${img.power} <hr />`);

});

app.get("/api/images", function (req, res) {   
    Data.find({}, function (err, allDetails) {
        if (err) {
            console.log(err)
            return res.status(400).send("Unable to retrieve");
        } else {
            return res.send(allDetails);
        }
    });
    });

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));