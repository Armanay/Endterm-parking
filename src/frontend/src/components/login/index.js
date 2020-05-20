
import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import '../../App.css';
import { Form,Button } from 'react-bootstrap';
import Menu from "../menu";
import {logIn} from '../../store/actions/auth'

function Login(props) {



    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const changeForm = e =>{
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    };

    const sendForm = () => {
        props.logIn(loginForm);
        setLoginForm({
            username: '',
            password: ''
        })
    };
    useEffect(() => {
    }, [props.authReducer.loggedIn, props.authReducer.isLogged]);
    return (
        <div>
            <Menu/>
            <div className="container container-row">
                <Form>
                    <Form.Group >

                    <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="username" placeholder="username" value={loginForm.username} onChange={changeForm}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" value={loginForm.password} onChange={changeForm}/>
                    </Form.Group>

                    <Button  variant="primary" onClick={sendForm} >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    authReducer:state.authReducer
});

const mapDispatchToProps = {
    logIn,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
