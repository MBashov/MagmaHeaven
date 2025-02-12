import express from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'; 
import expressSession from 'express-session'; 


//* Db set up
try {
    // TODO: Change db name 
    await mongoose.connect('mongodb://localhost:27017/MagmaHeaven');
    console.log('DB conected succesfully!');
} catch (err) {
    console.log('Cannot conect to DB!');
    console.error(err.message);
}


//* Express set up
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false })); // Learn express to parse form data
app.use(cookieParser());


//* Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));