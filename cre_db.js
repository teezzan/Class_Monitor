const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true }, (error) =>{
    if(error){
        console.log('error');
    }
    else{
        console.log('created successfully');
    }
});


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
