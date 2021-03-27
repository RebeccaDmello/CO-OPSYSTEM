import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../../../services/admin/AdmUserDetlService'
import AuthService from '../../../services/common/auth.service'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {},
            currentUser: AuthService.getCurrentUser()
        }
    }

    componentDidMount(){
        // console.log(this.state.currentUser);
        UserService.getUserById(this.state.id).then( res => {
            console.log(res.data);
            this.setState({user: res.data});
        })
    }

    goBack(){
        this.props.history.push('/usermgmt');
    }

    editUser(id){
        this.props.history.push(`/adduser/${id}`);
    }

    render() {
        let uButton;
        /*if (this.state.currentUser.roles[0] === 'ROLE_ADMIN')  {
            uButton = "";
        } else {*/
            uButton = <button style={{marginLeft: "10px"}} onClick={ () => this.editUser(this.state.id) } className="btn btn-warning btn-xs">Update</button>;
        //}
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
                    <h2 className="text-center">Selected User Details</h2>
                    <br></br>
                    <div className = "row ">
                        <div className = "card-body">
                            <button className="btn btn-primary" onClick={this.goBack.bind(this)}>Go Back</button>
                            {uButton}
                            <br/><br/>
                            <table className = "table table-striped table-bordered">
                                <tbody>
                                    <tr>
                                        <td> Student Name </td>
                                        <td> { this.state.user.fname } &nbsp; { this.state.user.lname}</td>
                                    </tr>
                                    <tr>
                                        <td> Course Enrolled </td>
                                        <td> { this.state.user.course }</td>
                                    </tr>
                                    <tr>
                                        <td> Contact </td>
                                        <td> { this.state.user.contact }</td> 
                                    </tr>
                                    <tr>
                                        <td> Address </td>
                                        <td> { this.state.user.address }</td> 
                                    </tr>
                                    <tr>
                                        <td> International Student? </td>
                                        <td> { this.state.user.international }</td> 
                                    </tr>
                                    <tr>
                                        <td> Workpermit Status </td>
                                        <td> { this.state.user.workpermit }</td> 
                                    </tr>
                                    <tr>
                                        <td> Total Experience </td>
                                        <td> { this.state.user.totalexperience }</td> 
                                    </tr>
                                    <tr>
                                        <td> Skills </td>
                                        <td> { this.state.user.skills }</td> 
                                    </tr>
                                    <tr>
                                        <td> Resume </td>
                                        <td> { this.state.user.resume }</td> 
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={this.goBack.bind(this)} >Go Back</button>
                            {uButton}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewUserComponent