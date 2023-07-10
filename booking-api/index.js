const express = require('express');
const cors = require('cors')

const app = express();


app.use(express.json()); // Middleware to parse JSON data

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.get('/test', (req, res) => {
    res.json({message: 'Test response'});
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    res.json({name, email, password});
})


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
