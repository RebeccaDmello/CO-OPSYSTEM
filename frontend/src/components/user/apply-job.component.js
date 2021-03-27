import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import JobService from '../../../services/user/StuJobService'
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
                address: ' ',
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
            case 'salpackage': 
                this.setState({[name]: value});
                break;
            case 'positions': 
                if(!Validator.isNumeric(value) || value < 1) errors.positions = 'Please enter valid number of open positions!';
                else { this.setState({[name]: value}); errors.positions = ''; }
                break;
            case 'companyname': 
                if(value.length < 2) errors.companyname = 'Company name must be at least 2 characters long!';
                else { this.setState({[name]: value}); errors.companyname = ''; }
                break;
            case 'address': 
                if(value.length < 5) errors.address = 'Address must be at least 5 characters long!';
                else { this.setState({[name]: value}); errors.address = ''; }
                break;
            case 'hrname': 
                this.setState({[name]: value});
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
        if(!validateForm(this.state.errors)) {
            alert(JSON.stringify(this.state.errors));
        }else{
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
        }
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
                    <span>
                    {
                        this.getTitle()
                    }
                    </span>
                    <br></br>
                    <div className = "container">
                        <div className = "row">
                            <div className="card-body">hello
                                <form>
                                    <table className = "table table-striped table-bordered">
                                        
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