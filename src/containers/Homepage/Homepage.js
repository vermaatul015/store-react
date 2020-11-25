import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import fireDB from '../../firebase'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { stores : '', center_lat :22.630744,
        center_lng: 88.329899 }
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
                if(c == 1){
                    // this.setState({
                    //     center_lat: this.state.stores[i]['lat'],
                    //     center_lng: this.state.stores[i]['long']
                    // })
                }
                
                c++;
                html.push(<Marker key={i}
                title={this.state.stores[i]['store_name']}
                    name={this.state.stores[i]['store_name']}
                    position={{lat: this.state.stores[i]['lat'], lng: this.state.stores[i]['long']}} />)
            }
        }
        return html;
    }
    render() { 
        return (
                <section className="content">
                    <div className="container-fluid">
                    <div className="row">
                            <Map google={this.props.google} zoom={12} initialCenter={{lat:this.state.center_lat,lng:this.state.center_lng}}>
                            
                            {this.getList()}
                            </Map>
                        </div>
                    </div>
                </section>
         );
    }
}
 

export default GoogleApiWrapper({
    apiKey: ("AIzaSyByTy738ZVCt4Y7EC6IwpXhmZtHL2Eq7yY")
  })(HomePage)