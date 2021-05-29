import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
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
  toggleIsKilled,
  wolfKill,
  wolfLadySleep,
  witchHeal,
  witchPoison,
  seerSees,
  deleteUser,
} from "../../store/actions/werewolfActions";
import { getClassFromName } from "./Character";

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
  toggleIsKilled,
  wolfKill,
  wolfLadySleep,
  witchHeal,
  witchPoison,
  seerSees,
  deleteUser,
}) {
  useEffect(() => {
    // console.log("----", allPlayers, gameController);
  }, [allPlayers, gameController]);

  const id = window.location.pathname.split("/")[2];
  const playerInfo = { ...allPlayers[id], id };
  useEffect(() => {
    if (playerInfo.death) {
      const { role } = playerInfo;
      const playerCharacter = getClassFromName(role);
      playerCharacter.onDead();
    }
  }, [playerInfo.death]);

  const getPlayerByNumber = useCallback(
    (number) => {
      return _.find(allPlayers, { number: parseInt(number, 10) });
    },
    [allPlayers]
  );

  const value = {
    allPlayers,
    getPlayerByNumber,
    gameController,
    startGame,
    toggleVotePhase,
    setPhase,
    resetNightPhase,
    setVote,
    toggleIsKilled,
    wolfKill,
    wolfLadySleep,
    witchHeal,
    witchPoison,
    seerSees,
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
    toggleIsKilled: (user) => dispatch(toggleIsKilled(user)),
    setPhase: (phase) => dispatch(setPhase(phase)),
    resetNightPhase: (phase) => dispatch(resetNightPhase(phase)),
    wolfKill: (user) => dispatch(wolfKill(user)),
    wolfLadySleep: (user) => dispatch(wolfLadySleep(user)),
    witchHeal: () => dispatch(witchHeal()),
    witchPoison: (user) => dispatch(witchPoison(user)),
    seerSees: (user) => dispatch(seerSees(user)),
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
