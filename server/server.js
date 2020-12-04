// import dependencies and initialize express
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const nameRoutes = require('./routes/names-route.js');
const healthRoutes = require('./routes/health-route.js');
const randomize = require('randomatic');
const cors = require('cors');

const app = express();

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

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

const usersRouter = require('./routes/usersRoutes');
const UsersController = require('./controllers/UsersControllers');

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

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



module.exports = app;
