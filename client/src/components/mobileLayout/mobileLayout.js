import React, { Component } from 'react'
import { connect } from 'react-redux';
import 'commonCss.css'

class MobileLayout extends Component {
    render() {
        return (
        <div height="100%" width="100%">
            <div className="textAlignCenter marginBottom marginTop">
                <img src={require("images/logo.png")} alt="" id="googlePlayButton" height="200" width="170"/>
            </div>
            <div className="textAlignCenter">
                <a href="https://play.google.com/store/apps/details?id=com.vutuduexample.vutudukotlin3">
                    <img src={require("images/play_icon.png")} alt="" id="googlePlayButton"  />
                </a>
            </div>
        </div>
        )
    }
}

export default connect()(MobileLayout);