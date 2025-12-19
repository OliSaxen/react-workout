import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jsonFile from '../../assets/workout.json';

export class Users extends Component {
  render() {
    const { users } = jsonFile;

    return (
      <main className='App-users'>
        <h2>Users:</h2>

        {users && users.length > 0 ? (
          <div className='users-list'>
            {users.map((user) => (
              <Link
                key={user.userId}
                to={`/profile/${user.userId}`}
                className='user-card-link'
              >
                <div className='user-card'>
                  <h3>
                    {user.profile.firstName} {user.profile.lastName}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </main>
    );
  }
}

export default Users;
