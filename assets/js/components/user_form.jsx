import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      root: props.root,
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2></h2>
        </div>
        <form onSubmit={this.state.root.handle_user_submit}>
          <label htmlFor="email">Enter Email: </label>
          <input id="email" name="email" type="email" />
          <br/>
          <br/>
          <label htmlFor="password">Enter Password: </label>
          <input id="password" name="password" type="password" />
          <br/>
          <br/>
          <button className="btn btn-info">Submit New User</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
