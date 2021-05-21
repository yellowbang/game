import React, { createContext, useContext, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  startGame,
  setVote,
  setIsKilled,
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
  setVote,
  setIsKilled,
}) {
  useEffect(() => {
    console.log("----", allPlayers, gameController);
  }, [allPlayers, gameController]);

  const value = { allPlayers, gameController, startGame, setVote, setIsKilled };
  return (
    <WerewolfContext.Provider value={value}>
      {children}
    </WerewolfContext.Provider>
  );
}

const mapStateToProps = (state, ownProps) => {
  const allPlayers = {};
  _.forEach(state.firestore.data.werewolfUsers, (user, id) => {
    allPlayers[id] = { ...user, id };
  });

  let gameController = state.firestore.data.werewolfGameController?.["1"];
  return {
    allPlayers,
    gameController,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (user, roles) => dispatch(startGame(user, roles)),
    setVote: (user, vote) => dispatch(setVote(user, vote)),
    setIsKilled: (user) => dispatch(setIsKilled(user)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "werewolfUsers" },
    { collection: "werewolfGameController" },
  ])
)(WerewolfContextProvider);
