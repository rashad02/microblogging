import * as ActionTypes from '../actions/action-types.js';

// const INITIAL_STATE = {
//     employees: data
// };


const user = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.LOGGED_IN:
          return action.payload
        case ActionTypes.LOGGED_OUT:
          return action.payload
        default:
          return state
      }
  }
  
  export default user;