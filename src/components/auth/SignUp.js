import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        dream: '',
    };
    handleChangeName = (e) => {
        this.setState({
            email: e.target.value + '@sfcac.com',
            name: e.target.value
        })
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    };

    render() {
        const {auth, authError} = this.props;
        if (auth.uid) {
            return <Redirect to='/'/>;
        }

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' onChange={this.handleChangeName}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="dream">Dream</label>
                        <input type="text" id='dream' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn yellow darken-2 z-depth-0">Sign Up</button>
                        <div className="center red-text">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
