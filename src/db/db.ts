import mongoose from "mongoose";

const connect = async (dbname : string) =>{
    try{
       await mongoose.connect(`mongodb://localhost:27017/${dbname}`);
       console.log('MongoDB is connected successfully!!');
    }
    catch(err){
        console.log("Error connecting to mongo", err);
    }
}

export{
    connect
}