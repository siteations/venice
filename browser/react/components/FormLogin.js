import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login } from '../action-creators/userActions.js';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
      <h3 className="BornholmSandvig">Login to Add or Edit Map Elements</h3>
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-default">{message}</button>
          </form>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const credentials = {
      name: event.target.name.value,
      password: event.target.password.value
    };
    this.props.login(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log In To Edit' });

const mapDispatch = dispatch => ({
  login: (credentials) => {
    dispatch(login(credentials));

  },
})

export default connect(mapState, mapDispatch)(Login);
