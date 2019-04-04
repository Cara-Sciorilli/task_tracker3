import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';
import store from './store';

import Header from './components/header';
import UserList from './components/user_list';
import TaskList from './components/task_list';
import UserForm from './components/user_form';
import TaskForm from './components/task_form';

const history = createBrowserHistory();

function state2props(state) {
  return state;
}

export default function root_init(node, store) {
  let tasks = window.tasks;
  let ConnectedRoot = connect(state2props)(Root);
  ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
        <ConnectedRoot />
      </Provider>
    </Router>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "", password: ""},
    };

    this.fetch_tasks();
    this.fetch_users();

    this.handle_task_submit = this.handle_task_submit.bind(this)
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        })
      },
    });
  }

  login() {
    $.ajax("/api/v1/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(this.state.login_form),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        })
      },
      error: () => {
        alert("Incorrect Username and Password")
      }
    });
  }

  mark_complete(task) {
    event.preventDefault()
    task.complete = true;
    $.ajax("/api/v1/tasks/"+task.id, {
      method: "put",
      dataType: "json",
      headers: {"x-auth": this.props.session.token},
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task}),
      error: () => {
        alert("Need Authorization")
      },
      success: (resp) => {
        store.dispatch({
          type: 'TASK_EDIT',
          data: resp.data,
        })
      },
    });
  }

  handle_user_submit(event) {
    event.preventDefault()
    var formData = new FormData(event.target);
    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    })

    var data = JSON.stringify({user: object});
    $.ajax("/api/v1/users", {
      method: 'post',
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
      success: (resp) => {
        store.dispatch({
          type: 'USER_ADD',
          data: resp.data,
        })
        history.push("/users")
      },
      error: () => {
        alert("Username already exists")
      },
    });
  }

  handle_task_submit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    })
    var data = JSON.stringify({task: object});

    $.ajax("/api/v1/tasks", {
      method: 'post',
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
      headers: {"x-auth": this.props.session.token},
      error: () => {
        alert("Need Authorization")
      },
      success: (resp) => {
        store.dispatch({
          type: 'TASK_ADD',
          data: resp.data,
        })
        history.push("/")
      },
    });
  }

  track_time(task, time) {
    task.time = time;
    $.ajax("/api/v1/tasks/"+task.id, {
      method: "put",
      dataType: "json",
      headers: {"x-auth": this.props.session.token},
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task}),
      error: () => {
        alert("Need Authorization")
      },
      success: (resp) => {
        store.dispatch({
          type: 'TASK_EDIT',
          data: resp.data,
        })
      },
    });
  }

  logout() {
    this.update_login_form({email: "", password: ""})
    store.dispatch({
      type: 'CANCEL_SESSION',
    })
  }

  update_login_form(data) {
    let form1 = _.assign({}, this.state.login_form, data);
    let state1 = _.assign({}, this.state, { login_form: form1 });
    this.setState(state1);
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        })
      },
    });
  }

  render() {
    return <div>
        <Header root={this}/>
        <Route path="/" exact={true} render={() =>
          <TaskList root={this} />
        } />
        <Route path="/users" exact={true} render={() =>
          <UserList />
        } />
        <Route path="/users/new" exact={true} render={() =>
          <UserForm root={this} />
        } />
        <Route path="/tasks/new" exact={true} render={() =>
          <TaskForm root={this}/>
        } />
      </div>;
  }
}
