import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = "http://localhost:3000"
class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataCompany:{},
      campname: "",
      campemail:"",
      camplogo:"",
      campwebsite:"",
  
    }
  }
  componentDidMount(){
    let userId = this.props.match.params.companyId;
    const url = baseUrl+"/company/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataCompany:data,
          campname: data.name,
          campemail:data.email,
          camplogo:data.logo,
          campwebsite:data.website,
         
        })
      
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  render(){
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Name</label>
            <input type="text" className="form-control"  placeholder="Name"
              value={this.state.campname} onChange={(value)=> this.setState({campname:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control"  placeholder="Email"
              value={this.state.campemail} onChange={(value)=> this.setState({campemail:value.target.value})}/>
          </div>
        </div>
        <div className="form-row">
         
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">logourl</label>
            <input type="text" className="form-control"  placeholder="url"
              value={this.state.camplogo} onChange={(value)=> this.setState({camplogo:value.target.value})}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">website</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="www.google.com"
            value={this.state.campwebsite} onChange={(value)=> this.setState({campwebsite:value.target.value})}/>
        </div> 
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
      </div>
    );
  }
  sendUpdate(){
    //  get parameter id
    let userId = this.props.match.params.companyId;
    // url de backend
    const baseUrl = "http://localhost:3000/company/update/"+userId
    // parametros de datos post
    const datapost = {
      name : this.state.campname,
      email : this.state.campemail,
      logo : this.state.camplogo,
      website : this.state.campwebsite,
     
    }

    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

   }
}


export default EditComponent;