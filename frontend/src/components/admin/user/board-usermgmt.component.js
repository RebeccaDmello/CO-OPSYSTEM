import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import UserService from '../../../services/admin/AdmUserService'
import AuthService from '../../../services/common/auth.service'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            currentUser: AuthService.getCurrentUser()
        }
        // this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    
    viewUser(id){
        this.props.history.push(`/viewuser/${id}`);
    }
    
    editUser(id){
        this.props.history.push(`/adduser/${id}`);
    }

    componentDidMount(){
        // console.log(this.state.currentUser);
        UserService.getUsers().then((res) => {
            console.log(res.data);
            this.setState({ users: res.data});
        });
    }

    /*addUser(){
        this.props.history.push('/adduser/_add');
    }*/

    render() {
        console.log(this.state.currentUser);
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
            //console.log(this.state.users);
            return (
                <div>
                    <h2 className="text-center">Registered Student List</h2>
                    {/* <div className = "row">
                        <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                    </div> */}
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Username</th>
                                    <th> Email ID</th>
                                    <th> Account Status</th>
                                    <th> Job Access</th>
                                    <th> Account Type</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => {
                                            // return(user.roles.map((id, name) => <span key={id}>{name}</span>))
                                        return (user.username === this.state.currentUser.username && this.state.currentUser.roles[0] === 'ROLE_ADMIN') ?
                                            <tr key = {user.id}>
                                                    <td> {user.username}</td>   
                                                    <td> {user.email}</td>
                                                    <td> {user.status.toString()}</td>
                                                    <td> {user.access.toString()}</td>
                                                    <td> {user.roles.map(
                                                            (id, name) => <span key={id}>{name}</span>
                                                         )
                                                        }</td>
                                                    <td>
                                                        <button onClick={ () => this.viewUser(user.id)} className="btn btn-info">View </button>
                                                        {/* <button style={{marginLeft: "10px"}} onClick={ () => this.editUser(user.id)} className="btn btn-warning">Update </button>
                                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button> */}
                                                    </td>
                                            </tr>
                                        :
                                            <tr key = {user.id}>
                                                    <td> {user.username}</td>   
                                                    <td> {user.email}</td>
                                                    <td> {user.status.toString()}</td>
                                                    <td> {user.access.toString()}</td>
                                                    <td> {user.roles.map((id, name) => <span key={id}>{name}</span>)}</td>
                                                    <td>
                                                        <button onClick={ () => this.viewUser(user.id)} className="btn btn-info">View </button>
                                                        <button style={{marginLeft: "10px"}} onClick={ () => this.editUser(user.id)} className="btn btn-warning">Update </button>
                                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
                                                    </td>
                                            </tr>
                                        }
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