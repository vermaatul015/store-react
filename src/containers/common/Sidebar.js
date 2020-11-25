import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link">
                <span className="brand-text font-weight-light">Homepage</span>
                </Link>

                <div className="sidebar">

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview">
                            <Link to="/create-store" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Create Store</p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link to="/store-list" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>View Store</p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link to="/create-order" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Create Order</p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link to="/order-list" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>View Order</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                </div>
            </aside>
         );
    }
}
 
export default Sidebar;