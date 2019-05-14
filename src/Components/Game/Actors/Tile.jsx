import React, { Component } from "react";
import { connect } from "react-redux";
import { setActionMenu } from "./../../../Actions";

class Tile extends Component {
  componentDidMount = () => {};

  handleClick = event => {
    event.stopPropagation();
    console.log("Tile: ", this.props.actorData.actorId);

    if (this.props.visible) {
      this.props.dispatch(setActionMenu(false, 0, 0, []));
    }
  };

  render = () => {
    const style = {
      fill: "#004400"
      //transform: "rotate3d(0.6, -0.2, 0.2, 75deg)"
    };

    const xFrontend = this.props.actorData.pos.x * this.props.gameData.width;
    const yFrontend = this.props.actorData.pos.y * this.props.gameData.height;

    return (
      <rect
        style={style}
        stroke="red"
        stroke-width="2"
        stroke-linecap="square"
        x={xFrontend + "%"}
        y={yFrontend + "%"}
        width={this.props.gameData.width + "%"}
        height={this.props.gameData.height + "%"}
        onClick={this.handleClick}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    visible: state.actionMenu.visible,
    gameData: state.gameData
  };
};

export default connect(mapStateToProps)(Tile);
