import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as appConfig from '../../../appConfig.json';
import './Register.css'

class Register extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onBackToLoginClick = this.onBackToLoginClick.bind(this);
        
        this.emailInput = React.createRef();
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.repeatPasswordInput = React.createRef();
    }

    onFormSubmit = event => {
        event.preventDefault();
        const formValue = {
            username: this.usernameInput.current.value,
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value
        }

        // TODO: Validate values before checking database.
        if (formValue.username.length > 0 && formValue.password.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValue)
            };
            fetch(appConfig.connectionString + "/User/Register", requestOptions)
                .then(response => {
                    console.log('yaay', response);
                    this.props.history.push('/');
                })
        } else {
            console.log('error');
        }
    }

    onBackToLoginClick = event => {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <Container className='main'>
                <div className='login-wrapper'>
                    <Card>
                        <CardHeader title='Register'></CardHeader>
                        <CardContent>
                            <Form onSubmit={this.onFormSubmit}>
                                {/* <Form.Row> */}
                                    <Form.Group controlId='formGridEmail'>
                                        <Form.Label>Email</Form.Label>
                                        <input type='email' className='form-control' placeholder='E-mail' ref={this.emailInput} />
                                    </Form.Group>
                                    <Form.Group controlId='formGridUsername'>
                                        <Form.Label>Username</Form.Label>
                                        <input type='text' className='form-control' placeholder='Username' ref={this.usernameInput} />
                                    </Form.Group>
                                    <Form.Group controlId='formGridPassword'>
                                        <Form.Label>Password</Form.Label>
                                        <input type='password' className='form-control' placeholder='Password' ref={this.passwordInput} />
                                    </Form.Group>
                                    <Form.Group controlId='formGridRepeatPassword'>
                                        <Form.Label>Repeat Password</Form.Label>
                                        <input type='password' className='form-control' placeholder='Password' ref={this.repeatPasswordInput} />
                                    </Form.Group>
                                    <Grid container direction='row' justify='space-between'>
                                        <Button type='button' variant='contained' color='secondary' className='' onClick={this.onBackToLoginClick}><ArrowBackIcon /></Button>
                                        <Button type='submit' variant='contained' color='primary' className=''>Register</Button>
                                    </Grid>
                                {/* </Form.Row> */}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        )
    }
}

export default Register;