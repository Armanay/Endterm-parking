
import React, {useEffect, useState} from 'react';
import '../../App.css';
import { Form, Button } from 'react-bootstrap';
import Menu from "../menu";
import {addVehicle, getUserInfo, getAllUsers} from "../../store/actions/request";
import {connect} from "react-redux";
import {withRouter} from "react-router";

const onMount = (props,username) => () => {
    props.getUserInfo(username);
};


function Vehicle(props) {
    const {username} = props.authReducer;
    const {user} = props.requestReducer;
    useEffect(onMount(props, username), []);

    const [vehForm, setVehForm] = useState({
        model: '',
        nomer: '',
        driver: null
    });



    const changeForm = e =>{
        setVehForm({...vehForm,
            driver: {
                id: user.id,
                name: user.name,
                username: user.username,
                surname: user.surname,
                phone: user.phone
            },
            [e.target.name]: e.target.value})
    };

    const sendForm = () => {
        console.log("ussssserrr" + user.id);
        props.addVehicle(vehForm);
        setVehForm({
            model: '',
            nomer: '',
            driver: {}
        })
    };

    return (
        <div>
            <Menu/>
            <div className="container container-row">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="model" placeholder="model" name="model" value={vehForm.model} onChange={changeForm} />

                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nomer</Form.Label>
                        <Form.Control type="nomer" placeholder="nomer" name="nomer" value={vehForm.nomer} onChange={changeForm} />
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
    requestReducer:state.requestReducer,
    authReducer:state.authReducer,
});

const mapDispatchToProps = {
    addVehicle,
    getUserInfo,
    getAllUsers

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Vehicle))

