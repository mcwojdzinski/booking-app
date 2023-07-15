const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'damsd12312312mljhkjk'

app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGODB_URL)
app.get('/test', (req, res) => {
    res.json({message: 'Test response'});
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body

    try {
        const userDoc = await User.create({
            name, email, password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})


app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const userDoc = await User.findOne({email})

    if (userDoc) {
        const isPasswordSame = bcrypt.compareSync(password, userDoc.password)
        if (isPasswordSame) {
            jwt.sign({email: userDoc.email, id: userDoc._id, name: userDoc.name}, jwtSecret, {}, (err, token) => {
                if (err) throw err;

                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.json('pass not ok')
        }
    } else {
        res.json('Not found ')
    }
})

app.get('/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
