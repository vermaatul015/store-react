import React, { Component } from 'react';
import fireDB, {storage} from '../../firebase'

class StoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            store_name : '',
            lat : '',
            lon : '',
            img : '',
            invalidImage : '',
            invalidStoreName : '',
            invalidLat : '',
            invalidLon : '',
            showImg : '',
            disableBtn : false
         }
         this.handleInputChange = this.handleInputChange.bind(this)
         this.handleFormSubmit = this.handleFormSubmit.bind(this)
         this.handleFileChange = this.handleFileChange.bind(this)
    }

    handleInputChange(e) {
        var {name, value} = e.target
        this.setState({
            [name] : value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault();
        
        if(!this.state.store_name){
            this.setState({
                invalidStoreName : 'Please give a store name'
            })
            return false;
        }else{
            this.setState({
                invalidStoreName : ''
            })
        }
        if(!this.state.lat){
            this.setState({
                invalidLat : 'Please give a Latitude'
            })
            return false;
        }else{
            this.setState({
                invalidLat : ''
            })
        }
        if(!(this.state.lat > -90 && this.state.lat < 90)){
            this.setState({
                invalidLat : 'Invalid Latitude'
            })
            return false;
        }else{
            this.setState({
                invalidLat : ''
            })
        }
        if(!this.state.lon){
            this.setState({
                invalidLon : 'Please give a Longitude'
            })
            return false;
        }else{
            this.setState({
                invalidLon : ''
            })
        }
        if(!(this.state.lon > -180 && this.state.lon < 180)){
            this.setState({
                invalidLon : 'Invalid Longitude'
            });
            return false;
        }else{
            this.setState({
                invalidLon : ''
            });
        }
        if(!this.state.img){
            this.setState({
                invalidImage : 'Please give Store Image'
            })
            return false;
        }else{
            this.setState({
                invalidImage : ''
            })
        }
        if(!typeof this.state.img.name == 'string'){
            this.setState({
                invalidImage : 'Please give valid Store Image'
            })
            return false;
        }else{
            this.setState({
                invalidImage : ''
            })
        }
        
        this.setState({
            disableBtn : true
        })
        let image_name = Date.now()+'.'+this.state.img.name.substr(this.state.img.name.lastIndexOf('\\') + 1).split('.')[1];
        const uploadTask = storage.ref(`/images/${image_name}`).put(this.state.img)
        uploadTask.on('state_changed', 
        (snapShot) => {
            // console.log(snapShot)
        }, (err) => {
            console.log(err);
            this.setState({
                disableBtn : false
            })
        }, () => {
            storage.ref('images').child(image_name).getDownloadURL()
            .then(fireBaseUrl => {
                
                let obj = {
                    store_name : this.state.store_name,
                    lat : this.state.lat,
                    long  : this.state.lon,
                    store_image  : fireBaseUrl
                }
                fireDB.child('store').push(obj,(err)=>{
                    this.setState({
                        disableBtn : false
                    })
                    if(err){
                        console.log(err)
                    }else{
                        this.setState({store_name: "", lat: "", lon: "",img: "",showImg:""})
                    }
                })
            })
        })
        
        
    }
    handleFileChange(event) {
        var imageFile = event.target.files[0]
        if (!imageFile) {
            this.setState({ invalidImage: 'Please select image.' });
            return false;
        }
        
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            this.setState({ invalidImage: 'Please select valid image.' });
            return false;
        }
        this.setState({
            invalidImage : '',
            showImg: URL.createObjectURL(event.target.files[0]),
            img: event.target.files[0]
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
                            Create Store
                            </h3>
                            <div className="card-tools">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="tab-content p-0">
                            <div className="card ">
                                <div className="card-header">
                                    {/* <h3 className="card-title">Quick Example</h3> */}
                                    
                                    <ul className="users-list clearfix">
                                    <li>
                                        {this.state.showImg && <img src={this.state.showImg} alt="Store Image" />}
                                    </li>
                                    </ul>
                                </div>
                                <form onSubmit={this.handleFormSubmit} >
                                    <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="store_name">Store Name</label>
                                        <input type="text" value={this.state.store_name} name="store_name" onChange={this.handleInputChange} className="form-control"  placeholder="Store Name" />
                                        {this.state.invalidStoreName && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidStoreName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lat">Latitude</label>
                                        <input type="number" className="form-control" value={this.state.lat} onChange={this.handleInputChange} name="lat" placeholder="Latitude" />
                                        {this.state.invalidLat && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidLat}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lon">Longitude</label>
                                        <input type="number" className="form-control" value={this.state.lon} onChange={this.handleInputChange} name="lon" placeholder="Longitude" />
                                        {this.state.invalidLon && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidLon}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="img">File input</label>
                                        <div className="input-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" name="img"  onChange={this.handleFileChange} />
                                            <label className="custom-file-label" htmlFor="img">Choose file</label>
                                        </div>
                                        
                                        <div className="input-group-append">
                                            <span className="input-group-text">Upload</span>
                                        </div>
                                        {this.state.invalidImage && <span id="exampleInputEmail1-error" className="error invalid-feedback" style={{display:"block"}}>{this.state.invalidImage}</span>}
                                        </div>
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
 
export default StoreForm;