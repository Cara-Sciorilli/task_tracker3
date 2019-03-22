import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

class UserForm extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    })
    console.log(object)
    var data = JSON.stringify(object);
    console.log(data)
    $.ajax("/api/v1/users", {
      method: 'post',
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
    });
  }

  render() {
    return (
      <div class="container">
        <div className="row">
          <h2></h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Enter Email: </label>
          <input id="email" name="email" type="email" />
          <br/>
          <label htmlFor="password">Enter Password: </label>
          <input id="password" name="password" type="password" />
          <br/>
          <button className="btn btn-info">Register User</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
