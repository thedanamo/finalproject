import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/armyBuilder.css";

let charTypes = ["pawn", "knight", "archer", "catapult", "legionary"];

class UnconnectedArmyBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      army: [
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none", "none"]
      ],
      width: 8,
      height: 8,
      selectedTile: { x: -1, y: -1 },
      isTileSelected: false,
      selectedTileRef: undefined,
      previousImg: undefined
    };
  }
  componentDidMount = () => {
    console.log("yup");
    fetch("/get-player-army")
      .then(resHeader => {
        return resHeader.text();
      })
      .then(resBody => {
        if (resBody === "") {
          return;
        }
        let parsedBody = JSON.parse(resBody);
        console.log(parsedBody);
        let playerArmy = parsedBody;
        if (
          playerArmy !== undefined &&
          playerArmy.length === 3 &&
          playerArmy[0].length === this.state.width
        ) {
          this.setState({ army: playerArmy });
        } else {
          console.log("army sent is bad");
        }
      });
  };
  handlerClickTileElem = event => {
    if (this.state.selectedTileRef !== undefined) {
      console.log(this.state.selectedTileRef);
      let targetTile = this.state.selectedTileRef;
      if (this.state.previousImg === undefined) {
        targetTile.src = "/assets/army-builder-tile.png";
      } else {
        targetTile.src = this.state.previousImg;
      }
      this.setState({
        selectedTileRef: undefined,
        previousImg: event.target.src
      });
    }
    let tilePos = event.target.id.split("_");
    event.target.src = "/assets/army-builder-tile-light.png";
    this.setState({
      selectedTileRef: event.target,
      isTileSelected: true,
      selectedTile: { x: parseInt(tilePos[1]), y: parseInt(tilePos[2]) }
    });
  };
  handlerClickChar = event => {
    let changeArmy = this.state.army;

    let row = this.state.height - 1 - this.state.selectedTile.x;
    let col = this.state.selectedTile.y;
    changeArmy[row][col] = event.target.id;

    this.setState({ army: changeArmy });
    if (this.state.selectedTileRef !== undefined) {
      console.log(this.state.selectedTileRef);
      let targetTile = this.state.selectedTileRef;
      this.setState({ selectedTileRef: undefined });
      targetTile.src = event.target.src;
    }
    this.setState({ isTileSelected: false });
  };
  handlerClickSetArmy = event => {
    let data = new FormData();
    let stringArmy = this.state.army.map(row => {
      return row.join(" ");
    });
    stringArmy = stringArmy.join("_");
    console.log(stringArmy);
    data.append("armyString", stringArmy);
    fetch("/set-army", { method: "Post", body: data });
  };
  renderSelectChar = () => {
    if (this.state.isTileSelected) {
      return (
        <div className={"armyBuildCharDiv"}>
          <img
            onClick={this.handlerClickChar}
            id={"pawn"}
            className={"armyBuilderCharSelect"}
            src="/assets/char-pawn-blue.png"
          />
          <img
            id={"legionary"}
            onClick={this.handlerClickChar}
            className={"armyBuilderCharSelect"}
            src="/assets/char-legionary-blue.png"
          />
          <img
            id={"archer"}
            onClick={this.handlerClickChar}
            className={"armyBuilderCharSelect"}
            src="/assets/char-archer-blue.png"
          />
          <img
            id={"knight"}
            onClick={this.handlerClickChar}
            className={"armyBuilderCharSelect"}
            src="/assets/char-knight-blue.png"
          />
          <img
            id={"catapult"}
            onClick={this.handlerClickChar}
            className={"armyBuilderCharSelect"}
            src="/assets/char-catapult-blue.png"
          />
          <img
            id={""}
            onClick={this.handlerClickChar}
            className={"armyBuilderCharSelect"}
            src="/assets/army-builder-tile.png"
          />
        </div>
      );
    }
  };
  renderMap = () => {
    let allActors = [];
    for (let row = 0; row < this.state.width; row++) {
      let colActors = [];
      for (let col = 0; col < this.state.width; col++) {
        let tileElem = (
          <div>
            <img
              onClick={this.handlerClickTileElem}
              key={"tileElem_" + row + "_" + col}
              id={"armyBuilderTile_" + row + "_" + col}
              className={"ArmyBuilderTileImg"}
              src={"/assets/army-builder-tile.png"}
            />
          </div>
        );
        if (row < this.state.width - 1 - 2) {
          tileElem = (
            <div>
              <img
                key={"tileElem_" + row + "_" + col}
                id={"armyBuilderTile_" + row + "_" + col}
                className={"ArmyBuilderTileImg"}
                src={"/assets/army-builder-tile-grey.png"}
              />
            </div>
          );
        }
        if (row >= this.state.width - this.state.army.length) {
          let charAtTile = this.state.army[this.state.width - 1 - row][col];
          if (charTypes.includes(charAtTile)) {
            console.log(charAtTile);
            tileElem = (
              <div>
                <img
                  onClick={this.handlerClickTileElem}
                  key={"tileElem_" + row + "_" + col}
                  id={"armyBuilderTile_" + row + "_" + col}
                  className={"ArmyBuilderTileImg"}
                  src={"/assets/char-" + charAtTile + "-blue.png"}
                />
              </div>
            );
          }
        }
        colActors.push(tileElem);
      }

      allActors.push(
        <div key={"armyBoardRow" + row} className={"armyBuilderBoardRow"}>
          {colActors}
        </div>
      );
    }
    return (
      <div key={"armyBoard"} className={"armyBuilderBoard"}>
        {allActors}
      </div>
    );
  };
  render = () => {
    if (this.props.loggedIn !== true) {
      return (
        <div className={"armyBuilderMainDiv"}>
          <p>please log in</p>
        </div>
      );
    }
    return (
      <div className={"armyBuilderMainDiv"}>
        {this.renderMap()}
        {this.renderSelectChar()}
        <button onClick={this.handlerClickSetArmy}>save army</button>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArmyBuilder = connect(mapStateToProps)(UnconnectedArmyBuilder);
export default ArmyBuilder;
