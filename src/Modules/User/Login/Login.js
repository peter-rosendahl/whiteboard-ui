import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import { Container } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Member from './../../../Models/Member';
import ModalMessage from '../../Shared/ModalMessage';
import * as appConfig from './../../../appConfig.json';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        
        // this.userName = React.createRef();
        // this.passWord = React.createRef();

        this.state = {
            username: '',
            password: '',
            loading: false,
            openModal: false
        }
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.state.username, password: this.state.password})
            };
            fetch(appConfig.connectionString + "/User/Login", requestOptions)
                .then(data => data.json())
                .then(response => {
                    this.setState({loading: false});
                    if (typeof response !== 'undefined' && typeof response.token !== 'undefined') {
                        Member.setId(response.id);
                        Member.setName(response.username);
                        Member.setToken(response.token);
                        this.props.history.push({
                            pathname: '/whiteboard',
                            state: { detail: response }
                        });
                    } else {
                        this.setState({openModal: true});
                    }
                })
            // this.props.history.push(`/whiteboard`);
        } else {
            console.log('error');
        }
    }

    onCloseModal = () => {
        console.log('closing modal');
        this.setState({openModal: false});
    }

    onInputChange = (e, target) => {
        if (target === 'username') {
            this.setState({
                username: e.target.value
            })
        } else {
            this.setState({
                password: e.target.value
            })
        }
    }

    onRegisterClick = event => {
        this.props.history.push(`/register`);
    }

    render() {
        return (
            <Container className='main'>
                <div className='login-wrapper'>
                    <Card>
                        <CardHeader title='Whiteboard login'></CardHeader>
                        <CardContent>
                            <Form onSubmit={this.onFormSubmit}>
                                {/* <Form.Row> */}
                                    <Form.Group controlId='formGridUsername'>
                                        <TextField 
                                            label="Username"
                                            value={this.state.username} 
                                            // ref={this.userName}
                                            onChange={(e) => this.onInputChange(e, 'username')}
                                            />
                                    </Form.Group>
                                    <Form.Group controlId='formGridPassword'>
                                        <TextField 
                                            label="Password" 
                                            value={this.state.password}
                                            type='password' 
                                            // ref={this.passWord}
                                            onChange={(e) => this.onInputChange(e, 'password')}
                                            />
                                    </Form.Group>
                                    <Grid container direction='row' justify='space-between'>
                                        <Button type='button' className='' onClick={this.onRegisterClick}>Register</Button>
                                        <Button disabled={!(this.state.username.length !== 0 && this.state.password.length !== 0)} type='submit' variant='contained' color='primary' className=''>
                                            {this.state.loading && <CircularProgress size={24} color="white" />}
                                            {this.state.loading === false && <React.Fragment>Login</React.Fragment>}
                                        </Button>
                                    </Grid>
                                {/* </Form.Row> */}
                            </Form>
                        </CardContent>
                    </Card>
                    {this.state.openModal && 
                        <ModalMessage
                            open={true}
                            headline="Login error" 
                            content="The provided login credentials do not match a registered member in our  database."
                            onClose={this.onCloseModal}></ModalMessage>
                    }
                </div>
            </Container>
        )
    }
}

export default Login;