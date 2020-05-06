import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listCompany:[],
      campfirstname: "",
      camplastname:"",
      campemail:"",
      campphone:"",
      selectCompany:0
    }
  }
  componentDidMount(){

    axios.get("http://localhost:3000/company/list")
    .then(res => {
      const data = res.data.data;
      this.setState({ listCompany:data });
    })
    .catch(error => {
      alert(error)
    });

  }
  render(){
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">firstname </label>
            <input type="text" className="form-control"  placeholder="Name" value={this.state.campfirstname} onChange={(value)=> this.setState({campfirstname:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">lastname</label>
            <input type="text" className="form-control"  placeholder="lastname" value={this.state.camplastname} onChange={(value)=> this.setState({camplastname:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">email</label>
            <input type="email" className="form-control"  placeholder="email" value={this.state.campemail} onChange={(value)=> this.setState({campemail:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">phone</label>
            <input type="phone" className="form-control"  placeholder="phone" value={this.state.campphone} onChange={(value)=> this.setState({campphone:value.target.value})}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputState">Company</label>
            <select id="inputState" className="form-control" onChange={(value)=> this.setState({selectCompany:value.target.value})}>
              <option selected>Choose...</option>
              {this.loadFillData()}
            </select>
          </div>
   
        </div>
      
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
      </div>
    );
  }
  loadFillData(){

    return this.state.listCompany.map((data, index)=>{
        
        
      return(
        
              <option value={data.id} key={index}>{data.name}</option>
            
         
      )
    });
  }
  sendSave(){
    if (this.state.selectCompany===0) {
      alert("شرکت نمی تواند خالی باشد")
    }
    else if (this.state.campphone==="") {
       alert("Digite el campo de campphone")
    }
    else if (this.state.campfirstname==="") {
       alert("Digite el campo de campfirstname")
    }
    else if (this.state.campemail==="") {
       alert("Digite el campo de email")
    }
    else if (this.state.camplastname==="") {
       alert("Digite el campo de camplastname")
    }
    else {
 
      const baseUrl = "http://localhost:3000/employee/create"
 
      const datapost = {
        
        firstname : this.state.campfirstname,
        lastname : this.state.camplastname,
        phone : this.state.campphone,
        email : this.state.campemail,
        company: this.state.selectCompany
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