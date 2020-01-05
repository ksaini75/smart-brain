const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');
const register = require('./controllers /register');
const signin = require('./controllers /signin');
const profile = require('./controllers /profile');
const image = require('./controllers /image');

const db = knex ({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: '',
      password: '',
      database: 'smart-brain'
      // connectionString : process.env.DATABASE_URL,
      // ssl: true,
    }
  });

db.select('*').from('users').then(data => {
    // console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res)=>{res.send('it is working');})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register',(req,res) => { register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handledProfileGet(req,res,db)})

app.put('/image', (req, res) => {image.handledImage(req,res, db)})

app.post('/imageurl', (req, res) => {image.handledApiCall(req,res)})




app.listen(process.env.PORT || 3000,() => {

    console.log(`app is running on port  `);

    // ${process.env.PORT}
});

console.log(3000);


/*
/ --> res = this is working 
/signin route to display the signin page (POST request): display user info
/sigin --> POST request either sucess or fail
/register --> POST request will display the user option
/profile/:userID --> GET user information : display a unique user's profile
/image --> PUT --> updated user object


 */