import React, { createContext, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { setVote } from "../../store/actions/werewolfActions";

export const WerewolfContext = createContext();

export const useWerewolfContext = () => {
  return useContext(WerewolfContext);
};

function WerewolfContextProvider({ children, allPlayers, gameController, setVote }) {
  useEffect(() => {
    console.log("----", allPlayers, gameController);
  }, [allPlayers, gameController]);

  const value = { allPlayers, gameController, setVote };
  return (
    <WerewolfContext.Provider value={value}>
      {children}
    </WerewolfContext.Provider>
  );
}

const mapStateToProps = (state, ownProps) => {
  let allPlayers = state.firestore.data.werewolfUsers;
  let gameController = state.firestore.data.werewolfGameController?.["1"];

  return {
    allPlayers,
    gameController,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVote: (user, vote) => dispatch(setVote(user, vote)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "werewolfUsers" },
    { collection: "werewolfGameController" },
  ])
)(WerewolfContextProvider);
