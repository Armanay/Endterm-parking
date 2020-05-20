import {LOG_IN, LOG_OUT, REGISTRATION} from './types'
import axios from 'axios'

export const registration = (user) => dispatch =>{
    axios.post('/users', user)
        .then(res => {
            console.log("Response: ", res, res.data)
            dispatch({
                type: REGISTRATION
            });
            setTimeout(() =>{
                dispatch({
                    type: REGISTRATION,
                })
            }, 1000)
        })
        .catch(err => console.log(err))
};

export const logIn = (user) => dispatch =>{
    axios.post('/auth', user)
        .then(res => {
            console.log("here!", res.headers);

            localStorage.setItem('access_token', res.headers.authorization);
            dispatch({
                type: LOG_IN,
                payload: res.headers.authorization
            });
        })
        .catch(err => console.log(err))
};

export const logOut = () => dispatch =>{
    dispatch({
        type: LOG_OUT
    })
};