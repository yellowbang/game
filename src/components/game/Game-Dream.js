import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

const textCenter = {textAlign: "center"};

class GameDream extends Component {

    render() {
        let gameContent = null;
        switch (this.props.gameNum) {
            case '1':
                gameContent = (
                    <div className="container">
                        <h2 className="title" style={textCenter}>我的梦想</h2>
                        <h5 className="grey-text text-darken-3"
                            style={textCenter}>当流星划过夜的脸庞的那一瞬间，有许多人会轻轻地闭上眼，默默地在心里许着愿望，愿望将会在某个星光璀灿的夜晚实现。大家细细个的时候都有自己的梦想。</h5>
                        <div className="container">
                            <h4>现在一齐黎估下依个系边个的梦想.</h4>
                            <h4>录音播放的开始时候，就可以抢答。当有人抢答的瞬间，录音马上停止播放.</h4>
                            <h1></h1>
                            <h4 className="green-text text-darken-1">答对加100，其它队可以补答</h4>
                            <h4 className="red-text text-darken-1">答错扣100，心情好噶话唔扣</h4>
                            <h1></h1>
                            <h6>提示：唔好听完就算，请 try your best 甘记住记住再记住大家的梦想</h6>
                        </div>
                    </div>
                );
                break;
            case '2':
                gameContent = (
                    <div className="container">
                        <h2 className="title" style={textCenter}>快高长大</h2>
                        <h5 className="grey-text text-darken-3"
                            style={textCenter}>“快高长大，身体健康”，应该系大家从细到大听到的祝福语。宜家睇下边队“长大”得最快。</h5>
                        <div className="container">
                            <div className="container">
                                <h4>派出5个队员，尽你的能力 mak 一字马，连埋一起，睇下边队总长最长</h4>
                                <h1></h1>
                                <h4 className="green-text text-darken-1">第一名得500分</h4>
                                <h4 className="green-text text-darken-1">第二名得400分</h4>
                                <h4 className="green-text text-darken-1">第三名得300分</h4>
                                <h4 className="green-text text-darken-1">第四名得200分</h4>
                                <h1></h1>
                                <h6>提示：讲一句话tum Michael。如果去开心度话，可以抽关键性的秘密武器</h6>
                            </div>
                        </div>
                    </div>
                );
                break;
            case '3':
                gameContent = (
                    <div className="container">
                        <h2 className="title" style={textCenter}>寻找梦想</h2>
                        <h5 className="grey-text text-darken-3"
                            style={textCenter}>我们也曾为自己的梦想付出过，但有的人努力了很久，很久，也未曾达到。每日忙于生活的同时，不知不觉，我地忘记了自己的梦想。</h5>
                        <div className="container">
                            <div className="container">
                                <h4>寻找失去的梦想。教会入面收埋左好多记录着大家梦想的 QR code。请根据Tips💩，找出梦想的主人公。</h4>
                                <h1></h1>
                                <h4 className="green-text text-darken-1">答中一个有100分</h4>
                                <h1></h1>
                                <h6>提示，玩第一个 Game 果阵就提示左你啦。</h6>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                break;
        }
        return gameContent
    }
}

const mapStateToProps = (state, ownProps) => {
    const gameNum = ownProps.match.params.id;

    return {
        gameNum
    }
};

export default compose(
    connect(mapStateToProps)
)(GameDream)

