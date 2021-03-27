import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Validator from 'validator'

import UserService from '../../services/admin/AdmUserDetlService'
import AuthService from '../../services/common/auth.service'

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 1 && (valid = false));
    console.log(valid);
    return valid;
};

class ViewUserDetlComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            // user: {},
            fname: '',
            lname: '',
            course: '',
            international: 'Yes',
            workpermit: 'Yes',
            totalexperience: '',
            contact: '',
            address: '',
            skills: '',
            errors: {
                fname: ' ',
                course: ' ',
                contact: ' ',
                address: ' '
            },
            currentUser: AuthService.getCurrentUser()
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount(){
        console.log(this.state.currentUser);
        let user = " ";
        if(UserService.getUserById(this.state.id).then( res => {
            user = res.data;
            this.setState({fname: user.fname,
                lname: user.lname,
                course: user.fname,
                international: user.international,
                workpermit: user.workpermit,
                totalexperience: user.totalexperience,
                contact: user.contact,
                address: user.address,
                skills: user.skills
            });
        })){
            if(user === " "){
                this.setState({id: '_add'});
                this.getButtonName();
                console.log(this.state.id);
            }
        }
    }

    getButtonName(){
        if(this.state.id === '_add'){
            return "Save";
        }else{
            return "Update";
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'fname': 
                if(Validator.isEmpty(value) || value.length < 2) errors.fname = 'First name can not be empty!';
                else { this.setState({[name]: value}); errors.fname = ''; }
                break;
            case 'contact': 
                if(value.length < 5 || !Validator.isNumeric(value)) errors.contact = 'Incorrect contact number entered!';
                else { this.setState({[name]: value}); errors.contact = ''; }
                break;
            case 'address': 
                if(value.length < 5 || Validator.isEmpty(value)) errors.address = 'Incorrect address entered!';
                else { this.setState({[name]: value}); errors.address = ''; }
                break;
            case 'course': 
                if(value.length < 2) errors.course = 'Course name must be at least 2 characters long!';
                else { this.setState({[name]: value}); errors.course = ''; }
                break;
            default:
                this.setState({[name]: value});
                break;
        }
    
        this.setState({errors, [name]: value});
    }
    
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        if(!validateForm(this.state.errors)) {
            alert(JSON.stringify(this.state.errors));
        }else{
            console.log(this.state.id);    
            // step 5
            if(this.state.id === '_add'){
                let user = {
                    sid: this.state.currentUser.id,
                    fname: this.state.fname,
                    lname: this.state.lname,
                    course: this.state.fname,
                    international: this.state.international,
                    workpermit: this.state.workpermit,
                    totalexperience: this.state.totalexperience,
                    contact: this.state.contact,
                    address: this.state.address,
                    skills: this.state.skills
                };
                UserService.createUser(user).then(res =>{
                    this.setState({id: this.state.currentUser.id});
                    this.props.history.push(`/viewpersonaldetails/${this.state.id}`);
                });
                console.log('user => ' + JSON.stringify(user));
            }else{
                let user = {fname: this.state.fname,
                    lname: this.state.lname,
                    course: this.state.fname,
                    international: this.state.international,
                    workpermit: this.state.workpermit,
                    totalexperience: this.state.totalexperience,
                    contact: this.state.contact,
                    address: this.state.address,
                    skills: this.state.skills
                };
                console.log('user => ' + JSON.stringify(user));
                UserService.updateUser(user, this.state.id).then( res => {
                    this.props.history.push(`/viewpersonaldetails/${this.state.id}`);
                });
            }
        }
    }
    
    cancel(){
        this.props.history.push(`/profile`);
    }


    render() {
        const error = { fontWeight: 'bold', color: 'red'}
        const isInternational = this.state.international;
        const isWorkPermit = this.state.workpermit;
        let selectI, selectW;
        
        if (isInternational === "Yes") {
            selectI = <select name="international" defaultChecked={"Yes"} onChange={this.handleChange} className="form-control" >
                        <option value="Yes" > Yes </option>
                        <option value="No" > No </option>
                     </select>;
        } else {
            selectI = <select name="international" defaultChecked={"No"} onChange={this.handleChange} className="form-control" >
                        <option value="Yes" > Yes </option>
                        <option value="No" > No </option>
                     </select>;
        }
        if (isWorkPermit === "Yes") {
            selectW = <select name="workpermit" defaultChecked={"Yes"} onChange={this.handleChange} className="form-control" >
                        <option value="Yes" > Yes </option>
                        <option value="No" > No </option>
                     </select>;
        } else {
            selectW = <select name="workpermit" defaultChecked={"No"} onChange={this.handleChange} className="form-control" >
                        <option value="Yes" > Yes </option>
                        <option value="No" > No </option>
                     </select>;
        }

        if (this.state.currentUser === null) {
            return(<Redirect to="/login" />);
        } else if (this.state.currentUser.roles[0] !== "ROLE_USER") {
            return (
                <div className="container">
                    <header className="jumbotron">
                        <h3>
                            <strong Style="color: red;">Unauthorized Access</strong> 
                        </h3>
                    </header>
                </div>
            );
        } else {
            return (
                <div>
                    <h2 className="text-center">Personal Details</h2>
                    <br></br>
                    <div className = "row ">
                        <div className = "card-body">
                            <form>
                                <table className = "table table-striped table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className = "form-group">
                                                <label> Name <span style={error}>*</span></label>
                                                <input placeholder="First Name" name="fname" className="form-control" 
                                                    value={this.state.fname} onChange={this.handleChange}/>
                                                <span style={error}>{this.state.errors.fname}</span>
                                            </td>
                                            <td>
                                            <label>&nbsp;</label>
                                                <input placeholder="Last Name" name="lname" className="form-control" 
                                                    value={this.state.lname} onChange={this.handleChange}/>
                                                <span style={error}>{this.state.errors.lname}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "form-group">
                                                <label> Contact <span style={error}>*</span></label>
                                                <input placeholder="Contact Number" name="contact" className="form-control" 
                                                    value={this.state.contact} onChange={this.handleChange} />
                                                <span style={error}>{this.state.errors.contact}</span>
                                            </td>
                                            <td className = "form-group">
                                                <label> Address <span style={error}>*</span></label>
                                                <textarea placeholder="Complete Address" name="address" className="form-control" 
                                                    value={this.state.address} onChange={this.handleChange} />
                                                <span style={error}>{this.state.errors.address}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "form-group">
                                                <label> Course <span style={error}>*</span></label>
                                                <input placeholder="Course Registered" name="course" className="form-control" 
                                                    value={this.state.course} onChange={this.handleChange}/>
                                                <span style={error}>{this.state.errors.course}</span>
                                            </td>
                                            <td className = "form-group">
                                                <label> International Student? </label>
                                                {selectI}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "form-group">
                                                <label> Work Permit Status? </label>
                                                {selectW}
                                            </td>
                                            <td className = "form-group">
                                                <label> Total Experience </label>
                                                <input placeholder="Total Years of Experience" name="totalexperience" className="form-control" 
                                                    value={this.state.totalexperience} onChange={this.handleChange}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className = "form-group" colSpan="2">
                                                <label> Skills </label>
                                                <input placeholder="Skills (Enter Multiple Skills Seperated By Comma)" name="skills" className="form-control" 
                                                    value={this.state.skills} onChange={this.handleChange}/>
                                            </td>                                            
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="text-center"><button className="btn btn-success" onClick={this.saveOrUpdateUser}>{this.getButtonName()}</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewUserDetlComponent