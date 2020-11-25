import React, { Component } from 'react';
import fireDB from '../../firebase'

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            store_id : '',
            order_id : '',
            amount : '',
            stores : '',
            invalidStore : '',
            invalidOrderId : '',
            invalidAmount : '',
            disableBtn : false
         }
         this.handleInputChange = this.handleInputChange.bind(this)
         this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
            html = [<option value="">
                        Select Order
                    </option>];
            for(var i in this.state.stores){
                html.push(<option key={i} value={i}>
                            {this.state.stores[i]['store_name']}
                        </option>)
            }
        }else{
            html = <option value="">
                        Select Order
                    </option>
        }
        return html;
    }
    handleInputChange(e) {
        var {name, value} = e.target
        this.setState({
            [name] : value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault();
        if(!this.state.store_id){
            this.setState({
                invalidStore : 'Please select a store'
            })
            return false;
        }else{
            this.setState({
                invalidStore : ''
            })
        }
        if(!this.state.order_id){
            this.setState({
                invalidOrderId : 'Please give an order id'
            })
            return false;
        }else{
            this.setState({
                invalidOrderId : ''
            })
        }
        if(!this.state.amount){
            this.setState({
                invalidAmount : 'Please give an amount'
            })
            return false;
        }else{
            this.setState({
                invalidAmount : ''
            })
        }
        if(this.state.amount < 1){
            this.setState({
                invalidAmount : 'Amount should be greated than zero'
            })
            return false;
        }else{
            this.setState({
                invalidAmount : ''
            })
        }
        this.setState({
            disableBtn : true
        })
        let obj = {
            store_id : this.state.store_id,
            order_number  : this.state.order_id,
            order_amount   : this.state.amount
        }
        fireDB.child('order').push(obj,(err)=>{
            this.setState({
                disableBtn : false
            })
            if(err){
                console.log(err)
            }else{
                this.setState({store_id : '',
                order_id : '',
                amount : ''})
            }
        })
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
                            <i className="fas fa-chart-pie mr-1"></i>
                            Create Order
                            </h3>
                            <div className="card-tools">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="tab-content p-0">
                            <div className="card ">
                                <form onSubmit={this.handleFormSubmit} >
                                    <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="store_name">Store</label>
                                        <select value={this.state.store_name} name="store_id" onChange={this.handleInputChange} className="form-control" >
                                            {this.getList()}
                                        </select>
                                        {this.state.invalidStore && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidStore}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="order_id">Order Id</label>
                                        <input type="text" className="form-control" value={this.state.order_id} onChange={this.handleInputChange} name="order_id" placeholder="Order Id" />
                                        {this.state.invalidOrderId && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidOrderId}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="number" className="form-control" value={this.state.amount} onChange={this.handleInputChange} name="amount" placeholder="Amount" />
                                        {this.state.invalidAmount && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidAmount}</span>}
                                    </div>
                                    </div>

                                    <div className="card-footer">
                                        {this.state.disableBtn ? 
                                        <button disabled className="btn btn-primary">Submit</button> : 
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        }
                                    
                                    </div>
                                </form>
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
 
export default OrderForm;