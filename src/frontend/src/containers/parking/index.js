import React, {useEffect, useState} from 'react';
import '../../App.css';
import {Table, Dropdown, Form, Button} from 'react-bootstrap';
import Menu from "../../components/menu";
import {getParkings, takePlace} from "../../store/actions/request";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

const onMount = props => () => {
    props.getParkings();
};

function Parking(props) {

    const {isLogged} = props.authReducer;
    const [takeForm, setTakeForm] = useState({
      place_id: null,
      vehicle_id: null
    });

    const changeForm = e =>{
        setTakeForm({...takeForm, [e.target.name]: e.target.value})
    };

    const sendForm = () => {
        props.takePlace(takeForm.vehicle_id, takeForm.place_id);
        setTakeForm({
            place_id: '',
            vehicle_id: ''
        })
    };

    const {parking} = props.requestReducer;
    useEffect(onMount(props), []);
    const isLoggedIn = (
        <Form>
            <Form.Group >

                <Form.Label>Place id</Form.Label>
                <Form.Control name="place_id" type="place_id" placeholder="place_id" value={takeForm.place_id} onChange={changeForm}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="vehicle_id" type="vehicle_id" placeholder="vehicle_id" value={takeForm.vehicle_id} onChange={changeForm}/>
            </Form.Group>

            <Button  variant="primary" onClick={sendForm} >
                Submit
            </Button>
        </Form>
    );

    return (
      <div>
         <Menu/>
          <div className="container container-row">
              <Table striped bordered hover variant="dark">
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Address</th>
                      <th>Name</th>
                      <th>Places</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      parking.map(item =>(
                              <tr>
                                  <td>{item.id}</td>
                                  <td>{item.address}</td>
                                  <td>{item.name}</td>
                                  <td><Dropdown>
                                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                                          place
                                      </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                              {
                                                  item.places.map(data => (

                                                  <Dropdown.Item><span>{data.status ? data.id : `not free ${data.id}`}</span></Dropdown.Item>
                                                  ))
                                              }
                                      </Dropdown.Menu>

                                  </Dropdown></td>
                              </tr>
                      ))
                  }
                  </tbody>
              </Table>
              <div>
                  {isLogged ? isLoggedIn: ""}
              </div>
          </div>
      </div>
    );
}

const mapStateToProps = state => ({
    requestReducer:state.requestReducer,
    authReducer:state.authReducer,
});

const mapDispatchToProps = {
    getParkings,
    takePlace

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Parking))

