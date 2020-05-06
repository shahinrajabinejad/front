import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from './module/employeeform';
import List from './module/employeelist';
import Edit from './module/employeeedit';
import Formcompany from './module/companyform';
import Listcompany from './module/companylist';
import Editcompany from './module/companyedit';
function App() {

  return (
    <Router>
   

      <div className="App">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#" style={{color:'orange',fontWeight:'bold'}}>mostafa rajabi</a>
            
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link className="nav-link" to="/employee">Manage Employee </Link>
              <Link className="nav-link" to="/company">Manage company </Link>
              </li>
            </ul>
            <Link className="btn btn-info "  to="/employeeform">Add Employee </Link>
            <Link className="btn btn-info "  to="/companyform">Add company </Link>
          </div>
        </nav>

        <div className="container py-4">
          <div className="row">

<Route path="/employee" exact component={List} />
<Route path="/employeeform" component={Form} />
<Route path="/employeeedit/:employeeId" component={Edit} />
<Route path="/company" exact component={Listcompany} />
<Route path="/companyform" component={Formcompany} />
<Route path="/companyedit/:companyId" component={Editcompany} />
          </div>
        </div>

      </div>
      </Router>
  );
}

export default App;