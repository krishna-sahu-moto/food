import { useState } from "react"
import React   from 'react'
import { Link,useNavigate } from "react-router-dom"

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
      // http://localhost:5000/api/LoginUser
    const response = await fetch(" https://food-backend-l0nx.onrender.com", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);


    
    if (!json.success) {
      alert("Failed to create account")
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');
    }
    // else {
    //   alert("successful")
    // }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      {/* <div className="container">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
          

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/CreateUser' className='m-3 btn btn-danger '>I' am a User</Link>
        </form>
      </div> */}
       <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Welcome Back!</h2>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            <i className="fas fa-envelope"></i> Email address
          </label>
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
          <label htmlFor="exampleInputPassword1">
            <i className="fas fa-lock"></i> Password
          </label>
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

        <button type="submit" className="btn btn-primary ">Login</button>
        <Link to="/CreateUser" className="m-3 btn btn-outline-light bg-danger">I am a new User</Link>
      </form>
    </div>
    </>
  )
}
