import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from "react-bootstrap/Button";
import { getClassFromName } from "./Character";
import "./Werewolf2.css";
import PlayersList from "./PlayersList";
import { setVote } from "../../store/actions/werewolfActions";

const Player = (props) => {
  let { playerInfo, allPlayers } = props;
  const [roleShown, setRoleShown] = useState(false);

  if (!playerInfo) {
    return <div />;
  }

  allPlayers = _.sortBy(allPlayers, [
    (user) => {
      return user.number;
    },
  ]);
  const { role, username, number } = playerInfo;
  const playerCharacter = getClassFromName(role);

  const handleVote = (selectedPlayer) => {
    props.setVote(playerInfo, selectedPlayer.number);
  };

  return (
    <div className="card my-0">
      <section className="player-info p-3 shadow-sm d-flex w-100 align-items-center justify-content-between">
        <div>{`${username} (${number})`}</div>
        <Button
          variant="outline-primary"
          className=""
          onClick={() => {
            setRoleShown(!roleShown);
          }}
        >
          {roleShown ? `${role}` : "View Role"}
        </Button>
      </section>
      <section className="all-players shadow-sm p-3">
        <PlayersList handleSelect={handleVote} label={"Vote"} />
      </section>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  let allPlayers = state.firestore.data.werewolfUsers;
  const playerInfo = allPlayers?.[id];

  return {
    playerInfo: { ...playerInfo, id },
    allPlayers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVote: (user, vote) => dispatch(setVote(user, vote)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "werewolfUsers" }])
)(Player);
