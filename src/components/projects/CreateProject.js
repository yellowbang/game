import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'

class CreateProject extends Component {
    state = {
        id: '',
        username: '',
        content: '',
        travel: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state);
        console.log('--------', this.state.content, this.state.travel)
        // alert('submitted')
    };

    render() {
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Create a Hint</h5>
                    <div className="input-field">
                        <input type="number" id='id' onChange={this.handleChange}/>
                        <label htmlFor="id">ID</label>
                    </div>
                    <div className="input-field">
                        <input id='username' onChange={this.handleChange}/>
                        <label htmlFor="username"></label>
                    </div>
                    <div className="input-field">
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label htmlFor="content">Dream</label>
                    </div>
                    <div className="input-field">
                        <textarea id="travel" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label htmlFor="travel">Travel</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
