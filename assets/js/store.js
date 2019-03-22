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
  return state;
}

function users(state = [], action) {
  return state;
}

function session(state = null, action) {
  return state;
}

function login_form(state = {email: "", password: ""}, action) {
  return state;
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, session, login_form});
  let state1 = reducer(state0, action);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
