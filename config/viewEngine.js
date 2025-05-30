const path = require('path');
const express = require('express');

const configViewEngine = (app) =>{
    // config view engine
    app.set('view engine', 'ejs');
    app.set('views', path.join('./', 'views'));

    // config static files
    app.use(express.static(path.join('./', 'public')));
}

module.exports = configViewEngine;