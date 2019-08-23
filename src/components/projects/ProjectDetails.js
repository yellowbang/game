import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import money from "../../assests/money.png"
import dabahuo from "../../assests/dabahuo.png"
import haowudian from "../../assests/haowudian.png"
import wudejiu from "../../assests/wudejiu.png"

const ProjectDetails = (props) => {
    const {project, auth} = props;

    if (project && project.gameId) {
        let label = project.travel ? '号玩家的想去的旅行是：' : '号玩家的愿望是：';
        let content = project.travel ? project.travel : project.content;
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content z-depth-2">
                        <span className="card-title">Tip💩</span>
                        <h5>{project.id + label}</h5>
                        <h4>{content}</h4>
                    </div>
                </div>
            </div>
        )
    } else if (project === 'noTips') {
        let src = money;
        let text = 'Tip屎 我冇';
        let ranNum = Math.random();
        if (ranNum < 0.2) {
            src = dabahuo;
            text = '冇tips又如何，我有'
        } else if (ranNum < 0.4) {
            src = haowudian;
            text = '冇tip屎'
        } else if (ranNum < 0.6) {
            src = wudejiu;
            text = '冇 tip'
        }
        return (
            <div className="container center section project-details">
                <div className="card z-depth-0">
                    <div className="card-content z-depth-2">
                        <h4 className="">{text}</h4>
                        <img src={src} style={{width: '50%'}}/>
                    </div>
                </div>
            </div>
        )
    }

    return <div/>;
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    let project = projects ? 'noTips' : undefined;
    for (let i in projects) {
        if (projects[i].gameId === id) {
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
