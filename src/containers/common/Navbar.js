import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <> 
            <ul className="navbar-nav">
            <li className="nav-item d-none d-sm-inline-block">
                <a href="" className="nav-link active"> </a>
            </li>
            </ul>

            <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-user"></i>
                
                </a>
                
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                
                <a href="" className="dropdown-item">
                <i className="fas fa-sign-out-alt"></i> Logout
                    <span className="float-right text-muted text-sm"></span>
                </a>
                <div className="dropdown-divider"></div>
                
                </div>
                
            </li>
            </ul>
            </>
         );
    }
}
 
export default Navbar;