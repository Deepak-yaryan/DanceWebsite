// Backend Tutorial : Saving data to the database using Pug + NodeJs
const express = require('express')
const path = require('path')
const fs = require('fs')
let mongoose = require('mongoose')
const bodyparser = require("body-parser");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/contactDance");
const port = 80;

//Define mongoose Schema
let contactSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    address: String,
    desc: String,
});

let Contact = mongoose.model("Contact", contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const con = "This is the best content available on the internet so far so use it wisely";
    const params = {title: 'PubG is the best game', content: con};
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const con = "This is the best content available on the internet so far so use it wisely";
    const params = {title: 'PubG is the best game', content: con};
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the datbase");
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database");
    });
})

app.listen(port, ()=>{
    console.log(`This application is started succesfully on port ${port}`);
})