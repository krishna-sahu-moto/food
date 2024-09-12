require('dotenv').config();
const express = require('express')
// const mongoDB = require('./db')
const mongoDB = require('./db')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
mongoDB();

app.use((req,res,next)=>{
  // http://localhost:5174 
  res.setHeader("Access-Control-Allow-Origin", "https://food-frontend-1fg6.onrender.com");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  
})

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
// app.use('/api',require("./Routes/MyOrder"));
app.get('/', (req, res) => {
  res.send('anil hello')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend's origin
  credentials: true               // Allow credentials (cookies, authorization headers, etc.)
}));
