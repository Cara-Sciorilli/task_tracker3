import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function UserList(props) {
  let rows=_.map(props.users, (u) => <User key={u.id} user={u} />);
  return <div class="container">
  <div className="row">
    <h2></h2>
  </div>
  <div className="row">
    <h2></h2>
  </div>
  <div className="row">
    <h2>Users List</h2>
  </div>
  <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>
  </div>;
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
  </tr>;
}
