import ReactDOM from "react-dom";
import "./css/main.css";
import "./css/buttons.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store.js";
import HomePage from "./Components/HomePage.jsx";
import GameFrame from "./Components/Game/GameFrame.jsx";
import AnimatedMessage from "./Components/AnimatedMessage.jsx";
import Oops from "./Components/Oops.jsx";
import ResponsiveNavBar from "./Components/ResponsiveNavBar.jsx";
import SideBar from "./Components/SideBar.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import Signup from "./Components/Signup.jsx";
import LobbiesList from "./Components/LobbiesList.jsx";
import AutoLogin from "./components/AutoLogin.jsx";
import Lobby from "./components/Lobby.jsx";
import About from "./components/About.jsx";
import ProfileForm from "./components/ProfileForm.jsx";
import ArmyBuilder from "./components/ArmyBuilder.jsx";
import HowToPlay from "./components/HowToPlay.jsx";
import NewsForm from "./Components/NewsForm.jsx";
import CloudsBG from "./components/CloudsBG.jsx";

let root = (
   <Provider store={store}>
      <BrowserRouter>
         <div className="main-container">
            <CloudsBG />
            <Route exact={false} path="/" component={AutoLogin} />
            {/* <Route exact={false} path="/" component={AnimatedMessage} /> */}
            <ResponsiveNavBar />
            <SideBar />
            <div className="sidebar-and-game-container">
               <div className="main-div">
                  <Switch>
                     <Route exact={true} path="/" component={HomePage} />
                     <Route exact={true} path="/game/:gameId" component={GameFrame} />
                     <Route exact={true} path="/leaderboard" component={Leaderboard} />
                     <Route exact={true} path="/signup" component={Signup} />
                     <Route
                        exact={true}
                        path="/lobbies-list"
                        component={LobbiesList}
                     />
                     <Route exact={true} path="/lobby/:lobbyId" component={Lobby} />
                     <Route exact={true} path="/about" component={About} />
                     <Route
                        exact={true}
                        path="/edit-profile"
                        component={ProfileForm}
                     />
                     <Route
                        exact={true}
                        path="/army-builder"
                        component={ArmyBuilder}
                     />
                     <Route
                        exact={true}
                        path="/how-to-play/:step"
                        component={HowToPlay}
                     />
                     <Route exact={true} path="/add-news" component={NewsForm} />
                     <Route
                        render={props => (
                           <Oops {...props} message={"This page does not exist."} />
                        )}
                     />
                  </Switch>
               </div>
            </div>
            {/* Google Fonts imports */}
            <link
               href="https://fonts.googleapis.com/css?family=Rubik"
               rel="stylesheet"
            />
            <link
               href="https://fonts.googleapis.com/css?family=Scope+One&display=swap"
               rel="stylesheet"
            />
         </div>
      </BrowserRouter>
   </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
