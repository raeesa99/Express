const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
require('dotenv').config()

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

let books = [
    {title: 'ULYSSES', author: 'James Joyce'},
    {title: 'THE GREAT GATSBY', author: 'F Scott Fitzgerald'},
    {title: 'CATCH-22', author: 'Joseph Heller'}
];

// when we get a GET request to '/':
app.get('/', (req, res) =>{
    console.log(fetch);
    res.render('index', {pageName: 'Home'});
});

//when we get a POST request to '/':
app.post('/', (req, res) => {
    let { username, password } = req.body;
    res.redirect('/profile?username=' + username); 
});

app.get('/profile', (req, res) => {
    console.log(req.query);
    res.render('profile', {username: req.query.username});
});

app.post('/random-number', (req, res) => {
    let {max} = req.body;

    let randNum = Math.floor(Math.random() * max);

    res.status(200).send({randNum});
})

app.get('/api', async (req, res) => {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Manchester,GB&units=metric&appid=${process.env.API_KEY}`)
    data = await data.json();

    let obj = {
    description: data.weather[0].description,
    temp: data.main.temp,
    min: data.main.temp_min,
    max: data.main.temp_max
    }
    

    res.render('api', obj);

})

app.get('/books', (req, res) => {
    res.render('books', {books});
});

app.get('/books/:bookID', (req, res) => {
    res.render('book', books[req.params.bookID]);
});


app.get('/dadjokes', async (req, res) => {
    let data = await fetch('https://icanhazdadjoke.com/')
    // data = await data.json();
    console.log(data);

    res.render('dadjokes', {data});

})

//this final app.get MUST be at the bottom, before app.listen
//it checks does the page entered in the url exist? if not, error 404 page will show
//if url entered is any of those app.gets we have made in index.js, they will be displayed as normal
app.get('*', (req, res) => {
    res.render('404');
})


app.listen(4000, () => {
    console.log('app listening on http://localhost:4000');
});

//in terminal:
// npm i express-handlebars
// npx nodemon
//CTRL C to stop listening