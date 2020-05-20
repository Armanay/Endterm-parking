
import React, {useEffect, useState} from 'react';
import '../../App.css';
import { Form, Button } from 'react-bootstrap';
import Menu from "../menu";
import {registration} from "../../store/actions/auth";
import {connect} from "react-redux";
import {withRouter} from "react-router";

function Registration(props) {


    const [regForm, setRegForm] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        phone: ''
    });

    const changeForm = e =>{
        setRegForm({...regForm, [e.target.name]: e.target.value})
    };

    const sendForm = () => {
        props.registration(regForm);
        setRegForm({
            username: '',
            password: '',
            name: '',
            surname: '',
            phone: ''
        })
    };
    useEffect(() => {
    }, [props.authReducer.loggedIn, props.authReducer.isLogged]);
    return (
        <div>
            <Menu/>
            <div className="container container-row">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="username" name="username" value={regForm.username} onChange={changeForm} />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="name" name="name" value={regForm.name} onChange={changeForm} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="surname" placeholder="surname" name="surname" value={regForm.surname} onChange={changeForm}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="phone" name="phone" value={regForm.phone} onChange={changeForm}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={regForm.password} onChange={changeForm}/>
                    </Form.Group>
                    <Button variant="primary" onClick={sendForm}>
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
    registration,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Registration))

