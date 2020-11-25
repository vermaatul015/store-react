import React, { Component } from 'react';
import fireDB from '../../firebase'

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders : ''
         }
    }
    componentDidMount(){
        fireDB.child('order').on('value',snapshot => {
            
            this.setState({
                orders : snapshot.val()
            })
        })
    }
    getList = () => {
        var html = '';
        if(this.state.orders){
            let c = 1;
            html = [];
            for(var i in this.state.orders){
                html.push(<tr  key={i}>
                            <td>{c++}</td>
                            <td>{this.state.orders[i]['store_id']}</td>
                            <td>{this.state.orders[i]['order_number']}</td>
                            <td>{this.state.orders[i]['order_amount']}</td>
                        </tr>)
            }
        }else{
            html = <tr>
                        <td colSpan="4">No records found</td>
                    </tr>
        }
        return html;
    }
    render() { 
        return ( 
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <section className="col-lg-12 connectedSortable">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                            Order List
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        {/* <div className="card-header">
                                            <h3 className="card-title">Bordered Table</h3>
                                        </div> */}
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                    <th >#</th>
                                                    <th>Store</th>
                                                    <th>Order Number</th>
                                                    <th >Order Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {this.getList()}
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
         );
    }
}
 
export default OrderList;