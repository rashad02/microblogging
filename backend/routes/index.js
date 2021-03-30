const routes = require('express').Router();
const {authCheck} = require('../helpers/auth.helpers.js');

// Importing all routes
const homeRouter = require('./home.routes.js');
const postRouter = require('./post.routes.js');

// routes.use('/', authCheck(req, res, next));

routes.use('/', homeRouter);

routes.use('/post/', postRouter);

// Exporting all routes together
module.exports = routes;
