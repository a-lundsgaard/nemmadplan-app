//import store from '../../store/store.js';
//import store, { history } from "Redux/store/store";


const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case 'SIGN_IN': return !state
    }

    return false;
}




export default loggedReducer