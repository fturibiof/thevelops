import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { createUser } from '../actions/authActions';

class Create extends Component {
  constructor(){
    super();
    this.state = {
      email:'',
      first_name:'',
      last_name:'',
      personal_phone:'',
      password:'',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
   if (this.props.auth.isAuthenticated) {
     this.props.history.push('/dashboard');
   }
 }

 componentWillReceiveProps(nextProps) {
   if (nextProps.errors) {
     this.setState({ errors: nextProps.errors });
   }
 }


  onChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  onSubmit(event){
    event.preventDefault();

    const newUser = {
      email : this.state.email,
      first_name : this.state.first_name,
      last_name : this.state.last_name,
      personal_phone : this.state.personal_phone,
      password : this.state.password
    };
    this.props.createUser(newUser);
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="container">
        <h1>Create User</h1>
        <form onSubmit={this.onSubmit}>
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
              <input type="text" name="first_name" className={classnames("form-control", {'is-invalid': errors.first_name})} value={this.state.first_name} onChange={this.onChange} placeholder="First Name"/>
            </div>
            {errors.first_name && (
              <div className="invalid-feedback">{errors.first_name}</div>
            )}
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input type="text" name="last_name" className={classnames("form-control", {'is-invalid': errors.last_name})} value={this.state.last_name} onChange={this.onChange} placeholder="Last Name"/>
              {errors.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input type="text" name="personal_phone" className={classnames("form-control", {'is-invalid': errors.personal_phone})} value={this.state.personal_phone} onChange={this.onChange} placeholder="Personal Phone"/>
              {errors.personal_phone && (
                <div className="invalid-feedback">{errors.personal_phone}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input type="text" name="password" className={classnames("form-control", {'is-invalid': errors.password})} value={this.state.password} onChange={this.onChange} placeholder="Password"/>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}

            </div>
          </div>
          <button type="submit" className="btn btn-lg">Submit</button>
        </form>
</div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, {createUser})(Create);
