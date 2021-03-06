import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

import "../css/sideBar.css";
import Profile from "./Profile.jsx";
import Spinner from "./Spinner.jsx"
import { Animate } from "react-animate-mount"

class UnconnectedSideBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         show: false,
         show2: false,

      };
   }

   signout = () => {
      this.props.dispatch({
         type: "SIGN-OUT",
         toggle: false
      });

      fetch("/logout", {
         credentials: "include"
      });
   };

   loggedInSidebar = () => {

      return (
         <div className="profile-bar animated-fade-in material-shadow">
            <Profile />
            <div className="flex-col">
               <Link className="material-button top-marge" to="/army-builder">Army Builder </Link>
               <button className="material-button signout-button top-marge" onClick={this.signout} >
                  Sign Out
               </button>
            </div>
         </div>
      );
   }



   login = () => {
      return (
         <div className="animated-fade-in login-bar material-shadow">
            <div className="sideBarForm animated-fade-in">
               <Login />
            </div>
         </div>
      );
   };

   signup = () => {
      return (
         <div className="animated-fade-in signup-bar material-shadow">
            <div className="sideBarForm">
               <Signup />
            </div>
         </div>
      )
   }

   handleShow = () => {
      if (this.state.show2) {
         this.setState({
            show: !this.state.show,
            show2: !this.state.show2
         })
      }
      this.setState({
         show: !this.state.show
      })
   }

   handleShow2 = () => {
      if (this.state.show) {
         this.setState({
            show: !this.state.show,
            show2: !this.state.show2
         })
      }
      this.setState({
         show2: !this.state.show2
      })
   }

   render = () => {
      if (this.props.loggedIn === false) {
         return (
            <div style={{ display: "flex" }}>
               <button onClick={this.handleShow} className="material-button show-button "> LOGIN </button>
               <Animate show={this.state.show} >
                  {this.login()}
               </Animate>
               <button onClick={this.handleShow2} className="material-button show-button signup-button"> SIGNUP </button>
               <Animate show={this.state.show2} >
                  {this.signup()}
               </Animate>
            </div>
         )
      }
      else {
         return (
            <div>
               <button onClick={this.handleShow} className="material-button show-button"> PROFILE </button>
               <Animate show={this.state.show}>
                  {this.loggedInSidebar()}
               </Animate>
            </div>
         )
      }

   };


}

const mapStateToProps = state => {
   return {
      loggedIn: state.loggedIn,
      currentUser: state.currentUser
   };
};

let SideBar = connect(mapStateToProps)(UnconnectedSideBar);

export default SideBar;
