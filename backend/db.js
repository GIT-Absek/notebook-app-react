const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/notebookapp?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = async () => {

    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo");
    })
}

module.exports=connectToMongo;