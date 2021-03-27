import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import EduService from '../../services/user/StuEduService'
import AuthService from '../../services/common/auth.service'
import Validator from 'validator';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 1 && (valid = false));
    console.log(valid);
    return valid;
};

class CreateEduComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // step 2
            education_id: this.props.match.params.id,
            sid: AuthService.getCurrentUser().id,
            education: '',
            specialization: '',
            university: '',
            cgpa: '',
            doj: '',
            doc: '',
            errors: {
                education: ' ',
                specialization: ' ',
                university: ' ',
                doj: ' ',
                doc: ' '
            },
            currentUser: AuthService.getCurrentUser()
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrUpdateEdu = this.saveOrUpdateEdu.bind(this);
    }

    // step 3
    componentDidMount(){
        // console.log(this.state.currentUser);
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EduService.getEducationById(this.state.education_id).then( (res) =>{
                console.log(this.state.education_id);
                let edu = res.data;
                this.setState({
                    sid: edu.sid,
                    education: edu.education,
                    specialization: edu.specialization,
                    university: edu.university,
                    cgpa: edu.cgpa,
                    doj: edu.doj,
                    doc: edu.doc
                });
            });
        }        
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'education': 
                if(value.length < 2) errors.education = 'Degree title must be at least 2 characters long!';
                else { this.setState({[name]: value}); errors.education = ''; }
                break;
            case 'specialization': 
                if(value.length < 2) errors.specialization = 'Degree title must be at least 2 characters long!';
                else { this.setState({[name]: value}); errors.specialization = ''; }
                break; 
            case 'university': 
                if(value.length < 2) errors.university = 'Please enter valid university name!';
                else { this.setState({[name]: value}); errors.university = ''; }
                break;
            case 'doj': 
                if(Validator.isEmpty(value)) errors.doj = 'Please enter valid start date!';
                else { this.setState({[name]: value}); errors.doj = ''; }
                break;
            case 'doc': 
                if(Validator.isEmpty(value)) errors.doc = 'Please enter valid end date!';
                else { this.setState({[name]: value}); errors.doc = ''; }
                break;
            default:
                this.setState({[name]: value});
                break;
        }
    
        this.setState({errors, [name]: value});
    }
    
    saveOrUpdateEdu = (e) => {
        e.preventDefault();
        console.log(this.state.education_id);
        /*if(!validateForm(this.state.errors)) {
            alert("Please correct errors!");
        }else{*/
            let edu = {
                    sid: this.state.currentUser.id,
                    education: this.state.education,
                    specialization: this.state.specialization,
                    university: this.state.university,
                    cgpa: this.state.cgpa,
                    doj: this.state.doj,
                    doc: this.state.doc
                };
            console.log('edu => ' + JSON.stringify(edu));

            // step 5
            console.log(this.state.education_id);
            if(this.state.education_id === '_add'){
                EduService.createEducation(edu).then(res =>{
                    this.props.history.push('/educationdetails');
                });
            }else{
                EduService.updateEducation(edu, this.state.education_id).then( res => {
                    this.props.history.push('/educationdetails');
                });
            }
        //}
    }
    
    cancel(){
        this.props.history.push('/educationdetails');
    }

    getTitle(){
        if(this.state.education_id === '_add'){
            return <h3 className="text-center">Add New Education</h3>
        }else{
            return <h3 className="text-center">Update Education</h3>
        }
    }

    getButtonName(){
        if(this.state.education_id === '_add'){
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
                            <div className="card-body">
                                <form>
                                    <table className = "table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Degree <span style={error}>*</span></label>
                                                    <input type="hidden" name="sid" className="form-control" 
                                                        value={this.state.sid} />
                                                    <span style={error}>{this.state.errors.education}</span>
                                                    <input placeholder="Name of the Degree" name="education" className="form-control" 
                                                        value={this.state.education} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.education}</span>
                                                </td>
                                                <td className = "form-group">
                                                    <label> Specialization <span style={error}>*</span></label>
                                                    <input placeholder="Study Area" name="specialization" className="form-control" 
                                                        value={this.state.specialization} onChange={this.handleChange}/>
                                                    <span style={error}>{this.state.errors.specialization}</span>                                            
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> University </label>
                                                    <input placeholder="Name of the College/University" name="university" className="form-control" 
                                                        value={this.state.university} onChange={this.handleChange}/>
                                                </td>
                                                <td className = "form-group">
                                                    <label> CGPA </label>
                                                    <input placeholder="CGPA/Percentage" name="cgpa" className="form-control" 
                                                        value={this.state.cgpa} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className = "form-group">
                                                    <label> Start Date </label>
                                                    <input type="month" placeholder="" name="doj" className="form-control" 
                                                        value={this.state.doj} onChange={this.handleChange}/>
                                                </td>
                                                <td className = "form-group">
                                                    <label> End Date </label>
                                                    <input type="month" placeholder="" name="doc" className="form-control" 
                                                        value={this.state.doc} onChange={this.handleChange}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center"><button className="btn btn-success" onClick={this.saveOrUpdateEdu}>{this.getButtonName()}</button>
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

export default CreateEduComponent