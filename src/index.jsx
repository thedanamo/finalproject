import ReactDOM from "react-dom";
import "./css/main.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store.js";
import HomePage from "./Components/HomePage.jsx";
import GameFrame from "./Components/Game/GameFrame.jsx";
import AnimatedMessage from "./Components/AnimatedMessage.jsx";
import Oops from "./Components/Oops.jsx";
import TopBar from "./Components/TopBar.jsx";
import SideBar from "./Components/SideBar.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import Signup from "./Components/Signup.jsx";
import LobbiesList from "./Components/LobbiesList.jsx";
import AutoLogin from "./components/AutoLogin.jsx";

let root = (
<<<<<<< HEAD
   <Provider store={store}>
      <BrowserRouter>
         <div className="main-container">
            <TopBar />
            <div className="sidebar-and-game-container">
               <SideBar />
               <div className="main-div">
                  <Switch>
                     <Route exact={true} path="/" component={HomePage} />
                     <Route exact={true} path="/game/:gameId" component={GameFrame} />
                     <Route exact={true} path="/leaderboard" component={Leaderboard} />
                     <Route exact={true} path="/signup" component={Signup} />
                     <Route exact={true} path="/lobbies_list" component={LobbiesList} />
                     <Route
                        render={props => (
                           <Oops {...props} message={"This page doesn't exist... yet"} />
                        )}
                     />
                  </Switch>
               </div>
            </div>
            {/* Google Fonts imports */}
            <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet"></link>
         </div>
      </BrowserRouter>
   </Provider>
=======
  <Provider store={store}>
    <BrowserRouter>
      <div className="main-container">
        <Route exact={false} path="/" component={AutoLogin} />
        <Route exact={false} path="/" component={AnimatedMessage} />
        <TopBar />
        <div className="sidebar-and-game-container">
          <SideBar />
          <div className="main-div">
            <Switch>
              <Route exact={true} path="/" component={HomePage} />
              <Route exact={true} path="/game/:gameId" component={GameFrame} />
              <Route exact={true} path="/leaderboard" component={Leaderboard} />
              <Route exact={true} path="/signup" component={Signup} />
              <Route
                exact={true}
                path="/lobbies_list"
                component={LobbiesList}
              />
              <Route
                render={props => (
                  <Oops {...props} message={"This page doesn't exist... yet"} />
                )}
              />
            </Switch>
          </div>
        </div>
        {/* Google Fonts imports */}
        <link
          href="https://fonts.googleapis.com/css?family=Merriweather"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Rubik"
          rel="stylesheet"
        />
      </div>
    </BrowserRouter>
  </Provider>
>>>>>>> 5191600e5deb0295883b8d709462bd958c3d8d3d
);

ReactDOM.render(root, document.getElementById("root"));
