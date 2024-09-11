require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI='mongodb+srv://anilshrivastava-gofood:Anil9936@cluster0.nryjy.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';
// const mongoDB=()=>{
//     mongoose.connect(mongoURI,()=>{
//     console.log("cannected");
// });
// };

// const mongoDB = () => {
//     mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log("connecte"))
//         .catch((err) => {
//             console.error("MongoDB connection error:", err);
//             process.exit(1); // Exit the process with failure
//         });
// };

const mongoDB = async () => {
    try {
        // Connect to the MongoDB server
        // await mongoose.connect(mongoURI, {
        //     // useNewUrlParser: true,
        //     // useUnifiedTopology: true
        //     useFindAndModify: false,
        //     useCreateIndex: true
        // });
        // console.log("Connected");
        await mongoose.connect(mongoURI); // No need for deprecated options

        console.log("Connected to MongoDB");

        // Fetch data from the "food_items" collection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const food_Category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        // Log the fetched data //write fetched _data
        // console.log();
        // if(err) console.log(err);
        // else{
        //     global.food_items=data;
        //     // console.log(global.food_items);
        // }
            global.food_items= fetched_data;
            global.foodCategory= food_Category;
            // console.log(global.food_Category);

    } catch (err) {
        // Handle errors
        // console.log("----", err);
        console.error("MongoDB connection error:", err);
    }
};


// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Connected");

//         const fetched_data = await mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(function(err,data){
//             if(err) console.log(err);
//             else console.log(data);
//         })
//     } catch (err) {
//         console.log("----", err);
//     }
// };


// const mongoDB = async()=>{
//     await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,reult)=>{
//         if(err)console.log("----",err)
//             else{
//         console.log("connecetd");
//     }
//     });
// };
module.exports = mongoDB;

