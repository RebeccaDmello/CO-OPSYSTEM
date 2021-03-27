import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import JobService from '../../services/user/StuJobService'
// import AJobService from '../../services/admin/AdmJobService'
import AuthService from '../../services/common/auth.service'

class BoardUser extends Component {
    constructor(props) {
      super(props)

      this.state = {
          jobs: [],
          currentUser: AuthService.getCurrentUser()
      }
    //   this.applyJob = this.applyJob.bind(this);
    }

    componentDidMount(){
        JobService.getJobs().then((res) => {
            this.setState({ jobs: res.data});
        });
    }

    viewJob(id){
        this.props.history.push(`/viewjobdetail/${id}`);
    }

    // applyJob(id, sid){
    //     this.props.history.push(`/applyjob/${id}/${sid}`);
    // }

    render() {
        //console.log(this.state.jobs);
        //console.log(this.state.currentUser.id);
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
                    <h2 className="text-center">Available Matching Jobs List</h2>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Job Title</th>
                                    <th> Job Location</th>
                                    <th> Skills</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.jobs.map(
                                        job => 
                                        <tr key = {job.id}>
                                                <td> {job.title} </td>   
                                                <td> {job.address}</td>
                                                <td> {job.skills}</td>
                                                <td>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.viewJob(job.id)} className="btn btn-info btn-xs">View </button>
                                                    {/* <button style={{marginLeft: "10px"}} onClick={ () => this.applyJob(job.id, this.state.currentUser.id)} className="btn btn-success btn-xs">Apply </button> */}
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

export default BoardUser