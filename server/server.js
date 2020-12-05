'use strict';
// import dependencies and initialize express
const fs = require('fs');
const express = require('express');
const app = express();
const randomize = require('randomatic');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const nameRoutes = require('./routes/names-route.js');
const healthRoutes = require('./routes/health-route.js');

//load middleware
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const usersRouter = require('./routes/usersRoutes');
const UsersController = require('./controllers/usersController');
const PORT = process.env.PORT || 3000;

function authentication(req,res,next){
    let xauth = req.get('x-auth-user');
    if(xauth){
        let id = xauth.split("-").pop();
        let userctrl = new UsersController();
        let user = userctrl.getUser(parseInt(id));
        if(user && user.token === xauth){
            req.uid = user.uid;
            next();
        }else{
            res.status(401).send('Not authorized');
        }
    }else{
        res.status(401).send('Not authorized');
    }
    
}

app.use('/api/users',authentication,usersRouter);

app.post('/api/login',(req,res)=>{
    if(req.body.email && req.body.password){
        console.log(req.body);
        let uctrl = new UsersController();
        let user = uctrl.getUserByCredentials(req.body.email,req.body.password);
        if(user){
            let token = randomize('Aa0','10')+"-"+user.uid;
            user.token = token;
            uctrl.updateUser(user);
            res.status(200).send({"token":token});
        }else{
            res.status(401).send('Wrong credentials');
        }
    }else{
        res.status(400).send('Missing user/pass');
    }
});

// app.get('/',(req,res)=>{
//     res.send('Users app práctica 4');
// });


app.listen(PORT, () => {
    console.log(`App UI available http://localhost:${PORT}`);
})



// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// if production, enable helmet
/* istanbul ignore if  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}

// access to static files
app.use(express.static(path.join('public')));

// routes and api calls
app.use('/health', healthRoutes);
app.use('/api/names', nameRoutes);

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
