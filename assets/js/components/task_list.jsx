import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function TaskList(props) {
  // TODO:
  //let {tasks, dispatch} = props;
  let {root, tasks} = props;
  tasks = _.map(tasks, (t) => <Task key={t.id} root={root} task={t} />);
  return <div class="container">
    <div className="row">
      <h2></h2>
    </div>
    <div className="row">
      <h2>Tasks List</h2>
    </div>
    <div className="row">
      {tasks}
    </div>
    <Link to={"/tasks/new"}><button className="btn btnNew">Add New Task</button></Link>
    <Link to={"/users/new"}><button className="btn btnView">Register New User</button></Link>
  </div>;
}

function Task(props) {
  let {root, task} = props;
  let completed = "No"
  if (task.complete) {
    completed = "Yes"
  }
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">
      {task.desc}
      <br/>
      User: {task.user_id}
      <br/>
      Time: {task.time}
      <br/>
      Completed: {completed}
      <br/>
      <button className="btn btnView" onClick={() => root.mark_complete(task)}>Mark Complete</button>
      <br/>
      Enter New Time Taken:
      <input placeholder="time" onChange={(ev) => root.track_time(task, ev.target.value)} />
      </p>
    </div>
  </div>;
}
