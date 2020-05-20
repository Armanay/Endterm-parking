
import {
    ADD_VEHICLE,
    GET_PARKING,
    GET_USER_INFO,
    GET_USER_VEHICLES,
    GET_USERS, LEAVE,
    TAKE_PLACE,
    TAKEN_PLACES
} from '../actions/types'

const initialState = {
    user: {},
    vehicles: [],
    parking: [],
    users: [],
    takePlace : [],
    takenPLaces: [],
    places: []
};

export default function (state=initialState, action){
    if (action.type === GET_USER_INFO) {
        console.log("zddeeeeee" + action.payload);
        return {
            ...state,
            user: action.payload,
            vehicles :action.payload.vehicles,

        }
    }else if (action.type === GET_USER_VEHICLES) {
        return {
            ...state,
            user:{
                ...state.user,
                vehicles: action.payload
            }
        }
    }else if (action.type === GET_PARKING) {
        return {
            ...state,
            parking: action.payload

        }
    }else if (action.type === ADD_VEHICLE) {
        return {
            ...state,
            vehicles: [...state.vehicles, action.payload]
        }
    }else if (action.type === TAKE_PLACE) {
        return {
            ...state,
                takePlace: [...state.takePlace, action.payload]
        }
    }else if (action.type === GET_USERS) {
        return {
            ...state,
            users: action.payload
        }
    }else if (action.type === TAKEN_PLACES) {
        return {
            ...state,
            takenPLaces: action.payload
        }
    }else if (action.type === LEAVE) {
        return {
            ...state,
            takenPLaces: remove(state.takenPLaces, action.payload)
        }
    }
    else {
        return state;
    }
}

function remove(list, id) {
    for(let i = list.length - 1; i >= 0; i--) {
        if(list[i].id === id) {
            list.splice(i, 1);
            break
        }
    }
    return [...list]
}

