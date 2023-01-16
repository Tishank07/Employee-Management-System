import React, {useState, useEffect} from 'react'
import {Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const history = useNavigate();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {firstName, lastName, emailId}

        if(id){
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            EmployeeService.createEmployee(employee).then((response) =>{

                console.log(response.data)
    
                history('/employees');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        EmployeeService.getEmployeeById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailId(response.data.emailId)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center"><center>Update Employee</center></h2>
        }else{
            return <h2 className = "text-center"><center><b>Add Employee</b></center></h2>
        }
    }

    return (
       <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                <br /><br />
                                    <center><label className = "form-label"> <h3>First Name :</h3></label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                    </center>
                                    <br />
                                </div>

                                <div className = "form-group mb-2">
                                    <center>
                                    <label className = "form-label"> <h3>Last Name :</h3></label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                    </center>
                                    <br />
                                </div>

                                <div className = "form-group mb-2">
                                    <center>
                                    <label className = "form-label"><h3>Email Id :</h3></label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email Id"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                    </center>
                                    <br />
                                </div>

                                <center><button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Submit </button></center>
                               
                                <Link to="/employees" className="btn btn-danger"> <center>Cancel </center></Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
       
    )
}

export default AddEmployeeComponent