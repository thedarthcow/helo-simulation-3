import axios from 'axios'

const initialState = {

}

const GET_USER = 'GET_USER';

export function getUser(){
    const user = axios.get('/auth/user')
        .then( res => {
            return res.data;
        })
    return {
        type: GET_USER,
        payload: user
    }
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
            

        default:
            return state;
    }
}