import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import '../../App.css';
import Menu from "../menu";
import {getUserInfo, getUserVehicles, takenPlaces, leavePlace} from "../../store/actions/request";
import {Table} from "react-bootstrap";

const onMount = (props,username) => () => {
    props.getUserInfo(username);
    props.takenPlaces()
};

function Profile(props) {
    const {username} = props.authReducer;
    const {user, vehicles, takenPLaces} = props.requestReducer;


    useEffect(onMount(props, username), []);


    return (
        <div>
            <Menu/>

            <div className="container container-row">
                <div >
                    <span>Username: {user.username} <br/></span>
                    <span>Name: {user.name}<br/></span>
                    <span>Surname: {user.surname}<br/></span>
                    <span>Phone: {user.phone}<br/></span>
                    <span>User id: {user.id}<br/></span>
                </div>
                <div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Model</th>
                            <th>Nomer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            vehicles.map(item =>(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.model}</td>
                                    <td>{item.nomer}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
                <div>
                    <br/>
                    <br/>
                    <h3>Taken places</h3>
                    <br/>
                    <br/>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomer</th>
                            <th>Model</th>
                            <th>Place</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            takenPLaces.map(item =>(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.vehicle.nomer}</td>
                                    <td>{item.vehicle.model}</td>
                                    <td>{item.place.id}</td>
                                    <td>{item.date}</td>
                                    <td ><button onClick={() => props.leavePlace(item.id)}>Delete</button></td>

                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    authReducer:state.authReducer,
    requestReducer:state.requestReducer
});

const mapDispatchToProps = {
    getUserInfo,
    getUserVehicles,
    takenPlaces,
    leavePlace

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Profile))
