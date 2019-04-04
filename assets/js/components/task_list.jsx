import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TaskList = (props) => {
  let {root, tasks, users} = props;
  tasks = _.map(tasks, (t) => <Task key={t.id} users={users} root={root} task={t} />);
  return <div className="container">
    <div className="row">
      <h2></h2>
    </div>
    <div className="row">
      <h2>Tasks List</h2>
    </div>
    <div className="row">
      {tasks}
    </div>
  </div>;
}

function Task(props) {
  let {root, task, users} = props;
  let user = ""
  if (task.user_id) {
    users = _.filter(users, (u) => task.user_id === u.id);
    if (users[0]) {
      user = users[0].email;
    }
  }
  let completed = "No"
  let button = <button className="btn btnView" onClick={() => root.mark_complete(task)}>Mark Complete</button>;
  let timeTitle = "Enter New Time Taken:";
  let trackTime = <input type="number" value={task.time} step="15" onChange={(ev) => root.track_time(task, ev.target.value)}/>;
  let line = <br/>;
  if (task.complete) {
    completed = "Yes"
    button = ""
    timeTitle = ""
    trackTime = ""
    line = ""
  }
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">
      {task.desc}
      <br/>
      User: {user}
      <br/>
      Time: {task.time}
      <br/>
      Completed: {completed}
      {line}
      {button}
      {line}
      {timeTitle}
      {trackTime}
      </p>
    </div>
  </div>;
}

function state2props(state) {
  return {
    tasks: state.tasks,
    users: state.users
  }
}
export default connect(state2props)(TaskList);
