import React, { Component } from "react";
import { connect } from "react-redux";
import { setActionMenu } from "./../../../Actions";

class MenuItem extends Component {
  componentDidMount = () => {};

  handleClick = event => {
    event.stopPropagation();
    console.log("MenuItem: ");
    console.log(this.props.text);
    this.props.callbackFunc();
    this.props.dispatch(setActionMenu(false, 0, 0, []));
  };

  render = () => {
    const style = {
      width: "100%",
      height: "100%",
      color: "white",
      textAlign: "center",
      paddingTop: "7px",
      paddingBottom: "7px"
    };

    return (
      <div style={style} onClick={this.handleClick}>
        {this.props.text}
      </div>
    );
  };
}

export default connect()(MenuItem);
