import React, {Component} from 'react'
import _ from 'lodash';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import UserList from "./UserList";
import {Redirect} from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: true,
            password: '',
            roleShown: true,
        }
    }

    toggleRoleShown = () => {
        this.setState({
            roleShown: !this.state.roleShown,
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || ''
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.props.user.password) {
            this.setState({
                match: true,
            })
        }
    };

    render() {
        const {match, roleShown} = this.state;
        if (_.isEmpty(this.props.werewolfUsers)) {
            return null;
        }

        console.log('======', this.props.user);
        if (_.isEmpty(this.props.user)) {
            return <Redirect to='/'/>;
        }

        const {username, password, number, role} = this.props.user;

        return (
            <div className="user-container container" style={{marginTop: 20}}>
                {
                    match ?
                        <div className="card z-depth-0">
                            <div className="card-content z-depth-1">
                                <div style={{fontSize: "1.64rem"}}>{username}</div>
                                <div style={{display: "flex", alignItems: 'center'}}>Position：<span
                                    style={{fontSize: "1.64rem"}}>{number}</span></div>
                                <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div>
                                        Role：{roleShown ? role : ''}
                                    </div>
                                    <button className="btn yellow darken-2 z-depth-0" onClick={this.toggleRoleShown}>
                                        {roleShown ? 'hide' : 'show'}
                                    </button>
                                </div>
                            </div>
                            <div className="card-content z-depth-1" style={{marginTop: 20}}>
                                <UserList/>
                            </div>
                            <div className="card-content z-depth-1" style={{marginTop: 20}}>
                                <div>
                                    <label htmlFor="notes">Notes</label>
                                    <textarea id="notes" className="materialize-textarea" placeholder={'notes'}/>
                                </div>
                            </div>
                        </div>
                        :
                        <form className="white" onSubmit={this.handleSubmit}>
                            <div>Password</div>
                            <div className="input-field">
                                <input id='password' onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <button disabled={username === '' || password === ''}
                                        className="btn yellow darken-2">Submit
                                </button>
                            </div>
                        </form>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let werewolfUsers = state.firestore.data.werewolfUsers;

    return {
        id,
        user: werewolfUsers && werewolfUsers[id],
        werewolfUsers,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'werewolfUsers'}])
)(User)
