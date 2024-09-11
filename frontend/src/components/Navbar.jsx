import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Card from './screens/Card';

import { useDispatchCart,useCart } from './ContextReducer';




export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    let fetched_data = useCart();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    return (
        <div className="bg-success" style={{}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary " >
                <div className="container-fluid  "   >
                    <Link style={{ fontSize: "30px", fontFamily: "cursive", }} className="navbar-brand" href="#">Mahakal-Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <a className="nav-link active fs-5" aria-current="page" href="#">Home</a>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>

                                : ""}


                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>

                                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/CreateUser">Signup</Link>
                                {/* <a className="nav-link" href="#">Singup</a> */}


                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                {/* <div className='btn bg-white text-success mx-2' onClick={() => setCartView(!cartView)}> */}
                                My Cart {""}
                                    <Badge pill bg='danger'>{fetched_data.length}</Badge>
                                </div>
                               {cartView ? <Modal onClose={() => setCartView(false)}><Card/><div>kjgkjgkjg</div></Modal> : null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
