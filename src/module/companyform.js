import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      campname: "",
      campemail:"",
      camplogo:"",
      campwebsite:"",
      
    }
  }
  render(){
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Name </label>
            <input type="text" className="form-control"  placeholder="Name" value={this.state.campname} onChange={(value)=> this.setState({campname:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control"  placeholder="Email" value={this.state.campemail} onChange={(value)=> this.setState({campemail:value.target.value})}/>
          </div>
        </div>
        <div className="form-row">
    
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">logo</label>
            <input type="text" className="form-control"  placeholder="logo"  value={this.state.camplogo} onChange={(value)=> this.setState({camplogo:value.target.value})}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">web</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.campwebsite} onChange={(value)=> this.setState({campwebsite:value.target.value})}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
      </div>
    );
  }
  sendSave(){

  
     if (this.state.camplogo==="") {
       alert("Digite el campo de telefono")
    }
    else if (this.state.campname==="") {
       alert("Digite el campo de Nombre")
    }
    else if (this.state.campemail==="") {
       alert("Digite el campo de email")
    }
    else if (this.state.campwebsite==="") {
       alert("Digite el campo de Direccion")
    }
    else {
 
      const baseUrl = "http://localhost:3000/company/create"
 
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
          alert(response.data.message)
        }
      }).catch(error=>{
        alert("Error 34 "+error)
      })
 
    }
 
  }
}


export default EditComponent;