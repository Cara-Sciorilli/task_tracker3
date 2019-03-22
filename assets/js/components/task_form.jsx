import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

class TaskForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: props.users,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    })
    var data = JSON.stringify(object);

    $.ajax("/api/v1/tasks", {
      method: 'post',
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
    });
  }

  render() {
    let usersSelect = _.map(this.state.users, (u) => <option key={u.id} value={u.id}> {u.email} </option>);

    return (
      <div class="container">
        <div className="row">
          <h2></h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Enter Name: </label>
          <input id="name" name="name" type="name" />
          <br/>
          <label htmlFor="desc">Enter Description: </label>
          <input id="desc" name="desc" type="desc" />
          <br/>
          <label htmlFor="user_id">Select User: </label>
          <select id="user_id" name="user_id" type="user_id">
            {usersSelect}
          </select>
          <br/>
          <label htmlFor="time">Enter Time: </label>
          <input id="time" name="time" />
          <br/>
          <label htmlFor="complete">Is Completed?: </label>
          <select id="complete" name="complete" type="complete">
            <option value="false"> No </option>
            <option value="true"> Yes </option>
          </select>
          <br/>
          <button className="btn btn-info">Add New Task</button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
