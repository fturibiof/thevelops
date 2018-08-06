import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GetCar extends Component {
  render(){
    // const postCar = this.state.car
    return (
      <div className="container">
        <h1>Get User Cars</h1>
        <div className="row border p-3 my-4">
          <img src="" alt="Carro" className="col-md-4 border mr-2"/>
          <ul className="list-group-flush col-md-4 ">
            <li className="list-group-item">{}</li>
            <li className="list-group-item">{}</li>
            <li className="list-group-item">{}</li>
            <li className="list-group-item">{}</li>
            <li className="list-group-item">{}</li>
          </ul>
          <div className="btn-group-vertical col-md-3">
            <button type="button" className="btn btn-block my-2">Edit</button>
            <button type="button" className="btn btn-block my-2">Delete</button>
          </div>
        </div>
        <div className="row">
          <Link to="/editUser">
            <button type="button" className="btn col-md-3 mt-4 mr-5">Edit User</button>
          </Link>
          <Link to="/editPassword">
            <button type="button" className="btn col-md-3 mt-4 mr-5">Edit Password</button>
          </Link>
          <Link to="/">
            <button type="button" className="btn col-md-3 mt-4 mr-5">Log Out</button>
          </Link>
          <Link to="/addCar">
            <button type="button" className="btn col-md-2 mt-4 mr-5">Add Car</button>
          </Link>
        </div>
      </div>

    );
  }
}

export default GetCar;
