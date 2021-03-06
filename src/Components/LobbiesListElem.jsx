import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import socket from "./SocketSettings.jsx";
import Media from "react-media";

import "../css/lobbiesListElem.css";

class UnconnectedLobbiesListElem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //
      };
   }

   joinLobby = lobbyId => {
      let data = new FormData();
      data.append("lobbyId", lobbyId);
      data.append("currentUser", this.props.currentUser);

      fetch("/join-lobby", {
         method: "POST",
         body: data,
         credentials: "include"
      })
         .then(resHead => {
            return resHead.text();
         })
         .then(resBody => {
            let parsed = JSON.parse(resBody);

            if (!parsed.success) {
               console.log("Error joining lobby");
               return;
            }

            console.log("Joining lobby...");
            this.props.dispatch({
               type: "JOIN-LOBBY",
               lobbyId: lobbyId,
               inLobby: true
            });
            socket.emit("refresh-lobby-list");
         });
   };

   render = () => {
      return (
         <Media query="(max-width: 768px)">
            {matches =>
               matches ? (
                  <div className="lobbies-list-elem-container">
                     <div className="player-label">{this.props.playerOne}</div>

                     <div className="vs-label">VS</div>

                     <div className="player-label">
                        {this.props.playerTwo ? this.props.playerTwo : "Waiting..."}
                     </div>

                     <button
                        style={{ width: "87px" }}
                        className="material-button green square bottom-pad"
                        disabled={
                           this.props.loggedIn
                              ? this.props.playerTwo
                                 ? true
                                 : false
                              : true
                        }
                        onClick={
                           this.props.playerTwo
                              ? undefined
                              : () => this.joinLobby(this.props.lobbyId)
                        }
                     >
                        {this.props.playerTwo ? "FULL" : "JOIN!"}
                     </button>
                  </div>
               )
                  :
                  (
                     <div className="lobbies-list-elem-container">
                        <div className="vs-label letter-spacing1">
                           {this.props.lobbyId.slice(-5)}
                        </div>

                        <div className="player-label">{this.props.playerOne}</div>

                        <div className="vs-label">VS</div>

                        <div className="player-label">
                           {this.props.playerTwo ? this.props.playerTwo : "Waiting..."}
                        </div>

                        <button
                           style={{ width: "70px" }}
                           className="material-button green square bottom-pad"
                           disabled={
                              this.props.loggedIn
                                 ? this.props.playerTwo
                                    ? true
                                    : false
                                 : true
                           }
                           onClick={
                              this.props.playerTwo
                                 ? undefined
                                 : () => this.joinLobby(this.props.lobbyId)
                           }
                        >
                           {this.props.playerTwo ? "FULL" : "JOIN!"}
                        </button>
                     </div>
                  )
            }
         </Media>
      );
   };
}

let mapStateToProps = state => {
   return {
      currentUser: state.currentUser,
      loggedIn: state.loggedIn
   };
};

let LobbiesListElem = connect(mapStateToProps)(UnconnectedLobbiesListElem);

export default LobbiesListElem;
