import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import money from "../../assests/money.png"

const ProjectDetails = (props) => {
    const {project, auth} = props;

    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content z-depth-2">
                        <span className="card-title">提示</span>
                        <h4>{project.gameId + '号玩家的愿望是：'}</h4>
                        <h4>{project.content}</h4>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <div className="card z-depth-0">
                    <div className="card-content z-depth-2">
                        <img src={money}/>
                        <h1 className="card-title">但无提示</h1>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    let project = undefined;
    for (let i in projects) {
        if (JSON.stringify(projects[i].gameId) === id) {
            project = projects[i];
            break;
        }
    }
    return {
        project: project,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'projects'
    }])
)(ProjectDetails)
