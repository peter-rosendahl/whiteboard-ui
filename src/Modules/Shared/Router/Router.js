import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Login from './../../User/Login/Login';
import Register from './../../User/Register/Register';
import Overview from './../../Whiteboard/Overview';
import Profile from './../../User/Profile/Profile';

const Router = () => (
    // <Container className='main'>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/register' component={Register}></Route>
                <Route path='/whiteboard' component={Overview}></Route>
                <Route path='/profile' component={Profile}></Route>
            </Switch>
        </BrowserRouter>
    // </Container>
);

export default Router;