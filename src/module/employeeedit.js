import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = "http://localhost:3000"
class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listCompany:[],
      dataEmployee:{},
      campfirstname: "",
      camplastname:"",
      campemail:"",
      campphone:"",
      stringCompany:"",
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
    let userId = this.props.match.params.employeeId;
    const url = baseUrl+"/employee/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEmployee:data,
          campfirstname: data.firstname,
          camplastname: data.lastname,
          campemail:data.email,
          campphone:data.phone,
          stringCompany:data.company.name,
          selectCompany:data.companyId
        })
        console.log(JSON.stringify(data.company.company))
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
            <label htmlFor="inputPassword4">firstname</label>
            <input type="text" className="form-control"  placeholder="firstname"
              value={this.state.campfirstname} onChange={(value)=> this.setState({campfirstname:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">lastname</label>
            <input type="text" className="form-control"  placeholder="lastname"
              value={this.state.camplastname} onChange={(value)=> this.setState({camplastname:value.target.value})}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputState">Company</label>
            <select id="inputState" className="form-control" onChange={(value)=> this.setState({selectCompany:value.target.value})}>
            <option selected value={this.state.dataEmployee.companyId}>{this.state.stringCompany}</option>
              {this.loadFillData()}
            </select>
          
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Phone</label>
            <input type="number" className="form-control"  placeholder="Phone"
              value={this.state.campphone} onChange={(value)=> this.setState({campphone:value.target.value})}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">email</label>
          <input type="email" className="form-control" id="inputAddress" placeholder="1234 Main St"
            value={this.state.campemail} onChange={(value)=> this.setState({campemail:value.target.value})}/>
        </div> 
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
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
  sendUpdate(){
    //  get parameter id
    let userId = this.props.match.params.employeeId;
    // url de backend
    const baseUrl = "http://localhost:3000/employee/update/"+userId
    // parametros de datos post
    const datapost = {
      firstname : this.state.campfirstname,
      lastname : this.state.camplastname,
      phone : this.state.campphone,
      email : this.state.campemail,
      company  : this.state.selectCompany
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