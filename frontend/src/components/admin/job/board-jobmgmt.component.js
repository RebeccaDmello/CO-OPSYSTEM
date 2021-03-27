import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import JobService from '../../../services/admin/AdmJobService'
import AuthService from '../../../services/common/auth.service'

class ListJobComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            jobs: [],
            currentUser: AuthService.getCurrentUser()
        }
        this.addJob = this.addJob.bind(this);
        this.editJob = this.editJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    deleteJob(id){
        JobService.deleteJob(id).then( res => {
            this.setState({jobs: this.state.jobs.filter(job => job.id !== id)});
        });
    }
    
    viewJob(id){
        this.props.history.push(`/viewjob/${id}`);
    }

    editJob(id){
        this.props.history.push(`/addjob/${id}`);
    }

    componentDidMount(){
        // console.log(this.state.currentUser);
        JobService.getJobs().then((res) => {
            this.setState({ jobs: res.data});
        });
    }

    addJob(){
        this.props.history.push('/addjob/_add');
    }

    render() {
        //console.log(this.state.currentUser);
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
            //console.log(this.state.jobs);
            return (
                <div>
                    <h2 className="text-center">Jobs List</h2>
                    <div className = "row">
                        <button className="btn btn-primary" onClick={this.addJob}> Add Job</button>
                    </div>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Job Title</th>
                                    <th> Company Name</th>
                                    <th> Job Status</th>
                                    <th> Open Positions</th>
                                    <th> Representative</th>
                                    <th> Contact</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.jobs.map(
                                        job => 
                                        <tr key = {job.id}>
                                                <td> {job.title} </td>   
                                                <td> {job.companyname}</td>
                                                <td> {job.status}</td>
                                                <td> {job.positions}</td>
                                                <td> {job.hrname}</td>
                                                <td> {job.contact1} <br/> {job.contact2}</td>
                                                <td>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.viewJob(job.id)} className="btn btn-info btn-xs">View </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.editJob(job.id)} className="btn btn-warning btn-xs">Update </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteJob(job.id)} className="btn btn-danger btn-xs">Delete </button>
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

export default ListJobComponent;