import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import UserService from '../../../services/admin/AdmUserService'
import AuthService from '../../../services/common/auth.service'
import Validator from 'validator';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 1 && (valid = false));
    console.log(valid);
    return valid;
};

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // step 2
            id: this.props.match.params.id,
            username: '',
            email: '',
            password: 'test@123',
            access: false,
            status: true,
            //roles: 'ROLE_USER',
            errors: {
                username: ' ',
                email: ' ',
                access: ' ',
                status: ' '
            },
            currentUser: AuthService.getCurrentUser()
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){
        // console.log(this.state.currentUser);
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({username: user.username,
                    email: user.email,
                    password: user.password,
                    access: user.access,
                    status: user.status,
                    //roles: user.roles
                });
            });
        }        
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'username': 
                if(value.length < 5) errors.username = 'Username must be at least 5 characters long!';
                else { this.setState({[name]: value}); errors.username = ''; }
                break;
            case 'email': 
                if(!Validator.isEmail(value)) errors.email = 'Please enter valid email!';
                else { this.setState({[name]: value}); errors.email = ''; }
                break;
            case 'access': 
                console.log("-"+value);
                if(value === "Select") errors.access = 'Please select job access status!';
                else if(value === "Enabled") { this.setState({[name]: true}); errors.access = ''; console.log(name + " -- " + this.state.access);}
                else if(value === "Disabled") { this.setState({[name]: false}); errors.access = ''; console.log(name + " // " + this.state.access);}
                break;
            case 'status':
                console.log("="+value); 
                if(value === "Select") errors.status = 'Please select user account status!';
                else if(value === "Enabled") { this.setState({[name]: true}); errors.status = ''; console.log(name + " ++ " + this.state.status);}
                else if(value === "Disabled") { this.setState({[name]: false}); errors.status = ''; console.log(name + " ** " + this.state.status);}
                console.log(this.state.status);
                break;
            default:
                this.setState({[name]: value});
                break;
        }
    
        this.setState({errors, [name]: value});
    }
    
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        /*if(!validateForm(this.state.errors)) {
            alert("Please correct errors!");
        }else{*/
            let user = {username: this.state.username,
                        email: this.state.email,
                        password: this.state.password,
                        access: this.state.access,
                        status: this.state.status,
                        //roles: this.state.roles
                    };
            console.log('user => ' + JSON.stringify(user));

            // step 5
            if(this.state.id === '_add'){
                UserService.createUser(user).then(res =>{
                    this.props.history.push('/usermgmt');
                });
            }else{
                UserService.updateUser(user, this.state.id).then( res => {
                    this.props.history.push('/usermgmt');
                });
            }
        //}
    }
    
    cancel(){
        this.props.history.push('/usermgmt');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add New User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }

    getButtonName(){
        if(this.state.id === '_add'){
            return "Save";
        }else{
            return "Update";
        }
    }

    render() {
        const error = { fontWeight: 'bold', color: 'red'}
        const isRoles = this.state.roles;
        const isStatus = this.state.status.toString();
        const isAccess = this.state.access.toString();
        let selectR, selectS, selectJ;
        if (isRoles === "USER_ADMIN") {
            selectR = <select name="roles" onChange={this.handleChange}>
                        <option value="ROLE_ADMIN" selected> Administrator </option>
                        <option value="ROLE_USER" > Standard User </option>
                     </select>;
        } else {
            selectR = <select name="roles" onChange={this.handleChange}>
                        <option value="ROLE_ADMIN" > Administrator </option>
                        <option value="ROLE_USER" selected> Standard User </option>
                     </select>;
        }
        if (isStatus === "true") {
            selectS = <select name="status" onChange={this.handleChange}>
                        <option value="Enabled" selected> Enabled </option>
                        <option value="Disabled" > Disabled </option>
                     </select>;
        } else {
            selectS = <select name="status" onChange={this.handleChange}>
                        <option value="Enabled" > Enabled </option>
                        <option value="Disabled" selected> Disabled </option>
                     </select>;
        }
        if (isAccess === "true") {
            selectJ = <select name="access" onChange={this.handleChange}>
                        <option value="Enabled" selected> Enabled </option>
                        <option value="Disabled" > Disabled </option>
                     </select>;
        } else {
            selectJ = <select name="access" onChange={this.handleChange}>
                        <option value="Enabled" > Enabled </option>
                        <option value="Disabled" selected> Disabled </option>
                     </select>;
        }

        if (this.state.currentUser === null) {
            return(<Redirect to="/login" />);
        } else if (this.state.currentUser.roles[0] !== "ROLE_ADMIN") {
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
                    <span>
                    {
                        this.getTitle()
                    }
                    </span>
                    <br></br>
                    <div className = "container">

                        <div className = "row">
                            {/* <div > */}
                                
                                <div className="card-body">
                                    <form>
                                        <table className = "table table-striped table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td className = "form-group">
                                                        <label> Username: <span style={error}>*</span></label>
                                                        <input placeholder="Username" name="username" className="form-control" 
                                                            value={this.state.username} onChange={this.handleChange}/>
                                                        <span style={error}>{this.state.errors.username}</span>
                                                    </td>
                                                    <td className = "form-group">
                                                        <label> Email ID: <span style={error}>*</span></label>
                                                        <input placeholder="Email Address" name="email" className="form-control" 
                                                            value={this.state.email} onChange={this.handleChange}/>
                                                        <span style={error}>{this.state.errors.email}</span>                                            
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className = "form-group">
                                                        <label> Password: </label>
                                                        <strong>Password will be the default<br/>password after update performed.</strong>
                                                    </td>
                                                    <td className = "form-group" colSpan="2">
                                                        <label> User Role: </label>
                                                        {selectR}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className = "form-group">
                                                        <label> User Job Access Status: <span style={error}>*</span></label>
                                                        {selectJ}
                                                        <span style={error}>{this.state.errors.access}</span>
                                                    </td>
                                                    <td className = "form-group">
                                                        <label> User Account Status: <span style={error}>*</span></label>
                                                        {selectS}
                                                        <span style={error}>{this.state.errors.status}</span>
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
                    </div>
                // </div>
            )
        }
    }
}

export default CreateUserComponent