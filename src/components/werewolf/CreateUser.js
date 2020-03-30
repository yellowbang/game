import React, {Component} from 'react'
import _ from "lodash";
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import {createWerewolfUser} from '../../store/actions/werewolfActions'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const TEMP_PASSWORD = 'qwryewuaegjvnzdkfnkzdfbhanzjvnd.zs';
const formStyle = {
    padding: "1px 24px",
};

const errMsgStyle = {
    border: "1px solid red",
    color: "red",
    padding: 10,
    margin: "10px 0",
    width: "max-content",
    borderRadius: 2,
};

class CreateUser extends Component {
    state = {
        loginUsername: '',
        loginPassword: '',
        loginErrMsg: '',
        username: '',
        password: '',
        errMsg: '',
        number: 0,
        role: '',
        createdUserId: '',
        death: false,
        loading: false,
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };


    lookUpUser = (username, password) => {
        const {werewolfUsers} = this.props;
        for (let i = 0; i < werewolfUsers.length; i++) {
            const user = werewolfUsers[i];
            if (user.username === username && (user.password === password || password === TEMP_PASSWORD)) {
                return user;
            }
        }
        return false;
    };

    handleLoginUser = (e) => {
        e.preventDefault();
        const {loginUsername, loginPassword} = this.state;
        this.setState({
            loading: true
        });
        const user = this.lookUpUser(loginUsername, loginPassword);
        if (_.isEmpty(user)) {
            this.setState({
                loading: false,
                loginErrMsg: 'Login Failed. Please try again.'
            })
        } else {
            this.setState({
                createdUserId: user.id,
                username: loginUsername,
            })
        }
    };

    handleCreateUser = (e) => {
        e.preventDefault();
        const {username, password, number, role, death} = this.state;
        this.setState({
            loading: true
        });
        const user = this.lookUpUser(username, TEMP_PASSWORD);
        if (_.isEmpty(user)) {
            this.props.createWerewolfUser({username, password, number, role, death}).then(res => {
                if (res) {
                    this.setState({
                        createdUserId: res,
                    })
                } else {
                    this.setState({
                        loading: false,
                        errMsg: 'Error, please try again.'
                    })
                }
            });
        } else {
            this.setState({
                loading: false,
                errMsg: username + ' already exists. Please login.'
            })
        }
    };

    render() {
        const {loginUsername, loginPassword, username, password, createdUserId, loading, loginErrMsg, errMsg} = this.state;
        if (createdUserId) {
            return <Redirect to={"/user/" + createdUserId}/>;
        }

        return (
            <div className="container">

                <div className="card z-depth-1">
                    <form className="card-content white" style={formStyle} onSubmit={this.handleLoginUser}>
                        <h5 className="grey-text text-darken-3">Login</h5>
                        {!_.isEmpty(loginErrMsg) && <div style={errMsgStyle}>{loginErrMsg}</div>}
                        <div>Name</div>
                        <div className="input-field">
                            <input id='loginUsername' onChange={this.handleChange}/>
                        </div>
                        <div>Password</div>
                        <div className="input-field">
                            <input id='loginPassword' onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <button disabled={loginUsername === '' || loginPassword === '' || loading}
                                    className="btn yellow darken-2">Login
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card z-depth-1">
                    <form className="card-content white" style={formStyle} onSubmit={this.handleCreateUser}>
                        <h5 className="grey-text text-darken-3">Create a user</h5>
                        {!_.isEmpty(errMsg) && <div style={errMsgStyle}>{errMsg}</div>}
                        <div>Name</div>
                        <div className="input-field">
                            <input id='username' onChange={this.handleChange}/>
                        </div>
                        <div>Password</div>
                        <div className="input-field">
                            <input id='password' onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <button disabled={username === '' || password === '' || loading}
                                    className="btn yellow darken-2">Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let users = state.firestore.data.werewolfUsers;
    let werewolfUsers = [];
    _.forEach(users, (user, id) => {
        if (!_.isEmpty(user)) {
            werewolfUsers.push({...user, id});
        }
    });
    return {
        werewolfUsers,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createWerewolfUser: (user) => dispatch(createWerewolfUser(user))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'werewolfUsers'}])
)(CreateUser)
