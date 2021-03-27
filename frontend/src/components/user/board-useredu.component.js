import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import EduService from '../../services/user/StuEduService'
import AuthService from '../../services/common/auth.service'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            educations: [],
            currentUser: AuthService.getCurrentUser()
        }
        this.addEdu = this.addEdu.bind(this);
        this.editEdu = this.editEdu.bind(this);
        this.deleteEdu = this.deleteEdu.bind(this);
    }

    deleteEdu(id){
        EduService.deleteEducation(id).then( res => {
            this.setState({educations: this.state.educations.filter(edu => edu.education_id !== id)});
        });
    }
    
    editEdu(id){
        this.props.history.push(`/addeducation/${id}`);
    }

    componentDidMount(){
        //console.log(this.state.currentUser.id);
        EduService.getEducationBySid(this.state.currentUser.id).then((res) => {
            //console.log(res.data);
            this.setState({ educations: res.data});
        });
    }

    addEdu(){
        this.props.history.push('/addeducation/_add');
    }

    render() {
        console.log(this.state.currentUser);
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
            //console.log(this.state.educations);
            return (
                <div>
                    <h2 className="text-center">Education List</h2>
                    <div className = "row">
                        <button className="btn btn-primary" onClick={this.addEdu}> Add Education</button>
                    </div>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Degree</th>
                                    <th> Specialization</th>
                                    <th> University</th>
                                    <th> CGPA</th>
                                    <th> Start Date</th>
                                    <th> End Date</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.educations.map(
                                        education => 
                                        <tr key = {education.education_id}>
                                                <td> {education.education} </td>   
                                                <td> {education.specialization}</td>
                                                <td> {education.university}</td>
                                                <td> {education.cgpa}</td>
                                                <td> {education.doj}</td>
                                                <td> {education.doc}</td>
                                                <td>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.editEdu(education.education_id)} className="btn btn-warning btn-xs">Update </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEdu(education.education_id)} className="btn btn-danger btn-xs">Delete </button>
                                                </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default ListUserComponent;