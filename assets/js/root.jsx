import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import Header from './components/header';
import UserList from './components/user_list';
import TaskList from './components/task_list';
import UserForm from './components/user_form';
import TaskForm from './components/task_form';

export default function root_init(node) {
  let tasks = window.tasks;
  /* TODO:
    ReactDOM.render(
      <Provider store={store}>
        <Root tasks={tasks} />
      </Provider>, node);
  */
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "", password: ""},
      session: null,
      tasks: props.tasks,
      users: [],
    };

    //this.fetch_tasks();
    this.fetch_users();
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
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
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      },
      error: () => {
        alert("Incorrect Username and Password")
      }
    });
  }

  mark_complete(task) {
    task.complete = true;
    $.ajax("/api/v1/tasks/"+task.id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task}),
      success: (resp) => {
        let newTasks = this.state.tasks.map((t) => {
          if (t.id === resp.data.id) {
            return resp.data
          }
          else {
            return t
          }
        })
        this.setState({tasks: newTasks});
      },
    });
  }

  handle_user_submit(event) {
    event.preventDefault();
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
    });
  }

  track_time(task, time) {
    task.time = time;
    $.ajax("/api/v1/tasks/"+task.id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task}),
      success: (resp) => {
        let newTasks = this.state.tasks.map((t) => {
          if (t.id === resp.data.id) {
            return resp.data
          }
          else {
            return t
          }
        })
        this.setState({tasks: newTasks});
      },
    });
  }

  logout() {
    this.update_login_form({email: "", password: ""})
    let state1 = _.assign({}, this.state, { session: null });
    this.setState(state1);
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
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }

  render() {
    return <Router>
      <div>
        <Header session={this.state.session} root={this}/>
        <Route path="/" exact={true} render={() =>
          <TaskList root={this} tasks={this.state.tasks} />
        } />
        <Route path="/users" exact={true} render={() =>
          <UserList users={this.state.users} />
        } />
        <Route path="/users/new" exact={true} render={() =>
          <UserForm root={this}/>
        } />
        <Route path="/tasks/new" exact={true} render={() =>
          <TaskForm users={this.state.users} root={this}/>
        } />
      </div>
    </Router>;
  }
}
