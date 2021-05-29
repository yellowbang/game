import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  toggleIsKilled,
  deleteUser,
} from "../../store/actions/werewolfActions";

const userContainerStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingBottom: 10,
};

const itemDetailStyle = {
  flex: 1,
  fontSize: 14,
  fontWeight: 500,
};

const deleteButtonSytle = {
  height: 20,
  width: 20,
  marginRight: 30,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const killButtonStyle = {
  width: "minContext",
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteUser = (user) => {
    this.props.deleteUser(user);
  };

  toggleIsKilled = (killedUser) => {
    this.props.toggleIsKilled(killedUser);
  };

  render() {
    let { werewolfUsers, isMc = false } = this.props;

    werewolfUsers = _.sortBy(werewolfUsers, [
      (user) => {
        return user.number;
      },
    ]);

    return (
      <div className="container" style={{ marginTop: 10 }}>
        {_.map(werewolfUsers, (user) => {
          let userContainer = {
            ...userContainerStyle,
            opacity: user.death ? 0.3 : 1,
          };
          return (
            <div id={user.id} key={user.username} style={userContainer}>
              {isMc && (
                <i
                  className="material-icons"
                  style={deleteButtonSytle}
                  onClick={this.deleteUser.bind(this, user)}
                >
                  remove_circle_outline
                </i>
              )}
              <div style={itemDetailStyle}>{user.number}</div>
              <div style={{ ...itemDetailStyle, flex: 2 }}>{user.username}</div>
              {isMc && (
                <div style={{ ...itemDetailStyle, flex: 3 }}>{user.role}</div>
              )}
              {isMc && (
                <button
                  style={killButtonStyle}
                  className="btn red lighten-1 waves-effect"
                  onClick={this.toggleIsKilled.bind(this, user)}
                >
                  Killed
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let users = state.firestore.data.werewolfUsers;
  let werewolfUsers = {};
  _.map(users, (user, id) => {
    if (!_.isEmpty(user)) {
      werewolfUsers[id] = { ...user, id };
    }
  });
  return {
    werewolfUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsKilled: (user) => dispatch(toggleIsKilled(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "werewolfUsers" }])
)(UserList);
