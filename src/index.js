const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://webfaria:v6d3v6@cluster0-irhas.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3333);