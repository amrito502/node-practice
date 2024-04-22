import express from "express";
import models from "./models/index.js";
import mongoose from "mongoose";


const port = 3000;
const app = express();

app.use(express.json());

const log = (msg) => console.log(msg);

const connectDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(connectDB, {useNewUrlParser: true, useUnifiedTopology:true})


    let db = mongoose.connection;

    db.on('err', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
    res.send('hello world ' + req.query.id);
});

app.post('/', (req, res) => {
    const body = req.body;
    const user = new models.User({username : body.username, createdAt : new Date() });
    user.save().then((saveUser) => {
        res.status(201).send('User Saved. id: ' + saveUser._id);
    }).catch((error) => {
        res.send('User Saved. id: ' + saveUser._id);
    });
    res.status(500).send(error);
});

app.listen(port, () => {
    console.log("listening to" + port)
});


log(models);