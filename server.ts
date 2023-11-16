import {app} from './app'
import connectDB from './utils/db';
require("dotenv").config();

//create server
app.listen(process.env.PORT,()=>{
    console.log(`server port is ${process.env.PORT}`)
    connectDB();
});