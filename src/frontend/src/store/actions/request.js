import {
    ADD_VEHICLE,
    GET_PARKING,
    GET_USER_INFO,
    GET_USER_VEHICLES,
    GET_USERS,
    LEAVE,
    TAKE_PLACE,
    TAKEN_PLACES
} from './types'
import axios from 'axios'


export const getUserInfo = username => dispatch =>{
    axios.get(`/users/user/${username}`)
        .then(res => {
            dispatch({
                type: GET_USER_INFO,
                payload: res.data
            })
        })
        .catch(err => console.log(err.msg))
};

export const getAllUsers = () => dispatch =>{
    axios.get('/users')
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => console.log(err.msg))
};


export const getUserVehicles = id => dispatch =>{
    axios.get(`/vehicles/driver/vehicles/${id}`)
        .then(res => {
            dispatch({
                type: GET_USER_VEHICLES,
                payload: res.data
            })
        })
        .catch(err => console.log(err.msg))
};

export const getParkings = () => dispatch =>{
    axios.get('/parkings')
        .then(res => {
            dispatch({
                type: GET_PARKING,
                payload: res.data
            })
        })
        .catch(err => console.log(err.msg))
};

export const takePlace = (vehId, placeId) => dispatch =>{
    axios.post(`/takenPlaces/${vehId}/${placeId}`)
        .then(res => {
            dispatch({
                type: TAKE_PLACE
            })
        })
        .catch(err => console.log(err.msg))
};

export const takenPlaces = () => dispatch =>{
    axios.get('/takenPlaces')
        .then(res => {
            dispatch({
                type: TAKEN_PLACES,
                payload: res.data
            })
        })
        .catch(err => console.log(err.msg))
};

export const addVehicle = (vehicle) => dispatch =>{
    axios.post('/vehicles', vehicle)
        .then(res => {
            dispatch({
                type: ADD_VEHICLE
            })
        })
        .catch(err => console.log(err.msg))
};

export const leavePlace =  (id) => dispatch =>{
    axios.delete(`/takenPlaces/${id}`)
        .then(res => {
            dispatch({
                type: LEAVE
            })
        })
        .catch(err => console.log(err.msg))
};
