import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { ADMIN_PATH } from '../utils/constant';
import NotFoundPage from './pages/notfoundpage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import CreateQuizPage from './pages/createquizpage';
import QuizzesPage from './pages/listofquizpage';
import UpdateQuizPage from './pages/updatequizpage';
import HomePage from './pages/homepage';
import GamePage from './pages/gamepage';
import './app.scss';

export const AdminApp = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path={`/${ADMIN_PATH}/register`} component={RegisterPage} />
    <Route exact path={`/${ADMIN_PATH}/login`} component={LoginPage} />
    <Route exact path={`/${ADMIN_PATH}/create/quiz`} component={CreateQuizPage} />
    <Route exact path={`/${ADMIN_PATH}/quizzes`} component={QuizzesPage} />
    <Route exact path={`/${ADMIN_PATH}/update/quiz/:id`} component={UpdateQuizPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/game/:plang" component={GamePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
