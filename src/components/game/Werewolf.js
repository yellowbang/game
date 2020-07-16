import React, {Component} from 'react'
import _ from 'lodash';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from "react-redux-firebase";
import {startGame} from '../../store/actions/werewolfActions';
import UserList from '../werewolf/UserList';
import {Modal} from '../common/modal';

const appContainer = {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const modalContentStyle = {
    overflow: 'scroll',
};

const modalBottonsStyle = {
    width: '100%',
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
};

class Werewolf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seer: true,
            witch: true,
            hunter: true,
            knight: true,
            deadKnight: false,
            cupid: false,
            bear: false,
            guard: false,
            baga: false,
            wolves: 3,
            wolfKing: true,
            wolfLady: false,
            wolfSnow: false,
            wolfWhiteKing: false,
            startGameModalShown: false,
        }
    }

    toggleStartGameModal = () => {
        this.setState({
            startGameModalShown: !this.state.startGameModalShown
        });
    };

    handleCheck = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.checked,
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    handleSubmit = () => {
        const {seer, witch, hunter, knight, deadKnight, guard, baga, cupid, bear, wolves, wolfKing, wolfLady, wolfSnow, wolfWhiteKing} = this.state;
        let roles = [];
        for (let i = 0; i < wolves; i++) {
            roles.push('wolf');
        }
        if (wolfKing) {
            roles.pop();
        }
        if (wolfLady) {
            roles.pop();
        }
        if (wolfSnow) {
            roles.pop();
        }
        if (wolfWhiteKing) {
            roles.pop();
        }
        if (wolfKing) {
            roles.push('Wolf King');
        }
        if (wolfLady) {
            roles.push('Wolf Lady');
        }
        if (wolfSnow) {
            roles.push('Wolf Snow');
        }
        if (wolfWhiteKing) {
            roles.push('Wolf White King');
        }
        if (bear) {
            roles.push('Bear');
        }
        if (cupid) {
            roles.push('Cupid');
        }
        if (knight) {
            roles.push('Knight');
        }
        if (deadKnight) {
            roles.push('Dead Knight');
        }
        if (guard) {
            roles.push('Guard');
        }
        if (baga) {
            roles.push('Baga');
        }
        if (hunter) {
            roles.push('Hunter');
        }
        if (witch) {
            roles.push('Witch');
        }
        if (seer) {
            roles.push('Seer');
        }
        for (let j = roles.length; j < Object.keys(this.props.werewolfUsers).length; j++) {
            roles.push('Villager');
        }

        this.props.startGame(this.props.werewolfUsers, roles);
        this.toggleStartGameModal();
    };

    renderCheckbox = (defaultCheck, id, label) => {
        return (
            <p>
                <label>
                    <input
                        type="checkbox"
                        className="filled-in"
                        defaultChecked={defaultCheck}
                        name={id}
                        id={id}
                        onChange={this.handleCheck}/>
                    <span>{label}</span>
                </label>
            </p>
        )
    };

    render() {
        const {startGameModalShown, wolves, wolfKing, wolfLady, wolfSnow, wolfWhiteKing, seer, witch, hunter, knight, deadKnight, guard, baga, cupid, bear} = this.state;
        const {werewolfUsers} = this.props;
        console.log(werewolfUsers);
        let villagers = _.isEmpty(werewolfUsers) ? 7 : Object.keys(werewolfUsers).length - wolves;
        if (seer) {
            villagers--;
        }
        if (witch) {
            villagers--;
        }
        if (hunter) {
            villagers--;
        }
        if (knight) {
            villagers--;
        }
        if (deadKnight) {
            villagers--;
        }
        if (guard) {
            villagers--;
        }
        if (baga) {
            villagers--;
        }
        if (cupid) {
            villagers--;
        }
        if (bear) {
            villagers--;
        }

        let gameContent = (
            <div className={'container'} style={appContainer}>
                <UserList isMc/>
                <button className="btn yellow darken-3" onClick={this.toggleStartGameModal}>Start Game</button>
                <Modal
                    shown={startGameModalShown}
                    modalContent={(
                        <div style={modalContentStyle}>
                            <div>
                                <label htmlFor="wolves">Number of Wolves</label>
                                <input placeholder="Placeholder" id="wolves" type="number" className="validate"
                                       onChange={this.handleChange} defaultValue={wolves}/>
                            </div>
                            {this.renderCheckbox(wolfKing, 'wolfKing', 'Wolf King')}
                            {this.renderCheckbox(wolfLady, 'wolfLady', 'Wolf Lady')}
                            {this.renderCheckbox(wolfSnow, 'wolfSnow', 'Wolf Snow')}
                            {this.renderCheckbox(wolfWhiteKing, 'wolfWhiteKing', 'Wolf White King')}
                            <hr style={{borderStyle: 'solid'}}/>
                            {this.renderCheckbox(seer, 'seer', 'Seer')}
                            {this.renderCheckbox(witch, 'witch', 'Witch')}
                            {this.renderCheckbox(hunter, 'hunter', 'Hunter')}
                            {this.renderCheckbox(knight, 'knight', 'Knight')}
                            {this.renderCheckbox(deadKnight, 'deadKnight', 'Dead Knight')}
                            {this.renderCheckbox(guard, 'guard', 'Guard')}
                            {this.renderCheckbox(baga, 'baga', 'Baga')}
                            {this.renderCheckbox(cupid, 'cupid', 'Cupid')}
                            {this.renderCheckbox(bear, 'bear', 'Bear')}
                            <div>
                                <label htmlFor="aa">Number of Villagers</label>
                                <input disabled placeholder="Placeholder" id="villagers" type="text"
                                       className="validate"
                                       value={villagers}/>
                            </div>
                        </div>
                    )}
                    modalFooter={(
                        <div style={modalBottonsStyle}>
                            <button className="btn grey darken-3" onClick={this.toggleStartGameModal}>Cancel</button>
                            <button className="btn yellow darken-3" onClick={this.handleSubmit}>Start</button>
                        </div>
                    )}
                />
            </div>

        );
        return gameContent
    }
}

const mapStateToProps = (state) => {
    let users = state.firestore.data.werewolfUsers;
    let werewolfUsers = {};
    _.map(users, (user, id) => {
        if (!_.isEmpty(user)) {
            werewolfUsers[id] = {...user, id};
        }
    });
    return {
        werewolfUsers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startGame: (user, roles) => dispatch(startGame(user, roles)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'werewolfUsers'}])
)(Werewolf)


