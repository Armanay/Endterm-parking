
import {LOG_IN, LOG_OUT, REGISTRATION} from '../actions/types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const initialState = {
    isLogged: false,
    loggedIn: false,
    username: ''
};

export default function (state=initialState, action){
    if (action.type === REGISTRATION) {
        return {
            ...state,
            loggedIn: !state.loggedIn
        }
    } else  if (action.type === LOG_IN) {
        const payload = jwt_decode(action.payload);
        console.log("REducer payload" + action.payload);
        if (payload.exp < new Date().getTime / 1000){
            return {
                ...state,
                isLogged: false,
            }
        }
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload}`;
        return {
            ...state,
            isLogged: true,
            username: payload.sub
        }
    } else  if (action.type === LOG_OUT) {
        localStorage.removeItem('access_token');
        delete axios.defaults.headers.common["Authorization"];
        return {
            ...state,
            isLogged: false,
        }
    }
    else {
        return state;
    }
}
