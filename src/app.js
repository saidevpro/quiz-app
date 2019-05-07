import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateQuizPage from './pages/createquizpage';
import QuizzesPage from './pages/listofquizpage';
import UpdateQuizPage from './pages/updatequizpage';
import './app.scss';

React;

export default () => (
  <Router>
    <Switch>
      <Route exact path="/create/quiz" component={CreateQuizPage} />
      <Route exact path="/quizzes" component={QuizzesPage} />
      <Route exact path="/update/quiz/:id" component={UpdateQuizPage} />
    </Switch>
  </Router>
);
