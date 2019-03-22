import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-Freeze';

/*
  Application state layout

  //Session
  session: null, //{ token, user_id }

  //DB Caches
  tasks: props.tasks
