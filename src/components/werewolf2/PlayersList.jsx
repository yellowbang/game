import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from "react-bootstrap/Button";
import "./Werewolf2.css";

const INVALID_NUMBER = 99999;
const SKIP_ACTION = { number: INVALID_NUMBER };

const PlayersList = (props) => {
  let {
    allPlayers,
    handleSelect,
    label = "Select",
    disabled,
    rolesDisplayed,
  } = props;
  const [selectedPlayer, setSelectedPlayer] = useState();
  if (!allPlayers) {
    return <div />;
  }

  const onClickRow = (player) => {
    setSelectedPlayer(player);
    handleSelect(player);
  };

  allPlayers = _.sortBy(allPlayers, [
    "death",
    (user) => {
      return user.number;
    },
  ]);

  const itemRowClassName =
    "player-row w-100 p-2 d-flex flex-row align-items-center justify-content-between";
  const allPlayersRow = _.map(allPlayers, (user) => {
    let userContainer = {
      opacity: user.death ? 0.3 : 1,
    };

    return (
      <div
        id={user.id}
        key={user.username}
        style={userContainer}
        className={itemRowClassName}
      >
        <div className="order-number">
          {user.number}{" "}
          {Number.isInteger(user.vote) && user.vote !== INVALID_NUMBER
            ? ` => ${user.vote}`
            : ""}
        </div>
        <div className="name">
          {user.username} {rolesDisplayed ? ` (${user.role})` : ""}
        </div>
        <div className="bg-white">
          <Button
            disabled={user.death || disabled}
            variant={
              user === selectedPlayer ? "secondary" : "outline-secondary"
            }
            onClick={() => {
              onClickRow(user);
            }}
          >
            {label}
          </Button>
        </div>
      </div>
    );
  });

  allPlayersRow.push(
    <div key="Skip" className={itemRowClassName + " flex-row-reverse"}>
      <div className="bg-white">
        <Button
          disabled={disabled}
          variant={
            SKIP_ACTION === selectedPlayer ? "secondary" : "outline-secondary"
          }
          onClick={() => {
            onClickRow(SKIP_ACTION);
          }}
        >
          Skip
        </Button>
      </div>
    </div>
  );

  return allPlayersRow;
};

const mapStateToProps = (state, ownProps) => {
  let allPlayers = state.firestore.data.werewolfUsers;

  return {
    allPlayers,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "werewolfUsers" }])
)(PlayersList);
