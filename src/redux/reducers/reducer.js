  
import { combineReducers } from 'redux';
import post from './post-reducer.js';
import user from './user-reducer.js';

const rootReducer = combineReducers({
    post,
    user
});


export default rootReducer;