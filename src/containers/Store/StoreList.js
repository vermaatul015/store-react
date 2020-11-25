import React, { Component } from 'react';
import fireDB from '../../firebase'

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stores : ''
         }
    }
    componentDidMount(){
        fireDB.child('store').on('value',snapshot => {
            
            this.setState({
                stores : snapshot.val()
            })
        })
    }
    getList = () => {
        var html = '';
        if(this.state.stores){
            let c = 1;
            html = [];
            for(var i in this.state.stores){
                html.push(<tr  key={i}>
                            <td>{c++}</td>
                            <td>{this.state.stores[i]['store_name']}</td>
                            <td>
                                <img style={{height: "10%"}} src={this.state.stores[i]['store_image']} />
                            </td>
                            <td>{this.state.stores[i]['lat']}</td>
                            <td>{this.state.stores[i]['long']}</td>
                        </tr>)
            }
        }else{
            html = <tr>
                        <td colSpan="5">No records found</td>
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
                                            Store List
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
                                                    <th>Store Name</th>
                                                    <th>Store Image</th>
                                                    <th >Latitude</th>
                                                    <th >Longitude</th>
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
 
export default StoreList;