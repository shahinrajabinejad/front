import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
class listComponent extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
          listCompany:[]
        }
      }
      componentDidMount(){
        this.loadCompany()
              
              }
      loadCompany(){

        axios.get("http://localhost:3000/company/list")
        .then(res => {
          const data = res.data.data;
          this.setState({ listCompany:data });
        })
        .catch(error => {
          alert(error)
        });
  
      }
  render()
  {
    return (
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">logourl</th>
            <th scope="col">website</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
       
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }
  loadFillData(){

    return this.state.listCompany.map((data, index)=>{
        
        
      return(
        <tr key={index}>
          <th>{data.id}</th>
          <td>{data.name}</td>            
          <td>{data.email}</td>
          <td>{data.logo}</td>
          <td>{data.website}</td>
          <td>
          <Link className="btn btn-outline-info "  to={"/companyedit/"+data.id} >Edit</Link>
          </td>
          <td>
          <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
          </td>
        </tr>
      )
    });
  }
  onDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  sendDelete(userId)
  {
    // url de backend
    const baseUrl = "http://localhost:3000/company/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deleted!',
          'Your company has been deleted.',
          'success'
        )
        this.loadCompany();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;