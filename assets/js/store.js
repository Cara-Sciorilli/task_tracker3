import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout

  //Session
  session: null, //{ token, user_id }

  //DB Caches
  tasks: props.tasks /List of Task
  users: [], //List of User

  //Forms
  login_form: {email: "", password: ""}
*/

//For each component of the state:
// * Function with the same Name
// * Default is the default value of that component

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    case 'TASK_ADD':
      return state.concat(action.data);
    case 'TASK_EDIT':
      return state.map((t) => {
        if (t.id === action.data.id) {
          return action.data;
        }
        else {
          return t;
        }
      })
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.data;
    case 'USER_ADD':
      return state.concat(action.data);
    default:
      return state;
  }
}

function session(state = {}, action) {
  switch (action.type) {
    case 'NEW_SESSION' :
      return action.data;
    case 'CANCEL_SESSION' :
      return {};
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, session});
  let state1 = reducer(state0, action);

  return state1;
}

let store = createStore(root_reducer);
export default store;
