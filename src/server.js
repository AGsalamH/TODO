require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');

// Express app
const app = require('./app');

// Http Server
const server = http.createServer(app);


// Connect to DB
// Run the Server
(async () =>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    console.log('MONGODB Connected ...');

    server.listen(process.env.PORT, ()=> console.log(`Listening on PORT: ${process.env.PORT}`));

})()