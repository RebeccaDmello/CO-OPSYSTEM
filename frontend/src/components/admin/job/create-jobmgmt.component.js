import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import JobService from '../../../services/admin/AdmJobService'
import AuthService from '../../../services/common/auth.service'
import Validator from 'validator';

const validateForm = (errors) => {
    let valid = true;
    console.log(errors.title.length);
    Object.values(errors).forEach(val => val.length > 1 && (valid = false));
    console.log(valid);
    return valid;
};

class CreateJobComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: '',
            description: '',
            field: '',
            attributes: '',
            qualification: '',
            experience: '',
            skills: '',
            salpackage: '',
            positions: '',
            status: 'Accepting',
            companyname: '',
            address: '',
            hrname: '',
            contact1: '',
            contact2: '',
            email: '',
            website: '',
            errors: {
                title: ' ',
                description: ' ',
                qualification: ' ',
                positions: ' ',
                companyname: ' ',
                contact2: ' ',
                email: ' ',
                website: ' '
            },
            currentUser: AuthService.getCurrentUser()
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrUpdateJob = this.saveOrUpdateJob.bind(this);
    }

    // step 3
    componentDidMount(){
        // console.log(this.state.currentUser);
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            JobService.getJobById(this.state.id).then( (res) =>{
                let job = res.data;
                this.setState({title: job.title,
                    description: job.description,
                    field: job.field,
                    attributes: job.attributes,
                    qualification: job.qualification,
                    experience: job.experience,
                    skills: job.skills,
                    salpackage: job.salpackage,
                    positions: job.positions,
                    status: job.status,
                    companyname: job.companyname,
                    address: job.address,
                    hrname: job.hrname,
                    contact1: job.contact1,
                    contact2: job.contact2,
                    email: job.email,
                    website: job.website
                });
            });
        }        
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'title': 
                if(value.length < 5) errors.title = 'Job title must be at least 5 characters long!';
                else { this.setState({[name]: value}); errors.title = ''; }
                break;
            case 'description': 
                if(value.length < 5) errors.description = 'Please enter valid job description!';
                else { this.setState({[name]: value}); errors.description = ''; }
                break; 
            case 'qualification': 
                if(Validator.isEmpty(value) || value.length < 2) errors.qualification = 'Please enter valid qualification!';
                else { this.setState({[name]: value}); errors.qualification = ''; }
                break;
            case 'positions': 
                if(!Validator.isNumeric(value) || value < 1) errors.positions = 'Please enter valid number of open positions!';
                else { this.setState({[name]: value}); errors.positions = ''; }
                break;
            case 'companyname': 
                if(value.length < 2) errors.companyname = 'Company name must be at least 2 characters long!';
                else { this.setState({[name]: value}); errors.companyname = ''; }
                break;
            case 'contact2': 
                if(!Validator.isNumeric(value) || value.length < 10) errors.contact2 = 'Contact must be at least 10 characters long!';
                else { this.setState({[name]: value}); errors.contact2 = ''; }
                break;
            case 'email': 
                if(!Validator.isEmail(value)) errors.email = 'Please enter valid email!';
                else { this.setState({[name]: value}); errors.email = ''; }
                break;
            case 'website': 
                if(!Validator.isURL(value)) errors.website = 'Please enter valid URL!';
                else { this.setState({[name]: value}); errors.website = ''; }
                break;
            default:
                this.setState({[name]: value});
                break;
        }
    
        this.setState({errors, [name]: value});
    }
    
    saveOrUpdateJob = (e) => {
        e.preventDefault();
        /*if(!validateForm(this.state.errors)) {
            alert("Please correct errors!");
        }else{*/
            let job = {title: this.state.title,
                        description: this.state.description,
                        attributes: this.state.attributes,
                        qualification: this.state.qualification,
                        experience: this.state.experience,
                        skills: this.state.skills,
                        salpackage: this.state.salpackage,
                        positions: this.state.positions,
                        status: this.state.status,
                        companyname: this.state.companyname,
                        address: this.state.address,
                        hrname: this.state.hrname,
                        contact1: this.state.contact1,
                        contact2: this.state.contact2,
                        email: this.state.email,
                        website: this.state.website,
                        field: this.state.field
                    };
            console.log('job => ' + JSON.stringify(job));

            // step 5
            if(this.state.id === '_add'){
                JobService.createJob(job).then(res =>{
                    this.props.history.push('/jobmgmt');
                });
            }else{
                JobService.updateJob(job, this.state.id).then( res => {
                    this.props.history.push('/jobmgmt');
                });
            }
        //}
    }
    
    cancel(){
        this.props.history.push('/jobmgmt');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add New Job</h3>
        }else{
            return <h3 className="text-center">Update Job</h3>
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
        const isStatus = this.state.status;
        let select;
        if (isStatus === "Accepting") {
            select = <select name="status" onChange={this.handleChange}>
                        <option value="Accepting" selected> Accepting </option>
                        <option value="Not Accepting" > Not Accepting </option>
                     </select>;
        } else {
            select = <select name="status" onChange={this.handleChange}>
                        <option value="Accepting" > Accepting </option>
                        <option value="Not Accepting" selected> Not Accepting </option>
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
                            <div className="card-body">
                                <form>
                                    <table className = "table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Job Title <span style={error}>*</span></label>
                                                    <input placeholder="Job Title" name="title" className="form-control" 
                                                        value={this.state.title} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.title}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Company Name <span style={error}>*</span></label>
                                                    <input placeholder="Company Name" name="companyname" className="form-control" 
                                                        value={this.state.companyname} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.companyname}</span>                                            
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group" colSpan="2">
                                                    <label> Related Course </label>
                                                    <input placeholder="Related Corse Name" name="field" className="form-control" 
                                                        value={this.state.field} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Job Description <span style={error}>*</span></label>
                                                    <textarea placeholder="Job Description" name="description" className="form-control" 
                                                        value={this.state.description} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.description}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Attributes </label>
                                                    <textarea placeholder="Job Attributes" name="attributes" className="form-control" 
                                                        value={this.state.attributes} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Qualification <span style={error}>*</span></label>
                                                    <input placeholder="Required Qualification" name="qualification" className="form-control" 
                                                        value={this.state.qualification} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.qualification}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Experience </label>
                                                    <input placeholder="Required Experience" name="experience" className="form-control" 
                                                        value={this.state.experience} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Skills </label>
                                                    <input placeholder="Required Skills (Comma Seperated String)" name="skills" className="form-control" 
                                                        value={this.state.skills} onChange={this.handleChange}/>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Package </label>
                                                    <input type="number" placeholder="Salary Package" name="salpackage" className="form-control" 
                                                        value={this.state.salpackage} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Number of Positions: <span style={error}>*</span></label>
                                                    <input type="number" placeholder="Number of Open Positions" name="positions" className="form-control" 
                                                        value={this.state.positions} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.positions}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Current Status </label>
                                                    {select}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Company Address <span style={error}>*</span></label>
                                                    <input placeholder="Company Address" name="address" className="form-control" 
                                                        value={this.state.address} onChange={this.handleChange}/>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Company Representative </label>
                                                    <input placeholder="Name of the Company HR Person" name="hrname" className="form-control" 
                                                        value={this.state.hrname} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Company Contact Person </label>
                                                    <input type="tel" placeholder="HR Contact Number" name="contact1" className="form-control" 
                                                        value={this.state.contact1} onChange={this.handleChange} maxLength="10"/>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Company Contact <span style={error}>*</span></label>
                                                    <input type="tel" placeholder="Company Contact Number" name="contact2" className="form-control" 
                                                        value={this.state.contact2} onChange={this.handleChange} maxLength="10"/>
                                                    <span style={error}>{this.state.errors.contact2}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Email ID <span style={error}>*</span></label>
                                                    <input type="email" placeholder="Email Address" name="email" className="form-control" 
                                                        value={this.state.email} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.email}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Company Website <span style={error}>*</span></label>
                                                    <input type="url" placeholder="Company Website URL" name="website" className="form-control" 
                                                        value={this.state.website} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.website}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center"><button className="btn btn-success" onClick={this.saveOrUpdateJob}>{this.getButtonName()}</button>
                                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CreateJobComponent