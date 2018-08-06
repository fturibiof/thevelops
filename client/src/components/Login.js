import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../actions/authActions';
const isEmpty = require('lodash.isempty');

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      errors:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/getcar');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/getcar');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


  onChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event){
    event.preventDefault();

    const user = {
      email : this.state.email,
      password : this.state.password
    };
    this.props.loginUser(user);

  }


  render() {
    const errors = this.state;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit} action="/getcar">
          <div className="form-row">
            <div className="form-group col-md-4">
              <input type="text" name="email" className={classnames("form-control", {'is-invalid': errors.email})} value={this.state.email} onChange={this.onChange} placeholder="email@email.com"/>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input type="text" name="password" className={classnames("form-control", {'is-invalid': errors.password})} value={this.state.password} onChange={this.onChange} placeholder="password"/>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-lg">Login</button>
          </div>
        </form>
        <Link to='/create'>
          <button className='btn btn-lg'>
            Sign Up
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, {loginUser})(Login);
