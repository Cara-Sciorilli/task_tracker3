import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

class TaskForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: props.users,
      root: props.root,
    }
  }

  render() {
    let usersSelect = _.map(this.state.users, (u) => <option key={u.id} value={u.id}> {u.email} </option>);

    return (
      <div class="container">
        <div className="row">
          <h2></h2>
        </div>
        <form onSubmit={this.state.root.handle_task_submit}>
          <label htmlFor="name">Enter Name: </label>
          <input id="name" name="name" type="name" />
          <br/>
          <br/>
          <label htmlFor="desc">Enter Description: </label>
          <input id="desc" name="desc" type="desc" />
          <br/>
          <br/>
          <label htmlFor="user_id">Select User: </label>
          <select id="user_id" name="user_id" type="user_id">
            {usersSelect}
          </select>
          <br/>
          <br/>
          <label htmlFor="time">Enter Time: </label>
          <input id="time" name="time" type="number" step="15"/>
          <br/>
          <br/>
          <label htmlFor="complete">Is Completed?: </label>
          <select id="complete" name="complete" type="complete">
            <option value="false"> No </option>
            <option value="true"> Yes </option>
          </select>
          <br/>
          <br/>
          <button className="btn btn-info">Submit New Task</button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
