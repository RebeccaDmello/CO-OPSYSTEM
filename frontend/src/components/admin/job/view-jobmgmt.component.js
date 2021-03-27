import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import JobService from '../../../services/admin/AdmJobService'
import AuthService from '../../../services/common/auth.service'

class ViewJobComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            job: {},
            currentUser: AuthService.getCurrentUser()
        }
    }

    componentDidMount(){
        console.log(this.state.currentUser);
        JobService.getJobById(this.state.id).then( res => {
            this.setState({job: res.data});
        })
    }

    editJob(id){
        this.props.history.push(`/addjob/${id}`);
    }
    
    goBack(){
        this.props.history.push('/jobmgmt');
    }

    render() {
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
            let href = "mailto:" + this.state.job.email;
            let url = "https://" + this.state.job.website;
            return (
                <div>
                    <h2 className="text-center">Job Details</h2>
                    <br></br>
                    <div className = "row ">
                        <div className = "card-body">
                            <button className="btn btn-primary" onClick={this.goBack.bind(this)}>Go Back</button>
                            <button style={{marginLeft: "10px"}} onClick={ () => this.editJob(this.state.id) } className="btn btn-warning btn-xs">Update</button>
                            <br/><br/>
                            <table className = "table table-striped table-bordered">
                                <tbody>
                                    <tr>
                                        <td> Job Title </td>
                                        <td> { this.state.job.title }</td>
                                    </tr>
                                    <tr>
                                        <td> Related Course </td>
                                        <td> { this.state.job.field }</td>
                                    </tr>
                                    <tr>
                                        <td> Job Description </td>
                                        <td> { this.state.job.description }</td> 
                                    </tr>
                                    <tr>
                                        <td> Company Name </td>
                                        <td> { this.state.job.companyname }</td> 
                                    </tr>
                                    <tr>
                                        <td> Company Address </td>
                                        <td> { this.state.job.address }</td> 
                                    </tr>
                                    <tr>
                                        <td> Key Attributes </td>
                                        <td> { this.state.job.attributes }</td> 
                                    </tr>
                                    <tr>
                                        <td> Required Qualification </td>
                                        <td> { this.state.job.qualification }</td> 
                                    </tr>
                                    <tr>
                                        <td> Experience </td>
                                        <td> { this.state.job.experience }</td> 
                                    </tr>
                                    <tr>
                                        <td> Required Skills </td>
                                        <td> { this.state.job.skills }</td> 
                                    </tr>
                                    <tr>
                                        <td> Offered Salary Package </td>
                                        <td> { this.state.job.salpackage }</td> 
                                    </tr>
                                    <tr>
                                        <td> Job Status </td>
                                        <td> { this.state.job.status }</td> 
                                    </tr>
                                    <tr>
                                        <td> Number of Open Positions </td>
                                        <td> { this.state.job.positions }</td> 
                                    </tr>
                                    <tr>
                                        <td> Company Representative Name </td>
                                        <td> { this.state.job.hrname }</td>  
                                    </tr>
                                    <tr>
                                        <td> Company/HR Email ID </td>
                                        <td> <a href={href}>{ this.state.job.email }</a></td> 
                                    </tr>
                                    <tr>
                                        <td> HR Contact Number </td>
                                        <td> { this.state.job.contact1 }</td>  
                                    </tr>
                                    <tr>
                                        <td> Company Contact Number </td>
                                        <td> { this.state.job.contact2 }</td>  
                                    </tr>
                                    <tr>
                                        <td> Website </td>
                                        <td> <a href={url} rel="noreferrer" target="_blank">{ this.state.job.website }</a></td> 
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={this.goBack.bind(this)} >Go Back</button>
                            <button style={{marginLeft: "10px"}} onClick={ () => this.editJob(this.state.id) } className="btn btn-warning btn-xs">Update</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewJobComponent