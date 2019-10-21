const express = require('express');
const quizCRUDApiRoutes = require('./quiz_crud_routes');
const gameSessionApiRoutes = require('./game_session_routes');
const categoryApiRoutes = require('./category_routes');
const checkTokenMiddleware = require('../../utils/auth').checkTokenMiddleware;

const Router = express.Router();

//  Check the JWT token
// Router.use(checkTokenMiddleware);

// Merge all API routes
Router.use([quizCRUDApiRoutes, categoryApiRoutes, gameSessionApiRoutes]);

module.exports = Router;
