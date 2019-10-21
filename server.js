const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const passport = require('passport');
const session = require('express-session');
// Components
const StaticRouter = require('react-router-dom').StaticRouter;
const HomeRoute = require('./routes/home_route');
const webpackConfig = require('./webpack.config');
const ApiRouter = require('./routes/api');
const AppFront = require('./src/app').default;
const { ADMIN_PATH } = require('./utils/constant');
const AdminRouter = require('./routes/admin_routes');

const compiler = webpack(webpackConfig);
const { APP_PORT, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// Mongodb connection
mongoose.connect(`${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { useNewUrlParser: true });

// Express Server instance
const app = express();

// Express config
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'));
app.use(WebpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({ secret: 'quiz' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());

// Create routes
// app.use('/', HomeRoute);
app.use(`/${ADMIN_PATH}`, AdminRouter);
app.use('/api', ApiRouter);
app.get('*', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <AppFront />
    </StaticRouter>
  );

  res.render('index.pug', {
    app
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: true,
    message: err.message || 'error is occured.'
  });
});

// 404's route manager
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.listen(APP_PORT, _ => console.log(`-- APP IS RUNNING at http://localhost:${APP_PORT} --`));
