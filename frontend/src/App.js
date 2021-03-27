import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";

import AuthService from "./services/common/auth.service";

import Login from "./components/common/login.component";
import Register from "./components/common/register.component";
import Profile from "./components/common/profile.component";


/* USER FILES */
import BoardUser from "./components/user/board-user.component";
import UserJobView from "./components/user/user-jobview.component";
import UserDetailsView from "./components/user/view-userdetl.component";
import BoardUserEdu from "./components/user/board-useredu.component";
import CreateEduComponent from "./components/user/create-edu.component";

/* ADMIN FILES */
import JobMgmt from "./components/admin/job/board-jobmgmt.component";
import CreateJobComponent from "./components/admin/job/create-jobmgmt.component";
import ViewJobComponent from "./components/admin/job/view-jobmgmt.component";

import UserMgmt from "./components/admin/user/board-usermgmt.component";
import CreateUserComponent from "./components/admin/user/create-usermgmt.component";
import ViewUserComponent from "./components/admin/user/view-usermgmt.component";

import Footer from "./components/common/footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showJobMgmt: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    // console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showJobMgmt: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showJobMgmt, showUserBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            CO-OP System
          </Link>
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showJobMgmt && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/jobmgmt"} className="nav-link">
                    Manage Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/usermgmt"} className="nav-link">
                    Manage Users
                  </Link>
                </li>
              </div>
            )}

            {showUserBoard && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/searchjobs"} className="nav-link">
                    Search Job Postings
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"/viewappliedjobs"} className="nav-link">
                    View Applied Jobs
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to={`/viewpersonaldetails/${currentUser.id}`} className="nav-link">
                    Personal Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/educationdetails/`} className="nav-link">
                    Educational Details
                  </Link>
                </li>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="empty">&nbsp;</div>
        <div className="container mt-3">
          <Switch>
            {/* Common Links */}
            <Route exact path = {["/", "/login"]} component={Login} />
            <Route exact path = "/login" component={Login} />
            <Route exact path = "/register" component={Register} />
            <Route exact path = "/profile" component={Profile} />

            {/* User Part */}
            {/* Job Search And Applied Jobs Management */}
            <Route path = "/searchjobs" component={BoardUser} />
            <Route path = "/viewappliedjobs" component={BoardUser} />
            <Route path = "/viewjobdetail/:id" component={UserJobView} />
            {/* Profile Management */}
            <Route path = "/viewpersonaldetails/:id" component={UserDetailsView} />
            <Route path = "/educationdetails" component={BoardUserEdu} />
            <Route path = "/addeducation/:id" component = {CreateEduComponent} />

            {/* <Route path = "/mod" component={BoardModerator} /> */}

            {/* Admin Part */}
            {/* Jobs Management */}
            <Route path = "/jobmgmt" component={JobMgmt} />
            <Route path = "/addjob/:id" component = {CreateJobComponent} />
            <Route path = "/viewjob/:id" component = {ViewJobComponent} />
            {/* User Management */}
            <Route path = "/usermgmt" component={UserMgmt} />
            <Route path = "/adduser/:id" component = {CreateUserComponent} />
            <Route path = "/viewuser/:id" component = {ViewUserComponent} />
          </Switch>
        </div>
        <div className="empty">&nbsp;</div>
        <Footer/>
      </div>
    );
  }
}

export default App;