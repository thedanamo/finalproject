import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import mockLobbies from "./mockLobbies.jsx"

import LobbiesListElem from "./LobbiesListElem.jsx"

import "../css/lobbiesList.css"

class UnconnectedLobbiesList extends Component {

   constructor(props) {
      super(props)
      this.state = {
         lobbies: []
      }
   }

   componentDidMount = () => {
      //Popular lobbies array in state upon loading!
      this.getLobbies()
   }

   getLobbies = () => {

      fetch("/get-lobbies")
         .then(resHead => {
            return resHead.text()
         })
         .then(resBody => {

            let parsedLobbies = JSON.parse(resBody) // Array of all lobbies in collection

            this.setState({
               lobbies: parsedLobbies
            })
         })

   }

   getMockLobbies = () => {
      return mockLobbies;
   }

   createLobby = () => {

      fetch("/create-lobby", {
         method: "POST",
         credentials: "include"
      })
         .then(resHead => {
            return resHead.text()
         })
         .then(resBody => {

            if (!resBody.success) {
               console.log("Error creating lobby")
               return
            }
            console.log("Joining the lobby!!")

            this.props.dispatch({
               type: "JOIN-LOBBY",
               lobbyId: resBody.lobbyId
            })
         })
   }


   render = () => {

      if (!this.props.loggedIn) {
         return <Redirect to="/" />
      }

      if (this.props.inLobby) {
         return <Redirect to={"lobby/:" + this.props.lobbyToJoinId} />
      }

      return (
         <div className="lobbies-list-background">

            <div className="lobbies-list-foreground material-shadow animated-fade-in-delay">

               <div className="lobbies-list-button-cont">
                  <button className="ghost-button-dark" onClick={this.createLobby}>Create new lobby</button>
                  <button className="ghost-button-dark" onClick={this.getLobbies}>Refresh lobbies </button>
               </div>
               <div className="lobbies-list-container">
                  {this.getMockLobbies().map(elem => {
                     return <LobbiesListElem lobbyId={elem.lobbyId} playerOne={elem.playerOne} playerTwo={elem.playerTwo} />
                  })}
               </div>

            </div>
         </div>
      )
   }

}

let mapStateToProps = state => {
   return {
      loggedIn: state.loggedIn,
      currentLobby: state.currentLobby,
      inLobby: state.inLobby,
      lobbyToJoinId: state.currentLobby
   }
}

let LobbiesList = connect(mapStateToProps)(UnconnectedLobbiesList)

export default LobbiesList