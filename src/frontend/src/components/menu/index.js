
import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import { connect } from 'react-redux'
import '../../App.css';
import { Button} from 'react-bootstrap';
import {logOut} from "../../store/actions/auth";
import {Link} from "react-router-dom";

function Menu(props) {

    useEffect(() => {
    }, [props.authReducer.loggedIn, props.authReducer.isLogged]);


    const {isLogged} = props.authReducer;
    const isLoggedIn = (
        <>
            <Link to={'/userInfo'}><Button variant="secondary">Profile</Button></Link>
            <Link to={'/'}><Button variant="success">List of all Parking</Button></Link>
            <Link to={'/newVehicle'}><Button variant="warning">Add Vehicle</Button></Link>
            <Button variant="danger" onClick={props.logOut}>Sign out</Button>
            </>
    );

    const isNotLoggedIn = (
        <>
            <Link to={'/'}><Button variant="success">List of all Parking</Button>{' '}</Link>
            <Link to={'/auth'}><Button variant="primary">Log in</Button>{' '}</Link>
            <Link to={'/registration'}><Button variant="warning">Registration</Button>{' '}</Link>
        </>
    );

    return (
           <header className="header-menu">
                   {isLogged ? isLoggedIn : isNotLoggedIn}
           </header>
    );
}

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

const mapDispatchToProps = {
    logOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Menu))
