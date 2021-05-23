import React, { createContext, useContext, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  startGame,
  toggleVotePhase,
  setPhase,
  resetNightPhase,
  setVote,
  setIsKilled,
  wolfKill,
  wolfLadySleep,
  deleteUser,
} from "../../store/actions/werewolfActions";

export const WerewolfContext = createContext();

export const useWerewolfContext = () => {
  return useContext(WerewolfContext);
};

function WerewolfContextProvider({
  children,
  allPlayers,
  gameController,
  startGame,
  toggleVotePhase,
  setPhase,
  resetNightPhase,
  setVote,
  setIsKilled,
  wolfKill,
  wolfLadySleep,
  deleteUser,
}) {
  useEffect(() => {
    // console.log("----", allPlayers, gameController);
  }, [allPlayers, gameController]);

  const value = {
    allPlayers,
    gameController,
    startGame,
    toggleVotePhase,
    setPhase,
    resetNightPhase,
    setVote,
    setIsKilled,
    wolfKill,
    wolfLadySleep,
    deleteUser,
  };
  return (
    <WerewolfContext.Provider value={value}>
      {children}
    </WerewolfContext.Provider>
  );
}

const mapStateToProps = (state, ownProps) => {
  const allPlayers = {};
  _.forEach(state.firestore.data.werewolfUsers, (user, id) => {
    if (user && user.username) {
      allPlayers[id] = { ...user, id };
    }
  });

  let gameController = state.firestore.data.werewolfGameController?.["1"] || {};
  return {
    allPlayers,
    gameController,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (user, roles) => dispatch(startGame(user, roles)),
    toggleVotePhase: (isVoting) => dispatch(toggleVotePhase(isVoting)),
    setVote: (user, vote) => dispatch(setVote(user, vote)),
    setIsKilled: (user) => dispatch(setIsKilled(user)),
    setPhase: (phase) => dispatch(setPhase(phase)),
    resetNightPhase: (phase) => dispatch(resetNightPhase(phase)),
    wolfKill: (user) => dispatch(wolfKill(user)),
    wolfLadySleep: (user) => dispatch(wolfLadySleep(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "werewolfUsers" },
    { collection: "werewolfGameController" },
  ])
)(WerewolfContextProvider);
