const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes =  require('./routes/routes');
const user_routes = require('./routes/userAuthRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://safw:allsafe21@notesapp-mxoqw.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true})
    .then((connect)=>{
        console.log('connection to database established ')
    }).catch((error)=>{
        console.error(error)
    });


app.use('/auth', user_routes);    
app.use('/api', routes);

app.listen(process.env.PORT || 5000);
