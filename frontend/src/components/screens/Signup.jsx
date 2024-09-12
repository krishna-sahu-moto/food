import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Singup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    // http://localhost:5000/api/createuser
    const response = await fetch("https://food-backend-l0nx.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation, phone: credentials.phone })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Failed to create account")
    }
    else {
      alert("successful")
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-group">
            <label htmlFor ="name">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />

          </div>
          <div className="signup-form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="signup-form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" placeholder="Address" />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/login' className='m-3 btn btn-danger '>Already a User</Link>
        </form>
      </div>
      {/* <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="geolocation">Address</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
            placeholder="Enter your address"
          />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div> */}
    </>
  )
}
